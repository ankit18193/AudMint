# AudMint — AI Spend Audit Platform

> A production-ready AI spend auditing platform that helps startups identify unnecessary AI tool expenses, optimize subscriptions, and discover cheaper alternatives with actionable recommendations.

## Live Demo

* **Frontend:** [https://aud-mint.vercel.app](https://aud-mint.vercel.app)
* **Backend API:** [https://audmint.onrender.com](https://audmint.onrender.com)
* **GitHub Repository:** [https://github.com/ankit18193/AudMint](https://github.com/ankit18193/AudMint)

---

# Overview

AudMint is a free AI Spend Audit tool designed for startup founders, engineering managers, indie hackers, and growing teams who use AI products such as ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and other AI-powered development or productivity tools.

The platform analyzes a team's current AI subscriptions, monthly spending, team size, and usage patterns to:

* Detect overspending
* Recommend cheaper plans
* Suggest alternative AI tools
* Estimate monthly & annual savings
* Generate AI-powered audit summaries
* Provide shareable audit reports
* Capture leads for Credex consultation opportunities

This project was built as part of the Credex Web Development Internship Assignment. fileciteturn11file0

---

# Key Features

## 1. AI Spend Input Form

Users can:

* Select AI tools
* Choose subscription plans
* Enter monthly spend
* Add number of seats
* Select primary use case
* Persist form data across reloads

### Supported Tools

* Cursor
* GitHub Copilot
* Claude
* ChatGPT
* Anthropic API
* OpenAI API
* Gemini
* Windsurf

---

## 2. Intelligent Audit Engine

The audit engine evaluates:

* Whether users are on the correct plan
* If cheaper plans are available
* If alternative tools offer better value
* Potential savings through AI infrastructure credits

Audit recommendations are based on:

* Team size
* Usage type
* Subscription economics
* Feature fit
* Current vendor pricing

---

## 3. Detailed Audit Results

The results page includes:

* Total monthly savings
* Total yearly savings
* Per-tool recommendations
* Cost breakdown
* Personalized improvement suggestions
* Credex consultation CTA for high-savings users

---

## 4. AI-Generated Personalized Summary

The platform uses LLM-powered summarization to:

* Generate personalized audit insights
* Explain overspending patterns
* Suggest optimization strategies
* Improve user engagement

Fallback summaries are generated if the AI provider fails.

---

## 5. Lead Capture & Storage

Lead capture system supports:

* Email collection
* Company name
* Team size
* Role
* Database storage
* Transactional email workflows
* Abuse prevention mechanisms

---

## 6. Shareable Public Reports

Each audit receives:

* Unique public URL
* Open Graph support
* Share-friendly preview cards
* Privacy-safe public data rendering

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion

## Backend

* Node.js
* Express.js
* TypeScript

## Database & Storage

* PostgreSQL / Local persistence fallback

## AI Integration

* Anthropic API
* OpenAI API

## Deployment

* Vercel (Frontend)
* Render (Backend)

---

# Architecture Summary

## Frontend Responsibilities

* User interaction
* Form management
* Audit visualization
* Shareable pages
* Open Graph rendering
* API integration

## Backend Responsibilities

* Audit logic
* Pricing analysis
* AI summary generation
* Lead capture
* Validation
* Persistence
* Abuse protection

---

# Screenshots

## Landing Page

> INSERT SCREENSHOT HERE

Recommended filename:

```txt
screenshots/landing-page.png
```

---

## Spend Input Form

> INSERT SCREENSHOT HERE

Recommended filename:

```txt
screenshots/spend-form.png
```

---

## Audit Results Dashboard

> INSERT SCREENSHOT HERE

Recommended filename:

```txt
screenshots/audit-results.png
```

---

## AI Summary Section

> INSERT SCREENSHOT HERE

Recommended filename:

```txt
screenshots/ai-summary.png
```

---

## Shareable Report URL

> INSERT SCREENSHOT HERE

Recommended filename:

```txt
screenshots/shareable-report.png
```

---

## Mobile Responsive Design

> INSERT SCREENSHOT HERE

Recommended filename:

```txt
screenshots/mobile-view.png
```

---

# Folder Structure

```bash
AudMint/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── app/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── routes/
│   ├── services/
│   ├── validation/
│   ├── middleware/
│   ├── engine/
│   └── package.json
│
├── README.md
├── ARCHITECTURE.md
├── DEVLOG.md
├── REFLECTION.md
├── GTM.md
├── ECONOMICS.md
├── PROMPTS.md
├── TESTS.md
├── PRICING_DATA.md
└── LANDING_COPY.md
```

---

# Local Development Setup

## 1. Clone Repository

```bash
git clone https://github.com/ankit18193/AudMint.git
```

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

## 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:3001
```

---

# Environment Variables

## Frontend

Create:

```txt
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=https://audmint.onrender.com
```

---

## Backend

Create:

```txt
backend/.env
```

Example:

```env
PORT=3001
DATABASE_URL=your_database_url
ANTHROPIC_API_KEY=your_api_key
OPENAI_API_KEY=your_api_key
RESEND_API_KEY=your_resend_key
```

---

# Deployment Guide

## Frontend Deployment (Vercel)

### Root Directory

```txt
frontend
```

### Framework

```txt
Next.js
```

### Build Command

```txt
next build
```

---

## Backend Deployment (Render)

### Root Directory

```txt
backend
```

### Dockerfile Path

```txt
Dockerfile
```

### Build Context

```txt
.
```

---

# Testing

Run frontend tests:

```bash
npm test
```

Run backend tests:

```bash
cd backend
npm test
```

---

# Accessibility & Performance

The project was optimized for:

* Lighthouse Performance
* Accessibility
* SEO
* Mobile responsiveness
* Open Graph previews
* Fast loading

Target scores:

* Performance ≥ 85
* Accessibility ≥ 90
* Best Practices ≥ 90

---

# Security Measures

Implemented security features:

* Environment variable protection
* Rate limiting
* Input validation
* Honeypot abuse prevention
* API validation
* Safe public report sharing

---

# Engineering Decisions

## 1. Next.js Instead of Plain React

Next.js was selected because:

* Better routing
* SEO support
* Server rendering
* Open Graph support
* Easier deployment

Trade-off:

* Slightly more complex setup compared to CRA.

---

## 2. TypeScript Over JavaScript

TypeScript improves:

* Maintainability
* Refactoring safety
* Backend reliability
* Team scalability

Trade-off:

* More development overhead initially.

---

## 3. Rule-Based Audit Logic Instead of Full AI

The audit calculations use deterministic rules instead of pure AI.

Reason:

* Predictable outputs
* Financial reliability
* Easier debugging
* Better trustworthiness

AI is only used for personalized summaries.

---

## 4. Render for Backend Deployment

Render was chosen because:

* Easy Docker deployment
* Free tier support
* Persistent backend hosting
* Better Node.js compatibility

Trade-off:

* Cold starts on free tier.

---

## 5. Shareable Public Reports

Public reports improve:

* Virality
* Social sharing
* Organic growth
* Product-led distribution

Trade-off:

* Extra sanitization logic required for privacy.

---

# Challenges Faced

## Deployment Challenges

* Docker build failures
* Missing TypeScript dist folder
* Vercel framework detection issues
* Environment variable handling
* Monorepo deployment configuration

---

## Technical Challenges

* Dynamic audit calculations
* Public report sanitization
* AI summary fallback handling
* Form persistence
* Backend validation architecture

---

# Future Improvements

Planned future features:

* PDF export
* Benchmarking system
* Referral system
* Analytics dashboard
* Multi-team support
* Admin analytics panel
* Cost trend visualizations
* Advanced recommendation engine

---

# Screenshots Checklist

Before submission ensure screenshots include:

* Landing page
* Spend form
* Audit result page
* AI-generated summary
* Mobile responsiveness
* Shareable audit page
* Lead capture flow
* Lighthouse report

---

# CI/CD

GitHub Actions workflow automatically:

* Runs tests
* Executes lint checks
* Verifies builds
* Validates commits

Workflow file:

```txt
.github/workflows/ci.yml
```

---

# API Endpoints

## Audit APIs

```http
POST /api/audit
GET /api/report/:id
POST /api/subscribe
```

---

# Open Graph Support

The application supports:

* Twitter Cards
* Open Graph previews
* Social sharing metadata
* Dynamic share previews

---

# User Flow

```txt
Landing Page
    ↓
Spend Input Form
    ↓
Audit Engine
    ↓
Results Dashboard
    ↓
AI Summary
    ↓
Lead Capture
    ↓
Shareable Public URL
```

---

# Credits

Built by:

**Ankit Kumar Yadav**

For the Credex Web Development Internship Assignment.

---

# Submission Checklist

* [x] Public GitHub repository
* [x] Live deployed frontend
* [x] Live backend API
* [x] Working audit engine
* [x] AI summary integration
* [x] Lead capture system
* [x] Shareable reports
* [x] CI/CD workflow
* [x] Documentation files
* [x] Tests included
* [x] Responsive design
* [x] Pricing references

---

# License

This project was created for educational and internship evaluation purposes.
