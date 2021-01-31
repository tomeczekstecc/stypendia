"use strict";
var _a, _b, _c, _d;
exports.__esModule = true;
exports.SESSION_OPTIONS = exports.SESSION_ABSOLUTE_TIMEOUT = exports.SESSION_PATH = exports.SESSION_IDLE_TIMEOUT = exports.SESSION_NAME = exports.SESSION_SECRET2 = exports.SESSION_SECRET = void 0;
var ONE_HOUR = 1000 * 60 * 60;
var THIRTY_MINUTES = ONE_HOUR / 2;
var SIX_HOURS = ONE_HOUR * 6;
exports.SESSION_SECRET = (_a = process.env, _a.SESSION_SECRET), exports.SESSION_SECRET2 = _a.SESSION_SECRET2, exports.SESSION_NAME = (_b = _a.SESSION_NAME, _b === void 0 ? 'sid' : _b), exports.SESSION_IDLE_TIMEOUT = (_c = _a.SESSION_IDLE_TIMEOUT, _c === void 0 ? THIRTY_MINUTES : _c), exports.SESSION_PATH = (_d = _a.SESSION_PATH, _d === void 0 ? '/' : _d);
exports.SESSION_ABSOLUTE_TIMEOUT = +(process.env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS);
exports.SESSION_OPTIONS = {
    secret: exports.SESSION_SECRET,
    name: exports.SESSION_NAME,
    cookie: {
        maxAge: +exports.SESSION_IDLE_TIMEOUT,
        secure: process.env.NODE_ENV === 'production',
        sameSite: false,
        path: exports.SESSION_PATH
    },
    rolling: true,
    resave: false,
    saveUninitialized: false
};
