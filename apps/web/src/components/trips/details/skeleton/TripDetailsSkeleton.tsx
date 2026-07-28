'use client';

import React from 'react';

export function TripDetailsSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="w-full h-64 md:h-80 bg-white/[0.02] border-b border-white/5 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 md:pl-24 max-w-7xl mx-auto flex items-end justify-between">
          <div className="space-y-4 w-full max-w-md">
            <div className="h-6 w-32 bg-white/10 rounded-md" />
            <div className="h-10 w-3/4 bg-white/10 rounded-md" />
            <div className="h-5 w-1/2 bg-white/10 rounded-md" />
          </div>
          <div className="hidden md:flex gap-3">
            <div className="h-10 w-24 bg-white/10 rounded-xl" />
            <div className="h-10 w-24 bg-white/10 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:px-12 md:pl-24 flex flex-col lg:flex-row gap-8">
        {/* Main Content Skeleton */}
        <div className="flex-1 space-y-8 animate-pulse">
          {/* Tabs Skeleton */}
          <div className="flex gap-6 border-b border-white/10 pb-4">
            <div className="h-6 w-20 bg-white/10 rounded-md" />
            <div className="h-6 w-20 bg-white/10 rounded-md" />
            <div className="h-6 w-20 bg-white/10 rounded-md" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
            <div className="h-32 bg-white/5 rounded-2xl border border-white/10" />
            <div className="h-40 bg-white/5 rounded-2xl border border-white/10 md:col-span-2" />
          </div>
        </div>

        {/* Sidebar Actions Skeleton */}
        <div className="w-full lg:w-80 space-y-4 shrink-0 animate-pulse hidden lg:block">
          <div className="h-14 bg-white/5 rounded-xl border border-white/10" />
          <div className="h-14 bg-white/5 rounded-xl border border-white/10" />
          <div className="h-14 bg-white/5 rounded-xl border border-white/10" />
        </div>
      </div>
    </div>
  );
}
