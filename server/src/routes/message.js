import express from 'express';
import { message } from '../controllers';

const router = express.Router();

router.get('/', message.list.initial);
router.get('/old/:id', message.list.old);
router.get('/recent', message.list.initRecent);
router.get('/recent/:id', message.list.recent);
router.post('/', message.write);

export default router;
