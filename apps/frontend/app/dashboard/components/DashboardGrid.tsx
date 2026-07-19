'use client';

import React from 'react';

interface DashboardGridProps {
  children?: React.ReactNode;
}

/**
 * Reusable three-column grid layout shell for dashboard cards.
 */
export function DashboardGrid({ children }: DashboardGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}
