import { Response } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../entity/User';
import { msgDis500 } from '../constantas';
import { makeLog } from '../services/makeLog';
import { validate } from 'class-validator';
import { mapErrors } from '../utils/mapErrors';
import { saveRollbar } from '../services/saveRollbar';

const OBJECT = 'User';
let ACTION, INFO, STATUS, CONTROLLER

export const changePass = async (req: any, res: Response) => {

  CONTROLLER = 'changePass';
  ACTION = 'zmiana hasła';
  INFO = 'Nieudana próba zmiany hasła';
  STATUS = 'error';

  const { oldPassword, password,  passwordConfirm } = req.body;

  let errors: any = {};

  if (oldPassword === '' || oldPassword === undefined)
    errors.oldPassword = 'Hasło nie może być puste';
  if (password === '' || password === undefined)
    errors.password = 'Hasło nie może być puste';
  if (password === oldPassword)
    errors.password = 'Obowiązujące i nowe hasło muszą się różnić';
  if (passwordConfirm !== password)
    errors.passwordConfirm = 'Hasła muszą być zgodne';

  if (Object.keys(errors).length > 0) {
    makeLog(
      req.session.userId,
      OBJECT,
      req.session.userId,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );

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

    user.password = password // temp to validate

    errors = await validate(user);

    if (errors.length > 0) {
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(mapErrors(errors));
    }



    user.password = await bcrypt.hash(password, 12);

    await user.save();

    STATUS = 'success';
    INFO = 'Udało się zmnienić hasło';

    makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      msg: 'Pass change successfull',
      alertTitle: 'Udana zmiana hasła',
    });
  } catch (err) {
    STATUS = 'error'
    saveRollbar(CONTROLLER,err.message,STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
