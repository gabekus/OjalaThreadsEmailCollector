import { Router } from 'express';
import moment from 'moment';
import csv from 'csvtojson';
import { logUser } from '.';
import { emailFile } from '../app';

const router = Router();

router.get('/', async (req, res) => {
  const emails = await csv().fromFile(emailFile);
  res.render('structure', {
    emails,
    title: 'Newsletter - Ojala Threads',
  });
});

router.post('/email', (req) => {
  const { name, email } = req.body;
  logUser(name, email);
});

router.get('/download', (req, res) => {
  const date = moment(new Date()).format('MMM-Do-YY');
  const name = `OjalaEmails-${date}.csv`;
  res.download(emailFile, name);
});

export const routing = router;
