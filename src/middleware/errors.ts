import { RequestHandler, Request, Response, NextFunction } from 'express';

export const catchAsync = (handler: any) => (
  ...args: [Request, Response, NextFunction]
) => handler(...args).catch(args[2]);

export const serverError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.status) {
    console.error(err.stack);
  }
 return res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
    next()
};

export const notFound = (req: Request, res: Response, next: NextFunction) =>
  res.status(404).json({ message: 'Not found' });
