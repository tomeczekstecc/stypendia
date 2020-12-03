import express from 'express';
import session, { Store } from 'express-session';

import { SESSION_OPTIONS } from './config';
import { active,notFound, serverError } from './middleware';
import userRouter from './routes/user';

export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );
  app.use(active);// TODO wywala aplikację


  app.use((req, _, next) => {
    console.log(req.session);
    next();
  });

  app.use('/api/v1/users', userRouter);
  app.use(serverError);
  app.use(notFound);

  return app;
};
