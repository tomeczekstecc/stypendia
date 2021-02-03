import express from 'express';
import session, { Store } from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import userAgent from 'express-useragent';

import { CLIENT_URI, SESSION_OPTIONS } from './config';
import { active, notFound, serverError, limiter } from './middleware';
import {
  changePassRouter,
  userRouter,
  userHistoryRouter,
  submitRouter,
  draftRouter,
  submitHistoryRouter,
  emailRouter,
  resetRouter,
  pdfRouter,
  filesRouter,
} from './routes';

import Rollbar from 'rollbar';
const rollbar = new Rollbar({
  accessToken: '8cfa68afd5104efb9192067f3eb1786a',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
});

dotenv.config();
export const createApp = (store: Store) => {
  const app = express();
  app.use(cors());
  app.use(rollbar.errorHandler());

  app.use(cookieParser());
  app.use(userAgent.express());
  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );
  const csrfProtection = csrf();
  // app.get('/api/v1/', (_, res) => res.send('Hello world'));
  app.get('/api/v1/csrf', csrfProtection, (req: any, res, next) => {
    res.json({ csrfToken: req.csrfToken() });
  });
  app.set('trust proxy', true);
  // app.use(limiter);
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(active); // TODO wywala aplikację

  app.use((req: any, _, next) => {
    console.log(req.session);
    console.log(req.headers.cookie);
    next();
  });

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/user_history', userHistoryRouter);
  app.use('/api/v1/submits', submitRouter);
  app.use('/api/v1/submit_history', submitHistoryRouter);
  app.use('/api/v1/email', emailRouter);
  app.use('/api/v1/password', resetRouter);
  app.use('/api/v1/changepass', changePassRouter);
  app.use('/api/v1/pdf', pdfRouter);
  app.use('/api/v1/drafts', draftRouter);
  app.use('/api/v1/files', filesRouter);

  app.use(serverError);
  app.use(notFound);

  return app;
};
