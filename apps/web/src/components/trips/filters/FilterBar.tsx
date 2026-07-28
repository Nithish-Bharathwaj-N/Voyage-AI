'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';
import type { TripFilter, TripSortKey, TripViewMode, TripStatus, BudgetBracket } from '@/lib/trips/types/trips.types';

// ─── View Mode Toggle ─────────────────────────────────────────

interface ViewModeToggleProps {
  viewMode: TripViewMode;
  onViewModeChange: (m: TripViewMode) => void;
}

export function ViewModeToggle({ viewMode, onViewModeChange }: ViewModeToggleProps) {
  const modes: { id: TripViewMode; icon: 'LayoutGrid' | 'List' | 'CalendarDays' | string; label: string }[] = [
    { id: 'grid', icon: 'LayoutGrid', label: 'Grid view' },
    { id: 'list', icon: 'List', label: 'List view' },
    { id: 'timeline', icon: 'CalendarDays', label: 'Timeline view' },
  ];
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onViewModeChange(m.id)}
          aria-label={m.label}
          aria-pressed={viewMode === m.id}
          className={cn(
            'p-2 rounded-md transition-colors',
            viewMode === m.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon name={m.icon as Parameters<typeof Icon>[0]['name']} size={15} />
        </button>
      ))}
    </div>
  );
}

// ─── Sort Selector ───────────────────────────────────────────

interface SortSelectorProps {
  sort: TripSortKey;
  onSortChange: (s: TripSortKey) => void;
}

const SORT_OPTIONS: { value: TripSortKey; label: string }[] = [
  { value: 'updated', label: 'Recently Updated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'alpha', label: 'Alphabetical' },
  { value: 'budget', label: 'Budget (High → Low)' },
  { value: 'duration', label: 'Duration (Long → Short)' },
];

export function SortSelector({ sort, onSortChange }: SortSelectorProps) {
  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value as TripSortKey)}
      className="text-sm bg-white/[0.03] border border-white/10 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Sort trips"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-background">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

// ─── Status Filter ───────────────────────────────────────────

const STATUS_OPTIONS: { value: TripStatus; label: string }[] = [
  { value: 'planning', label: 'Planning' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

interface StatusFilterProps {
  selected: TripStatus[];
  onChange: (statuses: TripStatus[]) => void;
}

export function StatusFilter({ selected, onChange }: StatusFilterProps) {
  const toggle = (status: TripStatus) => {
    onChange(
      selected.includes(status)
        ? selected.filter((s) => s !== status)
        : [...selected, status]
    );
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {STATUS_OPTIONS.map((opt) => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            aria-pressed={active}
            className={cn(
              'text-xs px-2.5 py-1 rounded-full border font-medium transition-colors',
              active
                ? 'bg-primary/20 border-primary/50 text-primary'
                : 'bg-white/[0.03] border-white/10 text-muted-foreground hover:text-foreground'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Active Filters Row ──────────────────────────────────────

type ActiveFilter = {
  id: string;
  label: string;
  onRemove: () => void;
};

interface ActiveFiltersRowProps {
  filter: TripFilter;
  sort: TripSortKey;
  onClearFilter: (key: keyof TripFilter) => void;
  onClearAll: () => void;
}

export function ActiveFiltersRow({ filter, onClearFilter, onClearAll }: ActiveFiltersRowProps) {
  const chips: ActiveFilter[] = [];

  if (filter.status && filter.status.length > 0) {
    chips.push({
      id: 'status',
      label: `Status: ${filter.status.join(', ')}`,
      onRemove: () => onClearFilter('status'),
    });
  }
  if (filter.destination) {
    chips.push({
      id: 'destination',
      label: `Destination: ${filter.destination}`,
      onRemove: () => onClearFilter('destination'),
    });
  }
  if (filter.budgetBracket && filter.budgetBracket.length > 0) {
    chips.push({
      id: 'budget',
      label: `Budget: ${filter.budgetBracket.join(', ')}`,
      onRemove: () => onClearFilter('budgetBracket'),
    });
  }
  if (filter.dateRange) {
    chips.push({
      id: 'dateRange',
      label: `Date: ${filter.dateRange}`,
      onRemove: () => onClearFilter('dateRange'),
    });
  }
  if (filter.travelStyle && filter.travelStyle.length > 0) {
    chips.push({
      id: 'travelStyle',
      label: `Style: ${filter.travelStyle.join(', ')}`,
      onRemove: () => onClearFilter('travelStyle'),
    });
  }
  if (filter.isFavorite) {
    chips.push({
      id: 'favorites',
      label: 'Favorites only',
      onRemove: () => onClearFilter('isFavorite'),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-muted-foreground">Filters:</span>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium hover:bg-primary/20 transition-colors"
          aria-label={`Remove filter: ${chip.label}`}
        >
          {chip.label}
          <Icon name="X" size={11} />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}

// ─── Filter Bar (Desktop) ────────────────────────────────────

interface FilterBarProps {
  filter: TripFilter;
  sort: TripSortKey;
  viewMode: TripViewMode;
  onFilterChange: (patch: Partial<TripFilter>) => void;
  onSortChange: (s: TripSortKey) => void;
  onViewModeChange: (m: TripViewMode) => void;
  onClearFilter: (key: keyof TripFilter) => void;
  onClearAll: () => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
}

export function FilterBar({
  filter,
  sort,
  viewMode,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  onClearFilter,
  onClearAll,
  searchQuery,
  onSearchQueryChange,
}: FilterBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Inline search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Filter trips..."
            className="w-full pl-8 pr-3 py-2 text-sm bg-white/[0.03] border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Status chips */}
        <StatusFilter
          selected={filter.status ?? []}
          onChange={(statuses) => onFilterChange({ status: statuses })}
        />

        {/* Favorites toggle */}
        <button
          type="button"
          onClick={() => onFilterChange({ isFavorite: filter.isFavorite ? undefined : true })}
          aria-pressed={!!filter.isFavorite}
          className={cn(
            'flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border font-medium transition-colors',
            filter.isFavorite
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              : 'bg-white/[0.03] border-white/10 text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon name="Heart" size={12} className={cn(filter.isFavorite ? 'fill-rose-400' : '')} />
          Favorites
        </button>

        <div className="ml-auto flex items-center gap-2">
          <SortSelector sort={sort} onSortChange={onSortChange} />
          <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        </div>
      </div>

      <ActiveFiltersRow
        filter={filter}
        sort={sort}
        onClearFilter={onClearFilter}
        onClearAll={onClearAll}
      />
    </div>
  );
}
