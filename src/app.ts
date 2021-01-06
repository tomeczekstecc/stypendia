import express from 'express';
import session, { Store } from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import { SESSION_OPTIONS } from './config';
import { active, notFound, serverError } from './middleware';
import userRouter from './routes/user';
import userHistoryRouter from './routes/userHistory';
import submitRouter from './routes/submit';
import draftRouter from './routes/draft';
import submitHistoryRouter from './routes/submitHistory';
import emailRouter from './routes/verify';
import resetRouter from './routes/reset';
import changePassRouter from './routes/changePass';
import submitPdfRouter from './routes/submitPdf';
import morgan from 'morgan';

dotenv.config();

export const createApp = (store: Store) => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );
  app.use(active); // TODO wywala aplikację

  // app.use((req, _, next) => {
  //   console.log(req.session);
  //   next();
  // });

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/user_history', userHistoryRouter);
  app.use('/api/v1/submits', submitRouter);
  app.use('/api/v1/submit_history', submitHistoryRouter);
  app.use('/api/v1/email', emailRouter);
  app.use('/api/v1/password', resetRouter);
  app.use('/api/v1/changepass', changePassRouter);
  app.use('/api/v1/submitpdf', submitPdfRouter);
  app.use('/api/v1/drafts', draftRouter);
  app.use(serverError);
  app.use(notFound);

  return app;
};
