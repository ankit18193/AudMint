# User Interviews: AudMint Validation

## Interview 1: "The Skeptical VPE"
**Name:** J.K.  
**Role:** VP of Engineering at a Series B FinTech (90 engineers)  
**Context:** J.K. is under a "hiring freeze" and is looking for internal cost-cutting to keep the current head-count.

### Key Quotes:
1. *"I know I'm wasting money on AI, but I don't know if it's $500 or $5,000. Right now, the pain of auditing it is worse than the pain of paying the bill."*
2. *"If you tell me to switch from Cursor to Copilot, I'll ignore you. My engineers will revolt. But if you tell me I have 15 seats of Cursor for people who haven't opened VS Code in a month, that's a win."*
3. *"The 'Shareable Link' is dangerous. I don't want my board seeing this until I've already fixed it."*

**The Most Surprising Insight:**  
J.K. was more interested in **"Seat Hygiene"** (cleaning up inactive users) than **"Cross-Vendor Switches"** (moving tools). They viewed tool-switching as a "culture killer," whereas seat-trimming was just "good ops."

**Design Change:**  
I updated the Audit Engine to prioritize "Seat Optimization" as the top recommendation if savings are >$200/mo, even if a cross-vendor switch would save more, as it's a "higher-confidence" action for the user.

---

## Interview 2: "The Solofounder / AI Indie Hacker"
**Name:** Alex R.  
**Role:** Founder of a bootstrapped SaaS (3 employees)  
**Context:** Alex is a "power user" who tries every new tool on Day 1.

### Key Quotes:
1. *"I have 4 different Claude accounts across different emails because I kept hitting the 'Pro' limits. I have no idea what my total burn is."*
2. *"I don't need a PDF. I need a link I can send to my accountant so they stop asking me about 'Anthropic Invoice #45'."*
3. *"The 'Notify Me' feature is actually great. I'm always worried I'm missing a new 'v0' equivalent that's cheaper."*

**The Most Surprising Insight:**  
Alex didn't care about "Enterprise Plan" logic at all. They wanted help managing **"API Credits vs. Monthly Seats."** They were overpaying for the Claude UI when they should have been using the API directly for certain bulk tasks.

**Design Change:**  
Added "API Direct" as a plan option for Claude and ChatGPT to allow the engine to recommend moving high-volume tasks from the UI to the API.

---

## Interview 3: "The Finance Ops Manager"
**Name:** S.M.  
**Role:** Finance Manager at a 200-person AI startup  
**Context:** S.M. manages the corporate cards and is frustrated by "Shadow AI" purchases.

### Key Quotes:
1. *"My problem isn't the tools I know about. It's the 40 individual 'Midjourney' subscriptions I see on 40 different expense reports."*
2. *"A 'High Savings' consultation with Credex sounds like a sales pitch. Can you just call it an 'Optimization Review'?"*
3. *"I need to know the 'Spend per Dev' benchmark. Are we spending $50/dev or $200/dev? I have no context."*

**The Most Surprising Insight:**  
S.M. wanted the **"Benchmark Mode"** (Bonus Feature) more than the audit itself. They needed a way to tell the VPE: *"We are spending 2x the industry average on AI tools."*

**Design Change:**  
Added a "Quick Stats" section to the Results page that displays "Monthly Spend Per Team Member," creating an immediate internal benchmark for the user.
