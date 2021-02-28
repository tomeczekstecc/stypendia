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
  const user = (await User.findOne(req?.session?.userId)) || undefined;

  try {
    const log = new Log({
      userId: req?.session?.userId || objectId || undefined,
      login: user?.login || undefined,
      object,
      objectId,
      ip: req.clientIp ?? 'IP jak logowanie',
      browser: req.useragent.browser + ' ' + req.useragent.version,
      action,
      controller,
      result: status,
      info,
    });
    console.log(log);
    await log.save();
  } catch (err) {
    console.log(err.message);
    saveRollbar('makeLog', err.message, 'error');
  }
};
