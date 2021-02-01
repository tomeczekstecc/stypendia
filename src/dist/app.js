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
exports.createApp = void 0;
var express_1 = require("express");
var express_session_1 = require("express-session");
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var csurf_1 = require("csurf");
var cookie_parser_1 = require("cookie-parser");
var express_useragent_1 = require("express-useragent");
var config_1 = require("./config");
var middleware_1 = require("./middleware");
var routes_1 = require("./routes");
var rollbar_1 = require("rollbar");
var rollbar = new rollbar_1["default"]({
    accessToken: '8cfa68afd5104efb9192067f3eb1786a',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: process.env.NODE_ENV
});
dotenv_1["default"].config();
exports.createApp = function (store) {
    var app = express_1["default"]();
    app.use(rollbar.errorHandler());
    app.use(cookie_parser_1["default"]());
    app.use(express_useragent_1["default"].express());
    app.use(cors_1["default"]({
        credentials: true,
        origin: config_1.CLIENT_URI,
        optionsSuccessStatus: 200
    }));
    app.use(express_session_1["default"](__assign(__assign({}, config_1.SESSION_OPTIONS), { store: store })));
    var csrfProtection = csurf_1["default"]();
    // app.get('/api/v1/', (_, res) => res.send('Hello world'));
    app.get('/api/v1/csrf', csrfProtection, function (req, res, next) {
        res.json({ csrfToken: req.csrfToken() });
    });
    app.set('trust proxy', 1);
    // app.use(limiter);
    app.use(express_1["default"].json());
    app.use(morgan_1["default"]('dev'));
    app.use(middleware_1.active); // TODO wywala aplikację
    // app.use((req: any, _, next) => {
    //   console.log(req.session);
    //   next();
    // });
    app.use('/api/v1/users', routes_1.userRouter);
    app.use('/api/v1/user_history', routes_1.userHistoryRouter);
    app.use('/api/v1/submits', routes_1.submitRouter);
    app.use('/api/v1/submit_history', routes_1.submitHistoryRouter);
    app.use('/api/v1/email', routes_1.emailRouter);
    app.use('/api/v1/password', routes_1.resetRouter);
    app.use('/api/v1/changepass', routes_1.changePassRouter);
    app.use('/api/v1/pdf', routes_1.pdfRouter);
    app.use('/api/v1/drafts', routes_1.draftRouter);
    app.use('/api/v1/files', routes_1.filesRouter);
    app.use(middleware_1.serverError);
    app.use(middleware_1.notFound);
    return app;
};
