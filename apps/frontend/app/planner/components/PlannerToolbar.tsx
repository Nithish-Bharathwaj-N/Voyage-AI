'use client';

import React from 'react';
import { Undo, Redo, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PlannerToolbarProps {
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  saving?: boolean;
}

/**
 * Bottom control buttons bar for undo/redo actions and autosave status indicators.
 */
export function PlannerToolbar({
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  saving = false,
}: PlannerToolbarProps) {
  return (
    <div className="h-12 border-t border-slate-100 bg-white px-6 flex items-center justify-between shrink-0 select-none">
      {/* Undo/Redo Controls */}
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          disabled={!canUndo}
          onClick={onUndo}
          className="!p-2 rounded-lg"
          icon={<Undo className="w-3.5 h-3.5" />}
          aria-label="Undo edit"
        />
        <Button
          variant="ghost"
          size="sm"
          disabled={!canRedo}
          onClick={onRedo}
          className="!p-2 rounded-lg"
          icon={<Redo className="w-3.5 h-3.5" />}
          aria-label="Redo edit"
        />
      </div>

      {/* Auto Save Status Indicator */}
      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${saving ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
        <span className="uppercase tracking-wider">
          {saving ? 'Auto saving plan...' : 'Plan saved to cache'}
        </span>
      </div>
    </div>
  );
}
