import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function LoadingWorkspace() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-muted-foreground w-full h-full">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <Icon name="Compass" size={48} className="text-primary opacity-50" />
        <p className="text-sm font-medium uppercase tracking-widest text-primary/70">Loading Workspace...</p>
      </div>
    </div>
  );
}
