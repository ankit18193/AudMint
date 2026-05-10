# AudMint QA & Verification Checklist

## 1. End-to-End Application Flow
- [ ] **Funnel Integrity**: Landing → Audit (3 steps) → Results → Email Capture → Report.
- [ ] **URL Syncing**: `/audit` (multi-step) → `/results` → `/report/[id]`.
- [ ] **State Persistence**: Verify `localStorage` handles page refresh at every step.
- [ ] **Navigation Stability**: Verify back/forward buttons don't crash or lose data.
- [ ] **Search UX**: Verify tool search is case-insensitive and handles partial matches.

## 2. API & Data Layer
- [ ] **`/api/audit`**:
    - [ ] Deterministic engine result calculation.
    - [ ] AI Summary generation (Claude 3.5).
    - [ ] DB persistence (Reports, Tools, Recommendations).
- [ ] **`/api/lead`**:
    - [ ] Duplicate email prevention.
    - [ ] Linked audit validation.
    - [ ] Transactional email trigger (Nodemailer/SMTP).
- [ ] **`/api/report/:id`**:
    - [ ] PII Protection (Ensure email is NOT returned).
    - [ ] Data consistency with original audit.

## 3. Audit Engine Logic
- [ ] **Seat Optimization**: Verify `(currentSeats - teamSize) * costPerSeat` calculation.
- [ ] **Tier Downgrade**: Verify logic for cross-use-case efficiency (e.g., Writer tools for Dev teams).
- [ ] **Redundancy Detection**: Verify grouping by category and "Keep Cheapest/Best" logic.
- [ ] **Already Optimized Case**: Verify zero-savings handling.
- [ ] **Global Insight**: Verify synthesis logic across multiple redundancy categories.

## 4. Pricing Source-of-Truth
- [ ] **Traceability**: Every tool in `pricing.ts` must have a corresponding entry in `PRICING_DATA.md`.
- [ ] **URL Verification**: Verify vendor pricing links are active.
- [ ] **Date Verification**: All prices must be verified for May 2026.

## 5. UI/UX & Accessibility
- [ ] **Design Tokens**: Verify consistent use of the `T` theme object.
- [ ] **Accessibility**: ARIA labels on inputs, role attributes on banners, contrast ratios.
- [ ] **Responsiveness**: Mobile-first check on Results and Report pages.

## 6. Documentation Compliance (12+ Files)
- [ ] `README.md`
- [ ] `ARCHITECTURE.md`
- [ ] `DEVLOG.md`
- [ ] `REFLECTION.md`
- [ ] `TESTS.md`
- [ ] `PRICING_DATA.md`
- [ ] `PROMPTS.md`
- [ ] `GTM.md`
- [ ] `ECONOMICS.md`
- [ ] `USER_INTERVIEWS.md`
- [ ] `LANDING_COPY.md`
- [ ] `METRICS.md`

## 7. Performance & Security
- [ ] **Input Sanitization**: Check for XSS in tool name/plan inputs.
- [ ] **Rate Limiting**: Check for potential API abuse patterns.
- [ ] **Payload Size**: Optimize JSON payloads for large audits.
