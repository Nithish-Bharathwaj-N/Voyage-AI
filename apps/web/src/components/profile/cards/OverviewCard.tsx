'use client';

import React from 'react';
import type { UserProfile } from '@/lib/profile/types/profile.types';
import { Icon } from '@/components/icons/Icon';

export function OverviewCard({ profile }: { profile: UserProfile }) {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Icon name="User" size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">About Me</h2>
      </div>
      
      <p className="text-lg text-foreground/80 leading-relaxed">
        {profile.bio}
      </p>
    </div>
  );
}
