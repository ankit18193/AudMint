import Anthropic from '@anthropic-ai/sdk';
import { AuditResult, AuditInput } from '../engine/rules';

export async function generateExecutiveSummary(userData: AuditInput, auditResults: Omit<AuditResult, 'aiSummary'>): Promise<string> {
  const totalMonthly = auditResults.totalSavingsMonthly;
  const totalAnnual = auditResults.totalSavingsYearly;
  
  // 1. Mandatory Honesty Check: If savings are negligible (< $100/mo)
  if (totalMonthly < 100) {
    return "Your AI stack is already highly optimized. Our analysis shows your current configuration is lean and well-aligned with your team size and use cases. We found less than $100 in monthly savings, which suggests a high-efficiency operation. No major changes recommended.";
  }

  // 2. Prepare Fallback
  const topRec = auditResults.recommendations[0];
  const fallbackSummary = auditResults.totalSavingsMonthly > 0 
    ? `We identified $${auditResults.totalSavingsYearly.toLocaleString()} in potential annual savings. The most significant opportunity is with ${topRec?.tool}, where you can save $${topRec?.savingsAnnual.toLocaleString()} by ${topRec?.recommendedAction.toLowerCase()}. We recommend consolidating duplicate tools and trimming excess seats to maintain a lean, high-ROI AI stack.`
    : "Your AI stack is currently optimized. No immediate actions are required to reduce spend without impacting productivity.";

  const globalInsightContext = auditResults.globalInsight
    ? `\nHigh-Impact Insight: ${auditResults.globalInsight.title} - ${auditResults.globalInsight.description}`
    : '';

  const prompt = `
You are a senior financial consultant. Analyze these AI audit results and provide a 100-word executive summary.

Context:
Team Size: ${userData.teamSize}
Primary Use Case: ${userData.primaryUseCase}

Results:
Total Monthly Savings: $${auditResults.totalSavingsMonthly}
Total Annual Savings: $${auditResults.totalSavingsYearly}${globalInsightContext}

Recommendations:
${auditResults.recommendations.map(r => `- ${r.tool}: ${r.recommendedAction}. Reason: ${r.reason}`).join('\n')}

Output Requirements:
- Length: ~100 words.
- Tone: Professional, authoritative, data-driven.
- Include: Reasoning for optimizations, savings overview, and one key action suggestion.
- Format: Plain text only. No markdown headers.
`;

  try {
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes('your_')) {
      console.warn("AI Key missing, using fallback summary.");
      return fallbackSummary;
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 250,
      temperature: 0.5,
      system: "You are a senior financial consultant providing spend optimization advice.",
      messages: [{ role: 'user', content: prompt }]
    });

    const text = (response.content[0] as any).text;
    return text || fallbackSummary;
  } catch (error) {
    console.error('AI Summary Error:', error);
    return fallbackSummary;
  }
}