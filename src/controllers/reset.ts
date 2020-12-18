import { Response } from 'express';
import { isEmpty} from 'class-validator';

import { resetPassword } from '../middleware/auth';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { sendMail } from '../services/mail';
import { msgDis500 } from '../constantas';


export const sendResetMail = async (req: any, res: Response) => {
  const { email } = req.body;
  try {
  let errors: any ={};

  if (isEmpty(email)) errors.email = 'Musisz podać poprawny email';

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
    }
    return res.status(201).json({
      status: 'success',
      msgPL: `Wysłano mail z linkiem do odzyskania hasła na adres: ${email}`,
      msg: 'Reset mail send',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msgPL: msgDis500,
      msg: err,
    });
  }
};

export const passwordReset = async ({ query, body }, res: Response) => {
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
    return res.status(201).json({
      status: 'success',
      msgPL: `Zmieniono hasło`,
      msg: 'Password has been changed',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msgPL: msgDis500,
      msg: err,
    });
  }
};
