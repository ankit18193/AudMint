import { runAudit, AuditInput } from './rules';

describe('AudMint Engine Logic', () => {
  test('Plan Downgrade: Recommend downgrade for writing tools in coding use case', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [{ name: 'Jasper', plan: 'Pro', seats: 10 }]
    };
    const res = runAudit(input);
    const rec = res.recommendations.find(r => r.tool === 'Jasper');
    expect(rec).toBeDefined();
  });

  test('Seat Optimization: Detect over-provisioned seats', () => {
    const input: AuditInput = {
      teamSize: 5,
      primaryUseCase: 'mixed',
      tools: [{ name: 'Cursor', plan: 'Business', seats: 15 }]
    };
    const res = runAudit(input);
    const rec = res.recommendations.find(r => r.type === 'seat_optimization');
    expect(rec).toBeDefined();
    expect(rec?.savingsMonthly).toBe(400); // (15-5) * 40
  });

  test('Duplicate Tool Case: Flag redundant tools in same category', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'writing',
      tools: [
        { name: 'ChatGPT', plan: 'Plus', seats: 10 },
        { name: 'Claude', plan: 'Pro', seats: 10 }
      ]
    };
    const res = runAudit(input);
    const duplicateRec = res.recommendations.find(r => r.type === 'duplicate_tool');
    expect(duplicateRec).toBeDefined();
  });

  test('Cross-Vendor: Suggest switching from Jasper ($39) to Gemini AI Pro ($19.99)', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'writing',
      tools: [{ name: 'Jasper', plan: 'Pro', seats: 10 }]
    };
    const res = runAudit(input);
    const crossRec = res.recommendations.find(r => r.type === 'cross_vendor');
    expect(crossRec).toBeDefined();
    expect(crossRec?.recommendedPlan).toContain('Gemini AI Pro');
  });

  test('Cross-Vendor: Suggest switching from Cursor Business ($40) to GitHub Copilot Pro ($10)', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [{ name: 'Cursor', plan: 'Business', seats: 10 }]
    };
    const res = runAudit(input);
    const crossRec = res.recommendations.find(r => r.type === 'cross_vendor');
    expect(crossRec).toBeDefined();
    expect(crossRec?.recommendedPlan).toContain('GitHub Copilot Pro');
  });

  test('Optimized Scenario: No recommendations for lean stack', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [{ name: 'GitHub Copilot', plan: 'Pro', seats: 10 }]
    };
    const res = runAudit(input);
    // GitHub Copilot Pro ($10) is the cheapest paid coding tool.
    // Cursor Hobby ($0) is free, but we don't suggest cross-vendor for free tools to maintain parity.
    expect(res.recommendations.filter(r => r.type === 'cross_vendor').length).toBe(0);
  });
});
