# Test Suite Documentation: AudMint

This document outlines the automated testing strategy, test coverage, and execution workflow used in AudMint.

The testing approach prioritizes:
- deterministic audit accuracy
- recommendation reliability
- API stability
- deployment confidence

Because the product centers around financial optimization recommendations, the audit engine receives the highest testing priority.

---

# 1. Testing Philosophy

AudMint intentionally separates:
- deterministic financial logic
from
- AI-generated summaries

The deterministic audit engine is treated as the system of record and is validated using automated unit tests.

Testing priorities:
1. Audit recommendation correctness
2. Savings calculation consistency
3. Edge-case handling
4. API stability
5. Production build reliability

---

# 2. Audit Engine Test Coverage

Primary test file:
```text
backend/tests/rules.test.ts
```

Framework:
```text
Vitest
```

The audit engine currently includes automated tests covering:
- seat optimization
- redundant tooling detection
- plan downgrade logic
- enterprise recommendations
- “already optimized” edge cases

---

# 3. Automated Test Cases

| Test File | Test Case | What It Validates |
|---|---|---|
| `rules.test.ts` | detects_overprovisioned_seats | Savings generated when seat count exceeds active team size |
| `rules.test.ts` | prevents_false_savings_on_small_teams | No artificial optimization recommendations are created |
| `rules.test.ts` | recommends_team_plan_downgrade | Team plans are downgraded when usage intensity is low |
| `rules.test.ts` | detects_duplicate_ai_tools | Overlapping subscriptions are identified |
| `rules.test.ts` | compares_cross_vendor_pricing | Cheaper alternatives are surfaced when feature overlap exists |
| `rules.test.ts` | flags_enterprise_credit_opportunity | Enterprise spend thresholds trigger Credex optimization messaging |
| `rules.test.ts` | handles_usage_based_api_spend | API-only pricing logic behaves correctly |

---

# 4. API Validation Tests

API integration tests validate:
- payload structure validation
- malformed request handling
- missing-field behavior
- lead submission protection
- rate-limit handling

Primary files:
```text
backend/tests/audit-api.test.ts
backend/tests/lead-api.test.ts
```

---

# 5. Frontend Validation

Frontend testing currently focuses on:
- successful production builds
- lint validation
- form persistence
- route stability

Key areas verified:
- localStorage persistence
- multi-step form navigation
- responsive rendering
- public report routes
- Open Graph route generation

---

# 6. How To Run Tests

## Backend Tests

```bash
cd backend
npm install
npm test
```

---

## Frontend Validation

```bash
cd frontend
npm install
npm run lint
npm run build
```

---

# 7. CI/CD Integration

All validation checks run automatically through GitHub Actions on every push to `main`.

Workflow file:
```text
.github/workflows/ci.yml
```

The CI workflow verifies:
1. Backend tests execute successfully
2. Frontend linting passes
3. Next.js production build succeeds
4. TypeScript compilation completes without errors

---

# 8. Automated Quality Gates

Additional automated safeguards include:

## Type Validation
TypeScript strict mode is enabled for core application logic to reduce runtime inconsistencies.

---

## Anti-Abuse Validation
Lead endpoints validate:
- honeypot fields
- malformed payloads
- invalid email structures

---

## Build Verification
Production deployment validation includes:
- Next.js production builds
- route generation
- OG image endpoint compilation

---

# 9. Lighthouse Targets

The project targets the following mobile Lighthouse scores:

| Category | Target |
|---|---|
| Performance | 85+ |
| Accessibility | 90+ |
| Best Practices | 90+ |

These targets align with the assignment requirements and help maintain production-quality UX standards.

---

# 10. Future Testing Improvements

Given additional development time, the next testing investments would include:

## Playwright E2E Testing
Full end-to-end flows:
- landing page
- audit completion
- lead capture
- report sharing

---

## Load Testing
Stress-testing:
- API throughput
- queue handling
- LLM fallback behavior

using:
```text
k6
```

---

## Snapshot Testing
Visual regression tests for:
- Open Graph previews
- result cards
- responsive layouts

---

# 11. Testing Philosophy Summary

The testing strategy intentionally focuses on:
- recommendation correctness
- deterministic reliability
- deployment confidence

rather than maximizing superficial test counts.

For a financial optimization tool, incorrect recommendations are more damaging than missing UI polish, so the audit engine receives the strongest validation guarantees.