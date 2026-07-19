'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Plus } from 'lucide-react';
import { TripCard } from '@/components/travel/TripCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Button } from '@/components/ui/Button';

interface TripItem {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: string;
  status?: 'upcoming' | 'ongoing' | 'past';
  costEstimate?: number;
}

interface UpcomingTripsProps {
  trips: TripItem[];
  loading: boolean;
  error: boolean;
  onRetry?: () => void;
}

/**
 * Panel listing upcoming trip cards or redirecting users to the planner workspace.
 */
export function UpcomingTrips({ trips, loading, error, onRetry }: UpcomingTripsProps) {
  const router = useRouter();

  if (error) {
    return <ErrorState title="Trips Loading Error" onRetry={onRetry} />;
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center justify-between shrink-0">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Upcoming Trips</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/planner')}
          className="!p-1.5 rounded-lg border border-slate-200/50 hover:border-slate-350"
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Plan New
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton variant="rect" className="h-28" />
          <Skeleton variant="rect" className="h-28" />
        </div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-8 h-8 text-slate-300" />}
          title="No upcoming trips planned"
          description="Build your first custom journey with VoyageAI's conversation assistant."
          action={
            <Button size="sm" onClick={() => router.push('/planner')}>
              Plan a Trip
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              destination={trip.destination}
              startDate={trip.startDate}
              endDate={trip.endDate}
              image={trip.image}
              status={trip.status}
              costEstimate={trip.costEstimate}
              onClick={() => router.push(`/trips/${trip.id}`)}
              className="hover:scale-[1.01] duration-200 transition-transform active:scale-[0.99]"
            />
          ))}
        </div>
      )}
    </div>
  );
}
