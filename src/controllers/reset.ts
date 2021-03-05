import { Response } from 'express';
import { isEmail, isEmpty, validate } from 'class-validator';

import { resetPassword } from '../middleware/auth';
import { User, PasswordReset } from '../entity';
import { sendMail } from '../services/mail';
import { makeLog } from '../services/makeLog';
import { mapErrors } from '../utils';
import { saveRollbar } from '../services/saveRollbar';
import { msg } from '../parts/messages';
import { prepareTempleVerify } from '../templates/mail';
import { prepareTempleResetPass } from '../templates/mail/resetPass';

const OBJECT: any = 'User';
let ACTION: any, INFO: string, STATUS: string, CONTROLLER: any;

export const sendResetMail = async (req: any, res: Response) => {
  CONTROLLER = 'sendResetMail';
  ACTION = 'generowanie maila resetu hasła';

  req.clientIp = req.body.clientIp;

  const { email, login } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(email) || !email) errors.email = msg.client.fail.emailErr;
    if (isEmpty(login) || !login) errors.login = msg.client.fail.userErr;
    if (!isEmail(email)) errors.email = msg.client.fail.emailErr;

    // ****************************** LOG *********************************//
    INFO = msg.client.fail.emailErr;
    STATUS = 'error';
    makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({ email, login });

    if (!user) {
      STATUS = 'error';
      INFO = msg.client.fail.linkNoSend;

      return res.status(401).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd',
      });
    }
    

    if (user) {
      const token = await PasswordReset.plaintextToken();

      const reset = await new PasswordReset({ userId: user.id, token });

      await reset.save();

      const templ = await prepareTempleResetPass(reset.url(token));

      await sendMail({
        to: email,
        subject: msg.subjects.resetPass,
        html: templ,
      });
      // ****************************** LOG *********************************//

      INFO = msg.client.ok.linkSend + email;
      STATUS = 'success';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
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

export const passwordReset = async (req: any, res: Response) => {
  CONTROLLER = 'passwordReset';
  ACTION = 'resetowanie hasła';

  req.clientIp = req.body.clientIp;

  const { id, token } = req.query;
  const { password, passwordConfirm } = req.body;

  let errors: any = {};

  if (password === '' || password === undefined)
    errors.password = msg.client.fail.passNoDiff;
  if (passwordConfirm !== password)
    errors.passwordConfirm = msg.client.fail.passNoDiff;
  if (Object.keys(errors).length > 0) {
    makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);

    return res.status(400).json(errors);
  }

  try {
    const reset: any = await PasswordReset.findOne(id);

    if (!reset) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.invalidToken;
      STATUS = 'error';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//
      return res.status(400).json({
        resStatus: 'error',
        msgPL: INFO,
        alertTitle: 'Błąd',
      });
    }

    const user = await User.findOne(reset.userId);

    if (!user || !reset.isValid(token)) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.invalidToken;
      STATUS = 'error';
      makeLog(OBJECT, reset.userId, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd!',
      });
    }

    user.password = password; // temp to validate

    errors = await validate(user);

    if (errors.length > 0) {
      makeLog(
        OBJECT,
        req.session.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS,
        req
      );
      return res.status(400).json(mapErrors(errors));
    }

    await Promise.all([
      resetPassword(user.id, password, req),
      PasswordReset.delete({ userId: reset.userId }),
    ]);
    // ****************************** LOG *********************************//
    INFO = msg.client.ok.passChange;
    STATUS = 'success';
    makeLog(OBJECT, reset.userId, ACTION, CONTROLLER, INFO, STATUS, req);
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
