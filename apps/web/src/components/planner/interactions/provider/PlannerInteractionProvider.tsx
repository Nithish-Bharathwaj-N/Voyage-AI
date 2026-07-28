"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlannerContextMenu } from '../context-menu/PlannerContextMenu';
import { KeyboardShortcuts } from '../shared/KeyboardShortcuts';

interface ContextMenuState {
  activityId: string;
  x: number;
  y: number;
}

interface PlannerInteractionContextType {
  selectedIds: string[];
  toggleSelection: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  
  contextMenu: ContextMenuState | null;
  openContextMenu: (activityId: string, x: number, y: number) => void;
  closeContextMenu: () => void;
}

const PlannerInteractionContext = createContext<PlannerInteractionContextType | undefined>(undefined);

export function PlannerInteractionProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const toggleSelection = (id: string, multi = false) => {
    setSelectedIds(prev => {
      if (multi) {
        return prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      }
      return [id];
    });
  };

  const clearSelection = () => setSelectedIds([]);
  
  const openContextMenu = (activityId: string, x: number, y: number) => {
    setContextMenu({ activityId, x, y });
  };
  
  const closeContextMenu = () => setContextMenu(null);

  return (
    <PlannerInteractionContext.Provider 
      value={{
        selectedIds, toggleSelection, clearSelection,
        hoveredId, setHoveredId,
        contextMenu, openContextMenu, closeContextMenu
      }}
    >
      <KeyboardShortcuts />
      <PlannerContextMenu />
      {/* Click outside to clear selection and close menus */}
      <div 
        className="w-full h-full flex flex-col" 
        onClick={() => {
          clearSelection();
          closeContextMenu();
        }}
      >
        {children}
      </div>
    </PlannerInteractionContext.Provider>
  );
}

export function usePlannerInteraction() {
  const context = useContext(PlannerInteractionContext);
  if (context === undefined) {
    throw new Error('usePlannerInteraction must be used within a PlannerInteractionProvider');
  }
  return context;
}
