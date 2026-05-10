# Project Reflection: AudMint

## 1. The Hardest Bug: Edge Runtime & Dynamic OG Metadata
The most significant technical challenge I encountered was implementing the dynamic Open Graph (OG) image generation using `next/og` within the Next.js Edge Runtime. The goal was to have social share previews that dynamically displayed the user's specific annual savings (e.g., "I found $4,200 in AI savings"). 

The bug manifested as a cryptic "Internal Server Error" only when deployed to Vercel, despite working perfectly on Localhost. My initial hypothesis was a missing environment variable (`BASE_URL`), but after verifying that, the error persisted. I then suspected the font loading mechanism, as Edge Runtime has strict limits on asset sizes. I attempted to use a Google Font via a standard `fetch` request, but this hit a timeout. 

The breakthrough came when I realized that the Edge Runtime doesn't have access to the full Node.js standard library, and my `generateMetadata` function was attempting to fetch report data from the backend API using a relative path which isn't resolved in the Edge environment. I fixed this by ensuring all fetches in `generateMetadata` use absolute URLs derived from a strictly validated `process.env.NEXT_PUBLIC_API_URL` and implemented a robust fallback font to keep the asset footprint under the 4MB Edge limit. This taught me to treat the Edge Runtime as a distinct, highly constrained environment rather than just "fast Node.js."

## 2. Decision Reversed: Search-First vs. Grid-First Tool Selection
Mid-week, I made a major pivot regarding the core UX of the `AuditForm`. Originally, I built a "Search-First" interface, similar to a command palette, where users had to type the name of every tool they used. I reasoned that this would keep the UI clean and handle the infinite tail of AI tools. 

However, after a quick "hallway test" with a founder friend, I reversed this decision. The user felt "cognitive load" trying to remember exactly which tools they paid for. They needed prompts to jog their memory. I realized that for a lead-gen tool, reducing friction is more important than a minimalist "power user" UI.

I refactored the form to a "Grid-First" approach, where the top 6 most common tools (Cursor, Copilot, Claude, etc.) are prominently displayed with high-fidelity icons, and the search bar is relegated to a "Missing a tool?" secondary action. This change immediately improved completion rates in my internal testing because it turned a "recall" task into a "recognition" task. It was a classic example of prioritizing user psychology over technical elegance.

## 3. What I Would Build in Week 2
If I had a second week, the absolute priority would be **Automated Usage Ingestion via SSO or Browser Extension**. Currently, the tool relies on manual input, which is prone to error and "best-guess" estimates from users. 

I would implement a "Read-Only" integration with Google Workspace or Okta to automatically identify active AI subscriptions across the organization. By scanning the company's SSO logs, we could identify "shadow AI" — seats purchased by individual employees on corporate cards that aren't on the official IT budget. 

Additionally, I would build a Chrome Extension that users could run for 60 seconds. The extension would check active sessions for known AI tool domains (like `cursor.sh` or `claude.ai`) and extract the current plan level from the settings page. This would move the product from "Self-Reported Estimates" to "Verified Audit Data," significantly increasing the value of the Credex lead, as we could approach the customer with 100% certainty about their waste.

## 4. How I Used AI Tools
I utilized Claude 3.5 Sonnet (via Cursor) as a primary pair programmer and for all copy-writing tasks. Claude was instrumental in generating the `pricing.ts` database structure and helping me brainstorm the GTM strategy. I also used it to write the initial drafts of the Landing Page copy, which I then refined for tone.

I did not trust the AI with the core `runAudit` logic. Financial math must be deterministic and defensible. I found that when I asked the AI to "write an algorithm to find the best savings," it often hallucinated tool-switching logic that didn't account for feature parity (e.g., suggesting switching from ChatGPT Enterprise to a free Gemini tier, which is not a valid business recommendation). 

A specific catch: During the generation of `PRICING_DATA.md`, Claude claimed that Cursor Business was $20/user/mo. Having just checked the pricing page, I knew it was $40/user/mo ($20 is for Pro). If I hadn't caught this, the entire audit engine would have reported 50% lower savings than reality, destroying the tool's credibility. This reinforced my rule: Use AI for creative synthesis and boilerplate, but manual verification for all "Hard Data."

## 5. Self-Rating & Rationale
- **Discipline: 9/10**: Started on Day 1 and maintained a steady 3-4 hours of deep work daily, avoiding the weekend cramming mentioned in the prompt.
- **Code Quality: 8/10**: Used strict TypeScript types and modular API architecture, though some UI components in `AuditForm.tsx` became slightly larger than I'd prefer for a production app.
- **Design Sense: 9/10**: Built a custom theme that feels premium and SaaS-native, focusing on micro-interactions and "Trust Green" accents.
- **Problem Solving: 8/10**: Successfully navigated the Edge Runtime OG bug and implemented a robust file-fallback persistence system.
- **Entrepreneurial Thinking: 10/10**: I didn't just build a form; I built a "Viral Loop" with OG tags and a clear "High-Savings vs. Optimized" bifurcation in the UX to maximize Credex lead quality.
