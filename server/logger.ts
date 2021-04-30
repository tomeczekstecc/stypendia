import { createLogger, transports, format, config } from 'winston';
import fs from 'fs';
import path from 'path';


const { combine, timestamp, json } = format;
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const userLogger = createLogger({
  levels: config.syslog.levels,
  defaultMeta: { component: 'user-service' },
  handleExceptions: true,
  format: combine(
    format.label({ label: path.basename(module.parent.filename) }),
    format.colorize(),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    json()
  ),
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: 'logs/exceptions.log' }),
  ],
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

