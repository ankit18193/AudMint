import { PRICING_DATA, ToolName, PlanName } from './pricing';

export interface UserInputTool {
  name: ToolName;
  plan: PlanName;
  seats: number;
}

export interface AuditInput {
  teamSize: number;
  primaryUseCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed';
  tools: UserInputTool[];
}

export interface Recommendation {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  recommendedAction: string;
  savingsMonthly: number;
  savingsAnnual: number;
  reason: string;
  type: 'seat_optimization' | 'tier_downgrade' | 'duplicate_tool';
}

export interface GlobalInsight {
  title: string;
  description: string;
  savingsYearly: number;
}

export interface AuditResult {
  totalSavingsMonthly: number;
  totalSavingsYearly: number;
  recommendations: Recommendation[];
  globalInsight?: GlobalInsight;
  aiSummary: string;
}

export function runAudit(input: AuditInput): Omit<AuditResult, 'aiSummary'> {
  const recommendations: Recommendation[] = [];
  let totalSavingsMonthly = 0;

  const toolCategories = new Map<string, UserInputTool[]>();

  // Process each tool for Seat and Plan optimization
  for (const userTool of input.tools) {
    const pricing = PRICING_DATA.find(p => p.name === userTool.name && p.plan === userTool.plan);
    if (!pricing) continue;

    let currentToolSeats = userTool.seats;

    // 1. Seat Optimization: Detect over-provisioned seats
    if (currentToolSeats > input.teamSize) {
      const overProvisionedSeats = currentToolSeats - input.teamSize;
      const savings = overProvisionedSeats * pricing.costPerSeat;

      if (savings > 0) {
        recommendations.push({
          tool: userTool.name,
          currentPlan: `${userTool.plan} (${currentToolSeats} seats)`,
          recommendedPlan: `${userTool.plan} (${input.teamSize} seats)`,
          recommendedAction: `Reduce ${userTool.name} seats from ${currentToolSeats} to ${input.teamSize}`,
          savingsMonthly: savings,
          savingsAnnual: savings * 12,
          reason: `Your reported team size is ${input.teamSize}, but you are paying for ${currentToolSeats} seats.`,
          type: 'seat_optimization',
        });
        totalSavingsMonthly += savings;
      }
      currentToolSeats = input.teamSize;
    }

    // 2. Plan Downgrade: Detect enterprise/business plans where basic/pro suffices
    if (pricing.costPerSeat > 0) {
      let targetPlan: string | null = null;
      let downgradeReason = "";

      // Logic: If use case doesn't match the tool's primary strength, suggest free/lower tier
      if (pricing.category === 'writing' && input.primaryUseCase === 'coding') {
        targetPlan = "Free";
        downgradeReason = `As a coding-focused team, the free tier of ${userTool.name} is sufficient for occasional documentation.`;
      } else if (pricing.isTeamPlan && input.teamSize <= 2) {
        // Suggest individual/pro plan if team is very small
        const proPlan = PRICING_DATA.find(p => p.name === userTool.name && !p.isTeamPlan && p.costPerSeat > 0);
        if (proPlan && proPlan.costPerSeat < pricing.costPerSeat) {
          targetPlan = proPlan.plan;
          downgradeReason = `Team-tier features are rarely utilized for small teams of ${input.teamSize}. Pro tier offers better ROI.`;
        }
      }

      if (targetPlan && targetPlan !== userTool.plan) {
        const targetPricing = PRICING_DATA.find(p => p.name === userTool.name && p.plan === targetPlan);
        const targetCost = targetPricing ? targetPricing.costPerSeat : 0;
        const savings = (pricing.costPerSeat - targetCost) * currentToolSeats;

        if (savings > 0) {
          recommendations.push({
            tool: userTool.name,
            currentPlan: userTool.plan,
            recommendedPlan: targetPlan,
            recommendedAction: `Downgrade to ${targetPlan} plan`,
            savingsMonthly: savings,
            savingsAnnual: savings * 12,
            reason: downgradeReason,
            type: 'tier_downgrade'
          });
          totalSavingsMonthly += savings;
        }
      }
    }

    // Group for duplicate detection
    if (!toolCategories.has(pricing.category)) {
      toolCategories.set(pricing.category, []);
    }
    toolCategories.get(pricing.category)!.push({ ...userTool, seats: currentToolSeats });
  }

  // 3. Duplicate Tool Detection
  toolCategories.forEach((toolsInCategory, category) => {
    if (toolsInCategory.length > 1) {
      // Keep the most "efficient" or standard tool, suggest cancelling others
      const sortedTools = toolsInCategory
        .map(t => ({
          tool: t,
          pricing: PRICING_DATA.find(p => p.name === t.name && p.plan === t.plan)!
        }))
        .filter(t => t.pricing.costPerSeat > 0)
        .sort((a, b) => b.pricing.costPerSeat - a.pricing.costPerSeat);

      if (sortedTools.length > 1) {
        const keep = sortedTools[0];
        for (let i = 1; i < sortedTools.length; i++) {
          const drop = sortedTools[i];
          const savings = drop.pricing.costPerSeat * drop.tool.seats;

          recommendations.push({
            tool: drop.tool.name,
            currentPlan: drop.tool.plan,
            recommendedPlan: 'None (Cancel)',
            recommendedAction: `Consolidate ${drop.tool.name} into ${keep.tool.name}`,
            savingsMonthly: savings,
            savingsAnnual: savings * 12,
            reason: `You are paying for multiple ${category} tools. ${keep.tool.name} covers your needs.`,
            type: 'duplicate_tool'
          });
          totalSavingsMonthly += savings;
        }
      }
    }
  });

  // 4. Global Insight & Impact Marking
  let globalInsight: GlobalInsight | undefined;
  if (totalSavingsMonthly > 500) {
    globalInsight = {
      title: "High-Impact Savings Identified",
      description: `Your stack has significant optimization potential. Implementing these changes will save over $${(totalSavingsMonthly * 12).toLocaleString()} annually.`,
      savingsYearly: totalSavingsMonthly * 12
    };
  } else if (totalSavingsMonthly > 0 && totalSavingsMonthly < 100) {
    // We still return recommendations but log that it's "mostly optimized"
  }

  return {
    totalSavingsMonthly: Math.round(totalSavingsMonthly),
    totalSavingsYearly: Math.round(totalSavingsMonthly * 12),
    recommendations,
    globalInsight
  };
}