'use client';

import React from 'react';
import type { AITripPlan } from '@/lib/ai/planner/types';
import { DailyTimeline } from './DailyTimeline';

interface PlannerTimelineProps {
  plan: Partial<AITripPlan>;
}

export function PlannerTimeline({ plan }: PlannerTimelineProps) {
  if (!plan.days || plan.days.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl">
      {plan.days.map((dayPlan) => (
        <DailyTimeline key={dayPlan.day} dayPlan={dayPlan} />
      ))}
    </div>
  );
}
