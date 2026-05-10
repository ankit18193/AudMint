import { Router } from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { runAudit, AuditInput } from '../engine/rules';
import { generateExecutiveSummary } from '../services/ai';
import { persistence } from '../db';

const router = Router();

// Strict Audit Validation
const AuditSchema = z.object({
  teamSize: z.number().int().min(1, "Team size must be at least 1").max(10000, "Team size is too large"),
  primaryUseCase: z.enum(['coding', 'writing', 'data', 'research', 'mixed']),
  tools: z.array(z.object({
    name: z.string().min(1, "Tool name is required"),
    plan: z.string().min(1, "Plan name is required"),
    seats: z.number().int().min(0, "Seats cannot be negative").default(1),
  })).min(1, "At least one tool must be provided"),
});

router.post('/', async (req, res) => {
  try {
    const validatedData = AuditSchema.parse(req.body);
    const input: AuditInput = validatedData as any;

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

    // Return consistent output format
    res.json(fullRecord);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        message: error.issues[0].message 
      });
    }
    console.error('Audit API Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
