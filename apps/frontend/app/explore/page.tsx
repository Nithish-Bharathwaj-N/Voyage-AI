'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Star, Clock, Calendar, X, ChevronRight,
  Mountain, Waves, Utensils, Camera, Trees, Globe, Compass,
  Users, Heart, Zap, TrendingUp, Filter, SlidersHorizontal,
  ArrowLeft, Navigation, Wallet, Sun, Snowflake, CloudRain,
  Plane, Train, Bus, Map, Hotel, UtensilsCrossed, Backpack,
  CheckCircle2, Info, Gift
} from 'lucide-react';
import { useUserStore } from '@/store';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DestinationIndex {
  id: string;
  slug: string;
  name: string;
  state: string;
  country: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  idealDuration: string;
  bestSeason: string;
  budget: string;
  coverImage: string;
  tags: string[];
  familyFriendly: boolean;
  coupleFriendly: boolean;
  soloFriendly: boolean;
  adventureScore: number;
  hiddenGem: boolean;
  coordinates: { lat: number; lng: number };
}

interface FullDestination extends DestinationIndex {
  history: string;
  altitude: number;
  temperature: string;
  nearestAirport: string;
  nearestRailwayStation: string;
  nearestBusStand: string;
  galleryImages: string[];
  topAttractions: { name: string; description: string; location: string }[];
  activities: any[];
  localFood: string[];
  shopping: string[];
  culture: string;
  festivals: string[];
  hotels: any[];
  restaurants: any[];
  travelTips: string[];
  packingTips: string[];
  weather: string;
  transport: string;
  luxuryScore: number;
  budgetScore: number;
  itineraries: {
    type: string;
    durationDays: number;
    estimatedCost: number;
    days: {
      day: number;
      activities: { time: string; activity: string; description: string; costEstimate: number }[];
    }[];
  }[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'All', label: 'All', icon: Globe, color: 'from-slate-600 to-slate-800' },
  { id: 'Adventure', label: 'Adventure', icon: Mountain, color: 'from-emerald-500 to-teal-700' },
  { id: 'Beach', label: 'Beach', icon: Waves, color: 'from-cyan-400 to-blue-600' },
  { id: 'Nature', label: 'Nature', icon: Trees, color: 'from-green-500 to-emerald-700' },
  { id: 'Culture', label: 'Culture', icon: Camera, color: 'from-violet-500 to-purple-700' },
  { id: 'Pilgrimage', label: 'Pilgrimage', icon: Compass, color: 'from-amber-500 to-orange-700' },
  { id: 'Wildlife', label: 'Wildlife', icon: Zap, color: 'from-lime-500 to-green-700' },
];

const BUDGET_COLORS: Record<string, string> = {
  Budget: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  'Mid-range': 'text-blue-600 bg-blue-50 border-blue-200',
  Luxury: 'text-amber-600 bg-amber-50 border-amber-200',
};

const CAT_GRADIENTS: Record<string, string> = {
  Adventure: 'from-emerald-500 to-teal-700',
  Beach: 'from-cyan-400 to-blue-600',
  Nature: 'from-green-500 to-emerald-700',
  Culture: 'from-violet-500 to-purple-700',
  Pilgrimage: 'from-amber-500 to-orange-700',
  Wildlife: 'from-lime-500 to-green-700',
  default: 'from-slate-500 to-slate-700',
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useDestinationIndex() {
  const [destinations, setDestinations] = React.useState<DestinationIndex[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/data/destinations/destinations-index.json?v=' + Date.now())
      .then(r => r.json())
      .then(data => { setDestinations(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return { destinations, loading, error };
}

function useFullDestination(slug: string | null) {
  const [destination, setDestination] = React.useState<FullDestination | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!slug) { setDestination(null); return; }
    setLoading(true);
    // We need to find the state first from the index, then fetch the full JSON
    fetch('/data/destinations/destinations-index.json')
      .then(r => r.json())
      .then((index: DestinationIndex[]) => {
        const entry = index.find(d => d.slug === slug);
        if (!entry) { setLoading(false); return; }
        const stateDir = entry.state.replace(/[^a-zA-Z]/g, '');
        return fetch(`/data/destinations/India/${stateDir}/${slug}.json`);
      })
      .then(r => r?.json())
      .then(data => { setDestination(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  return { destination, loading };
}

// ─── Destination Card ─────────────────────────────────────────────────────────

function DestinationCard({ dest, onClick }: { dest: DestinationIndex; onClick: () => void }) {
  const [imgError, setImgError] = React.useState(false);
  const { favorites, toggleFavoriteDestination } = useUserStore();
  const isFavorite = favorites.destinations.includes(dest.slug);
  const grad = CAT_GRADIENTS[dest.category] || CAT_GRADIENTS.default;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer border border-slate-100 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {!imgError ? (
          <img
            src={dest.coverImage}
            alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <Globe className="w-12 h-12 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r ${grad} text-white text-[10px] font-black uppercase tracking-wider shadow-md`}>
            {dest.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavoriteDestination(dest.slug); }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        {/* Hidden Gem badge */}
        {dest.hiddenGem && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-bold">
              💎 Hidden Gem
            </span>
          </div>
        )}

        {/* Rating overlaid at bottom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-bold">{typeof dest.rating === 'number' ? dest.rating.toFixed(1) : Number(dest.rating || 4.5).toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-black text-slate-900 text-base leading-tight group-hover:text-indigo-600 transition-colors">{dest.name}</h3>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-xs mb-2">
          <MapPin className="w-3 h-3" />
          <span>{dest.state}</span>
        </div>
        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">{dest.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {(dest.tags || []).slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock className="w-3 h-3" />
              <span>{dest.idealDuration}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 text-xs">
              <Calendar className="w-3 h-3" />
              <span className="truncate max-w-[80px]">{(dest.bestSeason || 'Anytime').split(' ')[0]}...</span>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${BUDGET_COLORS[dest.budget] || BUDGET_COLORS['Mid-range']}`}>
            {dest.budget}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Destination Detail Modal ─────────────────────────────────────────────────

function DestinationModal({ slug, onClose }: { slug: string; onClose: () => void }) {
  const { destination: dest, loading } = useFullDestination(slug);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [activeItinerary, setActiveItinerary] = React.useState(0);
  const [imgError, setImgError] = React.useState(false);

  // Close on Escape
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'attractions', label: 'Attractions' },
    { id: 'itineraries', label: 'Itineraries' },
    { id: 'food', label: 'Food & Culture' },
    { id: 'practical', label: 'Travel Info' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full sm:max-w-4xl bg-white sm:rounded-3xl overflow-hidden max-h-[95vh] flex flex-col shadow-2xl"
        >
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
              <p className="text-slate-500 text-sm">Loading destination...</p>
            </div>
          )}

          {!loading && dest && (
            <>
              {/* Hero Image */}
              <div className="relative h-64 sm:h-80 shrink-0 overflow-hidden">
                {!imgError ? (
                  <img
                    src={dest.coverImage}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${CAT_GRADIENTS[dest.category] || CAT_GRADIENTS.default}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Hero content */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${CAT_GRADIENTS[dest.category] || CAT_GRADIENTS.default} text-white text-xs font-black uppercase tracking-wider`}>
                      {dest.category}
                    </span>
                    {dest.hiddenGem && <span className="px-2 py-0.5 rounded-full bg-amber-400 text-white text-xs font-bold">💎 Hidden Gem</span>}
                  </div>
                  <h2 className="text-3xl font-black text-white mb-1">{dest.name}</h2>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{dest.state}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />{typeof dest.rating === 'number' ? dest.rating.toFixed(1) : Number(dest.rating || 4.5).toFixed(1)} ({typeof dest.reviewCount === 'number' ? dest.reviewCount.toLocaleString() : Number(dest.reviewCount || 120).toLocaleString()} reviews)</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{dest.idealDuration}</span>
                  </div>
                </div>
              </div>

              {/* Tab Bar */}
              <div className="flex overflow-x-auto scrollbar-hide border-b border-slate-100 shrink-0 px-5">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 px-4 py-3 text-sm font-bold transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-indigo-600 text-indigo-600'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-black text-slate-900 mb-2">About {dest.name}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm">{dest.description}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-700 mb-1.5 text-sm">History</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{dest.history}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { icon: Calendar, label: 'Best Season', value: dest.bestSeason },
                        { icon: Clock, label: 'Duration', value: dest.idealDuration },
                        { icon: Wallet, label: 'Budget', value: dest.budget },
                        { icon: Mountain, label: 'Altitude', value: dest.altitude > 500 ? dest.altitude + 'm' : 'Lowland' },
                      ].map(s => (
                        <div key={s.label} className="bg-slate-50 rounded-xl p-3">
                          <s.icon className="w-4 h-4 text-indigo-500 mb-1" />
                          <div className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">{s.label}</div>
                          <div className="text-sm font-black text-slate-900 mt-0.5">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Who is it for? */}
                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Perfect For</h4>
                      <div className="flex flex-wrap gap-2">
                        {dest.familyFriendly && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                            <Users className="w-3 h-3" /> Families
                          </span>
                        )}
                        {dest.coupleFriendly && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
                            <Heart className="w-3 h-3" /> Couples
                          </span>
                        )}
                        {dest.soloFriendly && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                            <Backpack className="w-3 h-3" /> Solo Travelers
                          </span>
                        )}
                        {dest.adventureScore > 7 && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                            <Zap className="w-3 h-3" /> Adventure Seekers
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {(dest.tags || []).map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Things To Do</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(dest.activities || []).map((a, i) => {
                          const text = typeof a === 'string' ? a : `${a.name} (${a.price || ''})`;
                          return (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span>{text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ATTRACTIONS TAB */}
                {activeTab === 'attractions' && (
                  <div className="space-y-4">
                    <h3 className="font-black text-slate-900">Top Attractions</h3>
                    <div className="space-y-3">
                      {(dest.topAttractions || []).map((a, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 font-black text-indigo-700 text-sm">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 text-sm">{a.name}</h4>
                            <p className="text-slate-500 text-xs mt-0.5">{a.description}</p>
                            <div className="flex items-center gap-1 mt-1 text-indigo-500 text-xs font-semibold">
                              <Navigation className="w-3 h-3" />
                              <span>{a.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Festivals */}
                    {dest.festivals && dest.festivals.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-bold text-slate-700 mb-3 text-sm">Festivals & Events</h4>
                        <div className="space-y-2">
                          {(dest.festivals || []).map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                              <Gift className="w-4 h-4 text-amber-500 shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Culture */}
                    {dest.culture && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                        <h4 className="font-bold text-purple-800 mb-2 text-sm">Culture & Heritage</h4>
                        <p className="text-purple-700 text-sm leading-relaxed">{dest.culture}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* ITINERARIES TAB */}
                {activeTab === 'itineraries' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {(dest.itineraries || []).map((itin, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveItinerary(i)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                            activeItinerary === i
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {itin.type}
                          <span className="ml-1.5 text-xs opacity-70">{itin.durationDays}D</span>
                        </button>
                      ))}
                    </div>

                    {dest.itineraries[activeItinerary] && (
                      <div>
                        <div className="flex items-center justify-between mb-4 p-3 bg-indigo-50 rounded-xl">
                          <div>
                            <h4 className="font-black text-indigo-900">{dest.itineraries[activeItinerary].type} Itinerary</h4>
                            <p className="text-indigo-600 text-xs">{dest.itineraries[activeItinerary].durationDays} days</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-indigo-600 font-semibold">Est. Budget</div>
                            <div className="font-black text-indigo-900">₹{typeof dest.itineraries[activeItinerary]?.estimatedCost === 'number' ? dest.itineraries[activeItinerary].estimatedCost.toLocaleString() : '0'}</div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {((dest.itineraries || [])[activeItinerary]?.days || []).map(day => (
                            <div key={day.day} className="border border-slate-100 rounded-2xl overflow-hidden">
                              <div className="bg-slate-900 px-4 py-2.5">
                                <h5 className="font-black text-white text-sm">Day {day.day}</h5>
                              </div>
                              <div className="divide-y divide-slate-50">
                                {(day.activities || []).map((act, j) => (
                                  <div key={j} className="flex gap-3 p-3 hover:bg-slate-50 transition-colors">
                                    <div className="shrink-0 w-20 text-[10px] font-black text-indigo-600 uppercase tracking-wide pt-0.5">{act.time}</div>
                                    <div className="flex-1">
                                      <div className="font-bold text-slate-900 text-sm">{act.activity}</div>
                                      <div className="text-slate-500 text-xs mt-0.5">{act.description}</div>
                                    </div>
                                    <div className="shrink-0 text-right">
                                      <div className="text-xs font-bold text-emerald-600">₹{typeof act.costEstimate === 'number' ? act.costEstimate.toLocaleString() : '0'}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* FOOD & CULTURE TAB */}
                {activeTab === 'food' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-black text-slate-900 mb-3">Local Food</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {(dest.localFood || []).map((food, i) => (
                          <div key={i} className="flex items-center gap-2.5 p-3 bg-orange-50 rounded-xl border border-orange-100">
                            <UtensilsCrossed className="w-4 h-4 text-orange-500 shrink-0" />
                            <span className="text-sm font-semibold text-orange-900">{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Where to Stay</h4>
                      <div className="space-y-2">
                        {(dest.hotels || []).map((h, i) => {
                          const text = typeof h === 'string' ? h : `${h.name} (${h.price || ''})`;
                          return (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                              <Hotel className="w-4 h-4 text-indigo-400 shrink-0" />
                              <span>{text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Where to Eat</h4>
                      <div className="space-y-2">
                        {(dest.restaurants || []).map((r, i) => {
                          const text = typeof r === 'string' ? r : `${r.name} (${r.cuisine || ''})`;
                          return (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                              <Utensils className="w-4 h-4 text-orange-400 shrink-0" />
                              <span>{text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Shopping</h4>
                      <div className="flex flex-wrap gap-2">
                        {(dest.shopping || []).map((s, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold border border-pink-100">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PRACTICAL TAB */}
                {activeTab === 'practical' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { icon: Plane, label: 'Nearest Airport', value: dest.nearestAirport },
                        { icon: Train, label: 'Railway Station', value: dest.nearestRailwayStation },
                        { icon: Bus, label: 'Bus Stand', value: dest.nearestBusStand },
                      ].map(t => (
                        <div key={t.label} className="p-4 bg-slate-50 rounded-xl">
                          <t.icon className="w-5 h-5 text-indigo-500 mb-2" />
                          <div className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">{t.label}</div>
                          <div className="text-sm font-bold text-slate-900 mt-1">{t.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <h4 className="font-bold text-blue-800 mb-2 text-sm">Getting There & Around</h4>
                      <p className="text-blue-700 text-sm leading-relaxed">{dest.transport}</p>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <h4 className="font-bold text-amber-800 mb-2 text-sm">Weather</h4>
                      <p className="text-amber-700 text-sm leading-relaxed">{dest.weather}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">Travel Tips</h4>
                      <div className="space-y-2">
                        {(dest.travelTips || []).map((tip, i) => (
                          <div key={i} className="flex gap-2 text-sm text-slate-600">
                            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-700 mb-3 text-sm">What to Pack</h4>
                      <div className="flex flex-wrap gap-2">
                        {(dest.packingTips || []).map((item, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main Explore Page ────────────────────────────────────────────────────────

export default function ExplorePage() {
  const { destinations, loading, error } = useDestinationIndex();
  const [search, setSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [activeBudget, setActiveBudget] = React.useState('All');
  const [activePersona, setActivePersona] = React.useState('All');
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<'rating' | 'name' | 'adventureScore'>('rating');

  // Filter logic
  const filtered = React.useMemo(() => {
    let result = [...destinations];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        (d.name || '').toLowerCase().includes(q) ||
        (d.state || '').toLowerCase().includes(q) ||
        (d.tags || []).some(t => (t || '').toLowerCase().includes(q)) ||
        (d.category || '').toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'All') {
      result = result.filter(d => d.category === activeCategory);
    }

    if (activeBudget !== 'All') {
      result = result.filter(d => d.budget === activeBudget);
    }

    if (activePersona === 'Family') result = result.filter(d => d.familyFriendly);
    if (activePersona === 'Couples') result = result.filter(d => d.coupleFriendly);
    if (activePersona === 'Solo') result = result.filter(d => d.soloFriendly);
    if (activePersona === 'Adventure') result = result.filter(d => d.adventureScore >= 7);
    if (activePersona === 'Hidden Gems') result = result.filter(d => d.hiddenGem);

    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'adventureScore') return b.adventureScore - a.adventureScore;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [destinations, search, activeCategory, activeBudget, activePersona, sortBy]);

  const stats = React.useMemo(() => ({
    total: destinations.length,
    states: new Set(destinations.map(d => d.state)).size,
    categories: new Set(destinations.map(d => d.category)).size,
  }), [destinations]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-bold uppercase tracking-widest mb-5 border border-white/10">
              <Compass className="w-3.5 h-3.5" />
              India Travel Knowledge Base
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">
              Explore<br/>
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Incredible India</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Discover {stats.total} curated destinations across {stats.states} states. Real data, real itineraries, real experiences.
            </p>
          </motion.div>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mb-10">
            {[
              { label: 'Destinations', value: stats.total },
              { label: 'States', value: stats.states },
              { label: 'Categories', value: stats.categories },
              { label: 'Itineraries', value: stats.total * 3 + '+' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">{s.value}</div>
                <div className="text-white/50 text-xs uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search destination, state, activity, tag..."
                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-slate-900 placeholder-slate-400 text-base shadow-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Filter Bar */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    active
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-md scale-105`
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Filters Row */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Budget Filter */}
            <div className="flex gap-1.5">
              {['All', 'Budget', 'Mid-range', 'Luxury'].map(b => (
                <button
                  key={b}
                  onClick={() => setActiveBudget(b)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeBudget === b
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <div className="h-5 border-l border-slate-200 hidden sm:block" />

            {/* Persona Filter */}
            <div className="flex gap-1.5 flex-wrap">
              {['All', 'Family', 'Couples', 'Solo', 'Adventure', 'Hidden Gems'].map(p => (
                <button
                  key={p}
                  onClick={() => setActivePersona(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activePersona === p
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'rating' | 'name' | 'adventureScore')}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="rating">Sort: Top Rated</option>
              <option value="adventureScore">Sort: Adventure</option>
              <option value="name">Sort: A to Z</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-slate-900 text-sm">
            {loading ? 'Loading...' : `${filtered.length} destination${filtered.length !== 1 ? 's' : ''} found`}
            {activeCategory !== 'All' && <span className="text-indigo-600 ml-1">in {activeCategory}</span>}
          </h2>
          {(search || activeCategory !== 'All' || activeBudget !== 'All' || activePersona !== 'All') && (
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setActiveBudget('All'); setActivePersona('All'); }}
              className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
                <div className="h-48 bg-slate-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-8 bg-slate-100 rounded" />
                  <div className="h-3 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="font-black text-slate-900 mb-1">Couldn&apos;t load destinations</h3>
            <p className="text-slate-500 text-sm">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-black text-slate-900 mb-2">No destinations found</h3>
            <p className="text-slate-500 text-sm">Try different filters or search terms</p>
          </div>
        )}

        {/* Destinations Grid */}
        {!loading && !error && filtered.length > 0 && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((dest, index) => (
                <DestinationCard
                  key={`${dest.id}-${index}`}
                  dest={dest}
                  onClick={() => setSelectedSlug(dest.slug)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedSlug && (
          <DestinationModal
            key={selectedSlug}
            slug={selectedSlug}
            onClose={() => setSelectedSlug(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
