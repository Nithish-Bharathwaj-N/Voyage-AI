'use client';

import React from 'react';
import type { PrivacySettings } from '@/lib/settings/types/settings.types';

export function PrivacyCard({ settings }: { settings: PrivacySettings }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Privacy & Data</h2>
        <p className="text-muted-foreground text-sm">Manage who can see your profile and how your data is used.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 space-y-8">
        
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground">Profile Visibility</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'public', label: 'Public', desc: 'Anyone can view' },
              { id: 'friends', label: 'Friends Only', desc: 'Approved followers' },
              { id: 'private', label: 'Private', desc: 'Only you' }
            ].map(vis => (
              <label key={vis.id} className="cursor-pointer">
                <input type="radio" name="visibility" value={vis.id} defaultChecked={settings.profileVisibility === vis.id} className="peer sr-only" />
                <div className="flex flex-col items-center text-center gap-1 p-4 rounded-xl border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 transition-all hover:bg-white/5">
                  <span className="text-sm font-medium text-foreground">{vis.label}</span>
                  <span className="text-xs text-muted-foreground">{vis.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="flex items-start justify-between">
          <div className="pr-4">
            <h4 className="text-sm font-semibold text-foreground">Analytics & Telemetry</h4>
            <p className="text-xs text-muted-foreground mt-1">Help us improve VoyageAI by sending anonymous usage data.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
            <input type="checkbox" defaultChecked={settings.analyticsEnabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-start justify-between">
          <div className="pr-4">
            <h4 className="text-sm font-semibold text-foreground">Location Sharing</h4>
            <p className="text-xs text-muted-foreground mt-1">Allow friends to see your current city if you are on a trip.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
            <input type="checkbox" defaultChecked={settings.locationSharing} className="sr-only peer" />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

      </div>
    </div>
  );
}
