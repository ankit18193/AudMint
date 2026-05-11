# AudMint by Credex — AI Spend Audit Tool

## Summary
AudMint is a lead-generation and decision-engine SaaS product for startups and engineering teams. It allows users to input their AI tool usage and spend, run an immediate audit to identify cost savings (such as duplicate tools, over-provisioned seats, or sub-optimal plans), generate a personalized AI summary of their savings opportunities, and create a shareable public report. Lead generation is built-in after presenting the immediate value of the audit.

## Screenshots
*(Add screenshots here after deployment)*
- Homepage
- Audit Form
- Results Page
- Public Report

## Setup Steps
1. Clone the repository.
2. Setup the database (PostgreSQL / Supabase):
   - Run the initial schema migration (see backend/db/schema.sql).
3. Backend Setup:
   - `cd backend`
   - `npm install`
   - Copy `.env.example` to `.env` and fill in DB details, OpenAI API key, Resend/Nodemailer credentials.
   - `npm run build`
   - `npm start`
4. Frontend Setup:
   - `cd frontend`
   - `npm install`
   - Copy `.env.local.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to point to the backend (e.g., `http://localhost:3001`).
   - `npm run dev`

## Deployment Link
Frontend: https://audmint-frontend.vercel.app (Pending deployment)
Backend: https://audmint-api.onrender.com (Pending deployment)

## Key Features
- **Multi-Step Audit Flow**: Intuitive tool selection and usage configuration.
- **Defensible Audit Engine**: Rule-based logic covering seat optimization, tier downgrades, and tool consolidation.
- **Credex Integration**: Automatically identifies high-spend tools eligible for Credex infrastructure credits.
- **Industry Benchmarking**: Compares your AI spend per member against industry averages ($150/dev).
- **AI Executive Summary**: Uses Anthropic/Claude to provide a personalized, business-focused summary of savings.
- **Viral Loop**: Dynamic OG images and shareable public reports for results.

## 5 Trade-offs
1. **Rule-Based Engine vs. LLM for Math**: Used deterministic logic for cost calculations to ensure 100% accuracy and defensibility, reserving LLMs for qualitative summarization.
2. **Benchmark-First Logic**: Prioritized "Spend Per Member" as a primary metric because it provides the social context necessary for a Finance/VPE decision-maker to act.
3. **Local Storage Persistence**: Opted for zero-auth localStorage over database-backed sessions to minimize friction and maximize conversion for the lead capture gate.
4. **Tool Parity in Cross-Vendor Suggestions**: Only suggest switching to alternative tools if they maintain similar "Pro/Business" tier capabilities, avoiding "false savings" from under-powered free tiers.
5. **PostgreSQL vs NoSQL**: Chose SQL for its ability to handle complex relational reporting and future analytical dashboards for Credex's internal lead-scoring.

