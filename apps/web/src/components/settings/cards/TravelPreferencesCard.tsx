'use client';

import React from 'react';
import type { TravelPreferences } from '@/lib/settings/types/settings.types';

export function TravelPreferencesCard({ settings }: { settings: TravelPreferences }) {
  const PREFERENCE_OPTIONS = {
    budget: ['budget', 'moderate', 'luxury'],
    travelStyle: ['Photography', 'Adventure', 'Culture', 'Relaxation', 'Nightlife', 'Nature'],
    dietary: ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Coffee Lover'],
    accommodation: ['Boutique Hotels', 'Airbnbs', 'Hostels', 'Resorts', 'Camping'],
    transportation: ['Public Transit', 'Walking', 'Rental Car', 'Rideshare', 'Cycling']
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Travel Preferences</h2>
        <p className="text-muted-foreground text-sm">Configure how AI Planner generates your itineraries.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 space-y-8">
        
        <div className="space-y-3">
          <label className="text-sm font-semibold text-foreground">Budget Level</label>
          <div className="flex gap-3">
            {PREFERENCE_OPTIONS.budget.map(level => (
              <label key={level} className="flex-1 cursor-pointer">
                <input type="radio" name="budget" value={level} defaultChecked={settings.budget === level} className="peer sr-only" />
                <div className="text-center px-4 py-3 rounded-xl border border-white/10 text-sm font-medium text-muted-foreground capitalize peer-checked:bg-primary/20 peer-checked:text-primary peer-checked:border-primary/50 transition-all hover:bg-white/5">
                  {level}
                </div>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-white/5" />

        {[
          { key: 'travelStyle', label: 'Travel Style' },
          { key: 'dietary', label: 'Dietary Requirements' },
          { key: 'accommodation', label: 'Preferred Accommodation' },
          { key: 'transportation', label: 'Preferred Transportation' }
        ].map((section) => (
          <div key={section.key} className="space-y-3">
            <label className="text-sm font-semibold text-foreground">{section.label}</label>
            <div className="flex flex-wrap gap-2">
              {/* @ts-expect-error dynamic key */}
              {PREFERENCE_OPTIONS[section.key].map((option: string) => {
                // @ts-expect-error dynamic key
                const isSelected = settings[section.key].includes(option);
                return (
                  <label key={option} className="cursor-pointer">
                    <input type="checkbox" defaultChecked={isSelected} className="peer sr-only" />
                    <div className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-muted-foreground peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary transition-all hover:bg-white/5">
                      {option}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
