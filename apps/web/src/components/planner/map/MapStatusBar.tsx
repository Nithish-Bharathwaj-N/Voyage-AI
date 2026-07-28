import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function MapStatusBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-6 bg-background/80 backdrop-blur-md border-t border-border/50 flex items-center justify-between px-3 text-[10px] text-muted-foreground font-medium z-10">
      
      <div className="flex items-center gap-4">
        <span>Mapbox GL JS v3.2</span>
        <div className="h-3 w-px bg-border" />
        <span>Zoom: 11.0</span>
        <div className="h-3 w-px bg-border" />
        <span>Projection: Mercator</span>
      </div>

      <div className="flex items-center gap-2">
        <Icon name="MapPin" size={10} />
        <span>2 Markers Visible</span>
      </div>

    </div>
  );
}
