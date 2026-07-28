'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import type { TripTab, TabCounts } from '@/lib/trips/types/trips.types';

const TABS: { id: TripTab; label: string }[] = [
  { id: 'my-trips', label: 'My Trips' },
  { id: 'drafts', label: 'Drafts' },
  { id: 'shared', label: 'Shared' },
  { id: 'archived', label: 'Archived' },
  { id: 'templates', label: 'Templates' },
];

interface TripsTabBarProps {
  activeTab: TripTab;
  counts: TabCounts;
  onTabChange: (tab: TripTab) => void;
}

export function TripsTabBar({ activeTab, counts, onTabChange }: TripsTabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Trip categories"
      className="flex items-center gap-0.5 border-b border-white/8"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        const count = counts[tab.id];
        return (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors rounded-t-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            {tab.label}
            {count > 0 && (
              <span
                className={cn(
                  'text-[10px] font-bold min-w-[18px] h-[18px] inline-flex items-center justify-center rounded-full px-1 tabular-nums',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/10 text-muted-foreground'
                )}
              >
                {count > 99 ? '99+' : count}
              </span>
            )}
            {isActive && (
              <motion.div
                layoutId="trips-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
