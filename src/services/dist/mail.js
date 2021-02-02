"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.sendMail = void 0;
var nodemailer_1 = require("nodemailer");
var mail_1 = require("../config/mail");
var transporter = nodemailer_1["default"].createTransport(mail_1.SMTP_OPTIONS);
exports.sendMail = function (options) {
    try {
        transporter.sendMail(__assign(__assign({}, options), { from: mail_1.MAIL_FROM }));
        console.log('Mail send');
    }
    catch (err) {
        console.log(err.message);
    }
};
+;
