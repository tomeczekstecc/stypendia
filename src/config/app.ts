const ONE_MB = 1048576


export const {
  NODE_ENV = 'development',
  APP_PORT = 5003,
  APP_HOSTNAME = 'localhost',
  APP_PROTOCOL = process.env.NODE_ENV === 'development' ?'http': 'http',
  APP_SECRET,
  CLIENT_URI= 'http://localhost:3000',
  FAILED_LOGINS_MAX = 5,
  FILE_MAX_SIZE = ONE_MB * 2
} = process.env;

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`;

export const IN_PROD = NODE_ENV === 'production';
