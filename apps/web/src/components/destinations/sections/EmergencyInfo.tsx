'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function EmergencyInfo({ destination }: { destination: DetailedDestination }) {
  if (!destination.tips?.emergency || destination.tips.emergency.length === 0) return null;

  return (
    <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-500/20 rounded-xl">
          <Icon name="PhoneCall" size={20} className="text-rose-500" />
        </div>
        <h3 className="text-xl font-bold text-rose-500">Emergency Info</h3>
      </div>
      
      <div className="space-y-3">
        {destination.tips.emergency.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-rose-500/10">
            <span className="text-sm font-medium text-foreground">{item.label}</span>
            <span className="text-sm font-bold text-rose-400">{item.number}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
