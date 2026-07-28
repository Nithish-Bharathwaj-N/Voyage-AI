'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function DestinationHighlights({ trip }: { trip: WorkspaceTrip }) {
  // We don't have full destination objects in the WorkspaceTrip mock beyond destinationsLabel
  // But we can parse the label or show a placeholder list.
  
  const labels = trip.destinationsLabel.split(',').map(s => s.trim());
  
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-lg">
          <Icon name="Map" size={20} className="text-indigo-400" />
        </div>
        <h3 className="font-semibold text-foreground">Destinations</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {labels.map((dest, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Icon name="MapPin" size={20} className="text-indigo-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{dest}</h4>
              <p className="text-xs text-muted-foreground mt-1">Planned Destination</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
