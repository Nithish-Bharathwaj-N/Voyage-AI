import React from 'react';
import { BaseCard } from './BaseCard';
import type { RestaurantActivity } from '@/lib/planner/types/planner.types';
import { Icon } from '@/components/icons/Icon';

export function RestaurantCard({ activity }: { activity: RestaurantActivity }) {
  return (
    <BaseCard activity={activity} icon="Utensils" iconColorClass="bg-orange-500">
      {activity.cuisine && (
        <div className="mb-2">
          <span className="text-xs font-medium bg-orange-500/10 text-orange-700 px-2 py-0.5 rounded-full">{activity.cuisine}</span>
        </div>
      )}
      {activity.notes && (
        <div className="text-xs text-muted-foreground flex gap-2">
          <Icon name="Info" size={14} className="shrink-0" />
          <p>{activity.notes}</p>
        </div>
      )}
    </BaseCard>
  );
}
