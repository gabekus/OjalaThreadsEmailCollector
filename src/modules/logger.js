import config from 'config';
import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';

// Use /logs (or whatever is set in the config) to store the logs
const logDir = path.join(config.get('logDirectory'), '/');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir); // Create log directory
}

// Custom format
const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.simple(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
);

// Custom transports
const transports = {
  errLog: new winston.transports.File({
    filename: `${logDir}error.log`, level: 'error', format,
  }),
  console: new winston.transports.Console({
    format,
  }),
};


export const logger = winston.createLogger({
  format,
  transports: [
    transports.errLog,
    transports.console,
  ],
});
