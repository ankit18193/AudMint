# User Research Report: AudMint Validation

This document summarizes the insights gained from three qualitative user interviews conducted during the development of AudMint. These conversations directly informed the product’s core logic and UX design.

---

# 1. Interview Summary: The "Efficiency-First" VPE

### **Participant Profile**
- **Initials**: J.K.
- **Role**: VP of Engineering (Series B FinTech)
- **Team Size**: 90 Engineers
- **Core Pain Point**: Managing a "hiring freeze" while maintaining tool budgets.

### **Key Insights & Direct Quotes**
1. *"I know I'm wasting money on AI, but I don't know if it's $500 or $5,000. Right now, the pain of auditing it manually is worse than the pain of paying the bill."*
2. *"If you tell me to switch from Cursor to Copilot, I'll ignore you. My engineers will revolt. But if you tell me I have 15 seats of Cursor for people who haven't opened VS Code in a month, that's a win."*
3. *"The 'Shareable Link' is a double-edged sword. I don't want my board seeing these numbers until I've already optimized them."*

### **The "Surprising" Moment**
J.K. viewed tool-switching as a "culture killer." They were far more interested in **"Seat Hygiene"** (identifying inactive users) than **"Cross-Vendor Arbitrage"**. They preferred high-confidence, low-friction savings over maximum theoretical savings.

### **Design Impact**
I updated the Audit Engine to prioritize **Seat Optimization** as the #1 recommendation. Even if a switch to a different tool would save more money, the engine now highlights seat reduction first as it represents a "higher-confidence" action for the leader.

---

# 2. Interview Summary: The "Multi-Tool" Solofounder

### **Participant Profile**
- **Initials**: Alex R.
- **Role**: Bootstrapped SaaS Founder
- **Team Size**: 3 Employees
- **Core Pain Point**: Subscription sprawl and hit-or-miss tool usage.

### **Key Insights & Direct Quotes**
1. *"I have 4 different Claude accounts across different personal emails because I kept hitting the 'Pro' limits. I have no idea what my total burn is."*
2. *"I don't need a PDF. I need a URL I can send to my accountant so they stop asking me about 'Anthropic Invoice #45' every month."*
3. *"The 'Notify Me' feature is actually great. I'm always worried I'm missing a new 'v0' equivalent that's cheaper or better."*

### **The "Surprising" Moment**
Alex didn't care about "Enterprise Plan" logic. They were struggling with the trade-off between **"UI-based Subscriptions" vs. "API Direct Usage."** They were overpaying for the Claude UI when they should have been using the API for their specific bulk research tasks.

### **Design Impact**
I added **"API Direct"** as a plan option for Claude and ChatGPT. This allows the engine to recommend moving high-volume tasks from the UI to the API, capturing a specific segment of "Power User" waste.

---

# 3. Interview Summary: The "Finance Ops" Manager

### **Participant Profile**
- **Initials**: S.M.
- **Role**: Finance Manager (AI Startup)
- **Team Size**: 200 Employees
- **Core Pain Point**: "Shadow AI" purchases appearing on individual expense reports.

### **Key Insights & Direct Quotes**
1. *"My problem isn't the tools I know about. It's the 40 individual 'Midjourney' or 'Perplexity' subscriptions I see on 40 different expense reports."*
2. *"A 'High Savings' consultation with Credex sounds like a sales pitch. Can you just call it an 'Optimization Review'?"*
3. *"I need a benchmark. Are we spending $50/dev or $200/dev? I have no context for what 'Good' looks like."*

### **The "Surprising" Moment**
S.M. was less interested in the audit itself and more interested in the **"Benchmark Mode."** They needed a way to tell the Head of Engineering: *"We are spending 2x the industry average on AI tools."*

### **Design Impact**
I implemented the **"Industry Benchmark" UI** on the Results and Public Report pages. This displays the "Monthly Spend Per Team Member," giving Finance stakeholders the "Social Proof" data they need to justify optimization efforts.

---

# 4. Conclusion: Research Synthesis

These interviews confirmed that the value of AudMint is not just in "saving money," but in **providing visibility and defensibility.** Engineering leaders want "Seat Hygiene," Founders want "API Optimization," and Finance wants "Benchmarking." The final product architecture reflects all three of these pillars.
