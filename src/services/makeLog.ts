import * as ip from 'ip';
import browser from 'browser-detect';
import { Log } from '../MongoModel/Log';
import { User } from '../entity/User';

// TODO: userLogger

export const makeLog = async (
  userId,
  object = undefined,
  objectId = undefined,
  action,
  controller,
  info,
  status
) => {

const user = await User.findOne(userId)

  try {
    const log = await Log.create({
      userId: user?.id || undefined,
      login: user?.login || undefined,
      object,
      objectId,
      ip: ip.address(),
      browser: browser().name + ' ' + browser().version,
      action,
      controller,
      result: status,
      info,
    });
    await log.save();
  } catch (err) {
    // rollbar
    console.log(err);
  }
};
