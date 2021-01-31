"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
exports.__esModule = true;
exports.IN_PROD = exports.APP_ORIGIN = exports.FILE_MAX_SIZE = exports.FAILED_LOGINS_MAX = exports.CLIENT_URI = exports.APP_SECRET = exports.APP_PROTOCOL = exports.APP_HOSTNAME = exports.APP_PORT = exports.NODE_ENV = void 0;
var ONE_MB = 1048576;
exports.NODE_ENV = (_a = process.env, _b = _a.NODE_ENV, _b === void 0 ? 'development' : _b), exports.APP_PORT = (_c = _a.APP_PORT, _c === void 0 ? 5003 : _c), exports.APP_HOSTNAME = (_d = _a.APP_HOSTNAME, _d === void 0 ? 'localhost' : _d), exports.APP_PROTOCOL = (_e = _a.APP_PROTOCOL, _e === void 0 ? process.env.NODE_ENV === 'development' ? 'http' : 'https' : _e), exports.APP_SECRET = _a.APP_SECRET, exports.CLIENT_URI = (_f = _a.CLIENT_URI, _f === void 0 ? process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://slaskietalenty.com' : _f), exports.FAILED_LOGINS_MAX = (_g = _a.FAILED_LOGINS_MAX, _g === void 0 ? 5 : _g), exports.FILE_MAX_SIZE = (_h = _a.FILE_MAX_SIZE, _h === void 0 ? ONE_MB * 2 : _h);
exports.APP_ORIGIN = exports.APP_PROTOCOL + "://" + exports.APP_HOSTNAME + ":" + exports.APP_PORT;
exports.IN_PROD = exports.NODE_ENV === 'production';
