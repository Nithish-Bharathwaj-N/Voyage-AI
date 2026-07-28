'use client';

import React from 'react';
import { cn } from '@/utils/cn';

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-white/5',
        className
      )}
    />
  );
}

export function TripCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 bg-white/[0.03]">
      <Shimmer className="h-48 rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Shimmer className="h-4 w-16 rounded-full" />
          <Shimmer className="h-4 w-8 rounded-full" />
        </div>
        <Shimmer className="h-5 w-3/4" />
        <Shimmer className="h-3.5 w-1/2" />
        <Shimmer className="h-1.5 rounded-full" />
        <div className="flex items-center justify-between pt-1">
          <Shimmer className="h-3.5 w-20" />
          <Shimmer className="h-3.5 w-16" />
        </div>
      </div>
    </div>
  );
}

export function TripListRowSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.03]">
      <Shimmer className="h-14 w-20 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2 min-w-0">
        <Shimmer className="h-4 w-2/5" />
        <Shimmer className="h-3 w-1/3" />
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-4 w-16" />
        <Shimmer className="h-1.5 w-24 rounded-full" />
      </div>
      <Shimmer className="h-4 w-4 rounded" />
    </div>
  );
}
