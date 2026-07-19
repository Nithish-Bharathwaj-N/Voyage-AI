'use client';

import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export interface SearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

/**
 * Reusable, premium search input box with clear trigger.
 */
export function Search({ value, onChange, placeholder = 'Search...', onClear, className = '' }: SearchProps) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3.5 text-slate-400 shrink-0 pointer-events-none select-none">
        <SearchIcon className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-100 rounded-xl py-2 pl-10 pr-9 text-xs font-semibold text-slate-900 placeholder-slate-400 transition-all"
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="absolute right-3.5 p-0.5 hover:bg-slate-200:bg-slate-800 rounded-md text-slate-400 hover:text-slate-600 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
