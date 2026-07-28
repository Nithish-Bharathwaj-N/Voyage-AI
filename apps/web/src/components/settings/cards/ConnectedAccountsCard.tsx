'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function ConnectedAccountsCard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Connected Accounts</h2>
        <p className="text-muted-foreground text-sm">Manage OAuth integrations.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center mb-4">
          <Icon name="Link" size={28} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">OAuth Integrations Planned</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Soon you will be able to link Google, GitHub, and Apple accounts to login faster and import contacts.
        </p>
      </div>
    </div>
  );
}
