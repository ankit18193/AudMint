import { Router } from 'express';
import { z } from 'zod';
import { subscriptionService } from '../services/subscriptionService';
import { logger } from '../utils/logger';
import { strictLimiter } from '../middleware/rateLimit';

const router = Router();

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email format"),
  company_website: z.string().optional(), // Honeypot
});

router.post('/', strictLimiter, async (req, res) => {
  logger.logInfo('Subscription request received');
  try {
    // 1. Honeypot check
    if (req.body.company_website && req.body.company_website.length > 0) {
      logger.logWarn('Bot detected via honeypot in subscribe', { email: req.body.email });
      return res.json({ success: true, message: 'Success! You will be notified of new optimizations.' });
    }

    // 2. Validate
    const validatedData = SubscribeSchema.parse(req.body);
    const { email } = validatedData;

    // 3. Call service
    await subscriptionService.subscribe(email);

    logger.logInfo('Subscription successful');
    res.json({ success: true, message: 'Success! You will be notified of new optimizations.' });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      logger.logWarn('Subscription validation failed');
      return res.status(400).json({ success: false, message: error.issues[0].message });
    }
    logger.logError('Subscription API Error', { message: error.message });
    res.status(500).json({ success: false, message: 'Could not process your request. Please try again.' });
  }
});

export default router;
