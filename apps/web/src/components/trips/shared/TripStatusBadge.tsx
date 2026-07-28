'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import type { TripStatus } from '@/lib/trips/types/trips.types';

const statusConfig: Record<
  TripStatus,
  { label: string; className: string }
> = {
  planning: {
    label: 'Planning',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  active: {
    label: 'Active',
    className: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  },
  completed: {
    label: 'Completed',
    className: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  },
};

interface TripStatusBadgeProps {
  status: TripStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export const TripStatusBadge = React.memo(function TripStatusBadge({
  status,
  size = 'sm',
  className,
}: TripStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center border font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-[10px] tracking-wide' : 'px-3 py-1 text-xs',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
});
