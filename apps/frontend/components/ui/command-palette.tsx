'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, LayoutDashboard, Compass, Map, Bookmark,
  History, User, Settings, Sparkles, MapPin, Calendar, TrendingUp,
  Command
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
  action?: () => void;
  category: string;
  shortcut?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

import { useTripStore, useCollectionStore } from '@/store';

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const trips = useTripStore(state => state.trips);
  const collections = useCollectionStore(state => state.collections);

  const COMMAND_GROUPS = React.useMemo(() => [
    {
      label: 'Navigate',
      items: [
        { id: 'nav-dashboard', label: 'Dashboard', description: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, href: '/dashboard', category: 'navigate' },
        { id: 'nav-planner', label: 'AI Planner', description: 'Start new trip', icon: <Sparkles className="w-4 h-4" />, href: '/planner', category: 'navigate' },
        { id: 'nav-explore', label: 'Explore Destinations', description: 'Discover places', icon: <Compass className="w-4 h-4" />, href: '/explore', category: 'navigate' },
        { id: 'nav-trips', label: 'Saved Trips', description: 'Your itineraries', icon: <MapPin className="w-4 h-4" />, href: '/trips', category: 'navigate' },
        { id: 'nav-collections', label: 'Collections', description: 'Wishlists', icon: <Bookmark className="w-4 h-4" />, href: '/collections', category: 'navigate' },
        { id: 'nav-reservations', label: 'Reservations', description: 'Bookings', icon: <Calendar className="w-4 h-4" />, href: '/reservations', category: 'navigate' },
        { id: 'nav-stats', label: 'Statistics', description: 'Travel stats', icon: <TrendingUp className="w-4 h-4" />, href: '/stats', category: 'navigate' },
        { id: 'nav-history', label: 'History', description: 'Activity timeline', icon: <History className="w-4 h-4" />, href: '/history', category: 'navigate' },
        { id: 'nav-profile', label: 'Profile Settings', description: 'Account', icon: <User className="w-4 h-4" />, href: '/profile', category: 'navigate' },
      ],
    },
    {
      label: 'My Trips',
      items: trips.map(t => ({
        id: `trip-${t.id}`, label: t.title, description: `${t.travelers} Travelers`, icon: <MapPin className="w-4 h-4 text-indigo-500" />, href: '/trips', category: 'trip'
      }))
    },
    {
      label: 'My Collections',
      items: collections.map(c => ({
        id: `col-${c.id}`, label: c.title, description: `${c.destinationSlugs.length} saved`, icon: <Bookmark className="w-4 h-4 text-rose-500" />, href: '/collections', category: 'collection'
      }))
    }
  ], [trips, collections]);

  const allItems: CommandItem[] = COMMAND_GROUPS.flatMap(g => g.items as CommandItem[]);

  const filtered = query.trim()
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[selectedIndex];
      if (item?.href) {
        router.push(item.href);
        onClose();
      } else if (item?.action) {
        item.action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const groupedFiltered = query.trim()
    ? [{ label: 'Results', items: filtered }]
    : COMMAND_GROUPS.map(g => ({
        label: g.label,
        items: g.items as CommandItem[],
      }));

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] command-overlay"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg mx-4 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/20 overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center px-4 py-3 border-b border-slate-100">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search trips, destinations, commands..."
                className="flex-1 px-3 text-sm font-medium text-slate-800 placeholder-slate-400 bg-transparent outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="ml-2 command-key">Esc</kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-slate-400 font-medium">No results for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                groupedFiltered.map(group => (
                  <div key={group.label}>
                    <div className="px-4 py-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{group.label}</span>
                    </div>
                    {group.items.map((item, i) => {
                      const globalIndex = filtered.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;
                      return (
                        <Link
                          key={item.id}
                          href={item.href || '#'}
                          onClick={onClose}
                          className={`flex items-center space-x-3 px-4 py-2.5 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50'
                              : 'hover:bg-slate-50:bg-slate-800/50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                              {item.label}
                            </p>
                            {item.description && (
                              <p className="text-xs text-slate-400 font-medium truncate">{item.description}</p>
                            )}
                          </div>
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                        </Link>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-medium">
                <span className="flex items-center space-x-1"><kbd className="command-key">↑↓</kbd><span>navigate</span></span>
                <span className="flex items-center space-x-1"><kbd className="command-key">↵</kbd><span>open</span></span>
                <span className="flex items-center space-x-1"><kbd className="command-key">Esc</kbd><span>close</span></span>
              </div>
              <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                <Command className="w-3 h-3" />
                <span>VoyageAI</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
