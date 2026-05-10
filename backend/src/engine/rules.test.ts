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
    expect(rec?.type).toBe('tier_downgrade');
    expect(rec?.savingsMonthly).toBe(390); // 10 * 39
  });

  test('Seat Optimization: Detect over-provisioned seats', () => {
    const input: AuditInput = {
      teamSize: 5,
      primaryUseCase: 'mixed',
      tools: [{ name: 'Cursor', plan: 'Business', seats: 15 }]
    };
    const res = runAudit(input);
    const rec = res.recommendations.find(r => r.tool === 'Cursor');
    expect(rec?.type).toBe('seat_optimization');
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
    // Both are $20. Consolidate one.
    expect(res.totalSavingsMonthly).toBe(200);
  });

  test('High Savings Case: Verify High-Impact marking', () => {
    const input: AuditInput = {
      teamSize: 5,
      primaryUseCase: 'coding',
      tools: [
        { name: 'Cursor', plan: 'Business', seats: 20 }, // 15 extra seats: 15 * 40 = 600
        { name: 'Jasper', plan: 'Pro', seats: 5 }       // Downgrade: 5 * 39 = 195
      ]
    };
    const res = runAudit(input);
    expect(res.totalSavingsMonthly).toBe(795);
    expect(res.globalInsight?.title).toContain("High-Impact");
  });

  test('Optimized Scenario: Zero savings and empty recommendations', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [{ name: 'Cursor', plan: 'Business', seats: 10 }]
    };
    const res = runAudit(input);
    expect(res.totalSavingsMonthly).toBe(0);
    expect(res.recommendations.length).toBe(0);
  });
  
  test('Small Team Downgrade: Suggest Pro over Business for team of 1', () => {
    const input: AuditInput = {
      teamSize: 1,
      primaryUseCase: 'coding',
      tools: [{ name: 'Cursor', plan: 'Business', seats: 1 }]
    };
    const res = runAudit(input);
    const rec = res.recommendations.find(r => r.type === 'tier_downgrade');
    expect(rec?.recommendedPlan).toBe('Pro');
    expect(rec?.savingsMonthly).toBe(20); // 40 - 20
  });
});
