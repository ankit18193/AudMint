import { randomUUID } from 'crypto';
import { runAudit, AuditInput } from '../engine/rules';
import { generateExecutiveSummary } from './ai';
import { persistence } from '../db';
import { logger } from '../utils/logger';
import { trackEvent } from '../analytics/trackEvent';

export const auditService = {
  async runAudit(input: AuditInput) {
    logger.logInfo('Executing audit engine');
    // 1. Run deterministic rule-based engine
    const engineOutput = runAudit(input);

    // 2. Generate AI summary with mandatory fallback
    const aiSummary = await generateExecutiveSummary(input, engineOutput);

    // 3. Construct full result
    const auditResult = {
      ...engineOutput,
      aiSummary
    };

    // 4. Save to DB
    const id = randomUUID();
    const fullRecord = {
      id,
      ...input,
      ...auditResult,
      createdAt: new Date()
    };
    
    await persistence.saveAudit(fullRecord);
    logger.logInfo('Audit saved to database', { auditId: id });

    // 5. Analytics
    trackEvent('audit_completed', { 
      auditId: id, 
      totalSavings: fullRecord.totalSavingsYearly 
    });

    return fullRecord;
  }
};
