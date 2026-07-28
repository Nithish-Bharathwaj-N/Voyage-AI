'use client';

import React from 'react';
import { Tag, Calendar, FileText, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';

export interface ReservationCardProps {
  type: 'flight' | 'hotel' | 'rental_car' | 'event' | 'restaurant';
  title: string;
  confirmationNo?: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Reusable reservation voucher summary card.
 */
export function ReservationCard({
  type,
  title,
  confirmationNo,
  startDate,
  endDate,
  notes,
  onEdit,
  onDelete,
  className = '',
}: ReservationCardProps) {
  const actions = [
    ...(onEdit ? [{ id: 'edit', label: 'Edit reservation', onClick: onEdit }] : []),
    ...(onDelete ? [{ id: 'delete', label: 'Delete', onClick: onDelete, variant: 'danger' as const }] : []),
  ];

  const badges = {
    flight: 'info' as const,
    hotel: 'success' as const,
    rental_car: 'warning' as const,
    event: 'error' as const,
    restaurant: 'default' as const,
  };

  return (
    <Card className={`p-4 space-y-3.5 relative group text-left ${className}`}>
      <div className="flex items-start justify-between shrink-0">
        <div className="space-y-1.5 min-w-0 pr-6">
          <div className="flex items-center gap-1.5">
            <Badge variant={badges[type]}>{type}</Badge>
            {confirmationNo && (
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                Conf: {confirmationNo}
              </span>
            )}
          </div>
          <h4 className="text-xs font-black text-slate-900 leading-tight truncate">
            {title}
          </h4>
        </div>

        {actions.length > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <Dropdown
              trigger={
                <button className="p-1 hover:bg-slate-50:bg-slate-800 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer shrink-0">
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              }
              items={actions}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        <span>{startDate} {endDate ? `\u2014 ${endDate}` : ''}</span>
      </div>

      {notes && (
        <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2">
          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-[10px] font-semibold text-slate-500 leading-relaxed truncate-2-lines">{notes}</p>
        </div>
      )}
    </Card>
  );
}
