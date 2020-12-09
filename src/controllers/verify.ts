import { Response } from 'express';

import { sendMail } from '../mail';
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
  const { email } = req.body;

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
