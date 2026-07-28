'use client';

import React, { useRef, useEffect } from 'react';
import { Icon } from '@/components/icons/Icon';
import { useSearch } from './SearchProvider';

export function SearchInput() {
  const { query, setQuery, isOpen } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  return (
    <div className="relative flex items-center border-b border-border h-14 px-4 shrink-0 bg-card">
      <div className="absolute left-4 flex items-center text-muted-foreground shrink-0 pointer-events-none">
        <Icon name="Search" size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="w-full h-full pl-10 pr-20 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 font-medium"
        placeholder="Type to search destinations, trips, commands..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      {/* Keyboard Helper / Clear indicators */}
      <div className="absolute right-4 flex items-center gap-1.5 pointer-events-none">
        {query ? (
          <kbd className="h-5 px-1.5 rounded border border-border bg-muted flex items-center justify-center text-[10px] font-mono text-muted-foreground font-bold shadow-sm">
            ESC
          </kbd>
        ) : (
          <kbd className="h-5 px-1.5 rounded border border-border bg-muted flex items-center justify-center text-[10px] font-mono text-muted-foreground font-bold shadow-sm">
            ⌘K
          </kbd>
        )}
      </div>
    </div>
  );
}
