'use client';

import React from 'react';
import { DayPlan } from '@/types/itinerary';
import { DayCard } from './DayCard';
import { BudgetCard } from './BudgetCard';
import { RouteSummary } from './RouteSummary';

interface TimelinePanelProps {
  days: DayPlan[];
  currency: string;
  budgetTotal: number;
  budgetLimit: number;
  selectedActivityId?: string | null;
  onActivityClick?: (id: string) => void;
}

/**
 * Renders the scrollable itinerary timeline with day cards, budget summary, and route overview.
 */
export function TimelinePanel({
  days,
  currency,
  budgetTotal,
  budgetLimit,
  selectedActivityId,
  onActivityClick,
}: TimelinePanelProps) {
  const totalStops = days.reduce((sum, d) => sum + d.activities.length, 0);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <div className="pb-2 border-b border-slate-100">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Itinerary · {days.length} Days
        </span>
      </div>

      <RouteSummary totalDays={days.length} totalStops={totalStops} />
      <BudgetCard currency={currency} total={budgetTotal} limit={budgetLimit} />

      {days.map((day, i) => (
        <DayCard
          key={day.dayNumber}
          day={day}
          index={i}
          selectedActivityId={selectedActivityId}
          onActivityClick={onActivityClick}
        />
      ))}
    </div>
  );
}
