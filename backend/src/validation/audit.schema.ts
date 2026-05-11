import { z } from 'zod';

export const auditSchema = z.object({
  teamSize: z.number().int().min(1, "Team size must be at least 1"),
  primaryUseCase: z.enum(['coding', 'writing', 'data', 'research', 'mixed']),
  tools: z.array(z.object({
    name: z.string().min(1, "Tool name is required"),
    plan: z.string().min(1, "Plan name is required"),
    monthlySpend: z.number().min(0, "Monthly spend cannot be negative").optional(),
    seats: z.number().int().min(1, "Seats must be at least 1"),
  })).min(1, "At least one tool must be provided"),
});
