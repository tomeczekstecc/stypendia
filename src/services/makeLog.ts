import * as ip from 'ip';
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
    'MakeLoGG'
  );
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  const user = await User.findOne(req.session.userId);

  try {
    const log = new Log({
      userId: req.session.userId || undefined,
      login: user?.login || undefined,
      object,
      objectId,
      ip,
      browser: req.useragent.browser + ' ' + req.useragent.version,
      action,
      controller,
      result: status,
      info,
    });
    await log.save();
  } catch (err) {
    console.log(err.message);
    saveRollbar('makeLog', err.message, 'error');
  }
};
