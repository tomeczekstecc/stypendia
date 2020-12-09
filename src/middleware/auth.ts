import { Request, Response, NextFunction } from 'express';
import { SESSION_ABSOLUTE_TIMEOUT, SESSION_NAME } from '../config';
import { User } from '../entity/User';

export const isLoggedIn = (req: any) => !!req.session?.userId;

export const markAsVerified = async (user: User) => {
  user.verifiedAt = new Date();
  await user.save();
};

export const resetPassword  = async(user: User, password: string)=>{
  user.password = password,
  await user.save()
}

export const logIn = (req: any, userId: any) => {
  req.session!.userId = userId;
  req.session!.createdAt = Date.now();
};
export const logOut = (req: any, res: any): any => {
req.session.destroy();
res.clearCookie(SESSION_NAME);
return res.status(200).json({
  msg:'pomyślnie wylogowano'
})
};

export const guest = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isLoggedIn(req)) {
      //TODO: logger
      return res.status(400).json({
        status: 'fail',
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
export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    //TODO: logger
    return res.status(401).json({
      status: 'warning',
      msgPL: 'Musisz być zalogowany by wykonać tę operację',
      msg: 'You must be logged in',
    });
  }
  next();
};
