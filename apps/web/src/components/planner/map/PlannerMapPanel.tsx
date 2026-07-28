"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { MapSkeleton } from './skeletons/MapSkeleton';

// Dynamically import the MapWorkspace to prevent SSR issues with Mapbox GL
const DynamicMapWorkspace = dynamic(
  () => import('./MapWorkspace').then((mod) => mod.MapWorkspace),
  { 
    ssr: false,
    loading: () => <MapSkeleton />
  }
);

export function PlannerMapPanel() {
  return (
    <div className="w-full h-full relative">
      <DynamicMapWorkspace />
    </div>
  );
}
