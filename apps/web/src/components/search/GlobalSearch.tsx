'use client';

import React, { useEffect } from 'react';
import { useSearch } from './SearchProvider';
import { SearchInput } from './SearchInput';
import { SearchFilters } from './SearchFilters';
import { SearchHistory } from './SearchHistory';
import { SearchResults } from './SearchResults';
import { SearchLoading } from './SearchStates';
import { AnimatePresence, motion } from 'framer-motion';

export function GlobalSearch() {
  const { 
    isOpen, 
    setIsOpen, 
    query, 
    results, 
    selectedIndex, 
    setSelectedIndex, 
    isLoading, 
    executeAction 
  } = useSearch();

  // Handle keyboard list navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((selectedIndex + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((selectedIndex - 1 + results.length) % Math.max(1, results.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          executeAction(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, setSelectedIndex, executeAction, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Global Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Centered Command Dialog Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="fixed inset-x-4 top-[8vh] md:top-[12vh] z-50 max-w-2xl md:mx-auto bg-card border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden max-h-[80vh] md:max-h-[600px] w-full"
          >
            {/* Input Bar */}
            <SearchInput />

            {/* Scoping Tabs */}
            <SearchFilters />

            {/* Core Body Section */}
            <div className="flex-1 overflow-y-auto min-h-0 bg-card">
              {query.trim().length === 0 ? (
                <SearchHistory />
              ) : isLoading ? (
                <SearchLoading />
              ) : (
                <SearchResults />
              )}
            </div>

            {/* Helper Key Guidelines Footer */}
            <div className="h-10 px-4 border-t border-border bg-muted/40 shrink-0 flex items-center justify-between text-[10px] text-muted-foreground font-semibold uppercase tracking-wider select-none">
              <div className="flex items-center gap-2">
                <span>↑↓ to navigate</span>
                <span>•</span>
                <span>↵ to select</span>
              </div>
              <div>
                <span>esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
