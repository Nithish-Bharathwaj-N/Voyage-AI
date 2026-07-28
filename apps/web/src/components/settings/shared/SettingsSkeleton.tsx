import React from 'react';

export function SettingsSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-8 pb-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-10 bg-white/5 rounded-lg w-48" />
          <div className="h-10 bg-white/5 rounded-lg w-10" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-12 bg-white/5 rounded-xl w-32 md:w-full shrink-0" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 space-y-6 max-w-3xl">
            <div className="h-8 bg-white/5 rounded w-48 mb-6" />
            <div className="space-y-4">
              <div className="h-24 bg-white/5 rounded-2xl" />
              <div className="h-24 bg-white/5 rounded-2xl" />
              <div className="h-24 bg-white/5 rounded-2xl" />
              <div className="h-32 bg-white/5 rounded-2xl" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
