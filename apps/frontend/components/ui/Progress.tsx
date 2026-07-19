'use client';

import React from 'react';

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

/**
 * Premium linear progress indicators bar (e.g. for spending targets).
 */
export function Progress({ value, max = 100, className = '' }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative shrink-0 ${className}`}>
      <div
        className="h-full bg-slate-900 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
