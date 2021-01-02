import { Request, Response } from 'express';
import axios from 'axios';
import dayjs from 'dayjs';
import { msgDis500 } from '../constantas';
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

const OBJECT = 'User';

//
//create a user
//
export const register = async (req, res: Response) => {
  const CONTROLLER = 'register';
  let ACTION = 'utworzenie';
  let INFO = 'Email lub login już zajęte';
  let STATUS = 'error';

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
    if (emailUser.length > 0) errors.email = 'Ten email jest już zajęty';
    if (loginUser.length > 0) errors.login = 'Ten login jest już zajęty';
    if (passwordConfirm !== password)
      errors.passwordConfirm = 'Hasła muszą być zgodne';
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

    INFO = 'Wprowadzone dane nie spełniają warunków walidacji';

    if (errors.length > 0) {
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(mapErrors(errors));
    }
    await user.save();
    console.log(user);

    INFO = 'Utworzno użytkownika';
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
      msg: 'User created',
      msgPL: `Pomyślnie utworzono użytkownika - wysłaliśmy specjalny link aktywacyjny na email ${user.email}`,
      alertTitle: 'Brawo! Użytkownik utworzony!',
      data: user,
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      resStatus: 'fail',
      msg: err.message,
      msgPL: msgDis500,
    });
  }
};

//
//login
//

export const login = async (req: any, res: Response) => {
  console.log(req.body);
  const CONTROLLER = 'login';
  let ACTION = 'logowanie';
  let STATUS = 'error';
  let INFO;
  const { login, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(login)) errors.login = 'Nazwa użytkownika nie może być pusta';
    if (isEmpty(password)) errors.password = 'Hasło nie może być puste';

    if (Object.keys(errors).length > 0) {
      INFO = 'Email lub hasło nie mogą być puste';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ login });

    if (!user || !user.verifiedAt) {
      INFO =
        'Wprowadzono niepoprawne dane lub użytkownik nie potwierdził konta';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'Wrong credentials',
        alertTitle: 'Błąd logowania',
      });
    }

    if (user.isBlocked && UNBLOCK_TIMEOUT + +user.blockedAt > Date.now()) {
      INFO = 'Użytkownik nadal zablokowany';
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

      return res.status(401).json({
        resStatus: STATUS,
        msgPL:
          'Użytkownik jest zablokowany - spróbuj po za 20 minut. Jeżeli nie odzyskasz prawidłowego hasła - spróbuj je zresetować',
        msg: 'User is blocked',
        alertTitle: 'Blokada konta',
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
      console.log(user);
      user.failedLogins += 1;
      INFO = `Liczba niepoprawnych logowań: ${user.failedLogins} - wprowadzono niepoprawne dane - nieprawidłowe hasło`;
      await user.save();
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

      if (user.failedLogins === +FAILED_LOGINS_MAX - 1) {
        user.failedLogins += 1;

        INFO =
          'Kolejna nieudana próba zablokuje użytkownika i uniemożliwi dalsze logowania na 20 minut';
        await user.save();
        makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
        return res.status(403).json({
          resStatus: 'error',
          msgPL: INFO,
          msg: 'User blocked',
          alertTitle: 'Niepoprawne logowanie',
        });
      }

      if (user.failedLogins >= +FAILED_LOGINS_MAX) {
        user.isBlocked = 1;
        user.blockedAt = new Date();
        INFO = 'Zablokowano użytkownika';
        await user.save();
        makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
        return res.status(403).json({
          resStatus: 'error',
          msgPL: INFO,
          msg: 'User blocked',
          alertTitle: 'Błąd',
        });
      }

      return res.status(400).json({
        resStatus: 'error',
        msgPL:
          'Wprowadzono niepoprawne dane logowania - sprawdź nazwę użytkownika lub hasło',
        msg: 'Wrong credentials',
        alertTitle: 'Niepoprawne logowanie',
      });
    }

    if (
      dayjs(Date.now()).diff(dayjs(user.lastPassChangeAt)) > PASS_DAYS_VALID
    ) {
      INFO = 'Od ostatniej zmiany hasła minęło 90 dni. Należy je zmienić';
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
        alertTitle: 'Konieczna zmiana hasła',
        forcePassChange: true,
        token,
        resetId: reset.id
      });
    }

    logIn(req, user.id);

    await user.save();

    return res.status(200).json({
      resStatus: 'success',
      msgPL: 'Pomyślnie zalogowano.',
      msg: 'Successfully logged in',
      alertTitle: 'Sukces',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msgPL: 'Coś poszło nie tak',
      msg: 'Error server',
      error: err.message,
    });
  }
};

//
//Logout
//
export const logout = async (req: any, res: Response) => {
  console.log('LOGOUT');
  const CONTROLLER = 'logout';
  let ACTION = 'wylogowanie';
  let INFO = 'Pomyślnie wylogowano użytkownika';
  let STATUS = 'success';

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
        res.status(200).json({
          resStatus: STATUS,
          msgPL: 'Pomyślnie wylogowano użytkownika',
          msg: 'Successfully logout',
          alertTitle: 'Wylogowano',
        });
      });
    });
  } catch (err) {
    return res.status(500).json({
      resStatus: 'error',
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

//
//me
//
export const me = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) throw new Error('Brak dostępu');
    return res.status(200).json({
      resStatus: 'success',
      msgPL: 'jest zalogowana/y',
      user,
    });
  } catch (err) {
    return res.json({
      resStatus: 'error',
      msgPL: 'Brak dostępu',
      msg: 'Unauthenticated',
      error: err.message,
    });
  }
};

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//Get all users
//
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // get users and include their posts
    const users = await User.find({ relations: ['submits'] });
    return res.status(200).json({
      status: 'success',
      msg: 'Successfully fetched all users',
      msgDis: 'Pomślnie pobrano dane użytkowników',
      count: users.length,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgPD: msgDis500,
    });
  }
};

//
//Get one user
//
export const getOneUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    // get user and include it's posts
    const user = await User.findOne({ uuid }, { relations: ['submits'] });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'User not exist',
        msgPL: 'Nie znaleziono użytkownika',
      });
    }

    return res.status(200).json({
      status: 'success',
      msg: 'Successfully fetched all users',
      msgDis: 'Pomślnie pobrano dane użytkowników',
      count: 1,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};

//
//update a user
//
export const updateUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ uuid });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    await user.save();

    return res.status(201).json({
      status: 'success',
      msg: 'User successfully updated',
      msgDis: 'Pomyślnie zaktualizowano dane użytkownika',
      count: 1,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};

//
//update a user
//
export const deleteUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  try {
    const user = await User.findOne({ uuid });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'User not exist',
        msgDis: 'Nie znaleziono użytkownika',
      });
    }

    await user.remove();

    return res.status(204).json({
      status: 'success',
      msg: 'User successfully deleted',
      msgDis: 'Pomyślnie usunięto dane użytkownika',
      count: 1,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
