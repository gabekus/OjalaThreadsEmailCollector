import { Router } from 'express';
import { logUser } from '.';
import { emailFile } from '../app';

const router = Router();

router.post('/email', (req) => {
  const { name, email } = req.body;
  logUser(name, email);
});

router.get('/download', (req, res) => {
  res.download(emailFile);
});

export const routing = router;
