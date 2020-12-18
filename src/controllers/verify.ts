import { Response } from 'express';
import { isEmpty, isEmail, IsEmpty } from 'class-validator';

import { sendMail } from '../services/mail';
import { User } from '../entity/User';
import { markAsVerified } from '../middleware/auth';
import { msgDis500 } from '../constantas';

export const verify = async (req: any, res: Response) => {
  const { id } = req.query;
  const user = await User.findOne(id);
  // console.log(user)

  if (
    !user ||
    user.verifiedAt ||
    !User.hasValidVerificationUrl(req.originalUrl, req.query)
  ) {
    return res.status(401).json({
      status: 'fail',
      msgPL: 'Niepoprawny token',
      msg: 'Invalid token',
    });
  }

  await markAsVerified(user);

  return res.status(200).json({
    status: 'success',
    msgPL: 'Potwierdzono konto',
    msg: 'Account verified',
  });
};

export const resend = async (req: any, res: Response) => {
  let errors: any = {};

  const { email } = req.body;


  if (!isEmail(email))
    errors.email = 'Pole email musi posiadać właściwy format email i nie może być puste';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const user = await User.findOne({ email });

  if (!user || !user.verifiedAt) {
    const link = user.verificationUrl();

    try {
      await sendMail({
        to: email,
        subject: 'Zweryfikuj swój adres email',
        text: link,
      });
      return res.status(200).json({
        status: 'info',
        msgPL: 'Mail wysłany - sprawdź pocztę',
        msg: 'Mail send',
      });
    } catch (err) {
      return res.status(500).json({
        status: 'fail',
        msgPL: msgDis500,
        msg: 'Server error',
      });
    }
  }
};
