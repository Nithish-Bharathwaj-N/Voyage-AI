"use client";
import React from 'react';
import { Icon, type IconName } from '@/components/icons/Icon';
import { TimelineConnector } from '../shared/TimelineConnector';
import type { BaseActivity } from '@/lib/planner/types/planner.types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePlannerInteraction } from '../../interactions/provider/PlannerInteractionProvider';
import { DragHandle } from '../../interactions/shared/DragHandle';
import { usePlannerUIStore, useSelectedActivityIds } from '@/lib/planner/store/plannerUIStore';

interface BaseCardProps {
  activity: BaseActivity;
  icon: IconName;
  iconColorClass?: string;
  children: React.ReactNode;
}

export function BaseCard({ activity, icon, iconColorClass = 'bg-primary', children }: BaseCardProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id: activity.id,
    data: {
      type: 'Activity',
      activity,
    }
  });

  // Context provider handles context menu position
  const { openContextMenu } = usePlannerInteraction();
  
  // Zustand store owns canonical selection + map sync
  const selectedIds = useSelectedActivityIds();
  const { toggleActivitySelection, setActiveMapActivity } = usePlannerUIStore();
  const isSelected = selectedIds.includes(activity.id);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    openContextMenu(activity.id, e.clientX, e.clientY);
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="flex gap-4 relative z-10 group"
    >
      <TimelineConnector color={iconColorClass} />
      
      <div 
        onClick={(e) => {
          e.stopPropagation();
          // Update Zustand store (canonical selection + map sync)
          toggleActivitySelection(activity.id, e.shiftKey || e.metaKey || e.ctrlKey);
          // Single click also highlights the map marker
          if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
            setActiveMapActivity(activity.id);
          }
        }}
        onContextMenu={handleContextMenu}
        className={`
          flex-1 rounded-lg border bg-card shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background
          ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-border/80'}
        `}
      >
        
        {/* Left Color Strip */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${iconColorClass}`} />

        <div className="p-3 pl-4 sm:p-4 sm:pl-5">
          <div className="flex gap-3 sm:gap-4">
            
            {/* Icon */}
            <div className={`hidden sm:flex mt-0.5 h-8 w-8 rounded-full items-center justify-center shrink-0 ${iconColorClass} bg-opacity-10`}>
              <Icon name={icon} size={16} className={iconColorClass.replace('bg-', 'text-')} />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4 mb-1">
                <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">{activity.title}</h4>
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-sm font-bold text-foreground">{activity.time}</span>
                  {activity.duration && <span className="text-xs font-medium text-muted-foreground">{activity.duration}</span>}
                </div>
              </div>
              
              {/* Card Specific Content (Children) */}
              <div className="mt-2 text-sm text-muted-foreground">
                {children}
              </div>

              {/* Tags / Priority row */}
              {(activity.location || activity.priority) && (
                <div className="mt-3 flex items-center gap-3">
                  {activity.location && (
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-sm truncate max-w-[200px]">
                      <Icon name="MapPin" size={12} /> {activity.location}
                    </span>
                  )}
                  {activity.priority === 'high' && (
                    <span className="flex items-center gap-1 text-xs font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-sm">
                      <Icon name="AlertCircle" size={12} /> High Priority
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Right Action Area (Hover only) */}
            <div className="w-8 shrink-0 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DragHandle ref={setActivatorNodeRef} {...listeners} {...attributes} />
              
              <button 
                className="h-6 w-6 text-muted-foreground hover:text-foreground flex items-center justify-center"
                onClick={handleContextMenu}
              >
                <Icon name="MoreVertical" size={14} />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
