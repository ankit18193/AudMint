"use client";

import { useRouter } from 'next/navigation';
import AuditForm from '@/components/AuditForm';

export default function AuditPage() {
  const router = useRouter();

  const handleComplete = (result: any) => {
    // Save to local storage for Results page to read
    localStorage.setItem("audmint_result", JSON.stringify(result));
    router.push('/results');
  };

  return (
    <div className="w-full">
      <AuditForm onComplete={handleComplete} />
    </div>
  );
}
