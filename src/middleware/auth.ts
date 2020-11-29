import { Request, Response, NextFunction } from 'express';
import { SESSION_ABSOLUTE_TIMEOUT, SESSION_NAME } from '../config';

export const isLoggedIn = (req: any) => !!req.session.userId;

export const logIn = (req: any, userId: string) => {
  req.session!.userId = userId;
  req.session!.createdAt = Date.now();
};
export const logOut = (req: any, res: Response) => {
  new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err);
      res.clearCookie(SESSION_NAME);
      resolve();
    });
  });
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
    try {
      if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
        await logOut(req, res);
        //TODO: logger
        return res.status(400).json({
          status: 'warning',
          msgPL: 'Wylogowano z powodu bezczynności',
          msg: "Due to not aktive, You've been logged out",
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
  }
  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    //TODO: logger
    return res.status(400).json({
      status: 'warning',
      msgPL: 'Musisz być zalogowany by wykonać tę operację',
      msg: "You must be logged in",
    });
  }
  next();
};
