'use client';

import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import { ActivityItem } from '@/types/itinerary';

interface ActivityCardProps {
  activity: ActivityItem;
  isSelected?: boolean;
  onClick?: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Dining: 'bg-orange-100 text-orange-700',
  Accommodation: 'bg-purple-100 text-purple-700',
  Sightseeing: 'bg-blue-100 text-blue-700',
};

function getCategoryLabel(activity: string): string {
  const a = activity?.toLowerCase() ?? '';
  if (/restaurant|dining|food|lunch|dinner|cafe/.test(a)) return 'Dining';
  if (/hotel|stay|accommod|resort|hostel/.test(a)) return 'Accommodation';
  return 'Sightseeing';
}

/**
 * Renders a single itinerary activity card with time, location, cost, and category badge.
 */
export function ActivityCard({ activity, isSelected, onClick }: ActivityCardProps) {
  const category = getCategoryLabel(activity.activity);
  const colorClass = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Sightseeing;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl border transition-all group ${
        isSelected
          ? 'border-blue-400 bg-blue-50'
          : 'border-slate-100 hover:border-slate-300:border-slate-700 bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0 space-y-1">
          <p className="text-xs font-bold text-slate-800 leading-snug truncate">
            {activity.activity}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md ${colorClass}`}>
              {category}
            </span>
            {activity.location && (
              <span className="flex items-center gap-0.5 text-[10px] text-slate-400 font-medium">
                <MapPin className="w-2.5 h-2.5" />
                {activity.location}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right space-y-1">
          {activity.time && (
            <div className="flex items-center gap-1 text-[10px] text-slate-400 justify-end">
              <Clock className="w-2.5 h-2.5" />
              <span className="font-semibold">{activity.time}</span>
            </div>
          )}
          {activity.estimatedCost > 0 && (
            <div className="flex items-center gap-0.5 text-[10px] text-emerald-600 font-bold justify-end">
              <DollarSign className="w-2.5 h-2.5" />
              <span>{activity.currency} {activity.estimatedCost.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
