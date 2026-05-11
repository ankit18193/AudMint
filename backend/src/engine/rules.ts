import { PRICING_DATA, ToolName, PlanName } from './pricing';
import { randomUUID } from 'crypto';

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
  type: 'seat_optimization' | 'tier_downgrade' | 'duplicate_tool' | 'cross_vendor' | 'credex_optimization';
}

export interface GlobalInsight {
  title: string;
  description: string;
  savingsYearly: number;
}

export interface AuditResult {
  totalSavingsMonthly: number;
  totalSavingsYearly: number;
  spendPerMember: number;
  recommendations: Recommendation[];
  globalInsight?: GlobalInsight;
}

export function runAudit(input: AuditInput): Omit<AuditResult, 'aiSummary'> {
  const recommendations: Recommendation[] = [];
  let totalSavingsMonthly = 0;
  let totalCurrentSpend = 0;

  const toolCategories = new Map<string, UserInputTool[]>();

  // 1 & 2. Seat, Plan, and Credex Optimization
  for (const userTool of input.tools) {
    const pricing = PRICING_DATA.find(p => p.name === userTool.name && p.plan === userTool.plan);
    if (!pricing) continue;

    const currentToolCost = pricing.costPerSeat * userTool.seats;
    totalCurrentSpend += currentToolCost;

    let currentToolSeats = userTool.seats;

    // A. Seat Optimization
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

    // B. Credex Optimization (Credits for supported tools)
    // We recommend Credex for high-spend team/enterprise plans
    if (pricing.credexEligible && (pricing.isTeamPlan || pricing.costPerSeat >= 30)) {
      const estimatedDiscount = 0.25; // 25% average savings via Credex
      const savings = currentToolCost * estimatedDiscount;

      recommendations.push({
        tool: userTool.name,
        currentPlan: `Retail Pricing`,
        recommendedPlan: `Credex Credits`,
        recommendedAction: `Switch to Credex-sourced infrastructure credits`,
        savingsMonthly: savings,
        savingsAnnual: savings * 12,
        reason: `Credex provides discounted credits for ${userTool.name} that can reduce your direct retail spend by approximately 25%.`,
        type: 'credex_optimization'
      });
      totalSavingsMonthly += savings;
    }

    // C. Plan Downgrade
    if (pricing.costPerSeat > 0) {
      let targetPlan: string | null = null;
      let downgradeReason = "";

      if (pricing.category === 'writing' && input.primaryUseCase === 'coding') {
        targetPlan = "Free";
        downgradeReason = `As a coding-focused team, the free tier of ${userTool.name} is sufficient for occasional documentation needs.`;
      } else if (pricing.isTeamPlan && input.teamSize <= 2) {
        const proPlan = PRICING_DATA.find(p => p.name === userTool.name && !p.isTeamPlan && p.costPerSeat > 0);
        if (proPlan && proPlan.costPerSeat < pricing.costPerSeat) {
          targetPlan = proPlan.plan;
          downgradeReason = `Team features are often redundant for small teams of ${input.teamSize}. The ${proPlan.plan} tier offers full functionality at a lower price.`;
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

    // D. Cross-Vendor Optimization (Switching tools)
    if (pricing.costPerSeat > 0) {
      const categoryAlternatives = PRICING_DATA.filter(p => 
        p.category === pricing.category && 
        p.name !== userTool.name && 
        p.costPerSeat > 0 && 
        p.costPerSeat < pricing.costPerSeat 
      ).sort((a, b) => a.costPerSeat - b.costPerSeat);

      if (categoryAlternatives.length > 0) {
        const cheapestAlt = categoryAlternatives[0];
        if (pricing.costPerSeat > cheapestAlt.costPerSeat * 1.3) {
          const savings = (pricing.costPerSeat - cheapestAlt.costPerSeat) * currentToolSeats;
          const existingRec = recommendations.find(r => r.tool === userTool.name && r.type !== 'credex_optimization');
          
          if (savings > 0 && (!existingRec || existingRec.savingsMonthly < savings)) {
            recommendations.push({
              tool: userTool.name,
              currentPlan: `${userTool.plan} ($${pricing.costPerSeat}/seat)`,
              recommendedPlan: `${cheapestAlt.name} ${cheapestAlt.plan} ($${cheapestAlt.costPerSeat}/seat)`,
              recommendedAction: `Switch from ${userTool.name} to ${cheapestAlt.name}`,
              savingsMonthly: savings,
              savingsAnnual: savings * 12,
              reason: `${cheapestAlt.name} provides comparable ${pricing.category} capabilities at a significantly lower cost for your team size.`,
              type: 'cross_vendor'
            });
            totalSavingsMonthly += savings;
          }
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
    if (category === 'api') return; // Don't flag multiple APIs as duplicates necessarily

    if (toolsInCategory.length > 1) {
      const sortedTools = toolsInCategory
        .map(t => ({
          tool: t,
          pricing: PRICING_DATA.find(p => p.name === t.name && p.plan === t.plan)!
        }))
        .filter(t => t.pricing.costPerSeat > 0)
        .sort((a, b) => b.pricing.costPerSeat - a.pricing.costPerSeat);

      if (sortedTools.length > 1) {
        const keep = sortedTools[sortedTools.length - 1]; // Keep the cheapest one
        for (let i = 0; i < sortedTools.length - 1; i++) {
          const drop = sortedTools[i];
          const savings = drop.pricing.costPerSeat * drop.tool.seats;

          recommendations.push({
            tool: drop.tool.name,
            currentPlan: drop.tool.plan,
            recommendedPlan: 'None (Cancel)',
            recommendedAction: `Consolidate ${drop.tool.name} into ${keep.tool.name}`,
            savingsMonthly: savings,
            savingsAnnual: savings * 12,
            reason: `Your team uses both ${drop.tool.name} and ${keep.tool.name} for ${category}. Consolidating to ${keep.tool.name} eliminates redundancy.`,
            type: 'duplicate_tool'
          });
          totalSavingsMonthly += savings;
        }
      }
    }
  });

  // 4. Global Insight
  let globalInsight: GlobalInsight | undefined;
  if (totalSavingsMonthly > 500) {
    globalInsight = {
      title: "High-Impact Savings Identified",
      description: `We've identified over $${(totalSavingsMonthly * 12).toLocaleString()} in annual waste. Most of this comes from ${recommendations.some(r => r.type === 'credex_optimization') ? 'retail pricing markups' : 'tool redundancy'}.`,
      savingsYearly: totalSavingsMonthly * 12
    };
  }

  return {
    totalSavingsMonthly: Math.round(totalSavingsMonthly),
    totalSavingsYearly: Math.round(totalSavingsMonthly * 12),
    spendPerMember: Math.round(totalCurrentSpend / input.teamSize),
    recommendations,
    globalInsight
  };
}