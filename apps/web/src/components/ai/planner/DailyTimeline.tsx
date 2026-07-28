'use client';

import React from 'react';
import type { AIDailyPlan } from '@/lib/ai/planner/types';
import { ActivityCard } from './ActivityCard';

interface DailyTimelineProps {
  dayPlan: AIDailyPlan;
}

export function DailyTimeline({ dayPlan }: DailyTimelineProps) {
  return (
    <div className="mb-12 relative">
      {/* Timeline Line */}
      <div className="absolute left-[84px] top-12 bottom-0 w-px bg-white/10" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
          {dayPlan.day}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Day {dayPlan.day}: {dayPlan.theme || 'Exploration'}</h3>
          <p className="text-sm text-muted-foreground">{dayPlan.date} • {dayPlan.weather || 'Sunny'}</p>
        </div>
      </div>

      {/* Activities */}
      <div className="flex flex-col gap-4 pl-4">
        {dayPlan.morning?.map(activity => (
          <ActivityCard key={activity.id} activity={activity} type="morning" />
        ))}
        {dayPlan.meals?.filter(m => m.time.startsWith('12') || m.time.startsWith('13')).map(activity => (
          <ActivityCard key={activity.id} activity={activity} type="meals" />
        ))}
        {dayPlan.afternoon?.map(activity => (
          <ActivityCard key={activity.id} activity={activity} type="afternoon" />
        ))}
        {dayPlan.evening?.map(activity => (
          <ActivityCard key={activity.id} activity={activity} type="evening" />
        ))}
      </div>
    </div>
  );
}
