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

  test('Cross-Vendor: Suggest switching from Jasper ($39) to Gemini Pro ($19.99)', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'writing',
      tools: [{ name: 'Jasper', plan: 'Pro', seats: 10 }]
    };
    const res = runAudit(input);
    const crossRec = res.recommendations.find(r => r.type === 'cross_vendor');
    expect(crossRec).toBeDefined();
    expect(crossRec?.recommendedPlan).toContain('Gemini Pro');
  });

  test('Cross-Vendor: Suggest switching from Cursor Business ($40) to GitHub Copilot Individual ($10)', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [{ name: 'Cursor', plan: 'Business', seats: 10 }]
    };
    const res = runAudit(input);
    const crossRec = res.recommendations.find(r => r.type === 'cross_vendor');
    expect(crossRec).toBeDefined();
    expect(crossRec?.recommendedPlan).toContain('GitHub Copilot Individual');
  });

  test('Credex Optimization: Surface Credex for enterprise tiers', () => {
    const input: AuditInput = {
      teamSize: 50,
      primaryUseCase: 'writing',
      tools: [{ name: 'ChatGPT', plan: 'Enterprise', seats: 50 }]
    };
    const res = runAudit(input);
    const credexRec = res.recommendations.find(r => r.type === 'credex_optimization');
    expect(credexRec).toBeDefined();
    expect(res.spendPerMember).toBe(50); // $50 per seat
  });

  test('Optimized Scenario: No recommendations for lean stack', () => {
    const input: AuditInput = {
      teamSize: 10,
      primaryUseCase: 'coding',
      tools: [{ name: 'GitHub Copilot', plan: 'Individual', seats: 10 }]
    };
    const res = runAudit(input);
    expect(res.recommendations.filter(r => r.type === 'cross_vendor').length).toBe(0);
  });
});
