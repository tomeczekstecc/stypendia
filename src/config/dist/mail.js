"use strict";
exports.__esModule = true;
exports.MAIL_FROM = exports.SMTP_OPTIONS = void 0;
var _a = process.env, SMTP_USERNAME = _a.SMTP_USERNAME, SMTP_PASSWORD = _a.SMTP_PASSWORD, SMTP_HOST = _a.SMTP_HOST, SMTP_PORT = _a.SMTP_PORT;
exports.SMTP_OPTIONS = {
    host: SMTP_HOST,
    port: 143,
    secure: false,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
};
// export const MAIL_FROM = `noreply@${APP_HOSTNAME}`;
exports.MAIL_FROM = "admin@slaskietalenty.com";
// export const MAIL_FROM = `noreply@${APP_HOSTNAME}`;
