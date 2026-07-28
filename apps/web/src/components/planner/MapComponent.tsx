'use client';

import * as React from 'react';
import Map, { ViewStateChangeEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { usePlannerStore } from '@/stores/usePlannerStore';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.mock.token';

export function MapComponent() {
  const hoveredActivityId = usePlannerStore((state) => state.hoveredActivityId);
  
  // Coordinates for Paris
  const [viewState, setViewState] = React.useState({
    longitude: 2.3522,
    latitude: 48.8566,
    zoom: 12
  });

  return (
    <div className="absolute inset-0">
      <Map
        {...viewState}
        onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {hoveredActivityId && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/90 text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-xl border">
            Hovered Activity: {hoveredActivityId}
          </div>
        )}
      </Map>
    </div>
  );
}
