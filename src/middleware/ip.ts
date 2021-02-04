import { NextFunction, Request, Response } from 'express';
import requestIp from 'request-ip';

export const clientIp = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = requestIp.getClientIp(req);
  console.log(clientIp,'CLIENT IPP');
  next();
};
