
import * as ip from 'ip';
import browser from 'browser-detect';
import { Log } from '../MongoModel/Log';
import { User } from '../entity';
import { saveRollbar } from './saveRollbar';

export const makeLog = async (
  userId = undefined,
  object = undefined,
  objectId = undefined,
  action,
  controller,
  info,
  status,
  req = null
) => {

  console.log(userId, object, objectId, action, controller, info, status, 'MakeLoGG')

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
    console.log(err.message)
    saveRollbar('makeLog',err.message, 'error')

  }
};
