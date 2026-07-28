'use client';

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';


// ─── Lightweight date formatter (no date-fns dependency) ─────
function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions): string {
  try {
    return new Intl.DateTimeFormat('en-US', opts).format(new Date(iso));
  } catch {
    return '';
  }
}
function formatDateRange(start: string, end: string): string {
  const s = fmtDate(start, { month: 'short', day: 'numeric' });
  const e = fmtDate(end, { month: 'short', day: 'numeric', year: 'numeric' });
  return s && e ? `${s} – ${e}` : '';
}
function formatMonth(iso: string): string { return fmtDate(iso, { month: 'short' }); }
function formatDay(iso: string): string { return fmtDate(iso, { day: 'numeric' }); }

import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';
import { TripStatusBadge } from '../shared/TripStatusBadge';
import { TripProgressBar } from '../shared/TripProgressBar';
import { TripCoverImage } from '../shared/TripCoverImage';
import { FavoriteButton } from '../shared/FavoriteButton';
import { TravelersChip } from '../shared/TravelersChip';
import type { WorkspaceTrip, TripQuickAction } from '@/lib/trips/types/trips.types';

interface CardBaseProps {
  trip: WorkspaceTrip;
  isSelected: boolean;
  onSelect: (id: string, multi: boolean) => void;
  onQuickAction: (id: string, action: TripQuickAction) => void;
}

// ─── Shared card hover variants ──────────────────────────────
const cardVariants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.015, y: -2, transition: { duration: 0.2 } },
};

// ─── Standard Card ───────────────────────────────────────────

export const StandardCard = React.memo(function StandardCard({
  trip,
  isSelected,
  onSelect,
  onQuickAction,
}: CardBaseProps) {
  const handleSelect = useCallback(
    (e: React.MouseEvent) => onSelect(trip.id, e.metaKey || e.ctrlKey),
    [trip.id, onSelect]
  );
  const handleFavorite = useCallback(
    () => onQuickAction(trip.id, 'favorite'),
    [trip.id, onQuickAction]
  );

  const dateLabel = formatDateRange(trip.startDate, trip.endDate);

  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={handleSelect}
      className={cn(
        'relative rounded-2xl overflow-hidden border cursor-pointer group transition-colors',
        isSelected
          ? 'border-primary ring-2 ring-primary/40'
          : 'border-white/8 hover:border-white/20'
      )}
      role="gridcell"
      aria-checked={isSelected}
      aria-label={`Trip: ${trip.title}`}
    >
      {/* Cover */}
      <div className="relative h-48 bg-muted overflow-hidden">
        <TripCoverImage src={trip.coverImageUrl} alt={trip.title} />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top actions */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <TripStatusBadge status={trip.status} />
          <div className="flex items-center gap-1">
            {/* Selection checkbox */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSelect(trip.id, e.metaKey || e.ctrlKey); }}
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                isSelected
                  ? 'bg-primary border-primary'
                  : 'border-white/40 bg-black/20 opacity-0 group-hover:opacity-100'
              )}
              aria-label={isSelected ? 'Deselect trip' : 'Select trip'}
            >
              {isSelected && <Icon name="Check" size={12} className="text-white" />}
            </button>
            <FavoriteButton isFavorite={trip.isFavorite} onToggle={handleFavorite} />
          </div>
        </div>

        {/* Weather */}
        {trip.weatherPreview && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white/80 text-xs font-medium">
            <span>{trip.weatherPreview.icon}</span>
            <span>{trip.weatherPreview.tempC}°C</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 bg-card space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-1">
            {trip.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
            <Icon name="MapPin" size={11} />
            <span className="line-clamp-1">{trip.destinationsLabel}</span>
          </p>
        </div>

        {/* Progress */}
        <TripProgressBar progress={trip.planningProgress} showLabel />

        {/* Footer */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Icon name="Calendar" size={11} />
            {dateLabel}
          </div>
          <TravelersChip count={trip.travelerCount} sharedWith={trip.sharedWith} />
        </div>

        {/* Budget */}
        {trip.totalBudget && (
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <Icon name="DollarSign" size={11} />
            {trip.currency ?? 'USD'} {trip.totalBudget.toLocaleString()} · {trip.durationLabel}
          </div>
        )}
      </div>

      {/* Quick actions row on hover */}
      <div className="absolute bottom-0 left-0 right-0 flex bg-card/95 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        {(['view', 'edit', 'share'] as TripQuickAction[]).map((action) => (
          <button
            key={action}
            type="button"
            onClick={(e) => { e.stopPropagation(); onQuickAction(trip.id, action); }}
            className="flex-1 py-2 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors capitalize"
            aria-label={`${action} trip`}
          >
            {action}
          </button>
        ))}
      </div>
    </motion.article>
  );
});

// ─── Featured Card (hero, first slot) ────────────────────────

export const FeaturedCard = React.memo(function FeaturedCard({
  trip,
  isSelected,
  onSelect,
  onQuickAction,
}: CardBaseProps) {
  const handleFavorite = useCallback(
    () => onQuickAction(trip.id, 'favorite'),
    [trip.id, onQuickAction]
  );
  const dateLabel = formatDateRange(trip.startDate, trip.endDate);

  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={(e) => onSelect(trip.id, e.metaKey || e.ctrlKey)}
      className={cn(
        'relative rounded-2xl overflow-hidden border cursor-pointer col-span-1 sm:col-span-2 group',
        isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-white/8 hover:border-white/20'
      )}
      role="gridcell"
      aria-checked={isSelected}
      aria-label={`Featured trip: ${trip.title}`}
    >
      <div className="relative h-64 md:h-72">
        <TripCoverImage src={trip.coverImageUrl} alt={trip.title} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <TripStatusBadge status={trip.status} size="md" />
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onSelect(trip.id, e.metaKey || e.ctrlKey); }}
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                  isSelected ? 'bg-primary border-primary' : 'border-white/40 bg-black/20 opacity-0 group-hover:opacity-100'
                )}
                aria-label={isSelected ? 'Deselect' : 'Select'}
              >
                {isSelected && <Icon name="Check" size={12} className="text-white" />}
              </button>
              <FavoriteButton isFavorite={trip.isFavorite} onToggle={handleFavorite} />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-bold text-white leading-snug">{trip.title}</h3>
              <p className="text-sm text-white/70 mt-1 line-clamp-2">{trip.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1"><Icon name="MapPin" size={12} />{trip.primaryDestination}</span>
              <span className="flex items-center gap-1"><Icon name="Calendar" size={12} />{dateLabel}</span>
              <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{trip.durationLabel}</span>
            </div>
            <TripProgressBar progress={trip.planningProgress} showLabel />
          </div>
        </div>
      </div>
    </motion.article>
  );
});

// ─── Compact Card ────────────────────────────────────────────

export const CompactCard = React.memo(function CompactCard({
  trip,
  isSelected,
  onSelect,
}: CardBaseProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={(e) => onSelect(trip.id, e.metaKey || e.ctrlKey)}
      className={cn(
        'relative rounded-xl overflow-hidden border cursor-pointer group',
        isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-white/8 hover:border-white/20'
      )}
      role="gridcell"
      aria-checked={isSelected}
    >
      <div className="relative h-28">
        <TripCoverImage src={trip.coverImageUrl} alt={trip.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 p-3 flex flex-col justify-end">
          <TripStatusBadge status={trip.status} />
          <h3 className="text-sm font-semibold text-white mt-1 line-clamp-1">{trip.title}</h3>
          <p className="text-[10px] text-white/60">{trip.durationLabel} · {trip.primaryDestination}</p>
        </div>
      </div>
    </motion.article>
  );
});

// ─── List Card (full-width row) ───────────────────────────────

export const ListCard = React.memo(function ListCard({
  trip,
  isSelected,
  onSelect,
  onQuickAction,
}: CardBaseProps) {
  const dateLabel = formatDateRange(trip.startDate, trip.endDate);

  return (
    <motion.article
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={(e) => onSelect(trip.id, e.metaKey || e.ctrlKey)}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border cursor-pointer group transition-colors',
        isSelected ? 'border-primary ring-2 ring-primary/40 bg-primary/5' : 'border-white/8 hover:border-white/20 bg-white/[0.02]'
      )}
      role="row"
      aria-checked={isSelected}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0">
        <TripCoverImage src={trip.coverImageUrl} alt={trip.title} />
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <TripStatusBadge status={trip.status} />
          {trip.isFavorite && <Icon name="Heart" size={11} className="text-rose-400 fill-rose-400" />}
        </div>
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">{trip.title}</h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
          <Icon name="MapPin" size={10} />
          <span className="line-clamp-1">{trip.destinationsLabel}</span>
        </p>
      </div>

      {/* Meta columns */}
      <div className="hidden md:flex items-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Icon name="Calendar" size={11} />{dateLabel}
        </span>
        <span className="whitespace-nowrap">{trip.durationLabel}</span>
        <div className="w-24">
          <TripProgressBar progress={trip.planningProgress} showLabel />
        </div>
        {trip.totalBudget && (
          <span className="whitespace-nowrap">{trip.currency ?? 'USD'} {trip.totalBudget.toLocaleString()}</span>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onQuickAction(trip.id, 'edit'); }}
          className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Edit trip"
        >
          <Icon name="Edit3" size={14} />
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onQuickAction(trip.id, 'archive'); }}
          className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Archive trip"
        >
          <Icon name="Archive" size={14} />
        </button>
      </div>

      {/* Select checkbox */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onSelect(trip.id, e.metaKey || e.ctrlKey); }}
        className={cn(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0',
          isSelected ? 'bg-primary border-primary' : 'border-white/20 opacity-0 group-hover:opacity-100'
        )}
        aria-label={isSelected ? 'Deselect trip' : 'Select trip'}
      >
        {isSelected && <Icon name="Check" size={12} className="text-white" />}
      </button>
    </motion.article>
  );
});

// ─── Timeline Card ────────────────────────────────────────────

export const TimelineCard = React.memo(function TimelineCard({
  trip,
  isSelected,
  onSelect,
}: CardBaseProps) {
  const startMonth = formatMonth(trip.startDate);
  const startDay = formatDay(trip.startDate);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(e) => onSelect(trip.id, e.metaKey || e.ctrlKey)}
      className={cn(
        'flex items-center gap-4 p-3 rounded-xl border cursor-pointer group transition-colors',
        isSelected ? 'border-primary ring-1 ring-primary/30 bg-primary/5' : 'border-white/8 hover:border-white/15 bg-white/[0.02]'
      )}
      role="row"
      aria-checked={isSelected}
    >
      {/* Date stamp */}
      <div className="w-12 text-center shrink-0">
        <p className="text-[10px] text-primary font-bold uppercase">{startMonth}</p>
        <p className="text-2xl font-bold text-foreground leading-none">{startDay}</p>
      </div>
      <div className="w-px h-10 bg-white/10 shrink-0" />

      {/* Trip info */}
      <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0">
        <TripCoverImage src={trip.coverImageUrl} alt={trip.title} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">{trip.title}</h3>
        <p className="text-xs text-muted-foreground">{trip.primaryDestination} · {trip.durationLabel}</p>
      </div>
      <TripStatusBadge status={trip.status} />
    </motion.article>
  );
});

// ─── Template Card ────────────────────────────────────────────

export const TemplateCard = React.memo(function TemplateCard({
  trip,
  isSelected,
  onSelect,
  onQuickAction,
}: CardBaseProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onClick={(e) => onSelect(trip.id, e.metaKey || e.ctrlKey)}
      className={cn(
        'relative rounded-2xl overflow-hidden border cursor-pointer group',
        isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-white/8 hover:border-white/20'
      )}
      role="gridcell"
      aria-checked={isSelected}
    >
      <div className="relative h-36 overflow-hidden">
        <TripCoverImage src={trip.coverImageUrl} alt={trip.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <Icon name="Copy" size={10} />
            Template
          </span>
        </div>
      </div>
      <div className="p-4 bg-card space-y-2">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">{trip.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{trip.description}</p>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Icon name="Clock" size={11} />
          {trip.durationLabel}
          <span>·</span>
          <Icon name="DollarSign" size={11} />
          {trip.currency ?? 'USD'} {trip.totalBudget?.toLocaleString() ?? '—'}
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onQuickAction(trip.id, 'view'); }}
          className="w-full mt-1 py-2 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
          aria-label={`Use template: ${trip.title}`}
        >
          Use Template
        </button>
      </div>
    </motion.article>
  );
});
