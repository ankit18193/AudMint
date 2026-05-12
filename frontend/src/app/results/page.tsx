"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Results from '@/components/Results';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage to hydrate the result state
    const saved = localStorage.getItem("audmint_result");
    if (saved) {
      setResult(JSON.parse(saved));
      setLoading(false);
    } else {
      // If no result is found, push back to home
      router.push('/');
    }
  }, [router]);

  const handleReset = () => {
    localStorage.removeItem("audmint_result");
    localStorage.removeItem("audmint_form");
    router.push('/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fafafa' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid #e5e7eb', borderTopColor: '#111827', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full">
      <Results result={result} onReset={handleReset} />
    </div>
  );
}
