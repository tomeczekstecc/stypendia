import { Response, NextFunction, Request } from 'express';
import bcrypt from 'bcryptjs';

import { SESSION_ABSOLUTE_TIMEOUT } from '../config';
import { User } from '../entity';
import { makeLog } from '../services/makeLog';
import { msg } from '../parts/messages';
import { saveRollbar } from '../services/saveRollbar';

const OBJECT = 'User';
const CONTROLLER = 'auth';
let ACTION, INFO, STATUS;

export const isLoggedIn = (req: any) => !!req.session?.userId;

export const markAsVerified = async (user: User, req: Request) => {
  ACTION = 'weryfikacja konta';
  INFO = 'pomyślnie zweryfikowano';
  STATUS = 'success';

  user.verifiedAt = new Date();
  await user.save();

  makeLog(OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS, req);
};

export const resetPassword = async (userId: number, password: string, req: Request) => {
  ACTION = 'reset';
  INFO = 'pomyślnie zresetowano';

  const user = await User.findOne(userId);

  makeLog(OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS, req);

  user.password = await bcrypt.hash(password, 12);
  user.blockedAt = null;
  user.isBlocked = 0;
  user.failedLogins = 0;
  user.lastPassChangeAt = await new Date();

  await user.save();
};

export const logIn = async (req: any, userId: any) => {
  ACTION = 'logowanie';
  INFO = 'pomyślnie zalogowano';
  STATUS = 'success';

  req.session!.userId = userId;
  req.session!.createdAt = Date.now();

  const user = await User.findOne(req.session.userId);

  user.failedLogins = 0;

  await user.save();

  makeLog(OBJECT, userId, ACTION, CONTROLLER, INFO, STATUS, req);
};

export const guest = (req: any, res: Response, next: NextFunction) => {
  try {
    if (isLoggedIn(req)) {
      //TODO: logger
      return res.json({
        resStatus: 'error',
        msgPL: 'Jesteś już zalogowany',
        msg: 'You are already logged in',
      });
    }
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

  next();
};

export const active = async (req: any, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;

    if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
      // Axios to logout
      // await logOut(req, res);
    }
  }
  next();
};
export const auth = async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findOne({ id: req.session.userId });

  if (!isLoggedIn(req) || !user.verifiedAt) {
    //TODO: logger
    return res.status(401).json({
      resStatus: 'warning',
      msgPL:
        'Musisz być zalogowany i konto musi być potwierdzone by wykonać tę operację',
      alertTitle: 'Brak uprawnień',
    });
  }
  next();
};
