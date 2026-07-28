'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function QuickActionsPanel({ destination }: { destination: DetailedDestination }) {
  const [isSaved, setIsSaved] = useState(false);
  
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 shadow-xl sticky top-24">
      <h3 className="font-semibold text-lg mb-6 text-foreground">Quick Actions</h3>
      
      <div className="space-y-3">
        <button 
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/20"
        >
          <Icon name="Plus" size={18} />
          Add to Trip
        </button>
        
        <button 
          onClick={() => setIsSaved(!isSaved)}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl transition-all border ${
            isSaved 
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20' 
              : 'bg-white/5 border-white/10 text-foreground hover:bg-white/10'
          }`}
        >
          <Icon name="Heart" size={18} className={isSaved ? "fill-rose-500" : ""} />
          {isSaved ? 'Saved to Collection' : 'Save Destination'}
        </button>
        
        <button 
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-semibold rounded-xl transition-all"
        >
          <Icon name="Share" size={18} />
          Share
        </button>
      </div>
      
      <div className="mt-8 pt-8 border-t border-white/10">
        <button className="w-full group relative h-32 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors">
          <div className="absolute inset-0 bg-zinc-800" /> {/* Placeholder for Mapbox */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Icon name="Map" size={24} className="mb-2" />
            <span className="font-medium text-sm">View on Map</span>
          </div>
        </button>
      </div>
    </div>
  );
}
