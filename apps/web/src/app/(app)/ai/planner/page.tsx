'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlannerLayout } from '@/components/ai/planner/PlannerLayout';
import { PlannerEmpty } from '@/components/ai/planner/PlannerEmpty';
import { plannerRepository } from '@/lib/ai/planner/PlannerRepository';

export default function PlannerIndexPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // For demonstration, if we land on /ai/planner, we simulate an automatic generation kick-off.
    // In a real app, this would be triggered by a "Generate" button from the Trip Wizard.
    async function startGeneration() {
      setIsGenerating(true);
      const sessionId = `session_${Date.now()}`;
      const session = plannerRepository.getSession(sessionId);
      
      // Kick off generation asynchronously
      session.generate({
        destinations: ['Rome'],
        travelDates: { start: '2026-08-01', end: '2026-08-03' },
        budget: '$$$'
      }).catch(console.error);

      // Redirect immediately to the active session view
      router.push(`/ai/planner/${sessionId}`);
    }

    startGeneration();
  }, [router]);

  return (
    <PlannerLayout>
      <div className="p-8">
        <PlannerEmpty />
      </div>
    </PlannerLayout>
  );
}
