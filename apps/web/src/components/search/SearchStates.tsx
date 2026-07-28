'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

interface EmptyProps {
  onReset?: () => void;
}

export function SearchEmptyState({ onReset }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center select-none">
      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3">
        <Icon name="Compass" size={20} />
      </div>
      <h4 className="font-bold text-sm text-foreground mb-1">No Results Found</h4>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
        We could not find matches matching your query. Try searching for a different destination or checking filter criteria.
      </p>
    </div>
  );
}

export function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-16 gap-2 text-muted-foreground select-none">
      <Icon name="Loader" size={16} className="animate-spin text-primary" />
      <span className="text-xs font-semibold">Searching domains...</span>
    </div>
  );
}

export function SearchErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center select-none">
      <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-3">
        <Icon name="AlertCircle" size={20} />
      </div>
      <h4 className="font-bold text-sm text-foreground mb-1">Search Request Failed</h4>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
        An error occurred while performing search query operations. Please check your internet connection and try again.
      </p>
    </div>
  );
}
