# AI Prompt Engineering Documentation: AudMint

This document outlines the prompt engineering strategy, system instructions, and synthesis logic used to generate personalized executive summaries within AudMint.

The core philosophy of AudMint’s AI integration is:
> AI should explain the recommendations, not calculate them.

---

# 1. AI Synthesis Strategy

AudMint intentionally separates deterministic financial auditing from qualitative summarization.

| Layer | Responsibility | Technology |
|---|---|---|
| **Audit Engine** | Math, Pricing, Downgrades, Savings | TypeScript (Deterministic) |
| **Synthesis Layer** | Reasoning, Context, Summarization | Anthropic Claude 3.5 Sonnet |

### **Primary Synthesis Goals**
- Translate raw CSV-style audit data into a business-focused narrative.
- Provide a “High-Impact” summary for engineering leadership (VPE/CTO).
- Contextualize savings based on specific team use cases (e.g., Coding vs. Research).
- Maintain a professional, consultative, and data-driven voice.

---

# 2. Prompt Configuration

## System Role
The LLM is assigned a specific persona to ensure the tone remains professional and avoids generic “AI-assistant” fluff.

```text
You are a senior financial consultant specializing in AI infrastructure and SaaS spend optimization. 
Your tone is professional, authoritative, and data-driven. 
You prioritize operational efficiency and cost recovery over generic encouragement.
```

---

## User Prompt Template
The prompt is constructed dynamically based on the results of the deterministic audit engine.

```text
Analyze these AI audit results and provide a 100-word executive summary for a VP of Engineering.

CONTEXT:
- Team Size: {{teamSize}}
- Primary Use Case: {{primaryUseCase}}

AUDIT DATA:
- Total Monthly Savings: ${{totalSavingsMonthly}}
- Total Annual Savings: ${{totalSavingsYearly}}
- Key Efficiency Insight: {{globalInsightContext}}

DETAILED RECOMMENDATIONS:
{{recommendations_list}}

OUTPUT REQUIREMENTS:
1. Length: Approximately 100 words.
2. Tone: Professional and consultative.
3. Content: Focus on the 'Why' behind the identified waste.
4. Action: Conclude with a specific next-step suggestion.
5. Format: Plain text only. No markdown headers. No bolding. No lists.
```

---

# 3. Variable Mapping

The following variables are injected into the template from the `AuditResult` object:

| Variable | Source | Description |
|---|---|---|
| `{{teamSize}}` | User Input | Used by the AI to understand the scale of the organization. |
| `{{primaryUseCase}}` | User Input | Anchors the reasoning in the team's actual work (e.g., Coding). |
| `{{totalSavingsYearly}}` | Audit Engine | The headline financial impact. |
| `{{globalInsightContext}}` | Audit Engine | A deterministic flag identifying the largest category of waste. |
| `{{recommendations_list}}` | Audit Engine | A serialized list of per-tool recommended actions. |

---

# 4. Prompt Engineering Rationale

### **Contextual Anchoring**
By providing `teamSize` and `useCase` at the top of the prompt, we prevent the AI from making amateur suggestions. If the team is 50 people, the AI knows that individual "Hobby" plans are likely a source of friction, even if they are cheaper.

### **Formatting Constraints**
The instruction `Plain text only. No markdown headers.` is critical. It ensures the AI output fits perfectly into the frontend's pre-styled summary card without breaking the layout or introducing inconsistent typography.

### **Deterministic Guardrails**
We intentionally provide the AI with the **calculated savings numbers**. We never ask the AI to "estimate" the savings, as LLMs are notoriously unreliable with multi-step arithmetic. The AI’s job is to provide the *narrative* for the math we already performed.

---

# 5. Iteration History: What Was Discarded

Several prompt variations were tested and rejected during development:

| Rejected Approach | Reason for Rejection |
|---|---|
| **Encouraging/Upbeat Tone** | Felt like a gimmick. B2B leaders prefer "Consultative/Direct." |
| **Bolding for Emphasis** | Created inconsistent UI rendering on mobile devices. |
| **Reasoning Chains** | Asking the AI to "think step-by-step" increased latency without improving the quality of the final 100-word summary. |
| **Tool-Specific Narratives** | Generated repetitive text for audits with 5+ tools. We moved to a "Global Insight" model to keep the summary concise. |

---

# 6. Fallback Implementation

The system is designed for **Graceful Degradation**. In the event of an API timeout, rate limit (429), or service outage from the AI provider, the backend does not error out.

It falls back to a **Deterministic Template Summary**:

> *"We identified ${{totalSavingsYearly}} in potential annual savings for your {{teamSize}}-person team. The primary source of inefficiency is tool overlap in your {{primaryUseCase}} workflow. We recommend consolidating redundant subscriptions and optimizing seat counts to maintain a lean AI infrastructure."*

This ensures the user experience remains stable even during external service disruptions.

---

# 7. Prompt Safety & Security

- **Injection Protection**: User-provided inputs (Company Name, etc.) are sanitized before being included in the prompt context.
- **Privacy**: No PII (emails or personal names) is ever included in the prompt payload sent to the LLM provider.
- **Model Agnostic**: The prompt structure is designed to work effectively with both Anthropic (Claude) and OpenAI (GPT-4o) with minimal tuning.

---

# 8. Summary Philosophy

The synthesis layer is the "Bridge" between raw data and business decisions. By providing a clear, high-fidelity summary, we move the user from:
> *"I have some data"*
to
> *"I have an optimization plan."*

This transition is what converts a "curiosity user" into a "qualified Credex lead."
