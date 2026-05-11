import { Router } from 'express';
import { auditSchema } from '../validation/audit.schema';
import { auditService } from '../services/auditService';
import { logger } from '../utils/logger';
import { strictLimiter } from '../middleware/rateLimit';

const router = Router();

router.post('/', strictLimiter, async (req, res) => {
  logger.logInfo('Audit request received');
  try {
    const parsed = auditSchema.safeParse(req.body);

    if (!parsed.success) {
      logger.logWarn('Audit validation failed');
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    // Use only parsed data
    const validatedData = parsed.data;
    
    // Call service layer
    const fullRecord = await auditService.runAudit(validatedData as any);

    logger.logInfo('Audit completed successfully', { auditId: fullRecord.id });

    // Return consistent output format
    res.json(fullRecord);
  } catch (error: any) {
    logger.logError('Audit API Error', { message: error.message });
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
