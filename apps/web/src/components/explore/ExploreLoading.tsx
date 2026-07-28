'use client';

import React from 'react';

export function ExploreLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Skeletons header */}
      <div className="flex flex-col gap-1">
        <div className="h-6 bg-muted rounded w-48" />
        <div className="h-4 bg-muted rounded w-64" />
      </div>

      {/* Skeletons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="border border-border bg-card rounded-xl overflow-hidden h-[340px] flex flex-col">
            {/* Image Placeholder */}
            <div className="w-full h-[180px] bg-muted" />

            {/* Details Placeholder */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-8" />
                </div>
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-full mt-2" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>

              {/* Bottom tag placeholder */}
              <div className="flex justify-between items-center pt-2 border-t border-border/40 mt-4">
                <div className="flex gap-1">
                  <div className="h-4 bg-muted rounded w-12" />
                  <div className="h-4 bg-muted rounded w-12" />
                </div>
                <div className="h-8 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
