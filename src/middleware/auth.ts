import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { SESSION_ABSOLUTE_TIMEOUT} from '../config';
import { msgDis500 } from '../constantas';
import { User } from '../entity/User';
import { makeLog } from '../services/makeLog';

const OBJECT = 'User';
const CONTROLLER = 'auth';
let ACTION, INFO, STATUS;

export const isLoggedIn = (req: any) => !!req.session?.userId;

export const markAsVerified = async (user: User) => {
  ACTION = 'weryfikacja konta';
  INFO = 'pomyślnie zweryfikowano';
  STATUS = 'success';

  user.verifiedAt = new Date();
  await user.save();

  makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
};

export const resetPassword = async (userId: number, password: string) => {

  ACTION = 'reset';
  INFO = 'pomyślnie zresetowano';

  const user = await User.findOne(userId);

  makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);

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

  makeLog(userId, OBJECT, userId, ACTION, CONTROLLER, INFO, STATUS, req);
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
    //TODO: logger
    return res.status(500).json({
      resStatus: 'error',
      msgPL: msgDis500,
      msg: err.message,
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
      msg: 'You must be logged in',
      alertTitle: 'Brak uprawnień'
    });
  }
  next();
};
