'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';

interface TripToolbarProps {
  onOpenGlobalSearch: () => void;
}

export function TripToolbar({ onOpenGlobalSearch }: TripToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">My Trips</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Plan, track, and manage all your adventures in one place.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search trigger */}
        <button
          type="button"
          onClick={onOpenGlobalSearch}
          className="flex items-center gap-2 text-sm text-muted-foreground bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2 hover:border-white/20 hover:text-foreground transition-colors"
          aria-label="Search trips (Cmd+K)"
        >
          <Icon name="Search" size={14} />
          <span className="hidden sm:inline">Search trips</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-muted-foreground border border-white/10">
            ⌘K
          </kbd>
        </button>

        {/* Import (UI only) */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-muted-foreground border border-white/10 rounded-xl px-3 py-2 hover:border-white/20 hover:text-foreground transition-colors"
          aria-label="Import trip"
          title="Import coming soon"
        >
          <Icon name="Upload" size={14} />
          <span className="hidden sm:inline">Import</span>
        </button>

        {/* Create Trip */}
        <Link
          href="/trips/new"
          className="inline-flex items-center gap-1.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl px-4 py-2 hover:bg-primary/90 transition-colors"
          aria-label="Create new trip"
        >
          <Icon name="Plus" size={14} />
          <span>New Trip</span>
        </Link>
      </div>
    </div>
  );
}
