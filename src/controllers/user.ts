import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { User } from '../entity/User';
import { validate } from 'class-validator';

//
//create a user
//
export const addUser = async (req, res: Response) => {
  const { login, email, role, password } = req.body;

  try {
    const user = await User.create({ login, email, role, password });
    const errors = await validate(user);
    if (errors.length > 0) throw errors;
    await user.save();
    req.session.userId = user.id;

    return res.status(201).json({
      status: 'success',
      msg: 'User created',
      msgDis: 'Pomyślnie utworzono użytkownika',
      count: 1,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      err,
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};

//
//Get all users
//
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // get users and include their posts
    const users = await User.find({ relations: ['posts'] });
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
      msgDis: msgDis500,
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
    const user = await User.findOne({ uuid }, { relations: ['posts'] });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'User not exist',
        msgDis: 'Nie znaleziono użytkownika',
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
  const { name, email, role } = req.body;

  try {
    const user = await User.findOneOrFail({ uuid });

    user.login = name || user.login;
    user.email = email || user.email;
    user.role = role || user.role;

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
