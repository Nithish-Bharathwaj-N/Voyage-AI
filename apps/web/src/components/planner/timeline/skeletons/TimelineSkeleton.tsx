import React from 'react';

export function TimelineSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32 w-full animate-pulse">
      
      {/* Skeleton Day 1 */}
      <div className="mb-12">
        <div className="h-16 bg-muted/40 rounded-lg w-full mb-6" />
        
        <div className="space-y-4 pl-4 sm:pl-0">
          <div className="flex gap-4">
            <div className="hidden sm:block w-10 pt-3 flex-col items-center shrink-0">
              <div className="h-2 w-2 rounded-full bg-muted" />
            </div>
            <div className="flex-1 h-24 bg-muted/40 rounded-lg" />
          </div>
          <div className="flex gap-4">
            <div className="hidden sm:block w-10 pt-3 flex-col items-center shrink-0">
              <div className="h-2 w-2 rounded-full bg-muted" />
            </div>
            <div className="flex-1 h-32 bg-muted/40 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Skeleton Day 2 */}
      <div className="mb-12">
        <div className="h-16 bg-muted/40 rounded-lg w-full mb-6" />
        
        <div className="space-y-4 pl-4 sm:pl-0">
          <div className="flex gap-4">
            <div className="hidden sm:block w-10 pt-3 flex-col items-center shrink-0">
              <div className="h-2 w-2 rounded-full bg-muted" />
            </div>
            <div className="flex-1 h-24 bg-muted/40 rounded-lg" />
          </div>
        </div>
      </div>

    </div>
  );
}
