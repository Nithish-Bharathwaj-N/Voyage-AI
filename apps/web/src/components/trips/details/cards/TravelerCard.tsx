'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function TravelerCard({ trip }: { trip: WorkspaceTrip }) {
  const travelers = trip.sharedWith || [];
  
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
          <Icon name="Users" size={20} className="text-blue-500" />
        </div>
        
        {travelers.length > 0 && (
          <div className="flex -space-x-2">
            {travelers.slice(0, 3).map((user) => (
              <div key={user.id} className="w-8 h-8 rounded-full border border-background relative overflow-hidden bg-white/10">
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
            {travelers.length > 3 && (
              <div className="w-8 h-8 rounded-full border border-background bg-white/10 flex items-center justify-center text-[10px] font-bold relative z-10">
                +{travelers.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Travelers</h3>
        <p className="text-xl font-bold text-foreground mt-1">
          {trip.travelerCount} {trip.travelerCount === 1 ? 'Person' : 'People'}
        </p>
        
        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground capitalize">
          <Icon name="Briefcase" size={14} />
          {trip.travelStyle || 'Mixed'} Style
        </div>
      </div>
    </div>
  );
}
