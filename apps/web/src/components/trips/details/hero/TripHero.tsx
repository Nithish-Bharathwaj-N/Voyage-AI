'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function TripHero({ trip }: { trip: WorkspaceTrip }) {
  return (
    <div className="relative w-full h-64 md:h-80 bg-background overflow-hidden border-b border-white/5 group">
      {/* Cover Image or Gradient Fallback */}
      <div className="absolute inset-0 z-0">
        {trip.coverImageUrl ? (
          <Image
            src={trip.coverImageUrl}
            alt={trip.title}
            fill
            className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 md:px-12 md:pl-24 pb-6 md:pb-12 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-end justify-between gap-4"
        >
          {/* Main Titles */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn(
                "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border",
                trip.status === 'planning' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                trip.status === 'confirmed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                trip.status === 'active' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                "bg-white/5 text-muted-foreground border-white/10"
              )}>
                {trip.status}
              </span>
              {trip.isShared && (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-white/5 border border-white/10 text-muted-foreground flex items-center gap-1">
                  <Icon name="Users" size={12} />
                  Shared
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight drop-shadow-md">
              {trip.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80 drop-shadow-sm">
              <div className="flex items-center gap-1.5">
                <Icon name="MapPin" size={16} className="text-primary" />
                {trip.destinationsLabel}
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Calendar" size={16} className="text-primary" />
                {trip.startDate} — {trip.endDate} <span className="opacity-60 ml-1">({trip.durationLabel})</span>
              </div>
            </div>
          </div>

          {/* Desktop Planning Progress Badge */}
          <div className="hidden md:flex flex-col items-end gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[160px]">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Planning Progress</div>
            <div className="text-3xl font-bold text-foreground">{trip.planningProgress}%</div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-primary rounded-full" style={{ width: `${trip.planningProgress}%` }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
