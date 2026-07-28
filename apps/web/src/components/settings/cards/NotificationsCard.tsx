'use client';

import React from 'react';
import type { NotificationSettings } from '@/lib/settings/types/settings.types';

export function NotificationsCard({ settings }: { settings: NotificationSettings }) {
  const toggles = [
    { key: 'emailUpdates', label: 'Email Updates', description: 'Receive weekly travel inspiration and updates.' },
    { key: 'pushNotifications', label: 'Push Notifications', description: 'Real-time alerts for your upcoming trips.' },
    { key: 'tripReminders', label: 'Trip Reminders', description: 'Get reminded to check in and pack before a trip.' },
    { key: 'marketingDeals', label: 'Deals & Offers', description: 'Exclusive discounts on hotels and flights.' },
    { key: 'collaboratorActivity', label: 'Collaborator Activity', description: 'When someone edits a shared trip.' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Notifications</h2>
        <p className="text-muted-foreground text-sm">Choose what we get in touch with you about.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 space-y-6">
        
        {toggles.map((toggle) => (
          <div key={toggle.key} className="flex items-start justify-between">
            <div className="pr-4">
              <h4 className="text-sm font-semibold text-foreground">{toggle.label}</h4>
              <p className="text-xs text-muted-foreground mt-1">{toggle.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
              {/* @ts-expect-error dynamic key */}
              <input type="checkbox" defaultChecked={settings[toggle.key]} className="sr-only peer" />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        ))}

      </div>
    </div>
  );
}
