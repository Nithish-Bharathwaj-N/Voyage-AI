import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActivityCard, ActivityCardProps } from './ActivityCard';

interface SortableActivityCardProps extends ActivityCardProps {
  id: string;
}

export function SortableActivityCard(props: SortableActivityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ActivityCard
        {...props}
        className={`${props.className || ''} ${isDragging ? 'shadow-2xl ring-2 ring-indigo-500 scale-[1.02]' : ''}`}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
