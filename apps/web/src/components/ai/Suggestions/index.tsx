'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function Suggestions() {
  const suggestions = [
    { label: 'Plan a 3-day trip to Tokyo', icon: 'Map' },
    { label: 'Best restaurants in Rome', icon: 'Coffee' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar mb-2">
      {suggestions.map((suggestion, i) => (
        <button 
          key={i}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-xs text-muted-foreground whitespace-nowrap"
        >
          {/* @ts-expect-error dynamic */}
          <Icon name={suggestion.icon} size={14} />
          {suggestion.label}
        </button>
      ))}
    </div>
  );
}
