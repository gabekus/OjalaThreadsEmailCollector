import express from 'express';
import config from 'config';
import fs from 'fs';
import exphbs from 'express-handlebars';
import path from 'path';
import { Server } from 'http';
import bodyParser from 'body-parser';
import { routing, logger } from './modules';

const logDir = config.get('logDirectory');
const emailFile = path.join(logDir, 'emails.csv');

// Create emails.csv with a blank template if it doesn't exist
if (!fs.existsSync(emailFile)) {
  fs.writeFileSync(emailFile, 'Name,Email\n', { flag: 'w' });
}

// Create backups folder if it doesn't exist
const backupFolder = path.join(logDir, 'backups');
if (!fs.existsSync(backupFolder)) {
  fs.mkdir(backupFolder);
}

// Express setup
export const app = express();
const server = new Server(app);
app.use('/static', express.static('static'));

// Post request setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express handlebars viewing
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'default' }));
app.set('view engine', '.hbs');
app.set('views', path.join('./views'));

app.use(routing);

app.use((req, res, next) => {
  next();
});

// Run server
const port = process.env.PORT || config.get('app.port');
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Error handler
process.on('uncaughtException', (e) => {
  logger.error(e.stack);
  process.exit(1);
});
