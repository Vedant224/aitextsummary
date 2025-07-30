export class SummaryValidator {

  static validateSentenceCount(summary, lengthOption) {
    const sentenceCount = (summary.match(/\.\s|\.$|!\s|!$|\?\s|\?$/g) || []).length;
    
    const ranges = {
      'short': { min: 2, max: 3 },
      'medium': { min: 4, max: 5 },
      'long': { min: 6, max: 7 }
    };
    const range = ranges[lengthOption] || ranges.short;
    return sentenceCount >= range.min && sentenceCount <= range.max;
  }
  
  static validateQuality(summary, originalText) {
    if (!summary || summary.trim().length === 0) return false;
    if (summary.length < 30) return false;

    const firstSentence = originalText.split(/[.!?]\s/)[0];
    if (summary.includes(firstSentence) && summary.length < firstSentence.length * 1.2) return false;
    const errorPatterns = [
      /I'm sorry, I cannot/i,
      /As an AI language model/i,
      /I apologize, but I/i,
      /I don't have enough information/i
    ];
    
    for (const pattern of errorPatterns) {
      if (pattern.test(summary)) return false;
    }
    
    return true;
  }
  
  static validateTone(summary, toneOption) {
    if (toneOption === 'neutral') return true;
    if (toneOption === 'formal') {
      const casualIndicators = [
        /gonna/i, /wanna/i, /kinda/i, /sorta/i,
        /you know/i, /like,/i, /yeah/i, /cool/i,
        /awesome/i, /hey/i, /wow/i, /omg/i
      ];
      
      for (const pattern of casualIndicators) {
        if (pattern.test(summary)) return false;
      }
    }
    
    if (toneOption === 'casual') {
      const formalIndicators = [
        /furthermore/i, /moreover/i, /thus/i, /therefore/i,
        /consequently/i, /subsequently/i, /hence/i,
        /in accordance with/i, /in regards to/i
      ];
      
      let formalCount = 0;
      for (const pattern of formalIndicators) {
        if (pattern.test(summary)) formalCount++;
      }
      if (formalCount > 1) return false;
    }
    
    return true;
  }
  

  static validateSummary(summary, originalText, options = {}) {
    const { length = 'short', tone = 'neutral' } = options;
    const sentenceCountValid = this.validateSentenceCount(summary, length);
    const qualityValid = this.validateQuality(summary, originalText);
    const toneValid = this.validateTone(summary, tone);
    
    return {
      valid: sentenceCountValid && qualityValid && toneValid,
      details: {
        sentenceCount: sentenceCountValid,
        quality: qualityValid,
        tone: toneValid
      }
    };
  }
}