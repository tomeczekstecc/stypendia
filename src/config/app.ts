export const {
  NODE_ENV = 'development',
  APP_PORT = 5003,
  APP_HOSTNAME = 'localhost',
  APP_PROTOCOL = 'http',
  APP_SECRET,
  CLIENT_URI = 'http://localhost:3000',
  FAILED_LOGINS_MAX = 5
} = process.env;

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;

export const IN_PROD = NODE_ENV === 'production';
