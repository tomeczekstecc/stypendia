import { Response } from 'express';
import { isEmail, isEmpty, validate } from 'class-validator';

import { resetPassword } from '../middleware/auth';
import { User, PasswordReset } from '../entity';
import { sendMail } from '../services/mail';
import { makeLog } from '../services/makeLog';
import { mapErrors } from '../utils';
import { saveRollbar } from '../services/saveRollbar';
import { msg } from '../parts/messages';

const OBJECT = 'User';
let ACTION, INFO, STATUS, CONTROLLER;

export const sendResetMail = async (req: any, res: Response) => {
  CONTROLLER = 'sendResetMail';
  ACTION = 'generowanie maila resetu hasła';

  const { email, login } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(email) || !email)
      errors.email = msg.client.fail.emailErr;
    if (isEmpty(login) || !login)
      errors.login = msg.client.fail.userErr;
    if (!isEmail(email)) errors.email = msg.client.fail.emailErr;

    // ****************************** LOG *********************************//
    INFO =msg.client.fail.emailErr;
    STATUS = 'error';
    makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({ email, login });

    if (!user) {
      STATUS = 'error'
      INFO = msg.client.fail.linkNoSend

      return res.status(401).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd',
      });
    }

    if (user) {
      const token = await PasswordReset.plaintextToken();

      const reset = await PasswordReset.create({ userId: user.id, token });

      await reset.save();

      await sendMail({
        to: email,
        subject: msg.subjects.resetPass,
        text: reset.url(token),
      });
      // ****************************** LOG *********************************//

      INFO = msg.client.ok.linkSend + email;
      STATUS = 'success';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//
    }

    user.lastResetEmailAt = new Date();

    await user.save();

    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
        alertTitle: 'Poszło!',
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      alertTitle: 'Błąd',
    });
  }
};

export const passwordReset = async ({ query, body }, res: Response) => {
  CONTROLLER = 'passwordReset';
  ACTION = 'resetowanie hasła';

  const { id, token} = query;
  const { password, passwordConfirm } = body;

  let errors: any = {};

  if (password === '' || password === undefined)
    errors.password = msg.client.fail.passNoDiff;
  if (passwordConfirm !== password)
    errors.passwordConfirm = msg.client.fail.passNoDiff;
  if (Object.keys(errors).length > 0) {
    makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);

    return res.status(400).json(errors);
  }

  try {
    const reset = await PasswordReset.findOne(id);

    if (!reset) {

      // ****************************** LOG *********************************//
      INFO = msg.client.fail.invalidToken;
      STATUS = 'error';
      makeLog(
        undefined,
        OBJECT,
        undefined,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      // ********************************************************************//
      return res.status(400).json({
        resStatus: 'error',
        msgPL: INFO,
        alertTitle:'Błąd'
      });
    }

    const user = await User.findOne(reset.userId);


    if (!user || !reset.isValid(token)) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.invalidToken;
      STATUS = 'error';
      makeLog(
        reset.userId,
        OBJECT,
        reset.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      // ********************************************************************//
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd!'
      });
    }

    user.password = password; // temp to validate

    errors = await validate(user);

    if (errors.length > 0) {
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(mapErrors(errors));
    }




    await Promise.all([
      resetPassword(user.id, password),
      PasswordReset.delete({ userId: reset.userId }),
    ]);
    // ****************************** LOG *********************************//
    INFO = msg.client.ok.passChange;
    STATUS = 'success';
    makeLog(
      reset.userId,
      OBJECT,
      reset.userId,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    // ********************************************************************//
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Zmieniono!',
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
