import { persistence } from '../db';
import { logger } from '../utils/logger';
import { reportCache } from '../cache/reportCache';
import { trackEvent } from '../analytics/trackEvent';

export const reportService = {
  async getReportById(id: string) {
    // 1. Check cache
    const cached = reportCache.get(id);
    if (cached) {
      logger.logInfo('Report cache hit', { id });
      // Analytics
      trackEvent('report_viewed', { reportId: id });
      return cached;
    }

    logger.logInfo('Report cache miss', { id });

    // 2. Fetch from DB
    const report = await persistence.getAudit(id);

    if (!report) {
      logger.logWarn('Report not found in database', { id });
      return null;
    }

    logger.logInfo('Report retrieved from database', { id });

    // Analytics
    trackEvent('report_viewed', { reportId: id });

    // Sanitize output (No PII)
    const reportData = {
      id: report.id,
      tools: report.tools,
      totalSavingsMonthly: report.totalSavingsMonthly,
      totalSavingsYearly: report.totalSavingsYearly,
      recommendations: report.recommendations,
      aiSummary: report.aiSummary,
      globalInsight: report.globalInsight,
      createdAt: report.createdAt
    };

    // 3. Store in cache
    reportCache.set(id, reportData);

    return reportData;
  }
};
