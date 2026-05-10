import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { persistence } from '../db';
import { sendAuditEmail } from '../services/email';

const router = Router();

// Strict Lead Validation
const LeadSchema = z.object({
  email: z.string().email("Invalid email format"),
  auditId: z.string().min(1, "Audit ID is required"),
  company: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().int().min(1).optional(),
});

router.post('/', async (req, res) => {
  try {
    const validatedData = LeadSchema.parse(req.body);
    const { email, company, role, teamSize, auditId } = validatedData;

    // 1. Check for existing audit
    const auditData = await persistence.getAudit(auditId);
    if (!auditData) {
      return res.status(404).json({ success: false, message: 'Reference audit not found' });
    }

    // 2. Prevent duplicate submissions (Same email for same audit)
    const hasLead = await persistence.findLead(email, auditId);
    if (hasLead) {
      return res.status(400).json({ success: false, message: 'Report already requested for this email' });
    }

    // 3. Store lead in DB linked to audit
    const leadId = randomUUID();
    await persistence.saveLead({ id: leadId, email, company, role, teamSize, auditId });

    // 4. Trigger Async Email Send (Non-blocking)
    const appUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const reportLink = `${appUrl}/report/${auditId}`;
    
    const topRec = auditData.recommendations?.[0]?.recommendedAction || "Optimize your AI tool spend";

    sendAuditEmail(email, {
      totalSavingsYearly: auditData.totalSavingsYearly,
      topRecommendation: topRec
    }, reportLink).catch(err => {
      console.error(`Failed to send async email to ${email}:`, err.message);
    });

    res.json({ success: true, message: 'Success! Your report has been dispatched to your inbox.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.issues[0].message });
    }
    console.error('Lead API Error:', error);
    res.status(500).json({ success: false, message: 'Could not process your request. Please try again.' });
  }
});

export default router;
