'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SearchDomain, SearchResultItem, searchService } from '@/lib/services/search';

interface SearchContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  domain: SearchDomain | undefined;
  setDomain: (d: SearchDomain | undefined) => void;
  results: SearchResultItem[];
  recentSearches: string[];
  pinnedSearches: SearchResultItem[];
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
  isLoading: boolean;
  executeAction: (item: SearchResultItem) => void;
  clearRecent: (query: string) => void;
  addRecent: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<SearchDomain | undefined>(undefined);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [pinnedSearches, setPinnedSearches] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Sync recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('global-recent-searches');
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecentSearches(JSON.parse(stored));
      }
      searchService.getPinnedSearches().then(setPinnedSearches);
    }
  }, []);

  // Fetch search results on query or domain scope change
  useEffect(() => {
    let active = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    const performSearch = async () => {
      try {
        const data = await searchService.search(query, domain);
        if (active) {
          setResults(data);
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error('Error executing query:', err);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    // Debouncing implementation
    const timer = setTimeout(() => {
      performSearch();
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, domain]);

  const addRecent = useCallback((q: string) => {
    if (!q.trim()) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== q.trim().toLowerCase());
      const next = [q.trim(), ...filtered].slice(0, 5);
      if (typeof window !== 'undefined') {
        localStorage.setItem('global-recent-searches', JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const clearRecent = useCallback((q: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((s) => s !== q);
      if (typeof window !== 'undefined') {
        localStorage.setItem('global-recent-searches', JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const executeAction = useCallback((item: SearchResultItem) => {
    if (item.actionUrl) {
      addRecent(item.title);
      setIsOpen(false);
      window.location.href = item.actionUrl;
    } else {
      alert(`Command / Navigation for "${item.title}" executed!`);
      setIsOpen(false);
    }
  }, [addRecent]);

  // Global keydown listener for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        setIsOpen,
        query,
        setQuery,
        domain,
        setDomain,
        results,
        recentSearches,
        pinnedSearches,
        selectedIndex,
        setSelectedIndex,
        isLoading,
        executeAction,
        clearRecent,
        addRecent,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
