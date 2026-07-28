'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type DestinationTabId = 'overview' | 'attractions' | 'hotels' | 'restaurants' | 'gallery' | 'tips';

interface DestinationTabsProps {
  activeTab: DestinationTabId;
  onChange: (tab: DestinationTabId) => void;
}

const TABS: { id: DestinationTabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'attractions', label: 'Attractions' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'restaurants', label: 'Restaurants' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'tips', label: 'Travel Tips' },
];

export function DestinationTabs({ activeTab, onChange }: DestinationTabsProps) {
  return (
    <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar" aria-label="Destination sections">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative py-4 text-sm font-medium transition-colors whitespace-nowrap',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="destination-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
