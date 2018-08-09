import { Router } from 'express';
import logUser from './logUser';

const router = Router();

router.post('/email', (req) => {
  const { name, email } = req.params;
  logUser(name, email);
});

export const routing = router;
