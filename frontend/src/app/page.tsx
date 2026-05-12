"use client";

import { useRouter } from 'next/navigation';
import Landing from '@/components/Landing';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/audit');
  };

  const handleSample = () => {
    const sampleResult = {
      id: "sample-123",
      teamSize: "50-100",
      useCase: "Software Engineering",
      tools: ["ChatGPT Enterprise", "GitHub Copilot", "Midjourney"],
      totalSavingsMonthly: 4250,
      totalSavingsYearly: 51000,
      recommendations: [
        {
          tool: "ChatGPT Enterprise",
          type: "DOWNGRADE",
          currentPlan: "$60/seat/mo",
          recommendedAction: "Downgrade 12 users to Plus",
          reason: "Analysis shows 12 provisioned seats have minimal activity. Downgrading them recovers significant spend immediately.",
          savingsMonthly: 1200,
        },
        {
          tool: "GitHub Copilot",
          type: "CONSOLIDATE",
          currentPlan: "$19/seat/mo",
          recommendedAction: "Remove overlapping seats",
          reason: "Multiple users are provisioned with both Cursor and Copilot. Standardize on Cursor for these users.",
          savingsMonthly: 850,
        },
        {
          tool: "Midjourney",
          type: "CANCEL",
          currentPlan: "$30/seat/mo",
          recommendedAction: "Cancel redundant seats",
          reason: "Duplicate capability detected with Canva AI which your team already pays for.",
          savingsMonthly: 600,
        }
      ],
      aiSummary: "Your AI stack has significant overlap. By standardizing on fewer tools and downgrading inactive users, you can recover over $4,000 monthly without impacting engineering velocity."
    };
    
    // Save to localStorage so Results page can pick it up
    localStorage.setItem("audmint_result", JSON.stringify(sampleResult));
    router.push('/results');
  };

  return (
    <div className="w-full">
      <Landing onStart={handleStart} onSample={handleSample} />
    </div>
  );
}
