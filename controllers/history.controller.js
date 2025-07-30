import { getUserHistory } from '../models/summaryHistory.js';

export const getSummaryHistory = (req, res) => {
  try {
    const userId = req.user.id;
    const history = getUserHistory(userId);
    
    res.status(200).json({
      count: history.length,
      summaries: history
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve history' });
  }
};