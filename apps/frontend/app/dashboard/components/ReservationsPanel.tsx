'use client';

import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { ReservationCard } from '@/components/travel/ReservationCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface ReservationItem {
  id: string;
  type: 'flight' | 'hotel' | 'rental_car' | 'event' | 'restaurant';
  title: string;
  confirmationNo?: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

interface ReservationsPanelProps {
  reservations: ReservationItem[];
  loading: boolean;
}

/**
 * Lists hotel or flight confirmation vouchers.
 */
export function ReservationsPanel({ reservations, loading }: ReservationsPanelProps) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Reservations</h3>

      {loading ? (
        <div className="space-y-2.5">
          <Skeleton variant="rect" className="h-20" />
          <Skeleton variant="rect" className="h-20" />
        </div>
      ) : reservations.length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-8 h-8 text-slate-300" />}
          title="No reservations linked"
          description="Link hotels, flights, and events to organize your vouchers."
        />
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {reservations.slice(0, 2).map((res) => (
            <ReservationCard
              key={res.id}
              type={res.type}
              title={res.title}
              confirmationNo={res.confirmationNo}
              startDate={res.startDate}
              endDate={res.endDate}
              notes={res.notes}
            />
          ))}
        </div>
      )}
    </div>
  );
}
