'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function TravelTips({ destination }: { destination: DetailedDestination }) {
  if (!destination.tips?.general || destination.tips.general.length === 0) return null;

  return (
    <div id="tips" className="scroll-mt-32 space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Travel Tips</h3>
      <div className="bg-card border border-white/10 rounded-3xl p-6">
        <ul className="space-y-4">
          {destination.tips.general.map((tip, i) => (
            <li key={i} className="flex items-start gap-3">
              <Icon name="CheckCircle2" size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/90">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
