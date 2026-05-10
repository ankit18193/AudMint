# Metrics Strategy: AudMint

## 1. The North Star Metric
Our North Star Metric is **"Total Identified Annual Savings (TIAS)."** 

Unlike "Daily Active Users" or "Page Views," TIAS directly measures the *value delivered* by the tool. If TIAS is increasing, it means we are reaching the right users (those with waste) and our audit engine is successfully surfacing high-impact optimizations. This metric also serves as a leading indicator for Credex's revenue pipeline; the more waste we identify, the larger the pool of potential credit sales.

## 2. Supporting Input Metrics
To drive our North Star (TIAS), we track three primary input metrics:

1. **Audit Completion Rate (ACR)**: 
   - *Definition*: (Users who reach the Results Page) / (Users who start Step 1).
   - *Why it matters*: This measures the friction in our multi-step form. If ACR drops, we need to simplify the "Usage Configuration" step or improve our記憶 retention (Step persistence).

2. **Lead Capture Conversion (LCC)**:
   - *Definition*: (Users who submit the Email Gate) / (Users on the Results Page).
   - *Why it matters*: This validates our "Value-First" hypothesis. If users see their results but don't want the PDF/Notify-me report, we haven't convinced them of the tool's ongoing utility.

3. **Consultation "High-Savings" CTR**:
   - *Definition*: (Clicks on 'Book Consultation') / (Users with >$500/mo identified savings).
   - *Why it matters*: This is the ultimate measure of "Lead Quality." It tells us if our recommendations are "urgent" enough to move a busy VPE to a sales conversation.

## 3. Instrumentation Roadmap
For the MVP, we will use **PostHog** for product analytics and **Sentry** for error tracking. 
- **Phase 1**: Instrument every "Step Complete" event to identify the exact drop-off point in the 3-step audit.
- **Phase 2**: Implement "Scroll Depth" tracking on the Public Report pages to see if shared users are reading the full breakdown or just the Hero savings number.
- **Phase 3**: Connect the backend "Lead" events to our CRM (HubSpot) to track the full lifecycle from "First Audit" to "Credit Purchase."

## 4. The Pivot Trigger
If our **Lead Capture Conversion (LCC) falls below 5% for three consecutive weeks** despite 1,000+ monthly visits, we will trigger a pivot. A 5% LCC indicates that either:
- The "Self-Reported" nature of the tool makes users distrust the results.
- The "Audit" is a one-time novelty rather than a business necessity.

In this scenario, we would pivot the tool from a "Free Audit" to a "Benchmarking Tool" (e.g., "See how your AI spend compares to 500 other Series B startups"), focusing on the **social comparison** rather than just the direct cost-recovery.
