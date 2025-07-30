import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: {
    status: 429,
    message: 'Too many requests, please try again after 15 minutes'
  },
  standardHeaders: true, 
  legacyHeaders: false,
});