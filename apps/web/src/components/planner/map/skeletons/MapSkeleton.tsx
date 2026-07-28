import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function MapSkeleton() {
  return (
    <div className="w-full h-full bg-muted/20 animate-pulse flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="h-8 w-8 rounded-md bg-muted/40" />
        <div className="h-16 w-8 rounded-md bg-muted/40" />
      </div>
      <Icon name="Map" size={48} className="text-muted-foreground opacity-20 mb-4" />
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-50">Initializing Map Engine...</span>
    </div>
  );
}
