import { body, validationResult } from 'express-validator';

export const validateSummarizeRequest = [
  body('text')
    .exists().withMessage('Text is required')
    .isString().withMessage('Text must be a string')
    .isLength({ min: 200 }).withMessage('Text must be at least 200 characters long')
    .trim(),
  
  body('options.length')
    .optional()
    .isIn(['short', 'medium', 'long']).withMessage('Length must be one of: short, medium, long'),
  
  body('options.tone')
    .optional()
    .isIn(['neutral', 'formal', 'casual']).withMessage('Tone must be one of: neutral, formal, casual'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];