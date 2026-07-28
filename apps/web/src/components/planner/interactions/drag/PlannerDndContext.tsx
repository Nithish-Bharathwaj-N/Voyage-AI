"use client";
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { PlannerDragOverlay } from './PlannerDragOverlay';

interface PlannerDndContextProps {
  children: React.ReactNode;
}

export function PlannerDndContext({ children }: PlannerDndContextProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require dragging at least 8px before activation to allow clicks and scrolling
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    // In Sprint 5E, we will dispatch the reorder action to the Zustand store here
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      
      {/* Visual Overlay attached to cursor during drag */}
      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease-out' }}>
        {activeId ? <PlannerDragOverlay activeId={activeId} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
