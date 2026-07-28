import React from 'react';

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero Cover */}
      <div className="h-48 md:h-64 lg:h-80 w-full bg-white/5" />
      
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 md:-mt-24">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white/10 border-4 border-background shrink-0" />
          <div className="flex-1 space-y-4 pb-2">
            <div className="h-10 bg-white/10 rounded w-1/3" />
            <div className="h-6 bg-white/5 rounded w-1/4" />
            <div className="flex gap-4">
              <div className="h-4 bg-white/5 rounded w-24" />
              <div className="h-4 bg-white/5 rounded w-32" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-white/10 pt-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-4 bg-white/10 rounded w-20 mb-4" />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="h-48 bg-white/5 rounded-3xl" />
          <div className="h-64 bg-white/5 rounded-3xl" />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="h-96 bg-white/5 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
