"use client";
import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';

export function MapToolbar() {
  return (
    <div className="flex justify-between items-start pointer-events-none">
      
      {/* Left side: Search & Layers */}
      <div className="flex flex-col gap-2">
        {/* Fake Search Bar */}
        <div className="bg-background/90 backdrop-blur-md rounded-md shadow-md border border-border/50 p-1 flex items-center w-64 pointer-events-auto">
          <Icon name="Search" size={16} className="text-muted-foreground ml-2" />
          <input 
            type="text" 
            placeholder="Search map..." 
            className="bg-transparent border-none focus:outline-none text-sm px-2 py-1 w-full"
            disabled
          />
        </div>

        {/* Layer Toggles */}
        <div className="bg-background/90 backdrop-blur-md rounded-md shadow-md border border-border/50 p-1 flex gap-1 pointer-events-auto w-fit">
          <Button variant="secondary" size="sm" className="h-7 text-xs font-medium bg-muted">
            Overview
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-muted-foreground hover:text-foreground">
            Day 1
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-medium text-muted-foreground hover:text-foreground">
            Day 2
          </Button>
        </div>
      </div>

      {/* Right side: Map Controls */}
      <div className="flex flex-col gap-2 pointer-events-auto">
        
        {/* Style/Settings */}
        <div className="bg-background/90 backdrop-blur-md rounded-md shadow-md border border-border/50 flex flex-col">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Icon name="Layers" size={16} />
          </Button>
        </div>

        {/* Zoom & Compass */}
        <div className="bg-background/90 backdrop-blur-md rounded-md shadow-md border border-border/50 flex flex-col">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-b-none border-b border-border/50 text-muted-foreground hover:text-foreground">
            <Icon name="Plus" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border-b border-border/50 text-muted-foreground hover:text-foreground">
            <Icon name="Minus" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-t-none text-muted-foreground hover:text-foreground">
            <Icon name="Compass" size={16} />
          </Button>
        </div>

        {/* Locate Me */}
        <div className="bg-background/90 backdrop-blur-md rounded-md shadow-md border border-border/50 flex flex-col mt-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-500/10">
            <Icon name="Navigation" size={16} />
          </Button>
        </div>
      </div>

    </div>
  );
}
