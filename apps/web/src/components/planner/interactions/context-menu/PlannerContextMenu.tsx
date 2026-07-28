"use client";
import React, { useRef } from 'react';
import { usePlannerInteraction } from '../provider/PlannerInteractionProvider';
import { Icon } from '@/components/icons/Icon';

export function PlannerContextMenu() {
  const { contextMenu, closeContextMenu } = usePlannerInteraction();
  const menuRef = useRef<HTMLDivElement>(null);

  if (!contextMenu) return null;

  return (
    <div 
      ref={menuRef}
      className="fixed z-[100] w-48 bg-card text-card-foreground rounded-lg shadow-xl border border-border overflow-hidden p-1 animate-in fade-in zoom-in-95 duration-100"
      style={{ left: contextMenu.x, top: contextMenu.y }}
      onClick={(e) => e.stopPropagation()} // Prevent clicking the menu from instantly closing it
    >
      <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 mb-1 border-b border-border/50">
        Activity Actions
      </div>
      
      <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md text-left transition-colors">
        <Icon name="Copy" size={14} className="text-muted-foreground" />
        Duplicate
      </button>
      
      <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md text-left transition-colors">
        <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
        Move to Day
      </button>
      
      <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md text-left transition-colors">
        <Icon name="Edit2" size={14} className="text-muted-foreground" />
        Add Note
      </button>
      
      <div className="h-px bg-border/50 my-1 mx-1" />
      
      <button 
        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-md text-left transition-colors"
        onClick={() => closeContextMenu()}
      >
        <Icon name="Trash" size={14} />
        Delete
      </button>
    </div>
  );
}
