# Metrics Strategy: AudMint

# 1. North Star Metric

## Total Identified Annual Savings (TIAS)

The primary North Star Metric for AudMint is:

> Total Identified Annual Savings (TIAS)

TIAS measures the total annual cost reductions identified across all completed audits.

Example:
- Team A saves $4,000/year
- Team B saves $12,000/year
- Team C saves $1,500/year

Combined TIAS:
```text
$17,500/year
```

This metric was intentionally chosen over:
- page views
- daily active users
- generic signups

because AudMint is not a high-frequency consumer product.

The value of the platform comes from:
- identifying meaningful inefficiencies
- surfacing actionable optimization opportunities
- generating financially valuable conversations

If TIAS increases over time, it indicates:
- the product is reaching the right users
- recommendations are valuable
- the audit engine is functioning correctly
- users are entering realistic spend data

TIAS also acts as an early proxy for:
- potential consultation demand
- infrastructure credit opportunities
- future enterprise revenue potential

---

# 2. Supporting Input Metrics

## A. Audit Completion Rate (ACR)

### Definition
```text
Completed audits / Started audits
```

### Why It Matters
The audit experience is intentionally short and low-friction.

A declining completion rate usually indicates:
- confusing form UX
- too many required inputs
- unclear pricing terminology
- mobile usability issues

This metric helps identify where users abandon the audit flow.

### Initial Target
```text
> 60% completion rate
```

---

## B. Lead Capture Conversion (LCC)

### Definition
```text
Lead submissions / Completed audits
```

### Why It Matters
AudMint follows a:
> “show value before asking for information”

model.

If users complete audits but refuse to submit contact details, it suggests:
- insufficient perceived value
- low trust
- weak follow-up incentives
- low urgency around savings

### Initial Target
```text
15–25%
```

---

## C. High-Savings Consultation CTR

### Definition
```text
Consultation CTA clicks / Users with >$500 monthly savings
```

### Why It Matters
This metric measures:
- recommendation urgency
- perceived credibility
- commercial intent

It is the strongest indicator of whether the audit is creating actionable business pressure rather than curiosity-driven engagement.

### Initial Target
```text
5–10%
```

---

# 3. Product Instrumentation Strategy

## Analytics Stack
- PostHog → product analytics
- Sentry → frontend/backend error tracking

These tools were selected because they are:
- developer-friendly
- lightweight
- startup-accessible
- fast to integrate

---

## Phase 1 — Funnel Visibility

Track:
- audit started
- step completion
- audit completed
- lead submitted
- consultation CTA clicked

Goal:
Identify the exact friction points in the audit experience.

---

## Phase 2 — Report Engagement

Track:
- scroll depth
- report sharing
- time spent on results page
- benchmark interactions
- CTA visibility exposure

Goal:
Understand whether users engage deeply with recommendations or only skim headline savings.

---

## Phase 3 — Revenue Attribution

Connect:
- completed audits
- captured leads
- booked consultations
- closed infrastructure deals

Goal:
Measure the relationship between identified savings and downstream commercial outcomes.

This helps determine:
- which recommendation types convert best
- which user segments produce the highest-value opportunities
- whether benchmark-driven recommendations outperform direct cost-saving recommendations

---

# 4. Pivot Trigger

AudMint is fundamentally a trust product.

If users do not believe the recommendations are credible, the entire funnel weakens.

## Pivot Threshold

A pivot discussion would be triggered if:
```text
Lead Capture Conversion < 5%
for 3 consecutive weeks
with meaningful traffic volume
```

This would indicate:
- users do not perceive ongoing value
- recommendations feel generic
- the audit lacks trustworthiness
- the product behaves more like a novelty calculator than operational tooling

---

# 5. Likely Pivot Direction

The most likely pivot would shift AudMint from:
> “AI spend audit tool”

to:
> “AI spend benchmarking platform”

Instead of focusing only on:
- direct savings

the product would emphasize:
- peer comparisons
- industry averages
- spend-per-engineer benchmarks
- tooling adoption trends

Example positioning:
> “Companies your size spend 31% less on AI infrastructure.”

Benchmark-driven products naturally create:
- stronger retention
- repeat visits
- shareability
- competitive curiosity

which may produce stronger long-term engagement than one-time audits alone.

---

# 6. Long-Term Metrics Evolution

As the platform matures, additional metrics would become important:

## Operational Metrics
- recommendation accuracy rate
- false-positive recommendation rate
- audit generation latency
- API failure rate

---

## Business Metrics
- consultation-to-close conversion
- average identified savings per audit
- repeat organization usage
- infrastructure credit conversion rate

---

## Product Metrics
- report share rate
- benchmark interaction rate
- return visitor rate
- team-level adoption

---

# 7. Guiding Principle

The core philosophy behind the metrics strategy is:

> AudMint should optimize for delivered financial insight, not raw engagement volume.

A smaller number of highly valuable audits is strategically more important than large amounts of low-intent traffic.

The goal is not maximizing clicks.

The goal is becoming the trusted operational layer for AI infrastructure spending decisions.