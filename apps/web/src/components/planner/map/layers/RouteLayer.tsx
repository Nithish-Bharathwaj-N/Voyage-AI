import React from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';

interface RouteLayerProps {
  id: string;
  coordinates: [number, number][];
  color?: string;
  width?: number;
  isDashed?: boolean;
}

export function RouteLayer({
  id,
  coordinates,
  color = '#3b82f6', // Tailwind blue-500 default
  width = 3,
  isDashed = false
}: RouteLayerProps) {
  if (!coordinates || coordinates.length < 2) return null;

  const geojson = {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'LineString' as const,
      coordinates,
    },
  };

  return (
    <Source id={id} type="geojson" data={geojson}>
      <Layer
        id={`${id}-line`}
        type="line"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': color,
          'line-width': width,
          'line-opacity': 0.8,
          ...(isDashed ? { 'line-dasharray': [2, 2] } : {}),
        }}
      />
    </Source>
  );
}
