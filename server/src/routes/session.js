import express from 'express';
import { session } from '../controllers';

const router = express.Router();

router.get('/', session);

export default router;
