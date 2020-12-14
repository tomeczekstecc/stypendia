import {  Response } from 'express';
import { msgDis500 } from '../constantas';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import { UserHistory } from '../entity/UserHistory';

//
//create a user
//
export const addUserHistory = async (req: any, res: Response) => {
  let newFailedLogins; // z params albo query
  const { uuid } = req.params;

  try {
    const user = await User.find({ uuid });

    let errors: any = {};
    if (!user) errors.email = 'Nie znaleziono użytkownika';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        status: 'fail',
        msgPL: 'Niepoprawne dane rejestracji',
        msg: 'Incorrect credentials',
        errors,
      });
    }

    const user_history = await UserHistory.create({
      failedLogins: newFailedLogins || user[0].failedLogins, // i tat dalej
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      userId: req.session.userId,
      userUuuid: uuid,
    });
    errors = await validate(user);

    await user_history.save();

    return res.status(201).json({
      status: 'success',
      msg: 'User created',
      msgPL: 'Pomyślnie utworzono wpis historii użytkownika',
      data: user_history,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgPL: msgDis500,
    });
  }
};
