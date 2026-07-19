'use client';

import React from 'react';
import { Map, Satellite, Navigation } from 'lucide-react';

export type MapStyle = 'streets' | 'satellite' | 'dark';

interface MapControlsProps {
  currentStyle: MapStyle;
  onStyleChange: (style: MapStyle) => void;
}

const STYLES: { id: MapStyle; label: string; Icon: React.ElementType }[] = [
  { id: 'streets', label: 'Streets', Icon: Map },
  { id: 'satellite', label: 'Satellite', Icon: Satellite },
  { id: 'dark', label: 'Dark', Icon: Navigation },
];

/**
 * Renders a floating map style switcher control panel.
 */
export function MapControls({ currentStyle, onStyleChange }: MapControlsProps) {
  return (
    <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 p-1 shadow-lg">
      {STYLES.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onStyleChange(id)}
          title={label}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
            currentStyle === id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800:text-slate-200 hover:bg-slate-100:bg-slate-800'
          }`}
        >
          <Icon className="w-3 h-3" />
          {label}
        </button>
      ))}
    </div>
  );
}
