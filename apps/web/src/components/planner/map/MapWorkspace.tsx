"use client";
import React, { useState } from 'react';
import { MapCanvas } from './MapCanvas';
import { MapToolbar } from './MapToolbar';
import { MapStatusBar } from './MapStatusBar';
import { Icon } from '@/components/icons/Icon';

export function MapWorkspace() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [mapLoaded, setMapLoaded] = useState(false);

  // If no token is provided, render a graceful empty state
  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-muted/10 flex flex-col items-center justify-center p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <Icon name="AlertTriangle" size={24} className="text-destructive" />
        </div>
        <h3 className="font-bold text-lg mb-2">Mapbox Token Missing</h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-4">
          To view the interactive map, you must provide a valid <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> in your environment variables.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-muted/30 flex flex-col overflow-hidden">
      
      {/* Floating Toolbar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        <MapToolbar />
      </div>

      {/* Map Canvas */}
      <div className="flex-1 relative">
        <MapCanvas token={mapboxToken} onLoaded={() => setMapLoaded(true)} />
      </div>

      {/* Status Bar */}
      <MapStatusBar />

    </div>
  );
}
