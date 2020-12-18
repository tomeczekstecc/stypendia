import { Log } from '../MongoModel/Log';

export const makeLog = async () => {
  try {
    const log = await Log.create({ userId: 'dsad' });
    await log.save();
  } catch (err) {
    console.log(err);
  }
}