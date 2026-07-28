'use client';

import * as React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { usePlannerStore } from '../../stores/usePlannerStore';

export function Timeline() {
  const trip = usePlannerStore((state) => state.trip);
  const moveActivity = usePlannerStore((state) => state.moveActivity);
  const setHoveredActivityId = usePlannerStore((state) => state.setHoveredActivityId);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return; // Dropped in the same spot
    }

    moveActivity(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  if (!trip) return <div className="p-4 text-muted-foreground text-sm">Loading timeline...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="space-y-8">
        {trip.days.map((day) => (
          <div key={day.id} className="space-y-4">
            <h3 className="font-semibold tracking-tight text-lg sticky top-0 bg-background/90 backdrop-blur z-10 py-2 border-b">
              {new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
            
            <Droppable droppableId={day.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[100px] rounded-lg transition-colors ${snapshot.isDraggingOver ? 'bg-primary/5 border border-primary/20' : ''}`}
                >
                  {day.activities.map((activity, index) => (
                    <Draggable key={activity.id} draggableId={activity.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onMouseEnter={() => setHoveredActivityId(activity.id)}
                          onMouseLeave={() => setHoveredActivityId(null)}
                          className={`p-4 mb-3 border rounded-xl bg-card shadow-sm transition-shadow ${snapshot.isDragging ? 'shadow-xl ring-2 ring-primary' : 'hover:shadow-md hover:border-primary/50'}`}
                        >
                          <div className="font-medium text-sm">{activity.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">Est. Cost: ${activity.costMin} - ${activity.costMax}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
