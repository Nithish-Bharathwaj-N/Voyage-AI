'use client';

import React from 'react';

export interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Reusable side navigation sidebar layout container.
 */
export function Sidebar({ children, className = '' }: SidebarProps) {
  return (
    <aside className={`w-64 border-r border-slate-100 bg-white flex flex-col h-screen shrink-0 ${className}`}>
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">{children}</div>
    </aside>
  );
}

Sidebar.Item = function SidebarItem({
  active,
  onClick,
  icon,
  children,
  className = '',
}: {
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer select-none ${
        active
          ? 'bg-slate-900 text-white font-extrabold shadow-sm'
          : 'text-slate-500 hover:text-slate-900:text-slate-200 hover:bg-slate-50:bg-slate-800/40'
      } ${className}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};
