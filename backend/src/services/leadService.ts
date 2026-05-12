import { randomUUID } from 'crypto';
import { persistence } from '../db';
import { sendAuditEmail } from './email';
import { logger } from '../utils/logger';
import { config } from '../config/env';
import { trackEvent } from '../analytics/trackEvent';

export interface LeadData {
  email: string;
  auditId: string;
  company?: string;
  role?: string;
  teamSize?: number;
}

export const leadService = {
  async createLead(data: LeadData) {
    const { email, auditId, company, role, teamSize } = data;

    // 1. Check for existing audit
    logger.logInfo('Checking for audit existence', { auditId });
    const auditData = await persistence.getAudit(auditId);
    if (!auditData) {
      logger.logWarn('Reference audit not found in DB', { auditId });
      throw new Error('Reference audit not found');
    }

    // 2. Prevent duplicate submissions
    const hasLead = await persistence.findLead(email, auditId);
    if (hasLead) {
      logger.logWarn('Duplicate lead submission attempt', { auditId, email });
      throw new Error('Report already requested for this email');
    }

    // 3. Store lead in DB
    const leadId = randomUUID();
    await persistence.saveLead({ id: leadId, email, company, role, teamSize, auditId });
    logger.logInfo('Lead successfully stored in database', { leadId, auditId });

    // Analytics
    trackEvent('lead_submitted', { auditId });

    // 4. Trigger Email (Non-blocking)
    const appUrl = config.frontendUrl;
    const reportLink = `${appUrl}/report/${auditId}`;

    const topRec = auditData.recommendations?.[0]?.recommendedAction || "Optimize your AI tool spend";

    logger.logInfo('Triggering email dispatch', { email, reportLink });

    await sendAuditEmail(email, {
      totalSavingsYearly: auditData.totalSavingsYearly,
      topRecommendation: topRec
    }, reportLink);

    logger.logInfo('Email dispatch completed', { email });

    return { success: true };

  }
};
