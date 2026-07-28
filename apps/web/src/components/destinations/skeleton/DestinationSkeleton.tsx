'use client';

import React from 'react';

export function DestinationSkeleton() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Skeleton */}
      <div className="h-[40vh] md:h-[50vh] bg-white/5 animate-pulse" />
      
      {/* Tabs Skeleton */}
      <div className="h-14 border-b border-white/10 flex items-center px-6 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 w-20 bg-white/10 rounded animate-pulse" />
        ))}
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="h-64 bg-white/[0.02] border border-white/10 rounded-2xl animate-pulse" />
            <div className="h-96 bg-white/[0.02] border border-white/10 rounded-2xl animate-pulse" />
            <div className="h-96 bg-white/[0.02] border border-white/10 rounded-2xl animate-pulse" />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="h-64 bg-white/[0.02] border border-white/10 rounded-2xl animate-pulse" />
            <div className="h-48 bg-white/[0.02] border border-white/10 rounded-2xl animate-pulse" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
