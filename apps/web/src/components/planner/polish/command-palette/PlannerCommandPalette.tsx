'use client';
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon, type IconName } from '@/components/icons/Icon';
import { usePlanner } from '../../../../lib/planner/hooks/usePlanner';
import { getAllActivities } from '@/lib/planner/selectors/plannerSelectors';
import type { PlannerActivity } from '@/lib/planner/types/planner.types';

// ─── Types ────────────────────────────────────────────────────

type CommandItem = {
  id: string;
  label: string;
  description?: string;
  icon: string;
  group: 'navigation' | 'action' | 'activity' | 'day';
  onSelect: () => void;
};

// ─── Static commands (always available) ──────────────────────

const STATIC_COMMANDS: Omit<CommandItem, 'onSelect'>[] = [
  { id: 'nav-timeline', label: 'Go to Timeline',    description: 'Switch to timeline view',      icon: 'CalendarDays', group: 'navigation' },
  { id: 'nav-map',      label: 'Go to Map',          description: 'Switch to map view',           icon: 'Map',          group: 'navigation' },
  { id: 'act-add',      label: 'Add Activity',       description: 'Create a new activity',        icon: 'Plus',         group: 'action'     },
  { id: 'act-collapse', label: 'Collapse All Days',  description: 'Collapse all day sections',    icon: 'ChevronsUp',   group: 'action'     },
  { id: 'act-expand',   label: 'Expand All Days',    description: 'Expand all day sections',      icon: 'ChevronsDown', group: 'action'     },
  { id: 'act-shortcuts',label: 'View Shortcuts',     description: 'Show keyboard shortcuts',      icon: 'Keyboard',     group: 'action'     },
];

const GROUP_LABELS: Record<CommandItem['group'], string> = {
  navigation: 'Navigation',
  action: 'Actions',
  activity: 'Activities',
  day: 'Days',
};

// ─── Component ────────────────────────────────────────────────

interface PlannerCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlannerCommandPalette({ isOpen, onClose }: PlannerCommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { data: itinerary } = usePlanner('t-1');

  // Build activity commands from itinerary
  const activityCommands = useMemo<CommandItem[]>(() => {
    if (!itinerary) return [];
    return getAllActivities(itinerary).map((a: PlannerActivity) => ({
      id: `activity-${a.id}`,
      label: a.title,
      description: `${a.time}${a.location ? ` · ${a.location}` : ''}`,
      icon: a.type === 'flight' ? 'Plane' : a.type === 'hotel' ? 'Bed' : a.type === 'restaurant' ? 'Utensils' : 'Camera',
      group: 'activity' as const,
      onSelect: () => {
        console.log('[CommandPalette] Would navigate to activity:', a.id);
        onClose();
      },
    }));
  }, [itinerary, onClose]);

  const allCommands = useMemo<CommandItem[]>(() => {
    const statics = STATIC_COMMANDS.map((c) => ({
      ...c,
      onSelect: () => {
        console.log('[CommandPalette] Command selected:', c.id);
        onClose();
      },
    }));
    return [...statics, ...activityCommands];
  }, [activityCommands, onClose]);

  const filtered = useMemo<CommandItem[]>(() => {
    if (!query.trim()) return allCommands.slice(0, 12);
    const q = query.toLowerCase();
    return allCommands
      .filter((c) => c.label.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, allCommands]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);



  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      filtered[activeIndex]?.onSelect();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filtered, activeIndex, onClose]);

  // Group items for display
  const grouped = useMemo(() => {
    const groups = new Map<CommandItem['group'], CommandItem[]>();
    for (const item of filtered) {
      const existing = groups.get(item.group) ?? [];
      groups.set(item.group, [...existing, item]);
    }
    return groups;
  }, [filtered]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-[91] w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="Command Palette"
            aria-modal="true"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Icon name="Search" size={18} className="text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search activities, days, or commands..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
                aria-label="Search planner"
                aria-autocomplete="list"
                aria-controls="command-palette-list"
                aria-activedescendant={filtered[activeIndex] ? `cmd-item-${filtered[activeIndex].id}` : undefined}
              />
              <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul
              id="command-palette-list"
              ref={listRef}
              role="listbox"
              className="max-h-80 overflow-y-auto py-2"
              aria-label="Commands"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </li>
              ) : (
                Array.from(grouped.entries()).map(([group, items]) => (
                  <li key={group} role="presentation">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {GROUP_LABELS[group]}
                    </div>
                    <ul role="group" aria-label={GROUP_LABELS[group]}>
                      {items.map((item) => {
                        const globalIndex = filtered.indexOf(item);
                        const isActive = globalIndex === activeIndex;
                        return (
                          <li
                            key={item.id}
                            id={`cmd-item-${item.id}`}
                            role="option"
                            aria-selected={isActive}
                            onClick={item.onSelect}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors mx-1 rounded-md ${
                              isActive ? 'bg-muted' : 'hover:bg-muted/60'
                            }`}
                          >
                            <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                              <Icon name={item.icon as IconName} size={14} className="text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                              {item.description && (
                                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                              )}
                            </div>
                            {isActive && (
                              <kbd className="text-[10px] font-medium text-muted-foreground bg-background border border-border px-1.5 py-0.5 rounded shrink-0">
                                ↵
                              </kbd>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))
              )}
            </ul>

            {/* Footer hint */}
            <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> select</span>
                <span><kbd className="font-mono">ESC</kbd> close</span>
              </div>
              <span>VoyageAI</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
