import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { User } from '../entity/User';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import { logIn, logOut } from '../middleware/auth';

//
//create a user
//
export const register = async (req, res: Response) => {
  const { login, firstName, lastName, email, role, password } = req.body;

  try {
    const emailUser = await User.find({ email });
    const loginUser = await User.find({ login });
    console.log(emailUser, loginUser);
    let errors: any = {};
    if (emailUser.length > 0) errors.email = 'Ten email jest już zajęty.';
    if (loginUser.length > 0) errors.login = 'Ten login jest już zajęty.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: 'fail',
        msgPL: 'Niepoprawne dane rejestracji',
        msg: 'Incorrect credentials',
        errors,
      });
    }

    const user = await User.create({
      login,
      firstName,
      lastName,
      email,
      role,
      password,
    });
    errors = await validate(user);

    await user.save();

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

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(login)) errors.login = 'Login nie może być pusty';
    if (isEmpty(password)) errors.password = 'Hasło nie może być puste';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: 'fail',
        msgPL: 'Wprowadzono niepoprawne dane',
        msg: 'Wrong credentials',
        errors,
      });
    }
    const user = await User.findOne({ login });

    const passwordMathes = await bcrypt.compare(password, user.password);
    if (!passwordMathes) {
      return res.status(400).json({
        status: 'fail',
        msgPL: 'Wprowadzono niepoprawne dane',
        msg: 'Wrong credentials',
        errors,
      });
    }

    logIn(req, user.id);

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
