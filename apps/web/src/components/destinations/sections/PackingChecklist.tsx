'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function PackingChecklist({ destination }: { destination: DetailedDestination }) {
  if (!destination.tips?.packing || destination.tips.packing.length === 0) return null;

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-500/10 rounded-xl">
          <Icon name="Briefcase" size={20} className="text-pink-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Packing List</h3>
      </div>
      
      <ul className="space-y-4">
        {destination.tips.packing.map((item, i) => (
          <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center shrink-0 bg-black/20" />
            <span className="text-sm text-foreground/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
