import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { persistence } from '../db';

const router = Router();

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email format"),
  company_website: z.string().optional(), // Honeypot
});

router.post('/', async (req, res) => {
  try {
    // 1. Honeypot check
    if (req.body.company_website && req.body.company_website.length > 0) {
      console.warn('Bot detected via honeypot in subscribe:', req.body.email);
      return res.json({ success: true, message: 'Success! You will be notified of new optimizations.' });
    }

    // 2. Validate
    const validatedData = SubscribeSchema.parse(req.body);
    const { email } = validatedData;

    // 3. Duplicate check
    const existing = await persistence.findSubscriptionByEmail(email);
    if (existing) {
      return res.json({ success: true, message: 'Success! You will be notified of new optimizations.' });
    }

    // 4. Save
    const id = randomUUID();
    await persistence.saveSubscription({ id, email });

    res.json({ success: true, message: 'Success! You will be notified of new optimizations.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.issues[0].message });
    }
    console.error('Subscription API Error:', error);
    res.status(500).json({ success: false, message: 'Could not process your request. Please try again.' });
  }
});

export default router;
