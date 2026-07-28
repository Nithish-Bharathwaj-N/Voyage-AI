'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon, type IconName } from '@/components/icons/Icon';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ExploreDestination } from '@/lib/services/explore';

interface QuickPreviewProps {
  destination: ExploreDestination | null;
  isOpen: boolean;
  onClose: () => void;
  onPlan?: (destination: ExploreDestination) => void;
}

export function QuickPreview({ destination, isOpen, onClose, onPlan }: QuickPreviewProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Sync wishlist status
  useEffect(() => {
    if (destination) {
      const wishlisted = localStorage.getItem(`wishlist-${destination.id}`) === 'true';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(wishlisted);
    }
  }, [destination]);

  const handleSaveToggle = () => {
    if (!destination) return;
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wishlist-${destination.id}`, nextSaved ? 'true' : 'false');
      window.dispatchEvent(new Event('wishlist-update'));
    }
  };

  if (!destination) return null;

  const mockAttractions = [
    { name: 'Cultural Landmarks', icon: 'Landmark' },
    { name: 'Local Marketplace Walks', icon: 'Store' },
    { name: 'Scenic Viewpoints', icon: 'Camera' },
  ];

  const mockFoods = ['Local street delicacies', 'Authentic traditional dining', 'Artisanal local coffee'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-background border-l border-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Image Area */}
            <div className="relative w-full h-[220px] bg-muted shrink-0">
              <Image
                src={destination.imageUrl}
                alt={destination.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Close Button overlay */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 left-4 z-10 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 text-white"
                onClick={onClose}
                aria-label="Close preview"
              >
                <Icon name="X" size={16} />
              </Button>

              {/* Wishlist overlay */}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 text-white ${
                  isSaved ? 'text-rose-500' : ''
                }`}
                onClick={handleSaveToggle}
                aria-label={isSaved ? "Remove from saved" : "Save destination"}
              >
                <Icon name="Heart" size={14} className={isSaved ? "fill-current" : ""} />
              </Button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 z-10">
                <span className="text-[10px] font-bold text-primary bg-primary/20 border border-primary/30 rounded px-2 py-0.5 tracking-wider uppercase mb-1 inline-block">
                  {destination.continent}
                </span>
                <h3 className="text-xl font-extrabold text-white">{destination.title}</h3>
                <span className="text-xs text-zinc-300 block">{destination.city}, {destination.country}</span>
              </div>
            </div>

            {/* Scrollable details content */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {/* Quick stats grid */}
              <div className="grid grid-cols-3 gap-3 border-b border-border pb-5">
                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Rating</span>
                  <div className="flex items-center gap-1 font-bold text-foreground text-sm">
                    <Icon name="Star" size={14} className="text-amber-500 fill-current" />
                    {destination.rating}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Trip Length</span>
                  <span className="font-bold text-foreground text-sm">{destination.durationWeeks} Week(s)</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-muted/40 border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Plan Score</span>
                  <span className="font-bold text-primary text-sm">{destination.planningScore}%</span>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About the Destination</h4>
                <p className="text-sm text-foreground leading-relaxed font-medium">
                  {destination.description}
                </p>
              </div>

              {/* Weather & Season summary */}
              <div className="flex gap-4 p-4 rounded-xl border border-border bg-muted/20 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon name="CloudSun" size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground font-semibold block leading-none mb-1">Best Travel Season</span>
                    <span className="text-sm font-bold text-foreground">{destination.bestSeason}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground font-semibold block leading-none mb-1">Average Temp</span>
                  <span className="text-sm font-bold text-foreground">22°C / 72°F</span>
                </div>
              </div>

              {/* Top Attractions list */}
              <div className="flex flex-col gap-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Highlights & Attractions</h4>
                <div className="flex flex-col gap-2">
                  {mockAttractions.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1">
                      <div className="h-6 w-6 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                        <Icon name={att.icon as IconName} size={13} />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{att.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Local Foods */}
              <div className="flex flex-col gap-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Must-Try Food Experiences</h4>
                <div className="flex flex-wrap gap-1.5">
                  {mockFoods.map((food, idx) => (
                    <span key={idx} className="text-xs font-bold bg-muted/70 text-muted-foreground border border-border/40 rounded-full px-3 py-1.5">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Actions bar at bottom */}
            <div className="p-5 border-t border-border bg-card shrink-0 flex gap-3">
              <Button
                variant="default"
                className="flex-1 font-bold text-sm h-11 rounded-lg gap-2"
                onClick={() => onPlan?.(destination)}
              >
                <Icon name="Sparkles" size={16} />
                Plan This Itinerary
              </Button>
              <Button
                variant="outline"
                className="flex-1 font-bold text-sm h-11 border-border rounded-lg"
                onClick={() => alert(`Details page for ${destination.title} is coming in Sprint 8!`)}
              >
                View Details
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
