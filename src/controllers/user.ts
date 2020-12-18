import { Request, Response } from 'express';

import * as ip from 'ip'
import browser from 'browser-detect'
import { msgDis500 } from '../constantas';
import { User } from '../entity/User';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import { logIn, logOut } from '../middleware/auth';
import { mapErrors } from '../utils/mapErrors';
import { UNBLOCK_TIMEOUT } from '../config';
import { userLogger } from '../../logger';
import { makeLog } from '../services/makeLog';




//
//create a user
//
export const register = async (req, res: Response) => {
  const { login, firstName, lastName, email, password } = req.body;

  try {
    const emailUser = await User.find({ email });
    const loginUser = await User.find({ login });

    let errors: any = {};
    if (emailUser.length > 0) errors.email = 'Ten email jest już zajęty.';
    if (loginUser.length > 0) errors.login = 'Ten login jest już zajęty.';
     userLogger.error(`Unable to find user: ${errors.email}`);

    if (Object.keys(errors).length > 0) return res.json(errors);

    const user = await User.create({
      login,
      firstName,
      lastName,
      email,
      password,
    });

    errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await user.save();
    userLogger.info('New user created',{userId:user.id,login:user.login, ip: ip.address(),browser: browser()});
    makeLog()

    logIn(req, user.id);

    return res.status(201).json({
      status: 'success',
      msg: 'User created',
      msgPL: 'Pomyślnie utworzono użytkownika',
      data: user,
    });
  } catch (err) {
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
  const { login, password } = req.body;
console.log(ip.address())
console.log(browser())

  try {
    let errors: any = {};
    if (isEmpty(login)) errors.login = 'Login nie może być pusty';
    if (isEmpty(password)) errors.password = 'Hasło nie może być puste';

    if (Object.keys(errors).length > 0) return res.json(errors);

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msgPL: 'Wprowadzono niepoprawne dane',
        msg: 'Wrong credentials',
        errors,
      });
    }

    if (user.isBlocked && UNBLOCK_TIMEOUT + +user.blockedAt > Date.now()) {
      console.log(UNBLOCK_TIMEOUT + +user.blockedAt, Date.now());
      return res.status(403).json({
        status: 'fail',
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
      user.failedLogins += 1;
      if (user.failedLogins >= 3) {
        user.isBlocked = 1;
        user.blockedAt = new Date();
      }

      await user.save();
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
