import { z } from 'zod';

export const leadSchema = z.object({
  email: z.string().email("Invalid email format"),
  auditId: z.string().min(1, "Audit ID is required"),
  company: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().int().min(1).optional(),
});
