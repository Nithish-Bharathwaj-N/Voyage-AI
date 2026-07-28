import React from 'react';
import { BaseCard } from './BaseCard';
import type { HotelActivity } from '@/lib/planner/types/planner.types';
import { Icon } from '@/components/icons/Icon';

export function HotelCard({ activity }: { activity: HotelActivity }) {
  return (
    <BaseCard activity={activity} icon="Bed" iconColorClass="bg-indigo-500">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Check-in</span>
          <span className="font-medium text-foreground">{activity.checkInTime}</span>
        </div>
        {activity.confirmationNumber && (
          <div className="flex flex-col border-l border-border/50 pl-6">
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Confirmation</span>
            <span className="font-medium text-foreground">{activity.confirmationNumber}</span>
          </div>
        )}
      </div>
    </BaseCard>
  );
}
