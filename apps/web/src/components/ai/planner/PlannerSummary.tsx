'use client';

import React from 'react';
import type { AITripPlan } from '@/lib/ai/planner/types';
import { Icon } from '@/components/icons/Icon';

interface PlannerSummaryProps {
  plan: Partial<AITripPlan>;
}

export function PlannerSummary({ plan }: PlannerSummaryProps) {
  return (
    <div className="bg-card border border-white/10 rounded-2xl p-6 mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-4">{plan.tripName || 'Planning your trip...'}</h1>
      
      {plan.summary && (
        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
          {plan.summary}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Icon name="Wallet" size={14} /> Budget</span>
          <span className="font-semibold text-foreground text-lg">{plan.budget || '—'}</span>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Icon name="Sun" size={14} /> Weather</span>
          <span className="font-semibold text-foreground text-lg">{plan.weather || '—'}</span>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Icon name="Compass" size={14} /> Style</span>
          <span className="font-semibold text-foreground text-lg">{plan.travelStyle || '—'}</span>
        </div>
        
        <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Icon name="Calendar" size={14} /> Duration</span>
          <span className="font-semibold text-foreground text-lg">{plan.days?.length ? `${plan.days.length} Days` : '—'}</span>
        </div>
      </div>
    </div>
  );
}
