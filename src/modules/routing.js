import { Router } from 'express';
import moment from 'moment';
import csv from 'csvtojson';
import { emailFile } from '../app';
import { logger, logUser } from './index';

const router = Router({});

router.get('/', async (req, res) => {
  const emails = await csv().fromFile(emailFile);
  res.render('structure', {
    emails,
    title: 'Newsletter - Ojala Threads',
  });
});

router.post('/email', async (req, res) => {
  const { name, email } = req.body;
  const responseMsg = await logUser(name, email);
  if (responseMsg === 'Successfully registered') {
    logger.info(`${name} signed up with ${email}`);
  }

  // CORS request fails if these headers don't exist
  const headers = {};
  headers['Access-Control-Allow-Origin'] = '*';
  headers['Access-Control-Allow-Methods'] = 'POST';
  headers['Access-Control-Allow-Credentials'] = false;
  headers['Access-Control-Max-Age'] = '86400'; // 24 hours
  headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
  res.writeHead(200, headers);
  res.end(responseMsg);
});

router.get('/download', (req, res) => {
  const date = moment(new Date()).format('MMM-Do-YY');
  const name = `OjalaEmails-${date}.csv`;
  res.download(emailFile, name);
});

export const routing = router;
