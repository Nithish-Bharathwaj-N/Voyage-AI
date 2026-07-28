'use client';

import React from 'react';
import { SearchDomain } from '@/lib/services/search';
import { useSearch } from './SearchProvider';

interface TabOption {
  label: string;
  value: SearchDomain | undefined;
}

const TABS: TabOption[] = [
  { label: 'All', value: undefined },
  { label: 'Destinations', value: 'destinations' },
  { label: 'Trips', value: 'trips' },
  { label: 'Flights', value: 'flights' },
  { label: 'Activities', value: 'activities' },
  { label: 'Hotels', value: 'hotels' },
  { label: 'Dining', value: 'restaurants' },
  { label: 'Actions', value: 'commands' },
];

export function SearchFilters() {
  const { domain, setDomain } = useSearch();

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-border bg-muted/40 p-2 shrink-0 select-none">
      {TABS.map((tab) => {
        const isSelected = domain === tab.value;
        return (
          <button
            key={tab.label}
            onClick={() => setDomain(tab.value)}
            className={`h-7 px-3 text-xs rounded-full font-bold whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-card text-foreground border-border shadow-xs'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
