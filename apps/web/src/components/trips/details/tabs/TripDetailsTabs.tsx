'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export type TripTabId = 'overview' | 'itinerary' | 'budget' | 'documents' | 'notes' | 'destinations' | 'settings';

interface TripDetailsTabsProps {
  activeTab: TripTabId;
  onChange: (tab: TripTabId) => void;
}

const TABS: { id: TripTabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'budget', label: 'Budget' },
  { id: 'documents', label: 'Documents' },
  { id: 'notes', label: 'Notes' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'settings', label: 'Settings' },
];

export function TripDetailsTabs({ activeTab, onChange }: TripDetailsTabsProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-white/10 pb-px">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80 hover:bg-white/5 rounded-t-lg"
            )}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
