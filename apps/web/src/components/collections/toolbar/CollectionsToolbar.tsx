'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { useSearch } from '@/components/search/SearchProvider';

export function CollectionsToolbar({ totalCount = 0 }: { totalCount?: number }) {
  const { setIsOpen } = useSearch();

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 tracking-tight">
          Collections
        </h1>
        <p className="text-muted-foreground">
          {totalCount} {totalCount === 1 ? 'collection' : 'collections'} saved
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-foreground transition-colors"
          aria-label="Search collections"
        >
          <Icon name="Search" size={20} />
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25">
          <Icon name="Plus" size={18} />
          <span>New Collection</span>
        </button>
      </div>
    </div>
  );
}
