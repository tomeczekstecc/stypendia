import { SessionOptions } from 'express-session';
import { IN_PROD } from './app';

const HOUR = 1000 * 60 * 60;
const THIRTY_MINUSTES = HOUR / 2;
const SIX_HOURS = HOUR * 6;
export const SESSION_ABSOLUTE_TIMEOUT = 1000* 5
// +(process.env.SESSION_ABSOLUTE_TIMEOUT|| SIX_HOURS);
export const {
  SESSION_SECRET = 'secret qdwqd',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = THIRTY_MINUSTES,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true,
  saveUninitialized: false,
  resave: false,
};
