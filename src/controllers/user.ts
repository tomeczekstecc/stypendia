import { Request, Response } from 'express';
import axios from 'axios';
import dayjs from 'dayjs';

import { User } from '../entity/User';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import { logIn } from '../middleware/auth';
import { mapErrors } from '../utils/mapErrors';
import {
  APP_ORIGIN,
  FAILED_LOGINS_MAX,
  PASS_DAYS_VALID,
  SESSION_NAME,
  UNBLOCK_TIMEOUT,
} from '../config';
import { makeLog } from '../services/makeLog';
import { PasswordReset } from '../entity/PasswordReset';
import { saveRollbar } from '../services/saveRollbar';
import { msg } from '../parts/messages';
import { Stats } from 'fs';

const OBJECT = 'User';
let CONTROLLER, ACTION, INFO, STATUS;

//
//create a user
//
export const register = async (req, res: Response) => {
  CONTROLLER = 'register';
  ACTION = 'utworzenie użytkownika';

  const {
    login,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  } = req.body;

  try {
    const emailUser = await User.find({ email });
    const loginUser = await User.find({ login });

    let errors: any = {};
    if (emailUser.length > 0) errors.email = msg.client.fail.emailTaken;
    if (loginUser.length > 0) errors.login = msg.client.fail.loginTaken;
    if (passwordConfirm !== password)
      errors.passwordConfirm = msg.client.fail.passNoDiff;
    INFO = msg.client.fail.loginOrEmailTaken;
    STATUS = 'error';
    if (Object.keys(errors).length > 0) {
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);

      return res.status(400).json(errors);
    }

    const user = await User.create({
      login,
      firstName,
      lastName,
      email,
      password,
    });

    errors = await validate(user);

    INFO = msg.client.fail.unvalidated;

    if (errors.length > 0) {
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(mapErrors(errors));
    }
    await user.save();

    INFO = msg.client.ok.userCreated;
    STATUS = 'success';

    makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const body = {
      email: user.email,
    };

    await axios.post(`${APP_ORIGIN}/api/v1/email/resend`, body, config);

    // logIn(req, user.id);

    return res.status(201).json({
      resStatus: 'success',
      msgPL:
        msg.client.ok.userCreated + '. ' + msg.client.ok.linkSend + user.email,
      alertTitle: 'Brawo! Użytkownik utworzony!',
      data: user,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

//
//login
//

export const login = async (req: any, res: Response) => {
  CONTROLLER = 'login';
  ACTION = 'logowanie';

  const { login, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(login)) errors.login = msg.client.fail.empty;
    if (isEmpty(password)) errors.password = msg.client.fail.empty;

    if (Object.keys(errors).length > 0) {
      STATUS = 'error';
      INFO = msg.client.fail.empty;
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ login });

    if (!user || !user.verifiedAt) {
      STATUS = 'error';
      INFO = msg.client.fail.wrongCreds;
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO + msg.dev.unoUserOrUserNotVer, STATUS);

      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd logowania',
      });
    }

    if (user.isBlocked && UNBLOCK_TIMEOUT + +user.blockedAt > Date.now()) {
      STATUS = 'error';
      INFO = msg.client.fail.stillBlocked;
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

      return res.status(401).json({
        resStatus: STATUS,
        msgPL: msg.client.fail.blocked,
        alertTitle: 'Blokada konta!',
      });
    } else if (
      user.isBlocked &&
      UNBLOCK_TIMEOUT + +user.blockedAt < Date.now()
    ) {
      user.failedLogins = 0;
      user.isBlocked = 0;
      user.blockedAt = null;
      await user.save();
    }

    const passwordMathes = await bcrypt.compare(password, user.password);

    if (!passwordMathes) {
      user.failedLogins += 1;
      STATUS = 'error';
      INFO = `Liczba niepoprawnych logowań: ${user.failedLogins} - wprowadzono niepoprawne dane - nieprawidłowe hasło`;
      await user.save();
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

      if (user.failedLogins === +FAILED_LOGINS_MAX - 1) {
        user.failedLogins += 1;
        STATUS = 'error';
        INFO = msg.client.fail.nextBlock;
        await user.save();
        makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

        return res.status(403).json({
          resStatus: 'error',
          msgPL: INFO,

          alertTitle: 'Niepoprawne logowanie!',
        });
      }

      if (user.failedLogins >= +FAILED_LOGINS_MAX) {
        user.isBlocked = 1;
        user.blockedAt = new Date();
        STATUS = 'error';
        INFO = msg.client.fail.blocked;
        await user.save();
        makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
        return res.status(403).json({
          resStatus: 'error',
          msgPL: INFO,
          alertTitle: 'Błąd',
        });
      }

      return res.status(400).json({
        resStatus: 'error',
        msgPL: msg.client.fail.wrongCreds,
        alertTitle: 'Niepoprawne logowanie!',
      });
    }

    if (
      dayjs(Date.now()).diff(dayjs(user.lastPassChangeAt)) > PASS_DAYS_VALID
    ) {
      INFO = msg.client.fail.forcedChangePass;
      STATUS = 'warning';

      await user.save();
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

      const token = await PasswordReset.plaintextToken();

      const reset = await PasswordReset.create({ userId: user.id, token });

      await reset.save();

      return res.status(403).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: INFO,
        alertTitle: 'Konieczna zmiana hasła!',
        forcePassChange: true,
        token,
        resetId: reset.id,
      });
    }

    logIn(req, user.id);

    await user.save();
    return res.status(200).json({
      resStatus: 'success',
      msgPL: msg.client.ok.loggedIn,
      alertTitle: 'Zalogowano!',
      csrf: req.session.XSRF_Token,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

//
//Logout
//
export const logout = async (req: any, res: Response) => {
  CONTROLLER = 'logout';
  ACTION = 'wylogowanie';

  try {
    makeLog(
      req.session.userId,
      OBJECT,
      req.session.userId,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    new Promise<void>((resolve, reject) => {
      req.session!.destroy((err: Error) => {
        if (err) reject(err);

        res.clearCookie(SESSION_NAME);

        resolve();
        INFO = msg.client.ok.loggedOut;
        STATUS = 'success';

        res.status(200).json({
          resStatus: STATUS,
          msgPL: INFO,
          alertTitle: 'Wylogowano',
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      resStatus: 'error',
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

//
//me
//
export const me = async (req: any, res: Response) => {
  CONTROLLER = 'me';
  ACTION = 'pobieranie danych o użytkowniku';
  try {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) throw new Error('Brak dostępu');
    return res.status(200).json({
      resStatus: 'success',
      msgPL: 'jest zalogowana/y',
      user,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd!',
    });
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Get all users
//
export const getAllUsers = async (req: Request, res: Response) => {
  CONTROLLER = 'getAllUsers';
  ACTION = 'pobieranie danych o użytkowniku';
  try {
    const users = await User.find({ relations: ['submits'] });
    INFO = msg.dev.usersFetched;
    STATUS = 'success';
    return res.status(200).json({
      resStatus: 'success',
      msgPL: INFO,
      count: users.length,
      data: users,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd!',
    });
  }
};

//
//Get one user
//
export const getOneUser = async (req: Request, res: Response) => {
  CONTROLLER = 'getOneUser';
  ACTION = 'pobieranie danych użytkownika';

  const { uuid } = req.params;

  try {
    const user = await User.findOne({ uuid }, { relations: ['submits'] });

    if (!user) {
      STATUS = 'error';
      INFO = msg.dev.noUser;
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
      });
    }
    STATUS = 'success';
    INFO = msg.dev.userFetched;
    return res.status(200).json({
      resStatus: 'success',
      msgPL: INFO,
      data: user,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd!',
    });
  }
};

//
//update a user
//
export const updateUser = async (req: Request, res: Response) => {
  CONTROLLER = 'updateUser';
  ACTION = 'aktualizowanie użytkownika';
  const { uuid } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ uuid });

    if (!user) {
      STATUS = 'error';
      INFO = msg.dev.noUser;

      return res.status(400).json({
        resStatus: STATUS,
        msg: INFO,
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();
    STATUS = 'success';
    INFO = msg.dev.userUpdated;
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      data: user,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd!',
    });
  }
};

//
//delete a user
//
export const deleteUser = async (req: Request, res: Response) => {
  CONTROLLER = 'deleteUser';
  ACTION = 'usuwianie użytkownika';
  const { uuid } = req.params;

  try {
    const user = await User.findOne({ uuid });

    if (!user) {
      STATUS = 'error';
      INFO = msg.dev.noUser;
      return res.status(400).json({
        resStatus: STATUS,
        msg: INFO,
        msgDis: 'Nie znaleziono użytkownika',
      });
    }

    await user.remove();
    STATUS = 'success';
    INFO = msg.dev.userDeleted;

    return res.status(204).json({
      resStatus: STATUS,
      msg: INFO,
      data: user,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd!',
    });
  }
};
