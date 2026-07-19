'use client';

import React from 'react';
import { InteractiveMap, StopCoordinate } from '@/components/maps/interactive-map';
import { PlannerState } from '@/types/itinerary';

interface ActivityItem {
  id: string;
  title: string;
  category?: string;
  latitude?: number;
  longitude?: number;
  cost?: number;
}

interface ItineraryDay {
  dayNumber: number;
  activities: ActivityItem[];
}

interface ItineraryPlan {
  destination: string;
  days: ItineraryDay[];
}

interface PlannerMapProps {
  plannerState: PlannerState | null;
  activeDayIndex: number;
  hoveredActivityId?: string | null;
  activeActivityId?: string | null;
  onHoverActivity?: (id: string | null) => void;
}

/**
 * Interactive Map Right Panel. Extracts coordinate stops from the active itinerary day
 * and overlays them onto the InteractiveMap Mapbox instance.
 */
export function PlannerMap({ 
  plannerState, 
  activeDayIndex,
  hoveredActivityId,
  activeActivityId,
  onHoverActivity
}: PlannerMapProps) {
  const coordinates = React.useMemo(() => {
    if (!plannerState || plannerState.timeline.length === 0) return [];

    const list: StopCoordinate[] = [];
    (plannerState.timeline ?? []).forEach((day: any) => {
      if (!day.activities) return;
      (day.activities ?? []).forEach((act: any) => {
        const lat = act.latitude || act.coordinates?.latitude;
        const lng = act.longitude || act.coordinates?.longitude;
        if (!lat || !lng) return;

        list.push({
          id: act.id,
          latitude: lat,
          longitude: lng,
          title: act.activity || act.title,
          category: act.category || 'Sightseeing',
          dayNumber: day.day,
          cost: act.estimatedCost || act.cost || 0,
          image: act.resolvedImage,
          rating: act.rating,
          googleMapsUrl: act.googleMapsUrl,
        });
      });
    });

    return list;
  }, [plannerState]);

  const mapCenter = React.useMemo(() => {
    if (coordinates.length > 0) {
      return {
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
      };
    }
    return { latitude: 13.0827, longitude: 80.2707 }; // Default: Chennai
  }, [coordinates]);

  const activeDayNumber = plannerState?.timeline[activeDayIndex]?.day;

  return (
    <div className="flex-1 h-full min-h-[350px] relative select-none">
      <InteractiveMap
        coordinates={coordinates}
        center={mapCenter}
        zoom={coordinates.length > 0 ? 13 : 11}
        activeDayNumber={activeDayNumber}
        hoveredId={hoveredActivityId}
        activeId={activeActivityId}
        onMarkerHover={onHoverActivity}
      />
    </div>
  );
}
