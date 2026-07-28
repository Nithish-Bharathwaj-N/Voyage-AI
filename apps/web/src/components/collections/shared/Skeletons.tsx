import React from 'react';

export function CollectionsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3 animate-pulse">
          <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 w-full" />
          <div className="space-y-2 px-1">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CollectionDetailSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-64 md:h-80 w-full bg-white/5 relative">
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="h-10 w-1/3 bg-white/10 rounded mb-4" />
          <div className="h-4 w-1/4 bg-white/5 rounded" />
        </div>
      </div>
      
      {/* Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="h-10 w-48 bg-white/5 rounded-lg" />
        <CollectionsGridSkeleton />
      </div>
    </div>
  );
}
