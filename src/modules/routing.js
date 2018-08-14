import config from 'config';
import { Router } from 'express';
import moment from 'moment';
import csv from 'csvtojson';
import path from 'path';
import { logger, logUser } from './index';

const emailFile = path.join(config.get('logDirectory'), 'emails.csv');
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
  res.end(responseMsg);
});

router.get('/download', (req, res) => {
  const date = moment(new Date()).format('MMM-Do-YY');
  const name = `OjalaEmails-${date}.csv`;
  res.download(emailFile, name);
});

export const routing = router;
