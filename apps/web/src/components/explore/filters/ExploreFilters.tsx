'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '../../ui/Button';
import { Label } from '../../ui/Label';
import { AnimatePresence, motion } from 'framer-motion';

export interface FilterState {
  categories: string[];
  priceRanges: string[];
  continents: string[];
  seasons: string[];
  travelStyles: string[];
  minRating: number | null;
  durationWeeks: number | null;
  sortBy: 'newest' | 'popular' | 'rating' | 'budget_low' | 'value' | 'alphabetical';
}

interface ExploreFiltersProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onClear: () => void;
}

const CATEGORIES = ['Adventure', 'Beaches', 'Culture', 'Nature', 'Gastronomy', 'City Breaks'];
const PRICE_RANGES = [
  { label: '$ Budget', value: 'low' },
  { label: '$$ Moderate', value: 'medium' },
  { label: '$$$ Expensive', value: 'high' },
  { label: '$$$$ Luxury', value: 'luxury' },
];
const CONTINENTS = ['Europe', 'Asia', 'North America', 'South America', 'Oceania', 'Africa'];
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter'];
const TRAVEL_STYLES = ['Adventure', 'Relaxation', 'Cultural', 'Family', 'Romantic'];
const RATINGS = [4.8, 4.5, 4.0];

const SORT_OPTIONS = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Lowest Budget', value: 'budget_low' },
  { label: 'Best Value', value: 'value' },
  { label: 'Alphabetical', value: 'alphabetical' },
];

export function ExploreFilters({ filters, onChange, onClear }: ExploreFiltersProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const toggleCategory = (cat: string) => {
    const categories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories });
  };

  const togglePriceRange = (price: string) => {
    const priceRanges = filters.priceRanges.includes(price)
      ? filters.priceRanges.filter((p) => p !== price)
      : [...filters.priceRanges, price];
    onChange({ ...filters, priceRanges });
  };

  const toggleContinent = (cont: string) => {
    const continents = filters.continents.includes(cont)
      ? filters.continents.filter((c) => c !== cont)
      : [...filters.continents, cont];
    onChange({ ...filters, continents });
  };

  const toggleSeason = (season: string) => {
    const seasons = filters.seasons.includes(season)
      ? filters.seasons.filter((s) => s !== season)
      : [...filters.seasons, season];
    onChange({ ...filters, seasons });
  };

  const toggleTravelStyle = (style: string) => {
    const travelStyles = filters.travelStyles.includes(style)
      ? filters.travelStyles.filter((t) => t !== style)
      : [...filters.travelStyles, style];
    onChange({ ...filters, travelStyles });
  };

  const setRating = (rating: number | null) => {
    onChange({ ...filters, minRating: filters.minRating === rating ? null : rating });
  };

  const setDuration = (weeks: number | null) => {
    onChange({ ...filters, durationWeeks: weeks });
  };

  const setSortBy = (value: FilterState['sortBy']) => {
    onChange({ ...filters, sortBy: value });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.continents.length > 0 ||
    filters.seasons.length > 0 ||
    filters.travelStyles.length > 0 ||
    filters.minRating !== null ||
    filters.durationWeeks !== null;

  const renderFiltersContent = () => (
    <div className="flex flex-col gap-6">
      {/* Sort Section */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sort By</Label>
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as FilterState['sortBy'])}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</Label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.categories.includes(cat);
            return (
              <Button
                key={cat}
                type="button"
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className={`h-7 text-[11px] rounded-full border-border font-bold px-3 transition-all ${
                  isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/95' : 'hover:bg-muted text-muted-foreground'
                }`}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Budget/Price */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Budget</Label>
        <div className="grid grid-cols-2 gap-2">
          {PRICE_RANGES.map((price) => {
            const isSelected = filters.priceRanges.includes(price.value);
            return (
              <Button
                key={price.value}
                type="button"
                variant={isSelected ? 'secondary' : 'outline'}
                size="sm"
                className={`h-8 text-xs justify-start px-3 font-medium transition-all ${
                  isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/95' : 'hover:bg-muted/50 text-muted-foreground'
                }`}
                onClick={() => togglePriceRange(price.value)}
              >
                {price.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Continent */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Region</Label>
        <div className="flex flex-col gap-2">
          {CONTINENTS.map((cont) => {
            const isSelected = filters.continents.includes(cont);
            return (
              <button
                key={cont}
                type="button"
                onClick={() => toggleContinent(cont)}
                className="flex items-center justify-between text-left text-sm py-0.5 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>{cont}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border group-hover:border-muted-foreground'
                }`}>
                  {isSelected && <Icon name="Check" size={10} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seasons */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Best Season</Label>
        <div className="flex flex-wrap gap-1.5">
          {SEASONS.map((season) => {
            const isSelected = filters.seasons.includes(season);
            return (
              <Button
                key={season}
                type="button"
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className={`h-7 text-[11px] rounded-full border-border font-bold px-3 transition-all ${
                  isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/95' : 'hover:bg-muted text-muted-foreground'
                }`}
                onClick={() => toggleSeason(season)}
              >
                {season}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Travel Styles */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Travel Style</Label>
        <div className="flex flex-col gap-2">
          {TRAVEL_STYLES.map((style) => {
            const isSelected = filters.travelStyles.includes(style);
            return (
              <button
                key={style}
                type="button"
                onClick={() => toggleTravelStyle(style)}
                className="flex items-center justify-between text-left text-sm py-0.5 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>{style}</span>
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary text-primary-foreground' 
                    : 'border-border group-hover:border-muted-foreground'
                }`}>
                  {isSelected && <Icon name="Check" size={10} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ratings */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minimum Rating</Label>
        <div className="flex flex-col gap-1.5">
          {RATINGS.map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => setRating(rating)}
                className={`flex items-center gap-2 text-sm text-left py-1 transition-colors ${
                  isSelected ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex text-amber-500">
                  <Icon name="Star" size={14} className="fill-current" />
                </div>
                <span>{rating} stars & up</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration slider */}
      <div className="flex flex-col gap-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Trip Length: {filters.durationWeeks ? `${filters.durationWeeks} week(s) or less` : 'Any duration'}
        </Label>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={filters.durationWeeks || 4}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary border-none"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
          <span>1 Wk</span>
          <span>2 Wks</span>
          <span>3 Wks</span>
          <span>4+ Wks</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:flex w-full flex-col gap-6 p-5 rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={14} />
            Filters
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={onClear}
            >
              Clear All
            </Button>
          )}
        </div>
        {renderFiltersContent()}
      </div>

      {/* Mobile Drawer Trigger Bar */}
      <div className="lg:hidden w-full flex items-center justify-between gap-3 p-3 bg-card border border-border rounded-xl shadow-sm">
        <Button
          variant="outline"
          className="flex-1 justify-center gap-2 h-10 text-xs font-bold border-border"
          onClick={() => setIsOpenMobile(true)}
        >
          <Icon name="SlidersHorizontal" size={14} />
          Filters & Sort {hasActiveFilters && '•'}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 text-xs text-muted-foreground font-bold hover:text-foreground"
            onClick={onClear}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Mobile Bottom Drawer Panel */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setIsOpenMobile(false)}
            />

            {/* Bottom Sheet Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] bg-background border-t border-border rounded-t-2xl flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Drawer drag handle indicator */}
              <div className="w-12 h-1.5 rounded-full bg-muted mx-auto my-3 shrink-0" />

              <div className="flex items-center justify-between px-6 pb-4 border-b border-border shrink-0">
                <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={16} />
                  Filters & Sort Options
                </h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpenMobile(false)}>
                  <Icon name="X" size={16} />
                </Button>
              </div>

              {/* Scrollable filters */}
              <div className="flex-1 overflow-y-auto p-6 pb-12">
                {renderFiltersContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
