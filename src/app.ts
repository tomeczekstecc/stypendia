import express from 'express';
import session, { Store } from 'express-session';

import { SESSION_OPTIONS } from './config';
import { active, notFound, serverError } from './middleware';
import userRouter from './routes/user';
import submitRouter from './routes/submit';
import submitHistoryRouter from './routes/submitHistory';
import emailRouter from './routes/verify';
import resetRouter from './routes/reset';
import morgan from 'morgan';


export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());
app.use(morgan('dev'));
  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );
  app.use(active); // TODO wywala aplikację

  app.use((req, _, next) => {
    console.log(req.session);
    next();
  });

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/submits', submitRouter);
  app.use('/api/v1/submit_history', submitHistoryRouter);
  app.use('/api/v1/email', emailRouter);
  app.use('/api/v1/password', resetRouter);
  app.use(serverError);
  app.use(notFound);

  return app;
};
