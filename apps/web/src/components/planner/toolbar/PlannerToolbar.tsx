"use client";
import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import { UndoRedoBar } from '@/components/planner/polish/history/UndoRedoBar';
import { useTrip } from '@/lib/planner/hooks/useTrip';
import { AddActivityModal } from '@/components/planner/timeline/actions/AddActivityModal';

export function PlannerToolbar() {
  const { data: trip } = useTrip('t-1');
  const title = trip?.title || 'Loading Trip...';
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-4 border-b border-border bg-background z-40 relative">
      <AddActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tripId={trip?.id || 't-1'} 
      />
      
      {/* Left side: Breadcrumbs & Undo/Redo */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
          <Icon name="Menu" />
        </Button>
        <div className="hidden sm:flex items-center text-sm font-medium text-muted-foreground">
          <a href="/app" className="hover:text-foreground transition-colors flex items-center gap-1.5"><Icon name="Home" size={14} /></a>
          <Icon name="ChevronRight" size={14} className="mx-1" />
          <span className="text-foreground font-semibold">{title}</span>
        </div>

        <div className="hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-border/50">
          <UndoRedoBar />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="hidden lg:flex gap-2 text-muted-foreground hover:text-foreground">
          <Icon name="Search" size={14} /> Search (Cmd+F)
        </Button>
        
        <div className="w-px h-4 bg-border/50 mx-2 hidden lg:block" />

        <div className="hidden sm:flex items-center -space-x-2 mr-2">
          <div className="h-7 w-7 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center text-[10px] text-white font-bold z-20">NB</div>
          <div className="h-7 w-7 rounded-full bg-green-500 border-2 border-background flex items-center justify-center text-[10px] text-white font-bold z-10">AK</div>
          <div 
            onClick={() => setIsModalOpen(true)}
            className="h-7 w-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] text-muted-foreground font-bold hover:bg-muted-foreground/20 cursor-pointer transition-colors"
          >
            <Icon name="Plus" size={12} />
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-2 h-8">
          <Icon name="Share" size={14} /> Share
        </Button>
        <Button size="sm" className="gap-2 h-8">
          <Icon name="DownloadCloud" size={14} /> Export
        </Button>
      </div>

    </header>
  );
}
