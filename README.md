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

## 5 Trade-offs
1. **Rule-Based Engine vs. LLM for Savings Calculations**: Opted for deterministic rule-based logic for cost calculations rather than using an LLM to ensure mathematically consistent and verifiable results. LLMs are only used for the executive summary.
2. **Local Storage over User Accounts**: Removed authentication and used localStorage to store form state to minimize friction and maximize lead capture conversion rates.
3. **Monolith vs. Microservices Backend**: Built a simple Express API backend instead of microservices to decrease time-to-market and simplify deployment, adequate for the expected load and lead gen nature.
4. **Immediate Value vs. Gated Results**: The audit results are shown *before* capturing the lead to build trust, although it sacrifices some initial captures, the leads collected are of significantly higher intent.
5. **PostgreSQL vs NoSQL**: Chose a relational database (PostgreSQL via Supabase) over NoSQL because audit data and reports naturally have structured, relational characteristics, aiding analytical queries down the line.
