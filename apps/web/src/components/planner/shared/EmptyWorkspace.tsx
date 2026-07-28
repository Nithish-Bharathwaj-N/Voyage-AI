import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';

export function EmptyWorkspace() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-muted/10 w-full h-full">
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Icon name="Map" size={24} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">No Trip Selected</h3>
        <p className="text-sm text-muted-foreground mb-8">
          Select a trip from the sidebar or create a new one to begin planning your itinerary.
        </p>
        <Button className="w-full sm:w-auto">Create New Trip</Button>
      </div>
    </div>
  );
}
