'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/icons/Icon';

export type SettingsSectionId = 'account' | 'preferences' | 'appearance' | 'notifications' | 'privacy' | 'security' | 'connected';

interface SettingsSidebarProps {
  activeSection: SettingsSectionId;
  onChange: (section: SettingsSectionId) => void;
}

const SECTIONS: { id: SettingsSectionId; label: string; icon: string }[] = [
  { id: 'account', label: 'Account', icon: 'User' },
  { id: 'preferences', label: 'Travel Preferences', icon: 'Compass' },
  { id: 'appearance', label: 'Appearance', icon: 'Monitor' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell' },
  { id: 'privacy', label: 'Privacy', icon: 'Shield' },
  { id: 'security', label: 'Security', icon: 'Lock' },
  { id: 'connected', label: 'Connected Accounts', icon: 'Link' },
];

export function SettingsSidebar({ activeSection, onChange }: SettingsSidebarProps) {
  return (
    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar pb-4 md:pb-0 border-b md:border-b-0 border-white/10 md:border-r md:pr-6 md:sticky md:top-24 md:h-[calc(100vh-120px)]">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onChange(section.id)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0 w-full text-left',
              isActive 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
            )}
          >
            {/* @ts-expect-error dynamic icon */}
            <Icon name={section.icon} size={18} className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'} />
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
