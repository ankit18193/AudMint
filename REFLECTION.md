# Project Reflection: AudMint

This document provides a critical reflection on the development of AudMint, covering technical hurdles, strategic pivots, and self-assessment.

---

# 1. The Hardest Bug: Edge Runtime & Dynamic OG Metadata

### **The Challenge**
The most significant technical hurdle was implementing dynamic Open Graph (OG) image generation using `next/og` within the Next.js Edge Runtime. The goal was to ensure that social sharing previews (on X, Slack, LinkedIn) displayed the user's specific annual savings (e.g., *"I found $4,200 in AI savings"*).

### **The Bug**
The implementation worked perfectly on Localhost but threw a cryptic `500 Internal Server Error` once deployed to Vercel. My initial hypothesis was a missing environment variable (`NEXT_PUBLIC_API_URL`), but after verification, the error persisted. I then suspected font loading, as the Edge Runtime has strict 4MB memory limits for assets.

### **The Resolution**
The breakthrough came when I realized that the Edge Runtime is a restricted environment that cannot resolve relative API paths or use the full Node.js standard library. My `generateMetadata` function was attempting to fetch report data from the backend using a relative path. I resolved this by enforcing strict absolute URL validation for all Edge fetches and implementing a robust local fallback font to stay under the memory cap. This taught me to treat the Edge Runtime as a specialized, highly constrained environment rather than just a "faster Node.js."

---

# 2. Decision Reversed: Recognition vs. Recall in UX

### **The Pivot**
Mid-week, I made a major pivot regarding the core UX of the `AuditForm`. I had originally built a "Search-First" interface, similar to a command palette, where users typed the names of every tool they used. I reasoned that this was "cleaner" and handled the infinite tail of AI tools.

### **The Reversal**
After a "hallway test" with a founder friend, I realized the cognitive load was too high. The user felt "paralyzed" trying to remember exactly which tools they paid for. They needed recognition, not recall. 

I refactored the form to a "Grid-First" approach, where the top 8 most common tools (Cursor, Claude, etc.) are prominently displayed with high-fidelity icons. The search bar was relegated to a secondary "Missing a tool?" action. This change immediately improved completion rates in my internal testing because it transformed a "memory task" into a "selection task."

---

# 3. Future Roadmap: What I Would Build in Week 2

If I had an additional week, the priority would be **"Verified Ingestion."** 

Currently, the tool relies on manual input, which is prone to user error or "best-guess" estimates. In Week 2, I would implement:
1. **SSO/Google Workspace Integration**: A read-only integration to automatically identify active AI subscriptions across a corporate domain.
2. **Browser Extension Audit**: A 60-second Chrome extension that checks active sessions for known AI domains and extracts plan levels directly from settings pages.

This would move AudMint from "Self-Reported Estimates" to "Verified Financial Data," significantly increasing the value of the leads for Credex, as we could approach customers with 100% certainty about their waste.

---

# 4. AI Tooling Usage & Ethics

I utilized **Claude 3.5 Sonnet (via Cursor)** as a pair programmer for boilerplate, UI component structure, and copy-writing. 

### **The "Trust" Boundary**
I did not trust the AI with the core **Audit Engine math**. Financial logic must be deterministic. In early tests, I asked the AI to "suggest the best switch," and it frequently hallucinated tool-switching logic that ignored feature parity (e.g., suggesting switching from ChatGPT Enterprise to a free Gemini tier, which is not a valid business recommendation).

### **The "Catch"**
During the generation of `PRICING_DATA.md`, Claude claimed that **Cursor Business** was $20/user/mo. Having just checked the official pricing page, I knew it was $40/user/mo ($20 is for Pro). If I hadn't caught this, the entire engine would have reported 50% lower savings, destroying the tool's credibility. This reinforced my rule: Use AI for creative synthesis, but manual verification for all "Hard Data."

---

# 5. Self-Assessment (1–10 Scale)

- **Discipline: 9/10** — Maintained a steady 3-4 hours of deep work daily since Day 1, avoiding the "weekend cramming" trap.
- **Code Quality: 8/10** — Implemented strict TypeScript types and a modular API, though some frontend components became larger than ideal for a production app.
- **Design Sense: 9/10** — Built a custom, premium theme that feels "SaaS-native" with micro-interactions and "Trust Green" accents.
- **Problem Solving: 8/10** — Successfully navigated the Edge Runtime OG bug and implemented a robust PostgreSQL-to-File fallback system.
- **Entrepreneurial Thinking: 10/10** — I didn't just build a form; I built a **Viral Loop** with OG tags and a clear "High-Savings vs. Optimized" bifurcation to maximize lead quality.
