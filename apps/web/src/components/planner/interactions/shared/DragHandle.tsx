import React from 'react';
import { Icon } from '@/components/icons/Icon';

export type DragHandleProps = React.HTMLAttributes<HTMLDivElement>;

export const DragHandle = React.forwardRef<HTMLDivElement, DragHandleProps>(
  (props, ref) => {
    return (
      <div 
        ref={ref} 
        {...props} 
        className="h-6 w-6 text-muted-foreground hover:text-foreground flex items-center justify-center cursor-grab active:cursor-grabbing outline-none"
      >
        <Icon name="GripVertical" size={14} />
      </div>
    );
  }
);
DragHandle.displayName = 'DragHandle';
