'use client';
import React, { useRef, useMemo, useCallback } from 'react';
import Map, { NavigationControl, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RouteLayer } from './layers/RouteLayer';
import { MapMarker } from './markers/MapMarker';
import { MapPopup } from './MapPopup';
import { usePlanner } from '@/lib/planner/hooks/usePlanner';
import {
  useActiveMapActivityId,
  usePlannerUIStore,
} from '@/lib/planner/store/plannerUIStore';
import { getActivitiesWithCoordinates } from '@/lib/planner/selectors/plannerSelectors';
import type { PlannerActivity } from '@/lib/planner/types/planner.types';
import type { IconName } from '@/components/icons/Icon';

const ACTIVITY_ICON_MAP: Record<string, IconName> = {
  flight: 'Plane',
  hotel: 'Bed',
  restaurant: 'Utensils',
  transport: 'Train',
  activity: 'Camera',
  note: 'StickyNote',
  unknown: 'MapPin',
};

const ACTIVITY_COLOR_MAP: Record<string, string> = {
  flight: 'bg-blue-500',
  hotel: 'bg-indigo-500',
  restaurant: 'bg-orange-500',
  transport: 'bg-green-500',
  activity: 'bg-primary',
  note: 'bg-yellow-500',
  unknown: 'bg-muted-foreground',
};

const MOCK_ROUTE_COORDS: [number, number][] = [
  [139.7802, 35.5494], // Haneda Airport
  [139.7671, 35.6812], // Tokyo Station
  [139.6975, 35.6895], // Shinjuku
  [139.6993, 35.6765], // Meiji Shrine
  [139.7005, 35.6585], // Shibuya
];

interface MapCanvasProps {
  token: string;
  onLoaded: () => void;
}

export function MapCanvas({ token, onLoaded }: MapCanvasProps) {
  const mapRef = useRef<MapRef>(null);

  const { data: itinerary } = usePlanner('t-1');

  const activeMapActivityId = useActiveMapActivityId();
  const { setActiveMapActivity, toggleActivitySelection } = usePlannerUIStore();

  const mappableActivities = useMemo<PlannerActivity[]>(() => {
    if (!itinerary) return [];
    return getActivitiesWithCoordinates(itinerary);
  }, [itinerary]);

  const activeActivity = useMemo(() => {
    if (!activeMapActivityId || !itinerary) return null;
    return mappableActivities.find((a) => a.id === activeMapActivityId) ?? null;
  }, [activeMapActivityId, mappableActivities, itinerary]);

  const handleMarkerClick = useCallback((activity: PlannerActivity) => {
    setActiveMapActivity(activity.id);
    toggleActivitySelection(activity.id);
  }, [setActiveMapActivity, toggleActivitySelection]);

  const handlePopupClose = useCallback(() => {
    setActiveMapActivity(null);
  }, [setActiveMapActivity]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={token}
      initialViewState={{ longitude: 139.732, latitude: 35.68, zoom: 11 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      onLoad={onLoaded}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      <RouteLayer id="main-route" coordinates={MOCK_ROUTE_COORDS} isDashed />

      {mappableActivities.map((activity) => {
        const coords = activity.coordinates!;
        return (
          <MapMarker
            key={activity.id}
            activity={activity}
            longitude={coords.lng}
            latitude={coords.lat}
            isSelected={activeMapActivityId === activity.id}
            onClick={() => handleMarkerClick(activity)}
          />
        );
      })}

      {activeActivity?.coordinates && (
        <MapPopup
          longitude={activeActivity.coordinates.lng}
          latitude={activeActivity.coordinates.lat}
          onClose={handlePopupClose}
          title={activeActivity.title}
          subtitle={activeActivity.location ?? ''}
          time={activeActivity.time}
          icon={ACTIVITY_ICON_MAP[activeActivity.type] ?? 'MapPin'}
          iconColorClass={ACTIVITY_COLOR_MAP[activeActivity.type] ?? 'bg-muted-foreground'}
        />
      )}
    </Map>
  );
}
