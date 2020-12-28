const { networkInterfaces } = require('os');
import * as ip from 'ip';
import browser from 'browser-detect';
import { Log } from '../MongoModel/Log';
import { User } from '../entity/User';
const RequestIp = require('@supercharge/request-ip');
// TODO: userLogger
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object



for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
      console.log(results)
    }
  }
}


export const makeLog = async (
  userId,
  object = undefined,
  objectId = undefined,
  action,
  controller,
  info,
  status,
  req = null
) => {

const user = await User.findOne(userId)
const ip2 = RequestIp.getClientIp(req);
console.log(ip2)
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
