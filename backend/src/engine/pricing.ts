export type ToolName = 
  | 'Cursor'
  | 'GitHub Copilot'
  | 'Claude'
  | 'ChatGPT'
  | 'Gemini'
  | 'Windsurf'
  | 'v0'
  | 'Midjourney'
  | 'Notion AI'
  | 'Perplexity'
  | 'Jasper';

export type PlanName = string;

export interface ToolPricing {
  name: ToolName;
  plan: PlanName;
  costPerSeat: number;
  category: 'coding' | 'writing' | 'ui' | 'mixed' | 'search' | 'design';
  isTeamPlan: boolean;
}

export const PRICING_DATA: ToolPricing[] = [
  { name: 'Cursor', plan: 'Hobby', costPerSeat: 0, category: 'coding', isTeamPlan: false },
  { name: 'Cursor', plan: 'Pro', costPerSeat: 20, category: 'coding', isTeamPlan: false },
  { name: 'Cursor', plan: 'Business', costPerSeat: 40, category: 'coding', isTeamPlan: true },
  
  { name: 'GitHub Copilot', plan: 'Free', costPerSeat: 0, category: 'coding', isTeamPlan: false },
  { name: 'GitHub Copilot', plan: 'Pro', costPerSeat: 10, category: 'coding', isTeamPlan: false },
  { name: 'GitHub Copilot', plan: 'Business', costPerSeat: 19, category: 'coding', isTeamPlan: true },
  
  { name: 'Claude', plan: 'Free', costPerSeat: 0, category: 'writing', isTeamPlan: false },
  { name: 'Claude', plan: 'Pro', costPerSeat: 20, category: 'writing', isTeamPlan: false },
  { name: 'Claude', plan: 'Team', costPerSeat: 25, category: 'writing', isTeamPlan: true },
  
  { name: 'ChatGPT', plan: 'Free', costPerSeat: 0, category: 'writing', isTeamPlan: false },
  { name: 'ChatGPT', plan: 'Plus', costPerSeat: 20, category: 'writing', isTeamPlan: false },
  { name: 'ChatGPT', plan: 'Business', costPerSeat: 20, category: 'writing', isTeamPlan: true },
  
  { name: 'Gemini', plan: 'Free', costPerSeat: 0, category: 'writing', isTeamPlan: false },
  { name: 'Gemini', plan: 'AI Pro', costPerSeat: 19.99, category: 'writing', isTeamPlan: false },
  
  { name: 'Windsurf', plan: 'Pro', costPerSeat: 15, category: 'coding', isTeamPlan: false },
  
  { name: 'v0', plan: 'Pro', costPerSeat: 20, category: 'ui', isTeamPlan: false },

  { name: 'Midjourney', plan: 'Basic', costPerSeat: 10, category: 'design', isTeamPlan: false },
  { name: 'Midjourney', plan: 'Standard', costPerSeat: 30, category: 'design', isTeamPlan: false },
  { name: 'Midjourney', plan: 'Pro', costPerSeat: 60, category: 'design', isTeamPlan: false },

  { name: 'Notion AI', plan: 'Plus', costPerSeat: 10, category: 'mixed', isTeamPlan: true },
  { name: 'Notion AI', plan: 'Business', costPerSeat: 20, category: 'mixed', isTeamPlan: true },

  { name: 'Perplexity', plan: 'Free', costPerSeat: 0, category: 'search', isTeamPlan: false },
  { name: 'Perplexity', plan: 'Pro', costPerSeat: 20, category: 'search', isTeamPlan: false },
  { name: 'Perplexity', plan: 'Enterprise Pro', costPerSeat: 40, category: 'search', isTeamPlan: true },

  { name: 'Jasper', plan: 'Pro', costPerSeat: 39, category: 'writing', isTeamPlan: true },
];
