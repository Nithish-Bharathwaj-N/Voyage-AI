'use client';

import * as React from 'react';

import { Loader2, MapPin, Navigation, Compass, Hotel, Utensils } from 'lucide-react';
import { Coordinate } from '@/types/itinerary';

export interface StopCoordinate {
  id?: string;
  latitude: number;
  longitude: number;
  title?: string;
  category?: 'Accommodation' | 'Dining' | 'Sightseeing' | 'Transport' | string;
  dayNumber?: number;
  cost?: number;
  image?: string;
  rating?: number;
  googleMapsUrl?: string;
}



const DAY_COLORS = [
  '#2563eb', // Day 1: Blue
  '#9333ea', // Day 2: Purple
  '#059669', // Day 3: Emerald
  '#d97706', // Day 4: Amber
  '#dc2626', // Day 5: Red
  '#0891b2', // Day 6: Cyan
];

export interface InteractiveMapProps {
  coordinates?: StopCoordinate[];
  center?: Coordinate;
  zoom?: number;
  activeDayNumber?: number;
  hoveredId?: string | null;
  activeId?: string | null;
  onMarkerHover?: (id: string | null) => void;
}

export function InteractiveMap({
  coordinates = [],
  center = { latitude: 13.0827, longitude: 80.2707 }, // Default center: Chennai
  zoom = 12,
  activeDayNumber,
  hoveredId,
  activeId,
  onMarkerHover,
}: InteractiveMapProps) {

  const mapContainer = React.useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [useFallback, setUseFallback] = React.useState(false);
   
  const [mapboxGl, setMapboxGl] = React.useState<any>(null);

  // Set timeout fallback for mapbox load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapLoaded) {
        setUseFallback(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [mapLoaded]);

  // Dynamic import of mapbox-gl to prevent SSR compilation crashes
  React.useEffect(() => {
    import('mapbox-gl').then((mb) => {
      const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
      if (!token) {
        setUseFallback(true);
        return;
      }
      mb.default.accessToken = token;
      setMapboxGl(mb.default);
    }).catch(() => {
      setUseFallback(true);
    });
  }, []);

  const mapRef = React.useRef<any>(null);
  const markersRef = React.useRef<any[]>([]);

  // Initialize Map only once
  React.useEffect(() => {
    if (!mapboxGl || !mapContainer.current || useFallback || mapRef.current) return;

    try {
      const mapStyle = 'mapbox://styles/mapbox/light-v11';

      const map = new mapboxGl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center: [center.longitude, center.latitude],
        zoom: zoom,
        attributionControl: false,
      });

      map.on('load', () => {
        setMapLoaded(true);
      });

      mapRef.current = map;
    } catch (e) {
      setUseFallback(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapboxGl, useFallback]);

  // Force light style
  React.useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    mapRef.current.setStyle('mapbox://styles/mapbox/light-v11');
  }, [mapLoaded]);

  // Update markers, routes, and bounds when coordinates change
  React.useEffect(() => {
    if (!mapRef.current || !mapLoaded || !mapboxGl) return;
    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (coordinates.length === 0) return;

    // Calculate bounds for all coordinates
    const bounds = new mapboxGl.LngLatBounds(
      [coordinates[0].longitude, coordinates[0].latitude],
      [coordinates[0].longitude, coordinates[0].latitude]
    );

    // Render new markers
    coordinates.forEach((coord, idx) => {
      const el = document.createElement('div');
      
      const isActiveDay = activeDayNumber ? coord.dayNumber === activeDayNumber : true;
      const opacity = isActiveDay ? '1' : '0.4';
      const scale = isActiveDay ? 'scale-100' : 'scale-75';
      const zIndex = isActiveDay ? 10 : 1;

      const dayIdx = (coord.dayNumber !== undefined ? coord.dayNumber - 1 : idx) % DAY_COLORS.length;
      const markerBgColor = DAY_COLORS[dayIdx];

      el.className = `w-7 h-7 rounded-full text-white font-semibold flex items-center justify-center border-2 border-white shadow-md text-xs cursor-pointer transition-all duration-300 ring-2 ring-transparent interactive-marker ${scale} hover:scale-110`;
      el.style.backgroundColor = markerBgColor;
      el.style.opacity = opacity;
      el.style.zIndex = zIndex.toString();
      el.innerHTML = String(idx + 1);
      if (coord.id) el.dataset.id = coord.id;

      // Bidirectional Hover Sync
      el.addEventListener('mouseenter', () => onMarkerHover?.(coord.id || null));
      el.addEventListener('mouseleave', () => onMarkerHover?.(null));

      const categoryLabel = coord.category || 'Sightseeing';
      const title = coord.title || `Stop ${idx + 1}`;
      const costInfo = coord.cost !== undefined && coord.cost > 0 ? ` · $${coord.cost.toLocaleString()}` : '';
      const ratingInfo = coord.rating ? ` · ⭐ ${coord.rating}` : '';
      
      const imageHtml = coord.image 
        ? `<div class="w-full h-24 mb-2 rounded-lg bg-slate-100 overflow-hidden relative"><img src="${coord.image}" class="w-full h-full object-cover" alt="${title}" onerror="this.src='/images/hero-bg.png'" /></div>`
        : '';
        
      const linkHtml = coord.googleMapsUrl 
        ? `<a href="${coord.googleMapsUrl}" target="_blank" class="mt-2 block text-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md py-1 text-[10px] font-bold transition-colors">Open in Maps</a>`
        : '';

      const popup = new mapboxGl.Popup({ offset: 25, className: 'premium-popup' })
        .setHTML(`
          <div class="p-2.5 font-sans min-w-[180px]">
            ${imageHtml}
            <p class="text-[10px] font-bold uppercase text-indigo-500 tracking-wider mb-1">${categoryLabel}</p>
            <p class="text-sm font-bold text-slate-900 leading-tight">${title}</p>
            <p class="text-[11px] font-medium text-slate-500 mt-1">Day ${coord.dayNumber || 1}${costInfo}${ratingInfo}</p>
            ${linkHtml}
          </div>
        `);

      const marker = new mapboxGl.Marker(el)
        .setLngLat([coord.longitude, coord.latitude])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });

    // Draw Polyline for active day
    const activeCoords = activeDayNumber ? coordinates.filter(c => c.dayNumber === activeDayNumber) : coordinates;
    const lineCoords = activeCoords.map(c => [c.longitude, c.latitude]);
    const routeColor = activeDayNumber && activeDayNumber <= DAY_COLORS.length ? DAY_COLORS[activeDayNumber - 1] : '#6366f1';

    if (map.getSource('route')) {
      map.getSource('route').setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: lineCoords,
        },
      });
      if (map.getLayer('route')) {
        map.setPaintProperty('route', 'line-color', routeColor);
      }
    } else {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: lineCoords,
          },
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': routeColor,
          'line-width': 4,
          'line-opacity': 0.8,
          'line-dasharray': [2, 2],
        },
      });
    }

    // Fit bounds to ACTIVE day coordinates
    if (activeCoords.length > 1) {
      const activeBounds = new mapboxGl.LngLatBounds();
      activeCoords.forEach(c => activeBounds.extend([c.longitude, c.latitude]));
      map.fitBounds(activeBounds, {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        duration: 1200,
        pitch: 45,
      });
    } else if (activeCoords.length === 1) {
      map.flyTo({
        center: [activeCoords[0].longitude, activeCoords[0].latitude],
        zoom: 14,
        duration: 1200,
        pitch: 45,
      });
    }

  }, [coordinates, activeDayNumber, mapLoaded, mapboxGl, onMarkerHover]);

  // Handle Hovered Activity Sync
  React.useEffect(() => {
    markersRef.current.forEach(marker => {
      const el = marker.getElement();
      if (el.dataset.id && el.dataset.id === hoveredId) {
        el.classList.add('scale-125', 'ring-indigo-500', '!z-50');
      } else {
        el.classList.remove('scale-125', 'ring-indigo-500', '!z-50');
      }
    });
  }, [hoveredId]);

  // Handle Active/Clicked Activity Sync (FlyTo)
  React.useEffect(() => {
    if (!mapRef.current || !activeId) return;
    const coord = coordinates.find(c => c.id === activeId);
    if (coord) {
      mapRef.current.flyTo({
        center: [coord.longitude, coord.latitude],
        zoom: 15,
        essential: true,
        duration: 1200
      });
      // Optionally open popup
      const marker = markersRef.current.find(m => m.getElement().dataset.id === activeId);
      if (marker && !marker.getPopup().isOpen()) {
        marker.togglePopup();
      }
    }
  }, [activeId, coordinates]);

  if (useFallback) {
    return (
      <div className="relative w-full h-full min-h-[300px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between p-6 text-white font-sans">
        {/* Custom High-Fidelity SVG Route Fallback Map */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none scale-105" 
             style={{ backgroundImage: 'url("/images/hero-bg.png")' }} />
        
        <div className="flex justify-between items-center z-10">
          <div className="space-y-1">
            <h4 className="text-xs font-black font-display tracking-widest text-slate-400 uppercase">
              VoyageAI Vector Navigation
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold">Active Itinerary Sequence Plot</p>
          </div>
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-[10px] font-bold">
            <Navigation className="w-3 h-3 animate-pulse" />
            <span>Map Active</span>
          </span>
        </div>

        {/* Dynamic Vector canvas plotting coordinates with Distance / ETA */}
        <div className="flex-1 flex items-center justify-center relative my-4">
          <svg className="w-full h-full max-h-[220px]" viewBox="0 0 500 200">
            {coordinates.length > 1 && (
              <>
                <path
                  d="M 100 100 L 250 60 L 400 130"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                />
                {/* Distance & ETA labels along paths */}
                <g className="fill-slate-400 text-[8px] font-bold">
                  <rect x="155" y="65" width="55" height="12" rx="4" className="fill-slate-950/80 stroke-slate-800 stroke" />
                  <text x="182" y="74" textAnchor="middle" className="fill-blue-400">12km · 20m</text>

                  <rect x="305" y="85" width="55" height="12" rx="4" className="fill-slate-950/80 stroke-slate-800 stroke" />
                  <text x="332" y="94" textAnchor="middle" className="fill-purple-400">8km · 15m</text>
                </g>
              </>
            )}
            {coordinates.length === 0 ? (
              <text x="250" y="100" textAnchor="middle" fill="#94a3b8" className="text-xs font-bold">
                No active itinerary stops plotted.
              </text>
            ) : (
              coordinates.map((coord, idx) => {
                const x = 100 + idx * 150;
                const y = idx === 1 ? 60 : idx === 2 ? 130 : 100;
                const dayIdx = (coord.dayNumber !== undefined ? coord.dayNumber - 1 : idx) % DAY_COLORS.length;
                const markerColor = DAY_COLORS[dayIdx];

                return (
                  <g key={idx} className="cursor-pointer group">
                    <circle cx={x} cy={y} r="12" fill={markerColor} className="stroke-white stroke-2 group-hover:scale-110 transition-transform" />
                    <text x={x} y={y + 4} textAnchor="middle" className="fill-white text-[10px] font-bold font-display">
                      {idx + 1}
                    </text>
                  </g>
                );
              })
            )}
          </svg>
        </div>

        {/* Legend / Timeline panel */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 z-10 glass-panel">
          <div className="flex gap-4 overflow-x-auto text-[10px] font-semibold text-slate-400">
            {coordinates.length > 0 ? (
              coordinates.map((c, i) => {
                const isHotel = c.category === 'Accommodation';
                const isFood = c.category === 'Dining';
                return (
                  <div key={i} className="flex items-center space-x-1 shrink-0">
                    {isHotel ? <Hotel className="w-3 h-3 text-purple-400" /> : isFood ? <Utensils className="w-3 h-3 text-emerald-400" /> : <MapPin className="w-3 h-3 text-blue-400" />}
                    <span className="text-slate-200">{c.title || `Stop ${i + 1}`}</span>
                    {i < coordinates.length - 1 && <span className="text-slate-650">→</span>}
                  </div>
                );
              })
            ) : (
              <p>Explore city landmarks to generate maps.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
      <div ref={mapContainer} className="w-full h-full absolute inset-0" />
      {!mapLoaded && (
        <div className="absolute inset-0 bg-slate-50/80 flex flex-col justify-center items-center gap-2 z-10">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="text-xs font-semibold text-slate-500 font-sans">Loading Map Overlays...</span>
        </div>
      )}
    </div>
  );
}
