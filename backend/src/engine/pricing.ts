export type ToolName = 
  | 'Cursor'
  | 'GitHub Copilot'
  | 'Claude'
  | 'ChatGPT'
  | 'Gemini'
  | 'Windsurf'
  | 'v0'
  | 'Anthropic API direct'
  | 'OpenAI API direct'
  | 'Midjourney'
  | 'Notion AI'
  | 'Perplexity'
  | 'Jasper';

export type PlanName = string;

export interface ToolPricing {
  name: ToolName;
  plan: PlanName;
  costPerSeat: number;
  category: 'coding' | 'writing' | 'ui' | 'mixed' | 'search' | 'design' | 'api';
  isTeamPlan: boolean;
  credexEligible?: boolean; // Can this be bought via Credex credits?
}

export const PRICING_DATA: ToolPricing[] = [
  // Coding
  { name: 'Cursor', plan: 'Hobby', costPerSeat: 0, category: 'coding', isTeamPlan: false },
  { name: 'Cursor', plan: 'Pro', costPerSeat: 20, category: 'coding', isTeamPlan: false },
  { name: 'Cursor', plan: 'Business', costPerSeat: 40, category: 'coding', isTeamPlan: true, credexEligible: true },
  { name: 'Cursor', plan: 'Enterprise', costPerSeat: 60, category: 'coding', isTeamPlan: true, credexEligible: true },
  
  { name: 'GitHub Copilot', plan: 'Individual', costPerSeat: 10, category: 'coding', isTeamPlan: false },
  { name: 'GitHub Copilot', plan: 'Business', costPerSeat: 19, category: 'coding', isTeamPlan: true, credexEligible: true },
  { name: 'GitHub Copilot', plan: 'Enterprise', costPerSeat: 39, category: 'coding', isTeamPlan: true, credexEligible: true },
  
  { name: 'Windsurf', plan: 'Pro', costPerSeat: 15, category: 'coding', isTeamPlan: false },

  // Writing / Assistants
  { name: 'Claude', plan: 'Free', costPerSeat: 0, category: 'writing', isTeamPlan: false },
  { name: 'Claude', plan: 'Pro', costPerSeat: 20, category: 'writing', isTeamPlan: false },
  { name: 'Claude', plan: 'Team', costPerSeat: 25, category: 'writing', isTeamPlan: true, credexEligible: true },
  { name: 'Claude', plan: 'Enterprise', costPerSeat: 45, category: 'writing', isTeamPlan: true, credexEligible: true },
  { name: 'Claude', plan: 'Max', costPerSeat: 30, category: 'writing', isTeamPlan: false },
  { name: 'Claude', plan: 'API direct', costPerSeat: 1, category: 'api', isTeamPlan: false },
  
  { name: 'ChatGPT', plan: 'Plus', costPerSeat: 20, category: 'writing', isTeamPlan: false },
  { name: 'ChatGPT', plan: 'Team', costPerSeat: 25, category: 'writing', isTeamPlan: true, credexEligible: true },
  { name: 'ChatGPT', plan: 'Enterprise', costPerSeat: 50, category: 'writing', isTeamPlan: true, credexEligible: true },
  { name: 'ChatGPT', plan: 'API direct', costPerSeat: 1, category: 'api', isTeamPlan: false },

  { name: 'Gemini', plan: 'Free', costPerSeat: 0, category: 'writing', isTeamPlan: false },
  { name: 'Gemini', plan: 'Pro', costPerSeat: 19.99, category: 'writing', isTeamPlan: false },
  { name: 'Gemini', plan: 'Ultra', costPerSeat: 29.99, category: 'writing', isTeamPlan: false },
  { name: 'Gemini', plan: 'API', costPerSeat: 1, category: 'api', isTeamPlan: false },

  // Direct APIs
  { name: 'Anthropic API direct', plan: 'Usage-based', costPerSeat: 1, category: 'api', isTeamPlan: false, credexEligible: true },
  { name: 'OpenAI API direct', plan: 'Usage-based', costPerSeat: 1, category: 'api', isTeamPlan: false, credexEligible: true },

  // UI / Design
  { name: 'v0', plan: 'Pro', costPerSeat: 20, category: 'ui', isTeamPlan: false },
  { name: 'Midjourney', plan: 'Basic', costPerSeat: 10, category: 'design', isTeamPlan: false },
  { name: 'Midjourney', plan: 'Standard', costPerSeat: 30, category: 'design', isTeamPlan: false },
  { name: 'Midjourney', plan: 'Pro', costPerSeat: 60, category: 'design', isTeamPlan: false },

  // Mixed / Search
  { name: 'Notion AI', plan: 'Plus', costPerSeat: 10, category: 'mixed', isTeamPlan: true },
  { name: 'Notion AI', plan: 'Business', costPerSeat: 20, category: 'mixed', isTeamPlan: true },
  { name: 'Perplexity', plan: 'Free', costPerSeat: 0, category: 'search', isTeamPlan: false },
  { name: 'Perplexity', plan: 'Pro', costPerSeat: 20, category: 'search', isTeamPlan: false },
  { name: 'Perplexity', plan: 'Enterprise Pro', costPerSeat: 40, category: 'search', isTeamPlan: true },
  { name: 'Jasper', plan: 'Pro', costPerSeat: 39, category: 'writing', isTeamPlan: true },
];
