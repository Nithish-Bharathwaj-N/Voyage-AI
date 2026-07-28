'use client';

import React from 'react';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';
import { Icon } from '@/components/icons/Icon';

export function OverviewCard({ destination }: { destination: DetailedDestination }) {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Icon name="Info" size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">About {destination.city}</h2>
      </div>
      
      <p className="text-lg text-foreground/80 leading-relaxed mb-8">
        {destination.overview.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-white/10">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
          <div className="p-2 bg-white/10 rounded-lg shrink-0">
            <Icon name="Languages" size={20} className="text-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Language</h4>
            <p className="text-sm text-muted-foreground">{destination.practicalInfo.language}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
          <div className="p-2 bg-white/10 rounded-lg shrink-0">
            <Icon name="Clock" size={20} className="text-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Timezone</h4>
            <p className="text-sm text-muted-foreground">{destination.practicalInfo.timezone}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
          <div className="p-2 bg-white/10 rounded-lg shrink-0">
            <Icon name="CreditCard" size={20} className="text-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Currency</h4>
            <p className="text-sm text-muted-foreground">{destination.practicalInfo.currency}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
          <div className="p-2 bg-white/10 rounded-lg shrink-0">
            <Icon name="FileText" size={20} className="text-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Visa Requirements</h4>
            <p className="text-sm text-muted-foreground">
              {destination.practicalInfo.visaRequired === null ? 'Check local embassy' : destination.practicalInfo.visaRequired ? 'Required' : 'Not required for most'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
