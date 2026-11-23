import { Router } from 'express';
import { createTrade, listTrades } from '../controllers/tradesController';
import { requireAuth } from '../middleware/auth';

const router = Router();
router.use(requireAuth);
router.post('/', createTrade);
router.get('/', listTrades);
export default router;
