require('dotenv').config();
import 'reflect-metadata';
// import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import session from 'express-session';
import colors from 'colors';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { createApp } from './app';
import { APP_PORT, MONGO_OPTIONS, MONGO_URI, REDIS_OPTIONS } from './config';
import mongoose from 'mongoose';

// dotenv.config();

colors.enable();
mongoose.connect(MONGO_URI, MONGO_OPTIONS);

const RedisStore = connectRedis(session);
const client = new Redis(REDIS_OPTIONS);
const store = new RedisStore({ client });

const app = createApp(store);

app.listen(APP_PORT, async () => {
  console.log(`Server startet on ${APP_PORT}`.green.bold);
  try {
    await createConnection();
    console.log(`Database connected...`.blue);
  } catch (err) {
    console.log(err.message);
  }
});
