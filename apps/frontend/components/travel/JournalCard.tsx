'use client';

import React from 'react';
import { Calendar, Star, Heart, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import { Dropdown } from '../ui/Dropdown';

export interface JournalCardProps {
  title: string;
  content: string;
  date: string;
  rating?: number;
  photos?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Reusable journal summary card.
 */
export function JournalCard({
  title,
  content,
  date,
  rating,
  photos = [],
  onEdit,
  onDelete,
  className = '',
}: JournalCardProps) {
  const actions = [
    ...(onEdit ? [{ id: 'edit', label: 'Edit diary', onClick: onEdit }] : []),
    ...(onDelete ? [{ id: 'delete', label: 'Delete log', onClick: onDelete, variant: 'danger' as const }] : []),
  ];

  return (
    <Card className={`p-4 space-y-3.5 relative group text-left ${className}`}>
      <div className="flex items-start justify-between shrink-0">
        <div className="space-y-1 min-w-0 pr-6">
          <div className="flex items-center gap-2.5 text-[9px] font-bold text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              <span>{date}</span>
            </div>
            {rating !== undefined && (
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-2.5 h-2.5 fill-amber-500" />
                <span>{rating}</span>
              </div>
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

      <p className="text-[11px] font-semibold text-slate-500 leading-relaxed truncate-3-lines">
        {content}
      </p>

      {photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto shrink-0 select-none">
          {photos.map((p, idx) => (
            <div key={idx} className="w-12 h-12 rounded-lg overflow-hidden bg-slate-105 shrink-0 border border-slate-100/50">
              <img src={p} alt="Attachment" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
