import express from 'express';
import { getSummaryHistory } from '../controllers/history.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.get('/history', auth, getSummaryHistory);

export default router;