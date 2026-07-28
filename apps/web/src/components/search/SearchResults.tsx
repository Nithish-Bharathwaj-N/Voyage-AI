'use client';

import React, { useRef, useEffect } from 'react';
import { useSearch } from './SearchProvider';
import { UnifiedResultCard } from './cards/ResultCards';
import { SearchEmptyState } from './SearchStates';

export function SearchResults() {
  const { results, selectedIndex, setSelectedIndex, executeAction } = useSearch();
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll active list item into view if not visible
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (results.length === 0) {
    return <SearchEmptyState />;
  }

  return (
    <div
      ref={listRef}
      className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 max-h-[380px]"
    >
      {results.map((item, idx) => {
        const isSelected = idx === selectedIndex;
        return (
          <div key={item.id} onMouseEnter={() => setSelectedIndex(idx)}>
            <UnifiedResultCard
              item={item}
              isSelected={isSelected}
              onClick={() => executeAction(item)}
            />
          </div>
        );
      })}
    </div>
  );
}
