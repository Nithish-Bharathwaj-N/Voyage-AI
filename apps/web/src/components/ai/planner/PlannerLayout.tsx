'use client';

import React from 'react';
import { PlannerSidebar } from './PlannerSidebar';
import { PlannerHeader } from './PlannerHeader';

interface PlannerLayoutProps {
  children: React.ReactNode;
  sessionId?: string;
}

export function PlannerLayout({ children, sessionId }: PlannerLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      <PlannerSidebar activeSessionId={sessionId} />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <PlannerHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
