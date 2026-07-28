'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface TripProgressBarProps {
  progress: number; // 0–100
  className?: string;
  showLabel?: boolean;
}

export const TripProgressBar = React.memo(function TripProgressBar({
  progress,
  className,
  showLabel = false,
}: TripProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  const barColor =
    clamped === 100
      ? 'bg-emerald-500'
      : clamped >= 60
      ? 'bg-blue-500'
      : clamped >= 30
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Planning progress: ${clamped}%`}
        />
      </div>
      {showLabel && (
        <span className="text-[10px] text-muted-foreground font-medium tabular-nums w-8 text-right">
          {clamped}%
        </span>
      )}
    </div>
  );
});
