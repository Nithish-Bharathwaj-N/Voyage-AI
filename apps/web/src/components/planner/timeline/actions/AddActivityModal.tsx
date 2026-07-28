import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { plannerKeys } from '@/lib/planner/queries/plannerQueryKeys';
import type { Itinerary, GenericActivity } from '@/lib/planner/types/planner.types';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

export function AddActivityModal({ isOpen, onClose, tripId }: AddActivityModalProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('10:00');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;

    queryClient.setQueryData<Itinerary>(plannerKeys.itinerary(tripId), (oldData) => {
      const data = oldData ? { ...oldData } : { id: `itinerary-${tripId}`, tripId, days: [] };
      
      let targetDay = data.days[0];
      if (!targetDay) {
        targetDay = {
          id: `day-1-${Date.now()}`,
          date: new Date().toISOString(),
          title: 'Day 1',
          destination: 'Unknown',
          sections: [{
            id: `sec-1-${Date.now()}`,
            title: 'Morning',
            activities: []
          }]
        };
        data.days = [targetDay];
      }

      let targetSection = targetDay.sections[0];
      if (!targetSection) {
        targetSection = { id: `sec-new-${Date.now()}`, title: 'All Day', activities: [] };
        targetDay.sections.push(targetSection);
      }

      const newActivity: GenericActivity = {
        id: `act-${Date.now()}`,
        type: 'activity',
        title,
        time,
        priority: 'medium',
      };

      targetSection.activities = [...targetSection.activities, newActivity];
      return data;
    });

    setTitle('');
    setTime('10:00');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-xl shadow-lg w-full max-w-[425px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold">Add Activity</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Quickly add a new activity to your itinerary.
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">Activity Title</label>
            <Input 
              id="title" 
              placeholder="e.g. Visit Tokyo Tower" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-sm font-medium">Time</label>
            <Input 
              id="time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
            />
          </div>
        </div>
        <div className="p-4 border-t border-border bg-muted/20 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!title.trim()}>Save Activity</Button>
        </div>
      </div>
    </div>
  );
}
