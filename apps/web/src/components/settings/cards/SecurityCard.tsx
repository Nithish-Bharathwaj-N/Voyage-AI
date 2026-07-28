'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function SecurityCard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Security</h2>
        <p className="text-muted-foreground text-sm">Keep your account secure.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center mb-4">
          <Icon name="Lock" size={28} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">Coming Soon</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Advanced security features including 2FA, password resets, and session management will be available in a future update.
        </p>
      </div>
    </div>
  );
}
