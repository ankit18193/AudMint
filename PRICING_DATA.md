# AudMint Pricing Source-of-Truth

This document contains the verified pricing data used by the AudMint audit engine.

All pricing values are represented in USD and were manually verified against official vendor pricing pages during the submission week.

The audit engine uses this dataset as the deterministic foundation for:
- pricing comparisons
- downgrade recommendations
- enterprise optimization suggestions
- annual savings calculations

---

# Pricing Data

| Tool Name | Tier | Price (Monthly) | Seat Model | Source | Verified |
|---|---|---|---|---|---|
| Cursor | Hobby | $0 | Individual | https://cursor.com/pricing | 2026-05-11 |
| Cursor | Pro | $20 | Individual | https://cursor.com/pricing | 2026-05-11 |
| Cursor | Business | $40 | Per Seat | https://cursor.com/pricing | 2026-05-11 |
| Cursor | Enterprise | Custom | Enterprise | https://cursor.com/pricing | 2026-05-11 |

| GitHub Copilot | Individual | $10 | Individual | https://github.com/features/copilot/plans | 2026-05-11 |
| GitHub Copilot | Business | $19 | Per Seat | https://github.com/features/copilot/plans | 2026-05-11 |
| GitHub Copilot | Enterprise | $39 | Per Seat | https://github.com/features/copilot/plans | 2026-05-11 |

| Claude | Free | $0 | Individual | https://claude.ai/pricing | 2026-05-11 |
| Claude | Pro | $20 | Individual | https://claude.ai/pricing | 2026-05-11 |
| Claude | Max | $30 | Individual | https://claude.ai/pricing | 2026-05-11 |
| Claude | Team | $25 | Per Seat (Min 2) | https://claude.ai/pricing | 2026-05-11 |
| Claude | Enterprise | Custom | Enterprise | https://claude.ai/pricing | 2026-05-11 |
| Anthropic API | Usage-Based | Variable | API Usage | https://www.anthropic.com/pricing | 2026-05-11 |

| ChatGPT | Plus | $20 | Individual | https://openai.com/chatgpt/pricing | 2026-05-11 |
| ChatGPT | Team | $25 | Per Seat (Min 2) | https://openai.com/chatgpt/pricing | 2026-05-11 |
| ChatGPT | Enterprise | Custom | Enterprise | https://openai.com/chatgpt/pricing | 2026-05-11 |
| OpenAI API | Usage-Based | Variable | API Usage | https://openai.com/api/pricing | 2026-05-11 |

| Gemini | Free | $0 | Individual | https://gemini.google.com | 2026-05-11 |
| Gemini Advanced | $19.99 | Individual | Google One AI Premium | https://one.google.com/about/plans | 2026-05-11 |

| Windsurf | Pro | $15 | Individual | https://windsurf.com/pricing | 2026-05-11 |

| Perplexity | Free | $0 | Individual | https://www.perplexity.ai/pro | 2026-05-11 |
| Perplexity | Pro | $20 | Individual | https://www.perplexity.ai/pro | 2026-05-11 |
| Perplexity Enterprise Pro | Custom | Enterprise | https://www.perplexity.ai/pro | 2026-05-11 |

| Notion AI | Plus | $10 | Per Seat | https://www.notion.so/pricing | 2026-05-11 |
| Notion AI | Business | $20 | Per Seat | https://www.notion.so/pricing | 2026-05-11 |

| Jasper | Creator | $39 | Individual | https://www.jasper.ai/pricing | 2026-05-11 |

| v0 | Premium | $20 | Individual | https://v0.dev/pricing | 2026-05-11 |

---

# Pricing Logic Used by the Audit Engine

## 1. Annual Billing Adjustments
Where vendors offer annual pricing discounts, the engine assumes an average effective savings rate of:
```text
~15–20%
```

This adjustment is used when estimating potential optimization opportunities for teams currently billed monthly.

---

## 2. Team Plan Thresholds

Many “Team” plans become inefficient at low seat counts.

Examples:
- ChatGPT Team for 2 users may not outperform individual Plus subscriptions
- Enterprise plans become inefficient when usage remains low or inconsistent
- API-only workflows may outperform fixed-seat plans for specialized teams

The engine evaluates:
- seat count
- use case
- spend intensity
- overlap between tools

before recommending upgrades or downgrades.

---

# 3. Cross-Vendor Optimization Logic

The audit engine compares:
- feature overlap
- pricing efficiency
- likely usage patterns

Examples:
- Cursor Pro vs GitHub Copilot Business
- Claude Team vs ChatGPT Team
- API usage vs fixed-seat subscriptions

The system intentionally avoids simplistic:
> “cheapest tool wins”

logic.

Recommendations prioritize:
- realistic workflow compatibility
- engineering productivity
- spend efficiency
- operational simplicity

---

# 4. Enterprise Credit Assumptions

For high-spend enterprise usage, the audit engine may surface:
> “Credex Optimization Opportunities”

This assumes:
- infrastructure credits can reduce effective enterprise pricing
- bulk purchasing provides leverage
- larger organizations are more likely to negotiate pricing

Estimated savings assumptions:
```text
~20–30% below standard retail pricing
```

These estimates are intentionally conservative and presented as opportunities rather than guaranteed pricing.

---

# 5. Data Validation Philosophy

The pricing engine intentionally uses:
- deterministic logic
- manually verified pricing
- human-readable recommendation rules

instead of relying on LLM-generated pricing assumptions.

This improves:
- explainability
- consistency
- trustworthiness
- audit defensibility

Every recommendation in the system must trace back to:
1. verified pricing data
2. explicit recommendation rules
3. observable user inputs

---

# 6. Future Improvements

Future versions of the pricing engine would support:
- real-time pricing syncs
- API-based vendor pricing updates
- billing-provider integrations
- enterprise contract imports
- benchmark pricing intelligence
- region-specific pricing normalization

The current implementation prioritizes:
- reliability
- transparency
- explainability
over automation complexity.