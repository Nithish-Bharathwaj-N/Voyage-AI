'use client';

import React from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Clean CSS-based hover tooltip indicator primitive.
 */
export function Tooltip({ content, children, className = '' }: TooltipProps) {
  return (
    <div className={`relative group inline-block ${className}`}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none select-none z-30 uppercase tracking-wide">
        {content}
      </div>
    </div>
  );
}
