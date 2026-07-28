'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { CollectionFilter, CollectionSortKey } from '@/lib/collections/types/collections.types';
import { Icon } from '@/components/icons/Icon';

interface CollectionsFilterProps {
  filter: CollectionFilter;
  onFilterChange: (f: Partial<CollectionFilter>) => void;
  sort: CollectionSortKey;
  onSortChange: (s: CollectionSortKey) => void;
}

export function CollectionsFilter({ filter, onFilterChange, sort, onSortChange }: CollectionsFilterProps) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' },
    { id: 'pinned', label: 'Pinned', icon: 'Pin' },
    { id: 'shared', label: 'Shared', icon: 'Users' }
  ];

  const currentTab = 
    filter.isFavorite ? 'favorites' : 
    filter.isPinned ? 'pinned' : 
    filter.privacy === 'shared' ? 'shared' : 
    'all';

  const handleTabChange = (id: string) => {
    switch (id) {
      case 'favorites':
        onFilterChange({ isFavorite: true, isPinned: undefined, privacy: undefined });
        break;
      case 'pinned':
        onFilterChange({ isPinned: true, isFavorite: undefined, privacy: undefined });
        break;
      case 'shared':
        onFilterChange({ privacy: 'shared', isPinned: undefined, isFavorite: undefined });
        break;
      default:
        onFilterChange({ isFavorite: undefined, isPinned: undefined, privacy: undefined });
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-white/10 mb-8">
      
      {/* Type Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap border",
              currentTab === tab.id 
                ? "bg-white/10 text-foreground border-white/20" 
                : "bg-transparent text-muted-foreground border-transparent hover:bg-white/5 hover:text-foreground"
            )}
          >
            {/* @ts-expect-error dynamic icon */}
            {tab.icon && <Icon name={tab.icon} size={14} className={currentTab === tab.id ? "text-foreground" : ""} />}
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Sort Select */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon name="ArrowDownUp" size={14} />
        <select 
          value={sort}
          onChange={(e) => onSortChange(e.target.value as CollectionSortKey)}
          className="bg-transparent border-none text-foreground font-medium focus:ring-0 cursor-pointer appearance-none outline-none"
        >
          <option value="updated">Recently Updated</option>
          <option value="created">Recently Created</option>
          <option value="alpha">Alphabetical</option>
        </select>
      </div>

    </div>
  );
}
