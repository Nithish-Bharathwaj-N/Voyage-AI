'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '../ui/Button';

interface ExploreEmptyStateProps {
  onReset: () => void;
}

export function ExploreEmptyState({ onReset }: ExploreEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 rounded-xl border border-dashed border-border bg-card shadow-sm max-w-md mx-auto my-8">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4 text-muted-foreground">
        <Icon name="Compass" size={24} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">No destinations found</h3>
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        We couldn&apos;t find any destinations matching your current search criteria or active filters. Try adjusting your selections.
      </p>
      <Button 
        variant="default"
        size="sm"
        className="font-semibold"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}
