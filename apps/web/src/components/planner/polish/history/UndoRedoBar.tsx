'use client';
import React, { useEffect, useState } from 'react';
import { plannerHistory } from './UndoRedoManager';
import { Icon } from '@/components/icons/Icon';

export function UndoRedoBar() {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [lastLabel, setLastLabel] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sync = () => {
      setCanUndo(plannerHistory.canUndo());
      setCanRedo(plannerHistory.canRedo());
      setLastLabel(plannerHistory.getLastCommand()?.label);
    };
    sync();
    return plannerHistory.subscribe(sync);
  }, []);

  if (!canUndo && !canRedo) return null;

  return (
    <div className="flex items-center gap-1 bg-background/80 backdrop-blur border border-border rounded-md px-2 py-1 shadow-sm">
      <button
        disabled={!canUndo}
        onClick={() => plannerHistory.undo()}
        aria-label="Undo last action"
        className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title={lastLabel ? `Undo: ${lastLabel}` : 'Undo'}
      >
        <Icon name="Undo2" size={14} />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => plannerHistory.redo()}
        aria-label="Redo last action"
        className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="Redo"
      >
        <Icon name="Redo2" size={14} />
      </button>
    </div>
  );
}
