import { Response } from 'express';
import { isEmpty } from 'class-validator';

import { resetPassword } from '../middleware/auth';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { sendMail } from '../services/mail';
import { msgDis500 } from '../constantas';
import { makeLog } from '../services/makeLog';

const OBJECT = 'User';
let ACTION, INFO, STATUS;

export const sendResetMail = async (req: any, res: Response) => {
  const CONTROLLER = 'sendResetMail';
  ACTION = 'generowanie maila resetu hasła';

  const { email } = req.body;
  try {
    let errors: any = {};

    if (isEmpty(email)) errors.email = 'Musisz podać poprawny email';

    // ****************************** LOG *********************************//
    INFO = 'Podany email nie jest w poprawnym formacie';
    STATUS = 'error';
    makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    if (Object.keys(errors).length > 0) return res.json(errors);

    const user = await User.findOne({ email });

    if (user) {
      const token = await PasswordReset.plaintextToken();

      const reset = await PasswordReset.create({ userId: user.id, token });

      await reset.save();

      await sendMail({
        to: email,
        subject: 'Reset your password',
        text: reset.url(token),
      });
      // ****************************** LOG *********************************//
      INFO = `Wysłano mail z linkiem do odzyskania hasła na adres: ${email}`;
      STATUS = 'success';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//
    }
    return res.status(201).json({
      status: STATUS,
      msgPL: INFO,
      msg: 'Reset mail send',
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      status: 'fail',
      msgPL: msgDis500,
      msg: err,
    });
  }
};

export const passwordReset = async ({ query, body }, res: Response) => {
  const CONTROLLER = 'passwordReset';
  ACTION = 'resetowanie hasła';

  const { id, token } = query;
  const { password } = body;

  try {
    const reset = await PasswordReset.findOne(id);

    let user;

    if (
      !reset ||
      !reset.isValid(token) ||
      !(user = await User.findOne(reset.userId))
    ) {
      // ****************************** LOG *********************************//
      INFO = 'użyto niepoprawny token';
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
      return res.status(403).json({
        status: 'fail',
        msgPL: 'Niepoprawny token',
        ms: 'Invalid token',
      });
    }

    await Promise.all([
      resetPassword(user, password),
      PasswordReset.delete({ userId: reset.userId }),
    ]);
    // ****************************** LOG *********************************//
    INFO = 'zmieniono hasło';
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
      status: 'success',
      msgPL: `Zmieniono hasło`,
      msg: 'Password has been changed',
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      status: 'fail',
      msgPL: msgDis500,
      msg: err,
    });
  }
};
