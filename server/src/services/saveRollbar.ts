import Rollbar from 'rollbar';
const rollbar = new Rollbar({
  accessToken: '8cfa68afd5104efb9192067f3eb1786a',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV,
});

export const saveRollbar = (controller, info, status) => {
  const body = {
    controller,
    info,
  };
  const string = JSON.stringify(body);
  rollbar[status](string);
};
