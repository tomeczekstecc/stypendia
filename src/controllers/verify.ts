import { Response } from 'express';
import { isEmail } from 'class-validator';

import { sendMail } from '../services/mail';
import { User } from '../entity';
import { markAsVerified } from '../middleware/auth';
import { makeLog } from '../services/makeLog';
import { saveRollbar } from '../services/saveRollbar';
import { msg } from '../parts/messages';
import { prepareTempleVerify } from '../templates/mail';

const OBJECT = 'User';
let ACTION, INFO, STATUS, CONTROLLER;

export const verify = async (req: any, res: Response) => {
  CONTROLLER = 'verify';
  ACTION = 'weryfikowanie konta (maila)';

  console.log(req.body);

  req.clientIp = req.body.clientIp;

  const { id } = req.query;

  const user = await User.findOne(id);
  try {
    if (!user) {
      STATUS = 'error';
      INFO = msg.client.fail.noUser;

      makeLog(
        OBJECT,
        req.session.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS,
        req
      );
      return res.status(401).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd!',
      });
    }

    if (!User.hasValidVerificationUrl(req.originalUrl, req.query)) {
      STATUS = 'warning';
      INFO = msg.client.fail.confirmToolate;
      makeLog(
        OBJECT,
        req.session.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS,
        req
      );

      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Ostrzeżenie!',
      });
    }

    if (user.verifiedAt) {
      STATUS = 'warning';
      INFO = msg.client.fail.alreadyConfirmed;
      makeLog(
        OBJECT,
        req.session.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS,
        req
      );

      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Ostrzeżenie!',
      });
    }

    await markAsVerified(user, req);
    STATUS = 'success';
    INFO = msg.client.ok.confirmed;
    makeLog(OBJECT, req.session.userId, ACTION, CONTROLLER, INFO, STATUS, req);

    return res.status(200).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Sukces!',
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

export const resend = async (req: any, res: Response) => {
  CONTROLLER = 'resend';
  ACTION = 'ponowne wysyłanie linka do potwierdzenia konta (maila)';

  req.clientIp = req.body.clientIp;

  let errors: any = {};

  const { email } = req.body;

  if (!isEmail(email)) errors.email = msg.client.fail.emailErr;

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const user = await User.findOne({ email });

  if (!user) {
    STATUS = 'error';
    INFO = msg.client.fail.linkNoSend;
    makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);

    return res.status(401).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Błąd',
    });
  }
  if (user?.verifiedAt) {
    STATUS = 'info';
    INFO = msg.client.fail.alreadyConfirmed;
    makeLog(OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS, req);

    return res.status(401).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Informacja',
    });
  }

  if (!user?.verifiedAt) {
    const link = user.verificationUrl();

    const templ = await prepareTempleVerify(link);

    try {
      await sendMail({
        to: email,
        subject: msg.subjects.verify,
        html: templ,
      });
      user.lastSendEmailAt = new Date();
      await user.save();
      STATUS = 'success';
      INFO = `Na adres ${email} wysłaliśmy link do potwierdzenia konta. Link jest ważny 12 godzin`;

      return res.status(200).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Wysłaliśmy email!',
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
  }
};
