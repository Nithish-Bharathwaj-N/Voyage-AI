'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function TransportationCard({ destination }: { destination: DetailedDestination }) {
  if (!destination.transportation) return null;

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-xl">
          <Icon name="Train" size={20} className="text-indigo-500" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Getting Around</h3>
      </div>
      
      <div className="space-y-4">
        {destination.transportation.methods.map((method, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="p-2 bg-white/5 rounded-lg shrink-0 mt-1">
              {/* @ts-expect-error dynamic icon */}
              <Icon name={method.icon || 'Navigation'} size={16} className="text-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">{method.type}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {destination.transportation.tip && (
        <div className="mt-6 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-3">
          <Icon name="Lightbulb" size={16} className="text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-200/90 leading-relaxed">{destination.transportation.tip}</p>
        </div>
      )}
    </div>
  );
}
