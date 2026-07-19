'use client';

import React from 'react';
import { StopCoordinate } from '@/app/planner/types/planner';
import { MapControls, MapStyle } from './MapControls';
import { InteractiveMap } from '@/components/maps/interactive-map';

interface PlannerMapProps {
  coordinates: StopCoordinate[];
  center: { latitude: number; longitude: number };
}

/**
 * Renders the Mapbox route sequence preview with style controls overlay.
 */
export function PlannerMap({ coordinates, center }: PlannerMapProps) {
  const [style, setStyle] = React.useState<MapStyle>('streets');

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <InteractiveMap coordinates={coordinates} center={center} />
      <MapControls currentStyle={style} onStyleChange={setStyle} />
    </div>
  );
}
