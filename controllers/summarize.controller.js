import { generateSummary } from '../utils/ai.js';
import { storeSummary } from '../models/summaryHistory.js';
import { logger } from '../utils/logger.js';


function countWords(text) {
  return text.trim().split(/\s+/).length;
}

export const summarizeText = async (req, res, next) => {
  const requestId = Date.now().toString();
  logger.info(`[${requestId}] Summarization request received`);
  
  try {
    const { text, options } = req.body;
    logger.info(`[${requestId}] Input text length: ${text.length} characters`);
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), 30000); 
    });
    
    const summaryPromise = generateSummary(text, options);
    const summary = await Promise.race([summaryPromise, timeoutPromise]);
    const originalWordCount = countWords(text);
    const summaryWordCount = countWords(summary);
    
    const response = {
      original: {
        text,
        wordCount: originalWordCount
      },
      summary: {
        text: summary,
        wordCount: summaryWordCount
      },
      stats: {
        compressionRatio: (summaryWordCount / originalWordCount).toFixed(2),
        processingTime: new Date() - parseInt(requestId)
      }
    };

    if (req.user) {
      storeSummary(req.user.id, response);
      logger.info(`[${requestId}] Summary stored for user: ${req.user.id}`);
    }

    logger.info(`[${requestId}] Summarization successful. Original: ${originalWordCount} words, Summary: ${summaryWordCount} words`);
    res.status(200).json(response);
  } catch (error) {
    logger.error(`[${requestId}] Summarization error:`, error);
    next(error);
  }
};