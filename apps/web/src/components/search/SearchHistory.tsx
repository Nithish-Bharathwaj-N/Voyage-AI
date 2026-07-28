'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { useSearch } from './SearchProvider';
import { Button } from '../ui/Button';
import { SearchResultItem } from '@/lib/services/search';

export function SearchHistory() {
  const { 
    recentSearches, 
    pinnedSearches, 
    clearRecent, 
    setQuery, 
    executeAction 
  } = useSearch();

  const handleSelectQuery = (q: string) => {
    setQuery(q);
  };

  const mockPopular = ['Tokyo Flight', 'Create Trip', 'Amalfi Coast', 'Kyoto Ritz'];

  if (recentSearches.length === 0 && pinnedSearches.length === 0) {
    return (
      <div className="p-4 flex flex-col gap-4">
        {/* Popular Searches */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Icon name="TrendingUp" size={11} />
            Popular Searches
          </span>
          <div className="flex flex-wrap gap-1.5">
            {mockPopular.map((q) => (
              <button
                key={q}
                onClick={() => handleSelectQuery(q)}
                className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-semibold px-3 py-1.5 rounded-full transition-all border border-border/40"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4 overflow-y-auto">
      {/* Pinned Links */}
      {pinnedSearches.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Icon name="Pin" size={11} className="rotate-45" />
            Pinned Actions & Destinations
          </span>
          <div className="flex flex-col gap-1">
            {pinnedSearches.map((item) => (
              <button
                key={item.id}
                onClick={() => executeAction(item)}
                className="w-full text-left p-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between text-xs font-semibold text-foreground group"
              >
                <div className="flex items-center gap-2">
                  <Icon name="Compass" size={14} className="text-muted-foreground" />
                  <span>{item.title}</span>
                  <span className="text-[10px] text-muted-foreground block font-medium capitalize">
                    • {item.domain}
                  </span>
                </div>
                <kbd className="h-4 px-1 rounded border border-border bg-muted flex items-center justify-center text-[9px] font-mono text-muted-foreground font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ⏎
                </kbd>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Queries */}
      {recentSearches.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Icon name="History" size={11} />
            Recent Searches
          </span>
          <div className="flex flex-col gap-1">
            {recentSearches.map((q) => (
              <div
                key={q}
                className="w-full p-2 rounded-lg hover:bg-muted/50 transition-colors flex items-center justify-between text-xs font-semibold text-foreground cursor-pointer group"
                onClick={() => handleSelectQuery(q)}
              >
                <div className="flex items-center gap-2">
                  <Icon name="Search" size={14} className="text-muted-foreground" />
                  <span>{q}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearRecent(q);
                  }}
                  aria-label="Remove search history"
                >
                  <Icon name="X" size={10} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
