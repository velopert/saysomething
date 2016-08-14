import express from 'express';
import message from './message';
import session from './session';

const router = express.Router();

router.use('/message', message);
router.use('/session', session);

export default router;
