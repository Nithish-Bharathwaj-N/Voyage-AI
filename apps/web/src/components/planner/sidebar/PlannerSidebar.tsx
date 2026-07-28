import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import { Text } from '../../typography/Text';

export function PlannerSidebar() {
  return (
    <aside className="w-64 h-full border-r border-border bg-card flex flex-col overflow-hidden">
      
      {/* Trip Selector Header */}
      <div className="p-4 border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-colors flex items-center justify-between">
        <div className="flex flex-col overflow-hidden">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Current Trip</span>
          <span className="text-sm font-bold truncate">Tokyo Autumn Getaway</span>
        </div>
        <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <div className="px-3 mb-2">
          <Text size="xs" className="font-semibold text-muted-foreground uppercase tracking-wider">Itinerary</Text>
        </div>
        
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium text-sm">
          <Icon name="List" size={16} />
          <span>Overview</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-foreground text-sm transition-colors">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span>Day 1 • Oct 12</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-foreground text-sm transition-colors">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span>Day 2 • Oct 13</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-foreground text-sm transition-colors">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span>Day 3 • Oct 14</span>
        </a>

        <div className="px-3 mt-6 mb-2">
          <Text size="xs" className="font-semibold text-muted-foreground uppercase tracking-wider">Planning</Text>
        </div>
        <a href="#" className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted text-foreground text-sm transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span>Saved Places</span>
          </div>
          <span className="text-xs bg-muted text-muted-foreground px-1.5 rounded-sm">12</span>
        </a>
        <a href="#" className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted text-foreground text-sm transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="Bed" size={16} className="text-muted-foreground" />
            <span>Hotels</span>
          </div>
        </a>
      </nav>

      {/* Footer Settings */}
      <div className="p-4 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start gap-3 h-9 px-3 text-muted-foreground">
          <Icon name="Settings" size={16} />
          Trip Settings
        </Button>
      </div>

    </aside>
  );
}
