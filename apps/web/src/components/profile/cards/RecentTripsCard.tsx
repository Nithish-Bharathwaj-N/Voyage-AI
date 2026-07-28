'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';

export function RecentTripsCard() {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl">
            <Icon name="Compass" size={24} className="text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Recent Trips</h2>
        </div>
        <Link href="/trips" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placeholder UI for trips */}
        {[1, 2].map((i) => (
          <div key={i} className="flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/10 opacity-50 cursor-not-allowed">
             <div className="w-20 h-20 rounded-xl bg-white/5 shrink-0" />
             <div className="flex flex-col justify-center gap-2 flex-1">
               <div className="h-4 bg-white/10 rounded w-3/4" />
               <div className="h-3 bg-white/5 rounded w-1/2" />
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
