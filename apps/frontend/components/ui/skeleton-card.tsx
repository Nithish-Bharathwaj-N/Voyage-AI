import * as React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4 animate-pulse">
      <div className="h-40 bg-slate-100 rounded-2xl" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-150 rounded w-2/3" />
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-5/6" />
      </div>
      <div className="h-8 bg-slate-100 rounded-xl w-full" />
    </div>
  );
}

export function SkeletonList() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex items-center space-x-4 p-4 bg-white border border-slate-200 rounded-2xl">
          <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-4 bg-slate-150 rounded w-1/3" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
          </div>
          <div className="w-4 h-4 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}
