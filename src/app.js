import express from 'express';
import config from 'config';
import fs from 'fs';
import path from 'path';
import { Server } from 'http';
import { routing, logger } from './modules';

// Create email csv file if it doesn't exist
const logDir = path.join(config.get('logDirectory'), 'emails.csv');
fs.writeFile(logDir, '', { flag: 'a' }, (err) => {
  if (err) throw err;
});

logger.log('error', 'bigTest');

// Express setup
const app = express();
const server = new Server(app);
app.use(routing);

// Run server
server.listen(3000);
