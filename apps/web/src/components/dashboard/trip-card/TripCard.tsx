import React from 'react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Icon } from '@/components/icons/Icon';
import type { Trip } from '../../../lib/services/dashboard';

interface TripCardProps {
  trip: Trip;
}

export function TripCard({ trip }: TripCardProps) {
  // Format dates e.g., "Oct 12 - 20"
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  const month = start.toLocaleString('default', { month: 'short' });
  const dateString = `${month} ${start.getDate()} - ${end.getDate()}`;

  return (
    <Card className="group relative overflow-hidden border-border/50 hover:border-border transition-colors cursor-pointer flex flex-col h-full">
      {/* Cover Image Area */}
      <div className="relative h-32 w-full bg-muted overflow-hidden">
        <img 
          src={trip.imageUrl} 
          alt={trip.destination} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div className="text-white">
            <h4 className="font-bold text-lg leading-tight">{trip.destination}</h4>
            <p className="text-xs text-white/80 font-medium">{trip.country}</p>
          </div>
          {trip.isUpcoming && <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0">Upcoming</Badge>}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-4 flex-1">
        
        {/* Meta info row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            <span className="font-medium">{dateString}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="CloudSun" size={12} />
            <span className="font-medium">{trip.weather.temp}° • {trip.weather.condition}</span>
          </div>
        </div>

        {/* Planning Progress */}
        <div className="space-y-1 mt-auto">
          <div className="flex justify-between text-xs font-medium">
            <span>Planning Progress</span>
            <span>{trip.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out" 
              style={{ width: `${trip.progress}%` }}
            />
          </div>
        </div>

        {/* Budget Summary */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Spent</span>
            <span className="text-sm font-semibold">$\{(trip.spent).toLocaleString()}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Budget</span>
            <span className="text-sm font-semibold">$\{(trip.budget).toLocaleString()}</span>
          </div>
        </div>

      </div>
    </Card>
  );
}
