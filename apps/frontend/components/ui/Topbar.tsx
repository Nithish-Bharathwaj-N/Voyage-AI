'use client';

import React from 'react';

export interface TopbarProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Reusable top status-bar or command topbar shell inside workspaces.
 */
export function Topbar({ children, className = '' }: TopbarProps) {
  return (
    <div className={`h-14 border-b border-slate-100 bg-white px-6 flex items-center justify-between shrink-0 select-none ${className}`}>
      {children}
    </div>
  );
}
