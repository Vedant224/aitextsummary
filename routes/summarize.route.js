import express from 'express';
import { summarizeText } from '../controllers/summarize.controller.js';
import { auth } from '../middleware/auth.js';
import { apiLimiter } from '../middleware/ratelimiter.js';

const router = express.Router();

router.post('/summarize', apiLimiter, summarizeText);
router.post('/summarize/authenticated', [apiLimiter, auth], summarizeText);

export default router;