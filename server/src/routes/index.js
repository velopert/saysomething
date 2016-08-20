import express from 'express';
import message from './message';
import session from './session';

const router = express.Router();

router.use('/*', (req, res, next) => {
    res.set("Connection", "keep-alive");
    next();
});
router.use('/message', message);
router.use('/session', session);

export default router;
