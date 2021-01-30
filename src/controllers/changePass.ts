import { Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../entity';
import { makeLog, saveRollbar } from '../services';
import { validate } from 'class-validator';
import { mapErrors } from '../utils';
import { msg } from '../parts/messages';

const OBJECT = 'User';
let ACTION, INFO, STATUS, CONTROLLER;

export const changePass = async (req: any, res: Response) => {
  CONTROLLER = 'changePass';
  ACTION = 'zmiana hasła';
  INFO = msg.client.fail.passChange;
  STATUS = 'error';

  const { oldPassword, password, passwordConfirm } = req.body;

  let errors: any = {};

  if (oldPassword === '' || oldPassword === undefined)
    errors.oldPassword = msg.client.fail.empty;
  if (password === '' || password === undefined)
    errors.password = msg.client.fail.empty;
  if (password === oldPassword) errors.password = msg.client.fail.passMustDiff;
  if (passwordConfirm !== password)
    errors.passwordConfirm = msg.client.fail.passNoDiff;

  if (Object.keys(errors).length > 0) {
    makeLog(OBJECT, req.session.userId, ACTION, CONTROLLER, INFO, STATUS, req);

    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ id: req.session.userId });

    const passwordMatches = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatches) {
      STATUS = 'error';
      INFO = msg.client.fail.logInFailed;
      makeLog(
        OBJECT,
        req.session.userId,
        ACTION,
        CONTROLLER,
        INFO + msg.dev.passNoMatch,
        STATUS,
        req
      );
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd',
      });
    }

    user.password = password; // temp to validate

    errors = await validate(user);

    if (errors.length > 0) {
      makeLog(OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(400).json(mapErrors(errors));
    }

    user.password = await bcrypt.hash(password, 12);
    user.lastPassChangeAt = await new Date();
    await user.save();

    STATUS = 'success';
    INFO = msg.client.ok.passChange;

    makeLog(OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS, req);
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Udana zmiana hasła',
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
    });
  }
};
