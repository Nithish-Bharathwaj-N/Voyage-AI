'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PlannerLayout } from '@/components/ai/planner/PlannerLayout';
import { PlannerLoading } from '@/components/ai/planner/PlannerLoading';
import { PlannerError, PlannerEmpty } from '@/components/ai/planner/PlannerEmpty';
import { PlannerSummary } from '@/components/ai/planner/PlannerSummary';
import { PlannerTimeline } from '@/components/ai/planner/PlannerTimeline';
import { PlannerInput } from '@/components/ai/planner/PlannerInput';
import { plannerRepository } from '@/lib/ai/planner/PlannerRepository';
import type { AITripPlan } from '@/lib/ai/planner/types';
import type { WorkflowState } from '@/lib/ai/workflows/types';

export default function ActivePlannerPage() {
  const pathname = usePathname();
  const sessionId = pathname?.split('/').pop() || '';
  
  const [plan, setPlan] = useState<Partial<AITripPlan> | null>(null);
  const [status, setStatus] = useState<WorkflowState>('IDLE');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!sessionId) return;
    
    const session = plannerRepository.getSession(sessionId);
    
    // Defer initial sync to avoid synchronous setState inside effect warning
    setTimeout(() => {
      setStatus(session.state);
      if (session.currentPlan) {
        setPlan(session.currentPlan);
      }
      if (session.state === 'FAILED') {
        setErrorMsg(session.error || 'Unknown error');
      }
    }, 0);

    // A polling mechanism for the mock demo since we don't have websocket/zustand subscriptions yet
    const interval = setInterval(() => {
      setStatus(session.state);
      if (session.currentPlan) {
        setPlan({ ...session.currentPlan }); // spread to trigger re-render
      }
      if (session.state === 'COMPLETED' || session.state === 'FAILED') {
        if (session.state === 'FAILED') setErrorMsg(session.error || 'Unknown error');
        clearInterval(interval);
      }
    }, 100); // 100ms polling for smooth stream simulation

    return () => clearInterval(interval);
  }, [sessionId]);

  const handleRefine = (query: string) => {
    // In a real app, this would append a message and trigger another generation
    console.log('Refining with query:', query);
  };

  const isGenerating = !['IDLE', 'COMPLETED', 'FAILED'].includes(status);

  return (
    <PlannerLayout sessionId={sessionId}>
      <div className="p-8 max-w-7xl mx-auto">
        {isGenerating && !plan && (
          <PlannerLoading />
        )}
        
        {status === 'FAILED' && (
          <PlannerError message={errorMsg} />
        )}
        
        {plan && (
          <div className="animate-in fade-in duration-500">
            <PlannerSummary plan={plan} />
            <PlannerTimeline plan={plan} />
            <PlannerInput onRefine={handleRefine} />
          </div>
        )}
      </div>
    </PlannerLayout>
  );
}
