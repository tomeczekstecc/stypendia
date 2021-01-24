import { Response } from 'express';
import { User } from '../entity/User';
import { validate } from 'class-validator';
import { UserHistory } from '../entity/UserHistory';
import { makeLog } from '../services/makeLog';
import { saveRollbar } from '../services/saveRollbar';
import { msg } from '../parts/messages';
import { Stats } from 'fs';

const OBJECT = 'User';
let ACTION, INFO, STATUS, CONTROLLER;

//
//create a user
//
export const addUserHistory = async (req: any, res: Response) => {
  CONTROLLER = 'addUserHistory';
  ACTION = 'dodawanie historii użytkownika';
  let newFailedLogins; // z params albo query
  const { uuid } = req.params;

  try {
    const user = await User.find({ uuid });

    let errors: any = {};
    if (!user) errors.email = msg.client.fail.noUser;

    if (Object.keys(errors).length > 0) {
      STATUS = 'error';
      INFO = msg.client.fail.unvalidated;
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,

        errors,
      });
    }

    const userHistory = await UserHistory.create({
      failedLogins: newFailedLogins || user[0].failedLogins, // i tat dalej
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      userId: req.session.userId,
      userUuuid: uuid,
    });
    errors = await validate(user);

    await userHistory.save();

    STATUS = 'success';
    INFO = msg.client.ok.historyUserCreated;

    makeLog(
      req.session.userId,
      OBJECT,
      userHistory.id,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL:msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
