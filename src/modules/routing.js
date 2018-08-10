import { Router } from 'express';
import moment from 'moment';
import { logUser } from '.';
import { emailFile } from '../app';

const router = Router();

router.post('/email', (req) => {
  const { name, email } = req.body;
  logUser(name, email);
});

router.get('/download', (req, res) => {
  const date = moment(new Date()).format('MMM-Do-YY');
  const name = `${emailFile}-${date}.csv`;
  res.download(emailFile, name);
});

export const routing = router;
