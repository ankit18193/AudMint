import { logger } from '../utils/logger';

/**
 * Lightweight event tracking system for product analytics.
 * Logs events to the console/logger for later extraction and metric calculation.
 */
export function trackEvent(eventName: string, metadata: any = {}) {
  try {
    const timestamp = new Date().toISOString();
    const eventPayload = {
      eventName,
      timestamp,
      ...metadata
    };

    // Use [EVENT] tag for easy log extraction/filtering
    logger.logInfo(`[EVENT] ${eventName}`, eventPayload);
  } catch (error) {
    // Analytics failures should never crash the main application
    console.error('Failed to track event:', error);
  }
}
