'use client';

import React from 'react';
import { DollarSign, Tag, Calendar, MoreVertical } from 'lucide-react';
import { Card } from '../ui/Card';
import { Dropdown } from '../ui/Dropdown';

export interface ExpenseCardProps {
  amount: number;
  currency?: string;
  category: string;
  description: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Reusable expense ledger row item.
 */
export function ExpenseCard({
  amount,
  currency = 'USD',
  category,
  description,
  date,
  onEdit,
  onDelete,
  className = '',
}: ExpenseCardProps) {
  const actions = [
    ...(onEdit ? [{ id: 'edit', label: 'Edit expense', onClick: onEdit }] : []),
    ...(onDelete ? [{ id: 'delete', label: 'Delete', onClick: onDelete, variant: 'danger' as const }] : []),
  ];

  return (
    <Card className={`p-3 flex items-center justify-between relative group text-left ${className}`}>
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Category Icon Wrapper */}
        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
          <Tag className="w-4 h-4" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-0.5 min-w-0">
          <h4 className="text-xs font-black text-slate-900 leading-none truncate pr-6">
            {description}
          </h4>
          <div className="flex items-center gap-2.5 text-[9px] font-bold text-slate-400">
            <span className="uppercase tracking-wider">{category}</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              <span>{date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center text-xs font-black text-slate-900 pr-4">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>{amount.toLocaleString()}</span>
          <span className="text-[9px] text-slate-400 font-bold ml-1">{currency}</span>
        </div>

        {actions.length > 0 && (
          <div className="absolute top-1/2 right-2.5 -translate-y-1/2 z-10">
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
    </Card>
  );
}
