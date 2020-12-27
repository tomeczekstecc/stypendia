import { Request, Response, NextFunction } from 'express';
import { SESSION_ABSOLUTE_TIMEOUT, SESSION_NAME } from '../config';
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

export const resetPassword = async (user: User, password: string) => {
  ACTION = 'reset';
  INFO = 'pomyślnie zresetowano';
 makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
  (user.password = password), await user.save();
};

export const logIn = async (req: any, userId: any) => {

  ACTION = 'logowanie';
  INFO = 'pomyślnie zalogowano';
  STATUS = 'success';

  req.session!.userId = userId;
  req.session!.createdAt = Date.now();

  makeLog(userId, OBJECT, userId, ACTION, CONTROLLER, INFO, STATUS);
};
export const logOut = async (req: any, res: any) => {
  ACTION = 'wylogowanie';
  INFO = 'pomyślnie wylogowano';
  STATUS = 'success';

  const user = await User.findOne(req.session.userId);

  makeLog(
    req.session.userId,
    OBJECT,
    req.session.userId,
    ACTION,
    CONTROLLER,
    INFO,
    STATUS
  );

  req.session.destroy();
  res.clearCookie(SESSION_NAME);

  return res.status(200).json({
    msg: 'pomyślnie wylogowano',
  });
};

export const guest = (req: any, res: Response, next: NextFunction) => {
  try {
    if (isLoggedIn(req)) {
      //TODO: logger
      return res.json({
        status: 'error',
        msgPL: 'Jesteś już zalogowany',
        msg: 'You are already logged in',
      });
    }
  } catch (err) {
    //TODO: logger
    return res.status(500).json({
      status: 'fail',
      msgPL: 'Coś poszło nie tak',
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
      await logOut(req, res);
    }
  }
  next();
};
export const auth = async (req: any, res: Response, next: NextFunction) => {
  const user = await User.findOne({ id: req.session.userId });

  if (!isLoggedIn(req) || !user.verifiedAt) {
    //TODO: logger
    return res.status(401).json({
      status: 'warning',
      msgPL:
        'Musisz być zalogowany i konto musi być potwierdzone by wykonać tę operację',
      msg: 'You must be logged in',
    });
  }
  next();
};
