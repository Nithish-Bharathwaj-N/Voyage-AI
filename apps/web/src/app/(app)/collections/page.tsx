'use client';

import React, { useState } from 'react';
import { useCollections } from '@/lib/collections/hooks/useCollections';
import { CollectionsToolbar } from '@/components/collections/toolbar/CollectionsToolbar';
import { CollectionsFilter } from '@/components/collections/filters/CollectionsFilter';
import { CollectionsGrid } from '@/components/collections/grid/CollectionsGrid';
import { CollectionsEmptyState } from '@/components/collections/shared/EmptyStates';
import { CollectionsGridSkeleton } from '@/components/collections/shared/Skeletons';
import type { CollectionFilter, CollectionSortKey } from '@/lib/collections/types/collections.types';

export default function CollectionsPage() {
  const [filter, setFilter] = useState<CollectionFilter>({});
  const [sort, setSort] = useState<CollectionSortKey>('updated');
  
  const { data: collections, isLoading, error } = useCollections(filter, sort);

  const handleFilterChange = (newFilter: Partial<CollectionFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <CollectionsToolbar totalCount={collections?.length} />
        
        <CollectionsFilter 
          filter={filter} 
          onFilterChange={handleFilterChange}
          sort={sort}
          onSortChange={setSort}
        />

        {error ? (
          <div className="py-12 text-center text-rose-500 bg-rose-500/10 rounded-2xl border border-rose-500/20">
            Failed to load collections. Please try again later.
          </div>
        ) : isLoading ? (
          <CollectionsGridSkeleton />
        ) : !collections || collections.length === 0 ? (
          <CollectionsEmptyState searchQuery={filter.search} />
        ) : (
          <CollectionsGrid collections={collections} />
        )}
      </div>
    </div>
  );
}
