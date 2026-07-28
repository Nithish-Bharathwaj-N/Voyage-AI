import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import { AddActivityModal } from '../actions/AddActivityModal';

interface EmptyTimelineProps {
  tripId?: string;
}

export function EmptyTimeline({ tripId = 't-1' }: EmptyTimelineProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center py-24 px-4 h-full">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Icon name="Calendar" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">No activities planned</h3>
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          This trip&apos;s itinerary is currently empty. Start adding flights, hotels, and activities, or ask the AI Copilot to generate suggestions for you.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => setIsModalOpen(true)}>Add Activity</Button>
          <Button variant="outline" onClick={() => {
            // Trigger a custom event to open the copilot tab in the context panel
            document.dispatchEvent(new CustomEvent('open-copilot-tab'));
          }}>Use AI Copilot</Button>
        </div>
      </div>
      
      <AddActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tripId={tripId} 
      />
    </>
  );
}
