'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';

export interface PackingCardProps {
  name: string;
  quantity?: number;
  packed: boolean;
  onToggle: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * Reusable packing item row checklist element.
 */
export function PackingCard({
  name,
  quantity = 1,
  packed,
  onToggle,
  onDelete,
  className = '',
}: PackingCardProps) {
  return (
    <Card className={`p-3.5 flex items-center justify-between text-left relative group ${className}`}>
      <div className="flex items-center gap-3 min-w-0 select-none">
        {/* Rounded checkbox */}
        <button
          onClick={onToggle}
          className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 cursor-pointer transition-all ${
            packed
              ? 'bg-slate-900 border-slate-900 text-white'
              : 'border-slate-300 bg-white'
          }`}
          aria-checked={packed}
        >
          {packed && (
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <span className={`text-xs font-semibold truncate ${
          packed ? 'line-through text-slate-400 font-medium' : 'text-slate-900'
        }`}>
          {name} {quantity > 1 && <span className="text-[10px] text-slate-400 font-bold ml-1">x{quantity}</span>}
        </span>
      </div>

      {onDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-50:bg-slate-800 rounded-lg text-slate-450 hover:text-red-500 cursor-pointer shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </Card>
  );
}
