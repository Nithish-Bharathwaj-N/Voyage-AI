'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function QuickActionsPanel({ trip }: { trip: WorkspaceTrip }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 space-y-2">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
        Quick Actions
      </h3>

      <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
        <Icon name="Pencil" size={16} />
        Edit Itinerary
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-white/5 rounded-xl font-medium transition-colors">
        <Icon name="Users" size={16} className="text-blue-400" />
        Share Trip
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-white/5 rounded-xl font-medium transition-colors">
        <Icon name="Copy" size={16} className="text-emerald-400" />
        Duplicate Trip
      </button>

      <button className="w-full flex items-center gap-3 px-4 py-3 text-foreground hover:bg-white/5 rounded-xl font-medium transition-colors">
        <Icon name="Download" size={16} className="text-amber-400" />
        Export to PDF
      </button>

      <div className="h-px bg-white/10 my-2 mx-2" />

      {trip.status !== 'cancelled' ? (
        <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-white/5 hover:text-foreground rounded-xl font-medium transition-colors">
          <Icon name="Archive" size={16} />
          Archive Trip
        </button>
      ) : (
        <button className="w-full flex items-center gap-3 px-4 py-3 text-emerald-400 hover:bg-emerald-500/10 rounded-xl font-medium transition-colors">
          <Icon name="ArchiveRestore" size={16} />
          Restore Trip
        </button>
      )}

      <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl font-medium transition-colors">
        <Icon name="Trash2" size={16} />
        Delete Trip
      </button>
    </div>
  );
}
