# Project Reflection: AudMint

## 1. Successes
- **Deterministic Trust**: By using a hard-coded pricing database and rule-based engine, we built a tool that users actually trust for financial decisions.
- **High-Fidelity UX**: The custom-themed, animation-rich UI makes a mundane task (cost auditing) feel engaging and premium.
- **Rapid Lead Gen**: The strategy of "Value-First, Contact-Later" proved effective during initial user testing.

## 2. Challenges
- **Pricing Volatility**: AI pricing changes monthly. Maintaining the Source-of-Truth (`PRICING_DATA.md`) is a significant operational burden. Future versions should use an API-driven pricing oracle.
- **TypeScript Parsing**: Encountered subtle JSX/syntax challenges during UI hardening, reminding us of the importance of strict component boundaries and clean prop types.

## 3. Lessons Learned
- **AI as a Complement, Not a Core**: Using LLMs for synthesis (Executive Summary) while keeping calculations deterministic is the "sweet spot" for financial SaaS.
- **Local Persistence**: For utility tools, `localStorage` is often superior to auth systems for early-stage conversion.

## 4. Future Roadmap
1. **SSO Integration**: Automatically pull tool usage from Okta/Google Workspace for enterprise users.
2. **Dynamic Pricing Oracle**: Connect to a live database of SaaS pricing.
3. **Automated Negotiation**: AI agents that can actually execute the cancellations or plan downgrades.
