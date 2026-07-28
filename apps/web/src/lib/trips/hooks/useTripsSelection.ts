'use client';

import { useState, useCallback } from 'react';

export interface TripsSelectionState {
  selectedIds: Set<string>;
  hasSelection: boolean;
  selectionCount: number;
  isSelected: (id: string) => boolean;
  select: (id: string) => void;
  deselect: (id: string) => void;
  toggleSelect: (id: string, multi?: boolean) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
}

export function useTripsSelection(): TripsSelectionState {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const isSelected = useCallback((id: string) => selectedIds.has(id), [selectedIds]);

  const select = useCallback((id: string) => {
    setSelectedIds((prev) => new Set([...prev, id]));
  }, []);

  const deselect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleSelect = useCallback(
    (id: string, multi = false) => {
      setSelectedIds((prev) => {
        const next = multi ? new Set(prev) : new Set<string>();
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  const selectAll = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    selectedIds,
    hasSelection: selectedIds.size > 0,
    selectionCount: selectedIds.size,
    isSelected,
    select,
    deselect,
    toggleSelect,
    selectAll,
    clearSelection,
  };
}
