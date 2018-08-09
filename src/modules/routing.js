import { Router } from 'express';
import { logUser } from '.';

const router = Router();

router.post('/email', (req) => {
  const { name, email } = req.body;
  logUser(name, email);
});

export const routing = router;
