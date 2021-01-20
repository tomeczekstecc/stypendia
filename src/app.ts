import express from 'express';
import session, { Store } from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import csrf from 'csurf'
import cookieParser from 'cookie-parser';

import { SESSION_OPTIONS } from './config';
import {
  active,
  notFound,
  serverError,
  limiter,

} from './middleware';
import userRouter from './routes/user';
import userHistoryRouter from './routes/userHistory';
import submitRouter from './routes/submit';
import draftRouter from './routes/draft';
import submitHistoryRouter from './routes/submitHistory';
import emailRouter from './routes/verify';
import resetRouter from './routes/reset';
import changePassRouter from './routes/changePass';
import pdfRouter from './routes/pdf';
import filesRouter from './routes/files';


dotenv.config();
export const createApp = (store: Store) => {
  const app = express();

  app.use(cookieParser());

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    })
  );
  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );
  const csrfProtection = csrf();
  app.get('/api/v1/csrf', csrfProtection, (req:any, res, next) => {
    res.json({ csrfToken: req.csrfToken() });

  });
  app.set('trust proxy', 1);
  // app.use(limiter);
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(active); // TODO wywala aplikację


  // app.use((req: any, _, next) => {
  //   console.log(req.session);
  //   next();
  // });

  app.use('/api/v1/users',  userRouter);
  app.use('/api/v1/user_history', userHistoryRouter);
  app.use('/api/v1/submits', submitRouter);
  app.use('/api/v1/submit_history', submitHistoryRouter);
  app.use('/api/v1/email', emailRouter);
  app.use('/api/v1/password',  resetRouter);
  app.use('/api/v1/changepass', changePassRouter);
  app.use('/api/v1/pdf', pdfRouter);
  app.use('/api/v1/drafts', draftRouter);
  app.use('/api/v1/files', filesRouter);

  app.use(serverError);
  app.use(notFound);

  return app;
};
