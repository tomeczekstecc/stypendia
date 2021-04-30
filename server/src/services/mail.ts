import nodemailer, { SendMailOptions } from 'nodemailer';

import { SMTP_OPTIONS, MAIL_FROM } from '../config/mail';

const transporter = nodemailer.createTransport(SMTP_OPTIONS);

export const sendMail = (options: SendMailOptions) => {

  try {
    transporter.sendMail({
      ...options,
      from: MAIL_FROM,
    });
    console.log('Mail send');
  } catch (err) {
    console.log(err.message);
  }
};