'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, DollarSign, Star, MoreVertical, Navigation, Ticket, GripVertical, CloudSun, MapPin, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';

export interface ActivityCardProps {
  title: string;
  time?: string;
  duration?: string;
  cost?: number;
  rating?: number;
  category?: string;
  image?: string;
  recommendationTag?: string;
  travelMode?: 'walk' | 'transit' | 'car';
  distance?: string;
  walkingTime?: string;
  weatherBadge?: string;
  bookingLink?: string;
  copilotReasoning?: string;
  dragHandleProps?: Record<string, any>;
  onEdit?: () => void;
  onDelete?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  className?: string;
  reviewCount?: number;
  openingHours?: string;
  website?: string;
  googleMapsUrl?: string;
  aiNotes?: string;
  nearbyRestaurants?: any[];
  nearbyAttractions?: any[];
  transportAdvice?: string;
  priceLevel?: number;
  warnings?: string[];
}

/**
 * Premium reusable activity row card for timelines.
 */
export function ActivityCard({
  title,
  time,
  duration,
  cost = 0,
  rating,
  category = 'Sightseeing',
  image,
  recommendationTag,
  travelMode,
  distance,
  walkingTime,
  weatherBadge,
  bookingLink,
  copilotReasoning,
  dragHandleProps,
  onEdit,
  onDelete,
  onMouseEnter,
  onMouseLeave,
  onClick,
  className = '',
  reviewCount,
  openingHours,
  website,
  googleMapsUrl,
  aiNotes,
  nearbyRestaurants,
  nearbyAttractions,
  transportAdvice,
  priceLevel,
  warnings,
}: ActivityCardProps) {
  const actions = [
    ...(onEdit ? [{ id: 'edit', label: 'Edit activity', onClick: onEdit }] : []),
    ...(onDelete ? [{ id: 'delete', label: 'Delete', onClick: onDelete, variant: 'danger' as const }] : []),
  ];

  const [imgSrc, setImgSrc] = React.useState(image);

  React.useEffect(() => {
    setImgSrc(image);
  }, [image]);

  return (
    <Card 
      className={`flex p-3 relative group text-left hover:-translate-y-[2px] hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)] transition-all duration-300 ${className} gap-3 cursor-pointer`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Drag Handle */}
      <div 
        {...dragHandleProps} 
        className="flex flex-col items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing shrink-0 px-1 -ml-1 outline-none"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Activity Image */}
      {imgSrc && (
        <div className="w-[84px] h-[84px] rounded-2xl overflow-hidden shrink-0 bg-slate-100 relative shadow-sm">
          <Image 
            src={imgSrc} 
            alt={title} 
            fill 
            className="object-cover" 
            onError={() => setImgSrc('/images/hero-bg.png')} 
          />
          {weatherBadge && (
            <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg text-[9px] font-black flex items-center gap-1 shadow-sm text-slate-700">
              <CloudSun className="w-3 h-3 text-amber-500" />
              {weatherBadge}
            </div>
          )}
        </div>
      )}

      {/* Description Meta */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        {/* Copilot Reasoning Banner */}
        {copilotReasoning && (
          <div className="mb-2 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-indigo-100 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3" />
            {copilotReasoning}
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500/80 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {category}
            </span>
            {recommendationTag && (
              <Badge variant="success" className="!text-[10px] !px-2 py-0 shadow-sm border border-emerald-500/20 bg-emerald-50 text-emerald-600">
                ✨ {recommendationTag}
              </Badge>
            )}
          </div>

          <h4 className="text-sm font-bold text-slate-900 leading-snug truncate pr-6 tracking-tight">{title}</h4>
        </div>

        <div className="flex items-center gap-3.5 text-[11px] font-medium text-slate-500 flex-wrap mt-2">
          {time && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{time}</span>
            </div>
          )}
          {duration && <span>{duration}</span>}
          
          {(distance || walkingTime) && (
            <div className="flex items-center gap-1 text-blue-500/80 bg-blue-50 px-1.5 rounded-md">
              <Navigation className="w-3 h-3" />
              <span>{walkingTime || distance}</span>
            </div>
          )}

          {cost > 0 && (
            <div className="flex items-center gap-0.5 text-slate-700 font-bold">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>{cost}</span>
            </div>
          )}
          {rating && (
            <div className="flex items-center gap-0.5 font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{rating}</span>
              {reviewCount && <span className="text-[10px] text-slate-400 font-medium">({reviewCount.toLocaleString()})</span>}
            </div>
          )}
          {openingHours && (
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{openingHours}</span>
            </div>
          )}
        </div>
        
        {(aiNotes || transportAdvice || (warnings && warnings.length > 0)) && (
          <div className="mt-2.5 space-y-1.5">
            {(aiNotes || transportAdvice) && (
              <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-100/50">
                {aiNotes && <p className="text-[11px] text-slate-600 italic">✨ {aiNotes}</p>}
                {transportAdvice && <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1"><Navigation className="w-2.5 h-2.5" /> {transportAdvice}</p>}
              </div>
            )}
            {warnings && warnings.length > 0 && (
              <div className="p-2 rounded-lg bg-red-50/50 border border-red-100/50">
                {warnings.map((w, i) => (
                  <p key={i} className="text-[11px] text-red-600 font-medium flex items-center gap-1">⚠️ {w}</p>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Nearby Places */}
        {(nearbyRestaurants?.length || nearbyAttractions?.length) ? (
           <div className="flex items-center gap-2 flex-wrap mt-2">
              {nearbyRestaurants?.map((r: any, i) => (
                 <Badge key={i} className="!text-[9px] px-1.5 py-0 bg-slate-100 text-slate-600 border-none">🍴 {r.name}</Badge>
              ))}
              {nearbyAttractions?.map((a: any, i) => (
                 <Badge key={i} className="!text-[9px] px-1.5 py-0 bg-slate-100 text-slate-600 border-none">📸 {a.name}</Badge>
              ))}
           </div>
        ) : null}
      </div>

      {/* Actions Side */}
      <div className="flex flex-col items-end justify-between shrink-0 ml-2">
        {/* Floating More Options Dropdown */}
        {actions.length > 0 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Dropdown
              trigger={
                <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              }
              items={actions}
            />
          </div>
        )}

        {/* Links Column */}
        <div className="flex flex-col gap-1">
          {bookingLink && (
            <a href={bookingLink} target="_blank" rel="noreferrer" className="flex items-center justify-center p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors tooltip-trigger" title="Book Tickets">
              <Ticket className="w-3.5 h-3.5" />
            </a>
          )}
          {googleMapsUrl && (
            <a href={googleMapsUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors tooltip-trigger" title="Open in Maps">
              <MapPin className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
