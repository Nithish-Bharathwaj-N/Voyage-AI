'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { exploreService } from '@/lib/services/explore';
import { AnimatePresence, motion } from 'framer-motion';

interface EnhancedSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface SuggestionItem {
  text: string;
  category: string;
}

export function EnhancedSearch({ value, onChange, placeholder = 'Search destinations, categories, regions...' }: EnhancedSearchProps) {
  const [localVal, setLocalVal] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const saveSearchQuery = (query: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== query.toLowerCase());
      const next = [query, ...filtered].slice(0, 5); // Max 5 items
      localStorage.setItem('explore-recent-searches', JSON.stringify(next));
      return next;
    });
  };

  // Sync local input value
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalVal(value);
  }, [value]);

  // Load local history & popular searches
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('explore-recent-searches');
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecentSearches(JSON.parse(stored));
      }
      exploreService.getPopularSearches().then(setPopularSearches);
    }
  }, []);

  // Fetch search suggestions
  useEffect(() => {
    if (localVal.trim().length > 0) {
      exploreService.getSearchSuggestions(localVal).then(setSuggestions);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
    }
  }, [localVal]);

  // Debounced search trigger & save query to history on submit/trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localVal);
      if (localVal.trim().length > 1) {
        saveSearchQuery(localVal.trim());
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localVal, onChange]);

  // Handle click outside suggestions container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectQuery = (query: string) => {
    setLocalVal(query);
    onChange(query);
    saveSearchQuery(query);
    setIsFocused(false);
  };

  const clearRecentSearch = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const next = prev.filter((s) => s !== query);
      localStorage.setItem('explore-recent-searches', JSON.stringify(next));
      return next;
    });
  };

  const highlightMatches = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() 
            ? <strong key={i} className="text-primary font-bold">{part}</strong> 
            : part
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative flex-grow max-w-lg w-full z-30">
      {/* Search Input Widget */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
          <Icon name="Search" size={18} />
        </div>
        <Input
          type="text"
          className="pl-10 pr-10 w-full h-11 bg-background border-border shadow-sm rounded-full focus-visible:ring-primary text-sm font-medium"
          placeholder={placeholder}
          value={localVal}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setLocalVal(e.target.value)}
        />
        {localVal && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-1 h-9 w-9 my-auto rounded-full hover:bg-muted text-muted-foreground"
            onClick={() => {
              setLocalVal('');
              onChange('');
            }}
            aria-label="Clear search"
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      {/* Auto-suggest / History Dropdown Panel */}
      <AnimatePresence>
        {isFocused && (recentSearches.length > 0 || popularSearches.length > 0 || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-x-0 top-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden py-3"
          >
            {/* suggestions match state */}
            {suggestions.length > 0 ? (
              <div className="flex flex-col">
                <span className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Matching Suggestions
                </span>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuery(item.text)}
                    className="w-full text-left px-4 py-2 hover:bg-muted/50 text-sm flex items-center justify-between transition-colors"
                  >
                    <span className="font-medium text-foreground">
                      {highlightMatches(item.text, localVal)}
                    </span>
                    <span className="text-[10px] font-bold bg-muted text-muted-foreground rounded px-1.5 py-0.5 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              /* History & Popular suggestions state */
              <div className="flex flex-col gap-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="flex flex-col">
                    <span className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Icon name="History" size={12} />
                      Recent Searches
                    </span>
                    {recentSearches.map((search) => (
                      <div
                        key={search}
                        onClick={() => handleSelectQuery(search)}
                        className="w-full text-left px-4 py-2 hover:bg-muted/50 text-sm flex items-center justify-between transition-colors cursor-pointer group"
                      >
                        <span className="font-medium text-foreground">{search}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => clearRecentSearch(e, search)}
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Popular Searches */}
                {popularSearches.length > 0 && (
                  <div className="flex flex-col px-4">
                    <span className="py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-2">
                      <Icon name="TrendingUp" size={12} />
                      Popular Searches
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => handleSelectQuery(search)}
                          className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground font-semibold px-3 py-1.5 rounded-full transition-all border border-border/40"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
