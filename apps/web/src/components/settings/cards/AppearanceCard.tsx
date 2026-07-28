'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { AppearanceSettings } from '@/lib/settings/types/settings.types';

export function AppearanceCard({ settings }: { settings: AppearanceSettings }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Appearance</h2>
        <p className="text-muted-foreground text-sm">Customize how VoyageAI looks on your device.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 space-y-8">
        
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground">Theme</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'light', label: 'Light', icon: 'Sun' },
              { id: 'dark', label: 'Dark', icon: 'Moon' },
              { id: 'system', label: 'System', icon: 'Monitor' }
            ].map(theme => (
              <label key={theme.id} className="cursor-pointer">
                <input type="radio" name="theme" value={theme.id} defaultChecked={settings.theme === theme.id} className="peer sr-only" />
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 transition-all hover:bg-white/5">
                  {/* @ts-expect-error dynamic */}
                  <Icon name={theme.icon} size={24} className="text-foreground" />
                  <span className="text-sm font-medium text-foreground">{theme.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Interface Density</h4>
            <p className="text-xs text-muted-foreground mt-1">Adjust the spacing between elements.</p>
          </div>
          <select 
            defaultValue={settings.density}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-foreground">UI Animations</h4>
            <p className="text-xs text-muted-foreground mt-1">Enable or disable transition effects.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={settings.animationsEnabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

      </div>
    </div>
  );
}
