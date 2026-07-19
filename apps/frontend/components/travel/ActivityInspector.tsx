'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Clock, DollarSign, Star, Navigation, 
  ExternalLink, Calendar, CloudSun, Utensils, 
  Sparkles, ShieldAlert, Share, BookmarkPlus, 
  RefreshCw, Trash2, Info 
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// Reuse the mapped activity type from page.tsx (or define a local equivalent)
export interface InspectedActivity {
  id: string;
  title: string;
  category?: string;
  image?: string;
  imageAttribution?: string;
  rating?: number;
  reviewCount?: number;
  time?: string;
  duration?: string;
  cost?: number;
  openingHours?: string;
  googleMapsUrl?: string;
  website?: string;
  bestVisitingTime?: string;
  aiNotes?: string;
  reason?: string;
  copilotReasoning?: string;
  transportAdvice?: string;
  priceLevel?: number;
  warnings?: string[];
  nearbyRestaurants?: Array<{ name: string; category: string; walkingMinutes?: number; rating?: number }>;
  nearbyAttractions?: Array<{ name: string; category: string; walkingMinutes?: number; rating?: number }>;
  dayNumber: number;
}

interface ActivityInspectorProps {
  activity: InspectedActivity | null;
  onClose: () => void;
  onReplace?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function ActivityInspector({ activity, onClose, onReplace, onRemove }: ActivityInspectorProps) {
  const [imgSrc, setImgSrc] = React.useState<string | undefined>(activity?.image);

  React.useEffect(() => {
    setImgSrc(activity?.image);
  }, [activity?.image]);

  return (
    <AnimatePresence>
      {activity && (
        <>
          {/* Backdrop (optional, we could just have a shadow on the panel, but a slight dim highlights the panel) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/10 z-[40] backdrop-blur-[1px]"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-[420px] max-w-full bg-white shadow-2xl z-[50] flex flex-col border-l border-slate-200"
          >
            {/* Hero Section */}
            <div className="relative h-64 shrink-0 bg-slate-100">
              {imgSrc ? (
                <Image 
                  src={imgSrc} 
                  alt={activity.title} 
                  fill 
                  className="object-cover"
                  onError={() => setImgSrc('/images/hero-bg.png')}
                />
              ) : (
                <div className="w-full h-full bg-slate-200" />
              )}
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white border border-white/20 shadow-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {activity.category || 'Sightseeing'}
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Rating */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h2 className="text-2xl font-black leading-tight tracking-tight mb-1">{activity.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                  {activity.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>{activity.rating}</span>
                      {activity.reviewCount && <span className="text-white/70">({activity.reviewCount.toLocaleString()})</span>}
                    </div>
                  )}
                  {activity.priceLevel !== undefined && (
                    <div className="flex items-center gap-0.5 text-emerald-400 font-bold">
                      {Array.from({ length: activity.priceLevel }).map((_, i) => (
                        <DollarSign key={i} className="w-3.5 h-3.5 -mx-0.5" />
                      ))}
                    </div>
                  )}
                  <span className="text-white/70 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Day {activity.dayNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-6">
              
              {/* Quick Action Bar */}
              <div className="flex justify-around items-center border-b border-slate-100 pb-5">
                {activity.googleMapsUrl && (
                  <a href={activity.googleMapsUrl} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-blue-500:text-blue-400 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wide uppercase">Directions</span>
                  </a>
                )}
                {activity.website && (
                  <a href={activity.website} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-indigo-500:text-indigo-400 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wide uppercase">Website</span>
                  </a>
                )}
                <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-800:text-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <BookmarkPlus className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wide uppercase">Save</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-800:text-slate-200 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Share className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wide uppercase">Share</span>
                </button>
              </div>

              {/* Logistics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Time & Duration
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {activity.time} {activity.duration ? `· ${activity.duration}` : ''}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Estimated Cost
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {activity.cost && activity.cost > 0 ? `$${activity.cost.toLocaleString()}` : 'Free'}
                  </p>
                </div>
                {activity.openingHours && (
                  <div className="space-y-1 col-span-2">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
                      <Info className="w-3 h-3" /> Opening Hours
                    </div>
                    <p className="text-sm font-medium text-slate-600">
                      {activity.openingHours}
                    </p>
                  </div>
                )}
              </div>

              {/* AI Intelligence Block */}
              {(activity.reason || activity.aiNotes || activity.bestVisitingTime || activity.copilotReasoning) && (
                <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-4 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> AI Consultant
                  </h3>

                  {activity.copilotReasoning && (
                    <div className="bg-indigo-100 p-3 rounded-xl border border-indigo-200 mb-2">
                      <p className="text-sm font-bold text-indigo-800">
                        {activity.copilotReasoning}
                      </p>
                    </div>
                  )}
                  
                  {activity.reason && (
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      &quot;{activity.reason}&quot;
                    </p>
                  )}
                  
                  <div className="space-y-3 pt-2 border-t border-indigo-100">
                    {activity.bestVisitingTime && (
                      <div className="flex items-start gap-2.5">
                        <CloudSun className="w-4 h-4 text-indigo-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold uppercase text-indigo-400 tracking-wide">Best Visiting Time</p>
                          <p className="text-[13px] text-slate-600">{activity.bestVisitingTime}</p>
                        </div>
                      </div>
                    )}
                    {activity.aiNotes && (
                      <div className="flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-indigo-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-[10px] font-bold uppercase text-indigo-400 tracking-wide">Insider Tip</p>
                          <p className="text-[13px] text-slate-600">{activity.aiNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transportation Advice */}
              {activity.transportAdvice && (
                <div className="bg-slate-50 rounded-xl p-3.5 flex items-start gap-3 border border-slate-100">
                  <Navigation className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-slate-600 leading-snug">{activity.transportAdvice}</p>
                </div>
              )}

              {/* Warnings */}
              {activity.warnings && activity.warnings.length > 0 && (
                <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200/50">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Heads Up</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {activity.warnings.map((w, i) => (
                      <li key={i} className="text-[13px] text-amber-800">{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nearby Matrix */}
              {(activity.nearbyRestaurants && activity.nearbyRestaurants.length > 0) && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" /> Nearby Dining
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {activity.nearbyRestaurants.map((place, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                        <div>
                          <p className="text-sm font-bold text-slate-700">{place.name}</p>
                          <p className="text-[11px] font-medium text-slate-500">{place.category}</p>
                        </div>
                        {place.walkingMinutes && (
                          <div className="text-[10px] font-bold bg-white px-2 py-1 rounded shadow-sm text-slate-500 border border-slate-100">
                            {place.walkingMinutes} min walk
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3 shrink-0">
              <Button 
                variant="outline" 
                className="flex-1 bg-white hover:bg-slate-100:bg-slate-800 text-slate-700"
                icon={<RefreshCw className="w-4 h-4" />}
                onClick={() => onReplace?.(activity.id)}
              >
                Find Alternative
              </Button>
              <Button 
                variant="danger" 
                className="flex-1"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => onRemove?.(activity.id)}
              >
                Remove
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
