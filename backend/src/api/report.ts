import { Router } from 'express';
import { reportService } from '../services/reportService';
import { logger } from '../utils/logger';
import { standardLimiter } from '../middleware/rateLimit';

const router = Router();

router.get('/:id', standardLimiter, async (req, res) => {
  logger.logInfo('Report fetch request', { reportId: req.params.id });
  try {
    const id = req.params.id as string;

    // UUID validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      logger.logWarn('Invalid report ID format', { id });
      return res.status(400).json({ success: false, message: 'Invalid report ID format' });
    }

    const reportData = await reportService.getReportById(id);

    if (!reportData) {
      logger.logWarn('Report not found', { id });
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    logger.logInfo('Report fetched successfully', { id });
    res.json(reportData);
  } catch (error: any) {
    logger.logError('Report API Error', { message: error.message });
    res.status(500).json({ success: false, message: 'Could not retrieve report. Please try again later.' });
  }
});

export default router;
