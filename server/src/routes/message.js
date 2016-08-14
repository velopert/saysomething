import express from 'express';
import { message } from '../controllers';

const router = express.Router();

router.get('/', message.list.initial);
router.get('/recent/:id', message.list.recent);
router.post('/', message.write);

export default router;
