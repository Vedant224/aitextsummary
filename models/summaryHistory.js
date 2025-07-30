import { logger } from '../utils/logger.js';

const summaryHistory = new Map();
const MAX_USERS = 100;
const MAX_ENTRIES_PER_USER = 20;
let totalEntries = 0;


export function storeSummary(userId, summary) {
  try {
    if (!summaryHistory.has(userId) && summaryHistory.size >= MAX_USERS) {
      const oldestUser = [...summaryHistory.keys()][0];
      const removedEntries = summaryHistory.get(oldestUser).length;
      summaryHistory.delete(oldestUser);
      totalEntries -= removedEntries;
      logger.info(`Memory limit reached: Removed oldest user ${oldestUser} with ${removedEntries} entries`);
    }
    
    if (!summaryHistory.has(userId)) {
      summaryHistory.set(userId, []);
    }
    
    const userHistory = summaryHistory.get(userId);
    userHistory.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...summary
    });
    totalEntries++;
    if (userHistory.length > MAX_ENTRIES_PER_USER) {
      userHistory.pop();
      totalEntries--;
    }
    if (totalEntries % 10 === 0) {
      const memoryUsage = process.memoryUsage();
      logger.info(`Memory usage: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB, Entries: ${totalEntries}`);
    }
    return true;
  } catch (error) {
    logger.error('Error storing summary:', error);
    return false;
  }
}

export function getUserHistory(userId, limit = MAX_ENTRIES_PER_USER) {
  try {
    const history = summaryHistory.get(userId) || [];
    return history.slice(0, limit);
  } catch (error) {
    logger.error('Error retrieving user history:', error);
    return [];
  }
}

export function getStats() {
  return {
    users: summaryHistory.size,
    totalEntries,
    memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
  };
}