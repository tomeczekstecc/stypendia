import { Response } from 'express';
import { isEmail } from 'class-validator';

import { sendMail } from '../services/mail';
import { User } from '../entity/User';
import { markAsVerified } from '../middleware/auth';
import { msgDis500 } from '../constantas';

export const verify = async (req: any, res: Response) => {
  const { id } = req.query;

  const user = await User.findOne(id);
   try {
    if (!user) {
      // makeLog
      return res.status(401).json({
        resStatus: 'error',
        msgPL: 'Nie znaleziono użytkownika',
        msg: 'No user',
        alertTitle: 'Błąd',
      });
    }


    if (!User.hasValidVerificationUrl(req.originalUrl, req.query)) {
        // makeLog
      return res.status(400).json({
        resStatus: 'warning',
        msgPL:
          'Nie możemy już potwierdzić konta - ponownie wyślij emaila weryfikującego konto',
        msg: 'Invalid token',
        alertTitle: 'Ostrzeżenie',
      });
    }

  if (user.verifiedAt) {
    // makeLog
    return res.status(400).json({
      resStatus: 'info',
      msgPL: 'Użytkownik był już potwierdzony',
      msg: 'User already confirmed',
      alertTitle: 'Informacja',
    });
  }


    await markAsVerified(user);

    // make log
    return res.status(200).json({
      resStatus: 'success',
      msgPL: 'Potwierdzono konto',
      msg: 'Account verified',
      alertTitle: 'Sukces',
    });
  } catch (err) {
    return res.status(500).json({
      resStatus: 'error',
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const resend = async (req: any, res: Response) => {
  let errors: any = {};

  const { email } = req.body;

  if (!isEmail(email))
    errors.email =
      'Pole email musi posiadać właściwy format email i nie może być puste';

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const user = await User.findOne({ email });






  if (!user ) {
    // makeLog
    return res.status(401).json({
      resStatus: 'error',
      msgPL: 'Nie udało się wysłać linka',
      msg: 'Couldnt send',
      alertTitle: 'Błąd',
    });
  }
  if (user && user.verifiedAt) {
    // makeLog
    return res.status(401).json({
      resStatus: 'info',
      msgPL: 'Użytkownik był już potwierdzony',
      msg: 'User already confirmed',
      alertTitle: 'Informacja',
    });
  }

  if (user && !user.verifiedAt) {
    const link = user.verificationUrl();

    const templ = `<button>${link}</button>`

    try {
      await sendMail({
        to: email,
        subject: 'Zweryfikuj swój adres email',
        text: templ,
      });
     user.lastSendEmailAt = new Date();
      await user.save();
      // makelog
      return res.status(200).json({
        resStatus: 'info',
        msgPL: `Na adres ${email} wysłaliśmy link do potwierdzenia konta. Link jest ważny 12 godzin`,
        msg: 'Mail send',
        alertTitle: 'Email wysłany.',
      });
    } catch (err) {
      return res.status(500).json({
        resStatus: 'fail',
        msgPL: msgDis500,
        msg: 'Server error',
      });
    }
  }
};
