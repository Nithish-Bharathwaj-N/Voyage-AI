'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Premium animated sliding background tabs component.
 */
export function Tabs({ items, activeId, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex items-center gap-1 bg-slate-100/60 border border-slate-200/20 rounded-xl p-1 relative select-none w-fit ${className}`}>
      {items.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors z-10 ${
              isActive ? 'text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-700:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabOutline"
                transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-100 z-0"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
