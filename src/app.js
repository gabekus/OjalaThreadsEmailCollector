import express from 'express';
import config from 'config';
import fs from 'fs';
import path from 'path';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { routing, logger } from './modules';

const emailFile = path.join(config.get('logDirectory'), 'emails.csv');

// Create emails.csv if it doesn't exist
if (!fs.existsSync(emailFile)) {
  fs.writeFileSync(emailFile, 'Name, Email\n', { flag: 'w' });
}

process.on('uncaughtException', (e) => {
  logger.error(e);
  process.exit(1);
});

// Express setup
const app = express();
const server = new Server(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routing);

// Run server
const port = process.env.PORT || config.get('app.port');
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
