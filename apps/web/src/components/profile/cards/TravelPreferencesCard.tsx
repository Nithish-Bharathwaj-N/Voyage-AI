'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { TravelPreference } from '@/lib/profile/types/profile.types';

export function TravelPreferencesCard({ preferences }: { preferences: TravelPreference[] }) {
  if (!preferences || preferences.length === 0) return null;

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 rounded-xl">
            <Icon name="Settings2" size={24} className="text-sky-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Travel Preferences</h2>
        </div>
        <button className="text-sm font-medium text-sky-500 hover:text-sky-400 transition-colors">
          Edit
        </button>
      </div>
      
      <div className="space-y-6">
        {preferences.map((pref) => (
          <div key={pref.id}>
            <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">{pref.category}</h4>
            <div className="flex flex-wrap gap-2">
              {pref.values.map((val, i) => (
                <div key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-foreground">
                  {val}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
