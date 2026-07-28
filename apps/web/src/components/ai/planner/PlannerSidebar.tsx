'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';

interface PlannerSidebarProps {
  activeSessionId?: string;
}

export function PlannerSidebar({ activeSessionId }: PlannerSidebarProps) {
  const mockHistory = [
    { id: 'trip-1', name: 'Roman Holiday', date: 'Aug 2026' },
    { id: 'trip-2', name: 'Kyoto Spring', date: 'Apr 2026' }
  ];

  return (
    <div className="w-64 border-r border-white/10 bg-card hidden md:flex flex-col h-full">
      <div className="p-4 border-b border-white/10">
        <Link 
          href="/ai/planner"
          className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Icon name="Plus" size={16} />
          New Trip Plan
        </Link>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recent Plans</h4>
        <div className="flex flex-col gap-1">
          {mockHistory.map(trip => (
            <Link 
              key={trip.id} 
              href={`/ai/planner/${trip.id}`}
              className={`p-2 rounded-md transition-colors text-sm flex flex-col gap-0.5 ${
                activeSessionId === trip.id 
                  ? 'bg-white/10 text-foreground' 
                  : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <span className="font-medium truncate">{trip.name}</span>
              <span className="text-xs opacity-70">{trip.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
