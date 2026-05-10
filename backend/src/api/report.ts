import { Router } from 'express';
import { persistence } from '../db';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // UUID validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ success: false, message: 'Invalid report ID format' });
    }

    const report = await persistence.getAudit(id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

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

    res.json(reportData);
  } catch (error) {
    console.error('Report API Error:', error);
    res.status(500).json({ success: false, message: 'Could not retrieve report. Please try again later.' });
  }
});

export default router;
