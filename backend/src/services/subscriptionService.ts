import { randomUUID } from 'crypto';
import { persistence } from '../db';
import { logger } from '../utils/logger';

export const subscriptionService = {
  async subscribe(email: string) {
    // 1. Duplicate check
    const existing = await persistence.findSubscriptionByEmail(email);
    if (existing) {
      logger.logInfo('Subscription already exists', { email });
      return { success: true };
    }

    // 2. Save
    const id = randomUUID();
    await persistence.saveSubscription({ id, email });
    logger.logInfo('New subscription saved', { id, email });

    return { success: true };
  }
};
