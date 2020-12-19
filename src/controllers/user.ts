import { Request, Response } from 'express';
import axios from 'axios';

import { msgDis500 } from '../constantas';
import { User } from '../entity/User';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import { logIn, logOut } from '../middleware/auth';
import { mapErrors } from '../utils/mapErrors';
import { APP_ORIGIN, UNBLOCK_TIMEOUT } from '../config';
import { makeLog } from '../services/makeLog';

const OBJECT = 'User';

//
//create a user
//
export const register = async (req, res: Response) => {
  const CONTROLLER = 'register';
  let ACTION = 'utworzenie';
  let INFO = 'Email lub login już zajęte';
  let STATUS = 'error';

  const { login, firstName, lastName, email, password } = req.body;

  try {
    const emailUser = await User.find({ email });
    const loginUser = await User.find({ login });

    let errors: any = {};
    if (emailUser.length > 0) errors.email = 'Ten email jest już zajęty.';
    if (loginUser.length > 0) errors.login = 'Ten login jest już zajęty.';

    if (Object.keys(errors).length > 0) {
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);

      return res.json(errors);
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
    console.log(`${APP_ORIGIN}/api/v1/email/resend`);
    await axios.post(`${APP_ORIGIN}/api/v1/email/resend`, body, config);

    logIn(req, user.id);

    return res.status(201).json({
      status: 'success',
      msg: 'User created',
      msgPL: 'Pomyślnie utworzono użytkownika',
      data: user,
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgPL: msgDis500,
    });
  }
};

//
//login
//

export const login = async (req: any, res: Response) => {
  const CONTROLLER = 'login';
  let ACTION = 'logowanie';
  let STATUS = 'error';
  let INFO;
  const { login, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(login)) errors.login = 'Login nie może być pusty';
    if (isEmpty(password)) errors.password = 'Hasło nie może być puste';

    if (Object.keys(errors).length > 0) {
      INFO = 'Email lub hasło nie mogą być puste';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.json(errors);
    }

    const user = await User.findOne({ login });

    if (!user) {
      INFO = 'Wprowadzono niepoprawne dane';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json({
        status: STATUS,
        msgPL: INFO,
        msg: 'Wrong credentials',
        errors,
      });
    }

    if (user.isBlocked && UNBLOCK_TIMEOUT + +user.blockedAt > Date.now()) {
      INFO = 'Użytkownik nadal zablokowany';
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

      return res.status(403).json({
        status: STATUS,
        msgPL: 'Użytkownik jest zablokowany - spróbuj po za 20 minut',
        msg: 'User is blocked',
        errors,
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

      if (user.failedLogins >= 3) {
        user.isBlocked = 1;
        user.blockedAt = new Date();
        INFO =
          'Zablokowano użytkownika - wprowadzono niepoprawne dane - nieprawidłowe hasło';
        await user.save();
        makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
        return res.status(400).json({
          status: 'fail',
          msgPL: 'Wprowadzono niepoprawne dane',
          msg: 'Wrong credentials',
          errors,
        });
      }

      return res.status(400).json({
        status: 'fail',
        msgPL: 'Wprowadzono niepoprawne dane',
        msg: 'Wrong credentials',
        errors,
      });
    }

    logIn(req, user.id);

    user.failedLogins = 0;
    await user.save();

    return res.status(200).json({
      status: 'success',
      msgPL: 'Pomyślnie zalogowano.',
      msg: 'Successfully logged in',
      user,
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
export const logout = async (req: Request, res: Response) => {
  await logOut(req, res);
  // return res.json({ msg: 'Pomyślnie wylogowano' });
};

//
//me
//
export const me = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) throw new Error('Brak dostępu');
    return res.json({
      user,
    });
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
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
