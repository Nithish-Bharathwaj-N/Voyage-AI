'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingProps {
  label?: string;
  className?: string;
}

/**
 * Reusable full-container loading spinner.
 */
export function Loading({ label, className = '' }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-3 min-h-[140px] text-slate-500 select-none ${className}`}>
      <Loader2 className="w-6 h-6 animate-spin text-slate-800 shrink-0" />
      {label && <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>}
    </div>
  );
}
