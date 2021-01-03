import { Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import { msgDis500 } from '../constantas';
import { makeLog } from '../services/makeLog';

const OBJECT = 'User';
let ACTION, INFO, STATUS;

export const changePass = async (req: any, res: Response) => {

  console.log(req.session.userId, 'change pass')
  const CONTROLLER = 'changePass';
  ACTION = 'zmiana hasła';
  INFO = 'Nieudana próba zmiany hasła';
  STATUS = 'error';

  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  let errors: any = {};

  if (oldPassword === '' || oldPassword === undefined)
    errors.oldPassword = 'Hasło nie może być puste';
  if (newPassword === '' || newPassword === undefined)
    errors.newPassword = 'Hasło nie może być puste';
  if (newPasswordConfirm !== newPassword)
    errors.newPasswordConfirm = 'Hasła muszą być zgodne';
  if (Object.keys(errors).length > 0) {
    makeLog(req.session.userId, OBJECT, req.session.userId, ACTION, CONTROLLER, INFO, STATUS);

    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({ id: req.session.userId });

    const passwordMatches = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatches) {
      makeLog(
        req.session.userId,
        OBJECT,
        req.session.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'Wrong credentials',
        alertTitle: 'Błąd',
      });
    }

    user.password = await bcrypt.hash(newPassword, 12);


    await user.save();

    STATUS = 'success'
    INFO = 'Udało się zmnienić hasło'

    makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(201).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'Pass change successfull',
        alertTitle: 'Udana zmiana hasła',
      });

  } catch (err) {
    // rollbar
    return res.status(500).json({
      resStatus: 'error',
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
