import ipReq from 'request-ip';
// import browser from 'browser-detect';
import { Log } from '../MongoModel/Log';
import { User } from '../entity';
import { saveRollbar } from './saveRollbar';

export const makeLog = async (
  object = undefined,
  objectId = undefined,
  action,
  controller,
  info,
  status,
  req
) => {
  console.log(
    req.session.userId,
    object,
    objectId,
    action,
    controller,
    info,
    status,
    'MakeLoG'
  );
  // const ip = req.headers['x-forwarded-for'];
  const ip2 = ipReq.getClientIp(req);
  // const ip3 = req.connection.remoteAddress;
  // const ip4 = req.socket.remoteAddress;
  // const ip5 = req.connection.socket.remoteAddress;

  const user = (await User.findOne(req?.session?.userId)) || undefined;

  try {
    const log = new Log({
      userId: req?.session?.userId || undefined,
      login: user?.login || undefined,
      object,
      objectId,
      ip:ip2,
      browser: req.useragent.browser + ' ' + req.useragent.version,
      action,
      controller,
      result: status,
      info,
    });
    console.log(
      req.headers['x-forwarded-for'],
      ipReq.getClientIp(req),
      req.connection?.remoteAddress,
      req.socket?.remoteAddress,
      req.connection?.socket?.remoteAddress,
      'ipis'
    );
    console.log(log)
    await log.save();
  } catch (err) {
    console.log(err.message);
    saveRollbar('makeLog', err.message, 'error');
  }
};
