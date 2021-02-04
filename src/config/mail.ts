import { Options } from 'nodemailer/lib/smtp-connection';

const { SMTP_USERNAME, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env;

export const SMTP_OPTIONS: Options = {
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: false,
    auth: {
    user: SMTP_USERNAME,
    pass: SMTP_PASSWORD,
  },
};

// export const MAIL_FROM = `noreply@${APP_HOSTNAME}`;
export const MAIL_FROM = `admin@slaskietalenty.com`;
// export const MAIL_FROM = `noreply@${APP_HOSTNAME}`;
