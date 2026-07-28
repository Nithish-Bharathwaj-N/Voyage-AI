'use client';

import React from 'react';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';
import { Icon } from '@/components/icons/Icon';

export function SafetyCard({ destination }: { destination: DetailedDestination }) {
  const isHigh = destination.safety.score >= 80;
  const isMed = destination.safety.score >= 50 && destination.safety.score < 80;
  
  const colorClass = isHigh ? 'text-emerald-500' : isMed ? 'text-amber-500' : 'text-rose-500';
  const bgClass = isHigh ? 'bg-emerald-500/10' : isMed ? 'bg-amber-500/10' : 'bg-rose-500/10';

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-xl ${bgClass}`}>
          <Icon name="Shield" size={20} className={colorClass} />
        </div>
        <h3 className="font-semibold text-foreground">Safety</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-foreground">
          {destination.safety.score}/100
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{destination.safety.label}</p>
    </div>
  );
}
