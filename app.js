import * as express from 'express';
import { Server } from 'http';

const app = express();
const server = new Server(app);

server.listen(3000);
