'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icons/Icon';

export type ProfileTabId = 'overview' | 'achievements' | 'preferences' | 'trips' | 'collections';

interface ProfileTabsProps {
  activeTab: ProfileTabId;
  onChange: (tab: ProfileTabId) => void;
}

const TABS: { id: ProfileTabId; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'User' },
  { id: 'achievements', label: 'Achievements', icon: 'Award' },
  { id: 'preferences', label: 'Travel Preferences', icon: 'Settings2' },
  { id: 'trips', label: 'Recent Trips', icon: 'Compass' },
  { id: 'collections', label: 'Saved Collections', icon: 'FolderHeart' },
];

export function ProfileTabs({ activeTab, onChange }: ProfileTabsProps) {
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/10 pt-4">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative py-4 flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* @ts-expect-error dynamic icon */}
              <Icon name={tab.icon} size={16} />
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
