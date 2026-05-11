import { Router } from 'express';
import { leadSchema } from '../validation/lead.schema';
import { leadService } from '../services/leadService';
import { logger } from '../utils/logger';
import { strictLimiter } from '../middleware/rateLimit';

const router = Router();

router.post('/', strictLimiter, async (req, res) => {
  logger.logInfo('Lead submission received');
  try {
    // Honeypot check: If the field is present and not empty, it's likely a bot
    if (req.body.company_website && req.body.company_website.length > 0) {
      logger.logWarn('Bot detected via honeypot', { email: req.body.email });
      // Return generic success to avoid tipping off the bot
      return res.json({ success: true, message: 'Success! Your report has been dispatched to your inbox.' });
    }

    const parsed = leadSchema.safeParse(req.body);

    if (!parsed.success) {
      logger.logWarn('Lead validation failed');
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    // Call service layer
    await leadService.createLead(parsed.data);

    logger.logInfo('Lead created successfully', { auditId: parsed.data.auditId });

    res.json({ success: true, message: 'Success! Your report has been dispatched to your inbox.' });
  } catch (error: any) {
    // Specific business errors from service
    if (error.message === 'Reference audit not found') {
      logger.logWarn('Audit not found for lead', { auditId: req.body.auditId });
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === 'Report already requested for this email') {
      logger.logWarn('Duplicate lead detected', { auditId: req.body.auditId });
      return res.status(400).json({ success: false, message: error.message });
    }

    logger.logError('Lead API Error', { message: error.message });
    res.status(500).json({ success: false, message: 'Could not process your request. Please try again.' });
  }
});

export default router;
