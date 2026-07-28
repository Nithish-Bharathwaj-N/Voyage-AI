import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function PlannerStatusBar() {
  return (
    <footer className="h-8 px-4 border-t border-border bg-background flex items-center justify-between text-[11px] text-muted-foreground font-medium shrink-0">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span>All changes saved</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <Icon name="Cloud" size={12} />
          <span>Synced to cloud</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <span>Cmd+K for Command Palette</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
          <Icon name="HelpCircle" size={12} />
          <span>Help</span>
        </div>
        <div>
          v2.0.0-beta
        </div>
      </div>

    </footer>
  );
}
