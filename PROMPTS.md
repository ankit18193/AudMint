# AI Prompt Documentation

## Executive Summary Prompt

**System Role:** 
`You are a senior financial consultant providing spend optimization advice.`

**User Prompt Template:**
```text
You are a senior financial consultant. Analyze these AI audit results and provide a 100-word executive summary.

Context:
Team Size: {{teamSize}}
Primary Use Case: {{primaryUseCase}}

Results:
Total Monthly Savings: ${{totalSavingsMonthly}}
Total Annual Savings: ${{totalSavingsYearly}}
{{globalInsightContext}}

Recommendations:
{{recommendations_list}}

Output Requirements:
- Length: ~100 words.
- Tone: Professional, authoritative, data-driven.
- Include: Reasoning for optimizations, savings overview, and one key action suggestion.
- Format: Plain text only. No markdown headers.
```

## Reasoning

1. **Context Awareness**: By providing the `teamSize` and `primaryUseCase`, the AI understands *why* certain tools were flagged for downgrade (e.g., enterprise plans for 1-person teams).
2. **Data-Driven Output**: Explicitly asking for a "100-word executive summary" ensures the response is concise and suitable for a results dashboard.
3. **Actionability**: The requirement to include a "key action suggestion" moves the summary from passive observation to active consulting.
4. **Resiliency**: The prompt is designed to work with or without a `globalInsight`, making it stable across different audit outcomes.
5. **Standardization**: Restricting formatting to "plain text" prevents the AI from generating excessive markdown that might clash with the frontend UI.
