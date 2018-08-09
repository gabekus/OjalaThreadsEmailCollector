import express from 'express';
import config from 'config';
import fs from 'fs';
import path from 'path';
import { Server } from 'http';
import { routing, logger } from './modules';

const emailFile = path.join(config.get('logDirectory'), 'emails.csv');

// Create emails.csv if it doesn't exist
if (!fs.existsSync(emailFile)) {
  fs.writeFileSync(emailFile, 'Name, Email', { flag: 'w' });
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
