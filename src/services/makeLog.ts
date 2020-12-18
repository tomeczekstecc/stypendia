import * as ip from 'ip';
import browser from 'browser-detect';
import { Log } from '../MongoModel/Log';

export const makeLog = async (
  user,
  object = undefined,
  objectId = undefined,
  action,
  controller,
  info,
  status
) => {
  try {
    const log = await Log.create({
      userId: user?.id || undefined,
      login: user?.login || undefined,
      object,
      objectId,
      ip: ip.address(),
      browser: browser().name + ' '+ browser().version,
      action,
      controller,
      result: status,
      info
    });
    await log.save();
  } catch (err) {
    console.log(err);
  }
};
