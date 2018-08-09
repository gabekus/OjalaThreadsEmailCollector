import express from 'express';
import config from 'config';
import fs from 'fs';
import path from 'path';
import { Server } from 'http';
import { routing, logger } from './modules';

// Create emails.csv if it doesn't exist
const emailFile = path.join(config.get('logDirectory'), 'emails.csv');

if (!fs.existsSync(emailFile)) {
  fs.writeFile(emailFile, 'Name, Email', { flag: 'w' }, (err) => {
    if (err) throw err;
  });
}

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});

// Express setup
const app = express();
const server = new Server(app);
app.use(routing);

// Run server
server.listen(3000);
