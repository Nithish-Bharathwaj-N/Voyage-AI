'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ExploreDestination } from '@/lib/services/explore';

export type DestinationCardVariant = 'featured' | 'standard' | 'compact' | 'horizontal' | 'carousel' | 'hero';

interface DestinationCardProps {
  destination: ExploreDestination;
  variant?: DestinationCardVariant;
  onPreview?: (destination: ExploreDestination) => void;
  onPlan?: (destination: ExploreDestination) => void;
}

export function DestinationCard({ 
  destination, 
  variant = 'standard', 
  onPreview,
  onPlan 
}: DestinationCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sync wishlist status from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlisted = localStorage.getItem(`wishlist-${destination.id}`) === 'true';
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsSaved(wishlisted);
    }
  }, [destination.id]);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wishlist-${destination.id}`, nextSaved ? 'true' : 'false');
      // Dispatch storage event to sync other listening components/counts
      window.dispatchEvent(new Event('wishlist-update'));
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Explore ${destination.title}`,
        text: destination.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/explore?dest=${destination.id}`);
      alert('Destination link copied to clipboard!');
    }
  };

  const formatPrice = (range: string) => {
    switch (range) {
      case 'low': return '$';
      case 'medium': return '$$';
      case 'high': return '$$$';
      case 'luxury': return '$$$$';
      default: return '$$';
    }
  };

  // Render different layouts based on variant
  if (variant === 'compact') {
    return (
      <Card 
        onClick={() => onPreview?.(destination)}
        className="group relative flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-muted/30 hover:border-muted-foreground/30 shadow-sm hover:shadow transition-all duration-300 cursor-pointer overflow-hidden"
      >
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
          <Image
            src={destination.imageUrl}
            alt={destination.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-foreground truncate">{destination.title}</h4>
          <span className="text-xs text-muted-foreground block truncate">{destination.city}, {destination.country}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0 text-amber-500 font-semibold text-xs pr-1">
          <Icon name="Star" size={12} className="fill-current" />
          <span>{destination.rating}</span>
        </div>
      </Card>
    );
  }

  if (variant === 'hero') {
    return (
      <div 
        onClick={() => onPreview?.(destination)}
        className="relative rounded-2xl h-[340px] md:h-[400px] w-full overflow-hidden flex flex-col justify-end p-6 md:p-10 bg-zinc-950 border border-border shadow-lg group cursor-pointer"
      >
        <Image
          src={destination.imageUrl}
          alt={destination.title}
          fill
          priority
          className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        
        {/* Wishlist overlay */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 text-white ${
            isSaved ? 'text-rose-500' : ''
          }`}
          onClick={handleSaveToggle}
        >
          <Icon name="Heart" size={16} className={isSaved ? "fill-current" : ""} />
        </Button>

        <div className="relative z-10 max-w-xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-[10px] font-bold tracking-wide uppercase px-2.5 py-0.5">
              Featured Spot
            </Badge>
            <span className="text-xs text-zinc-300 flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              Best Season: {destination.bestSeason}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{destination.title}</h2>
          <p className="text-sm md:text-base text-zinc-200 line-clamp-2 leading-relaxed mb-4">
            {destination.description}
          </p>
          <div className="flex items-center gap-3">
            <Button 
              variant="default"
              className="font-bold text-sm h-11 px-5 rounded-lg gap-2"
              onClick={(e) => { e.stopPropagation(); onPlan?.(destination); }}
            >
              <Icon name="Sparkles" size={16} />
              Plan This Trip
            </Button>
            <Button 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white font-bold text-sm h-11 px-5 rounded-lg"
              onClick={(e) => { e.stopPropagation(); onPreview?.(destination); }}
            >
              Quick View
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Card 
        onClick={() => onPreview?.(destination)}
        className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-[180px] cursor-pointer"
      >
        <div className="relative w-full sm:w-[220px] h-[160px] sm:h-full overflow-hidden shrink-0 bg-muted">
          <Image
            src={destination.imageUrl}
            alt={destination.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-2">
              <div>
                <h4 className="font-extrabold text-lg text-foreground truncate">{destination.title}</h4>
                <span className="text-xs text-muted-foreground block leading-none mt-1">
                  {destination.city}, {destination.country}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/50 border border-border/60 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                <Icon name="Star" size={12} className="text-amber-500 fill-current" />
                <span>{destination.rating}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-2.5 leading-relaxed">
              {destination.description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/40 mt-3 sm:mt-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-foreground">
                Price: <span className="text-muted-foreground font-medium">{formatPrice(destination.priceRange)}</span>
              </span>
              <span className="text-xs font-bold text-foreground flex items-center gap-1">
                <Icon name="Sparkles" size={12} className="text-primary" />
                Plan Score: <span className="text-primary font-bold">{destination.planningScore}%</span>
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full" onClick={handleSaveToggle}>
                <Icon name="Heart" size={12} className={isSaved ? "fill-current text-rose-500" : ""} />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 px-2.5 text-xs font-bold gap-1" onClick={(e) => { e.stopPropagation(); onPreview?.(destination); }}>
                Details
                <Icon name="ArrowRight" size={12} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default 'standard' and 'carousel' card styles
  return (
    <Card 
      onClick={() => onPreview?.(destination)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[350px] cursor-pointer ${
        variant === 'featured' ? 'h-[370px]' : ''
      }`}
    >
      <div className="relative w-full h-[190px] overflow-hidden bg-muted shrink-0">
        <Image
          src={destination.imageUrl}
          alt={destination.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Top Overlays */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border text-xs font-semibold text-foreground">
          <Icon name="Star" size={12} className="text-amber-500 fill-current" />
          <span>{destination.rating}</span>
        </div>

        <div className="absolute top-3 right-3 z-10 flex gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border border-border hover:bg-background text-muted-foreground hover:text-foreground"
            onClick={handleShare}
            aria-label="Share destination"
          >
            <Icon name="Share2" size={13} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm border border-border hover:bg-background transition-colors ${
              isSaved ? 'text-rose-500 hover:text-rose-600' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={handleSaveToggle}
            aria-label={isSaved ? "Remove from saved" : "Save destination"}
          >
            <motion.div
              animate={isSaved && isHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Icon name="Heart" size={13} className={isSaved ? "fill-current" : ""} />
            </motion.div>
          </Button>
        </div>

        {/* Floating Bottom Overlays */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
          <Badge className="bg-background/80 hover:bg-background/90 backdrop-blur-sm border-none text-foreground text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5">
            {destination.continent}
          </Badge>
          <Badge className="bg-background/80 hover:bg-background/90 backdrop-blur-sm border-none text-foreground text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5">
            {destination.durationWeeks} Wk(s)
          </Badge>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-extrabold text-base text-foreground leading-tight truncate">
              {destination.title}
            </h4>
            <span className="text-sm font-semibold text-muted-foreground shrink-0">
              {formatPrice(destination.priceRange)}
            </span>
          </div>
          <span className="text-xs font-semibold text-muted-foreground block mb-2 leading-none mt-1">
            {destination.city}, {destination.country}
          </span>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Extra metrics for Featured variant */}
        {variant === 'featured' && (
          <div className="flex justify-between items-center bg-muted/40 p-2 rounded-lg my-1.5 text-[11px] font-medium text-muted-foreground border border-border/40">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={12} className="text-foreground" />
              Best: {destination.bestSeason}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Sparkles" size={12} className="text-primary" />
              Plan Score: {destination.planningScore}%
            </span>
          </div>
        )}

        {/* Categories / Tags & CTA */}
        <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-border/40">
          <div className="flex gap-1.5 overflow-hidden">
            {destination.categories.slice(0, 2).map((c) => (
              <span key={c} className="text-[10px] font-bold bg-muted text-muted-foreground rounded px-2 py-0.5 uppercase tracking-wide shrink-0">
                {c}
              </span>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs font-bold text-primary gap-1 group-hover:bg-accent/40"
            onClick={(e) => { e.stopPropagation(); onPreview?.(destination); }}
          >
            Explore
            <Icon name="ChevronRight" size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
