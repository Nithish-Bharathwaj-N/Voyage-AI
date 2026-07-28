'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTrips } from '@/lib/trips/hooks/useTrips';
import { useTripStatistics } from '@/lib/trips/hooks/useTripStatistics';
import { useTripsSelection } from '@/lib/trips/hooks/useTripsSelection';
import { searchTrips, getTabCounts } from '@/lib/trips/selectors/tripSelectors';
import { useSearch } from '@/components/search/SearchProvider';
import { TripToolbar } from './toolbar/TripToolbar';
import { BulkActionBar } from './toolbar/BulkActionBar';
import { StatisticsBar } from './statistics/StatisticsBar';
import { StatisticsSkeleton } from './skeleton/TripGridSkeleton';
import { TripsTabBar } from './tabs/TripsTabBar';
import { FilterBar } from './filters/FilterBar';
import { TripCardDispatcher } from './cards/TripCardDispatcher';
import { TripGridSkeleton } from './skeleton/TripGridSkeleton';
import {
  EmptyMyTrips,
  EmptyDrafts,
  EmptyShared,
  EmptyArchived,
  EmptyTemplates,
  EmptySearch,
} from './empty/TripEmptyStates';
import type {
  TripFilter,
  TripQuickAction,
  TripSortKey,
  TripTab,
  TripViewMode,
  WorkspaceTrip,
} from '@/lib/trips/types/trips.types';

const EMPTY_FILTER: TripFilter = {};

export function TripsWorkspace() {
  // ── Workspace State ──────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<TripTab>('my-trips');
  const [viewMode, setViewMode] = useState<TripViewMode>('grid');
  const [sort, setSort] = useState<TripSortKey>('updated');
  const [filter, setFilter] = useState<TripFilter>(EMPTY_FILTER);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Data ─────────────────────────────────────────────────────
  const { data: trips, isLoading: tripsLoading } = useTrips(activeTab, filter, sort);
  const { data: stats, isLoading: statsLoading } = useTripStatistics();
  const selection = useTripsSelection();

  // ── Global search integration ─────────────────────────────────
  const { setIsOpen: openGlobalSearch } = useSearch();
  const handleOpenGlobalSearch = useCallback(() => openGlobalSearch(true), [openGlobalSearch]);

  // ── Clear selection on Escape ────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') selection.clearSelection();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selection]);

  // ── Derived trips (client-side search) ───────────────────────
  const displayedTrips = useMemo(() => {
    if (!trips) return [];
    return searchQuery ? searchTrips(trips, searchQuery) : trips;
  }, [trips, searchQuery]);

  // ── Tab counts from full unfiltered data ─────────────────────
  const tabCounts = useMemo(() => {
    if (!trips) return { 'my-trips': 0, drafts: 0, shared: 0, archived: 0, templates: 0 };
    return getTabCounts(trips);
  }, [trips]);

  // ── Filter helpers ────────────────────────────────────────────
  const handleFilterChange = useCallback((patch: Partial<TripFilter>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleClearFilter = useCallback((key: keyof TripFilter) => {
    setFilter((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setFilter(EMPTY_FILTER);
    setSearchQuery('');
  }, []);

  // ── Quick actions (UI stubs) ──────────────────────────────────
  const handleQuickAction = useCallback((_id: string, action: TripQuickAction) => {
    if (action === 'edit' || action === 'view') {
      window.location.href = `/trips/${_id}`;
    }
  }, []);

  const handleCardClick = useCallback((id: string, multi: boolean) => {
    if (multi) {
      selection.toggleSelect(id, multi);
    } else {
      window.location.href = `/trips/${id}`;
    }
  }, [selection]);

  // ── Card variant resolver ────────────────────────────────────
  const resolveVariant = useCallback(
    (trip: WorkspaceTrip, index: number) => {
      if (activeTab === 'templates') return 'template' as const;
      if (viewMode === 'list') return 'list' as const;
      if (viewMode === 'timeline') return 'timeline' as const;
      if (index === 0 && displayedTrips.length >= 3 && activeTab === 'my-trips')
        return 'featured' as const;
      return 'standard' as const;
    },
    [activeTab, viewMode, displayedTrips.length]
  );

  // ── Grid class ───────────────────────────────────────────────
  const gridClass = useMemo(() => {
    if (viewMode === 'list' || viewMode === 'timeline') return 'flex flex-col gap-2';
    return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5';
  }, [viewMode]);

  // ── Empty state ───────────────────────────────────────────────
  const renderEmpty = () => {
    if (searchQuery) return <EmptySearch query={searchQuery} />;
    switch (activeTab) {
      case 'drafts': return <EmptyDrafts />;
      case 'shared': return <EmptyShared />;
      case 'archived': return <EmptyArchived />;
      case 'templates': return <EmptyTemplates />;
      default: return <EmptyMyTrips onCreateTrip={() => window.location.href = '/trips/new'} />;
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* Toolbar */}
      <TripToolbar onOpenGlobalSearch={handleOpenGlobalSearch} />

      {/* Statistics */}
      {statsLoading ? (
        <StatisticsSkeleton />
      ) : stats ? (
        <StatisticsBar stats={stats} />
      ) : null}

      {/* Tabs */}
      <TripsTabBar
        activeTab={activeTab}
        counts={tabCounts}
        onTabChange={(tab) => {
          setActiveTab(tab);
          selection.clearSelection();
        }}
      />

      {/* Filters */}
      <FilterBar
        filter={filter}
        sort={sort}
        viewMode={viewMode}
        onFilterChange={handleFilterChange}
        onSortChange={setSort}
        onViewModeChange={setViewMode}
        onClearFilter={handleClearFilter}
        onClearAll={handleClearAll}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Content */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {tripsLoading ? (
          <TripGridSkeleton count={6} viewMode={viewMode} />
        ) : displayedTrips.length === 0 ? (
          renderEmpty()
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${viewMode}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={gridClass}
              role="grid"
              aria-label="Trips"
            >
              {displayedTrips.map((trip, index) => (
                <TripCardDispatcher
                  key={trip.id}
                  trip={trip}
                  variant={resolveVariant(trip, index)}
                  isSelected={selection.isSelected(trip.id)}
                  onSelect={handleCardClick}
                  onQuickAction={handleQuickAction}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bulk action bar */}
      <BulkActionBar
        selectionCount={selection.selectionCount}
        onArchive={() => console.info('[Trips] bulk archive stub')}
        onDuplicate={() => console.info('[Trips] bulk duplicate stub')}
        onDelete={() => console.info('[Trips] bulk delete stub')}
        onShare={() => console.info('[Trips] bulk share stub')}
        onExport={() => console.info('[Trips] bulk export stub')}
        onClear={selection.clearSelection}
      />
    </div>
  );
}
