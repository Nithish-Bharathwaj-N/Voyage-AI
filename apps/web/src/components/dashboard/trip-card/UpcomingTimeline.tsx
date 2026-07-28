import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import { Heading } from '../../typography/Heading';
import { Icon } from '@/components/icons/Icon';
import type { Trip } from '../../../lib/services/dashboard';

interface UpcomingTimelineProps {
  trips: Trip[];
}

export function UpcomingTimeline({ trips }: UpcomingTimelineProps) {
  const upcoming = trips.filter(t => t.isUpcoming).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  if (upcoming.length === 0) return null;

  const nextTrip = upcoming[0];
  const daysUntil = Math.ceil((new Date(nextTrip.startDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className="mb-10">
      <Heading level={3} className="mb-4">Up Next</Heading>
      <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center justify-center h-20 w-20 rounded-2xl bg-background border border-border/50 shadow-sm shrink-0">
                <span className="text-sm font-bold text-muted-foreground uppercase">{new Date(nextTrip.startDate).toLocaleString('default', { month: 'short' })}</span>
                <span className="text-2xl font-black text-foreground leading-none mt-1">{new Date(nextTrip.startDate).getDate()}</span>
              </div>
              
              <div>
                <h4 className="font-bold text-xl mb-1">{nextTrip.destination}</h4>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-medium">
                  <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {daysUntil} days left</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1"><Icon name="ListChecks" size={14} /> {nextTrip.progress}% planned</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs uppercase font-bold tracking-wider text-muted-foreground mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-yellow-500"></span>
                  <span className="text-sm font-medium text-foreground">Needs accommodation</span>
                </div>
              </div>
              <a 
                href={`/app/planner/${nextTrip.id}`}
                className="flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium shadow hover:bg-primary/90 transition-colors"
              >
                Open Planner
              </a>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
}
