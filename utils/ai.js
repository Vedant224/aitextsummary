import {
  GoogleGenerativeAI
} from '@google/generative-ai';
import {
  SummaryValidator
} from './summaryValidator.js';
import {
  logger
} from './logger.js';

import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateSummary(text, options = {}) {
  const {
    length = 'short', tone = 'neutral'
  } = options;

  const sentenceCount = length === 'short' ? '2-3' :
    length === 'medium' ? '4-5' : '6-7';

  const toneInstruction = tone === 'neutral' ? '' :
    tone === 'formal' ? 'Use formal language without colloquialisms. ' :
    tone === 'casual' ? 'Use casual, conversational language. ' :
    '';

  const prompt = `Summarize the following text in exactly ${sentenceCount} sentences. 
  ${toneInstruction}Make it concise and capture the key points. 
  Ensure each sentence is complete and properly punctuated.
  
  ${text}`;

  const MAX_RETRIES = 3;
  let attempts = 0;
  let summary = '';
  let validationResult = {
    valid: false
  };

  const timeout = (ms) => new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  );

  while (attempts < MAX_RETRIES && !validationResult.valid) {
    attempts++;

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-8b"
      });

      const result = await Promise.race([
        model.generateContent(prompt),
        timeout(10000)
      ]);

      const response = await result.response;
      summary = response.text().trim();
      validationResult = SummaryValidator.validateSummary(summary, text, options);
      if (!validationResult.valid) {
        logger.warn(`Summary validation failed on attempt ${attempts}:`, validationResult.details);
        if (!validationResult.details.sentenceCount) {
          prompt += `\n\nIMPORTANT: Your previous response did not have exactly ${sentenceCount} sentences. Please count carefully.`;
        }
        if (!validationResult.details.tone) {
          prompt += `\n\nIMPORTANT: Your previous response did not match the ${tone} tone requested. Please adjust the language.`;
        }
      }
    } catch (error) {
      logger.error(`Error generating summary (attempt ${attempts}):`, error);
      if (attempts >= MAX_RETRIES) {
        throw new Error('Failed to generate a valid summary after multiple attempts');
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts - 1)));
    }
  }

  if (!validationResult.valid && summary) {
    logger.warn('Using best available summary despite validation failure');
    return summary;
  } else if (!summary) {
    throw new Error('Failed to generate any valid summary');
  }

  return summary;
}