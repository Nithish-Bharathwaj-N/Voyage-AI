'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueries } from '@tanstack/react-query';
import { tripService } from '@/services/trip.service';
import { InteractiveMap } from '@/components/maps/interactive-map';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { QueryError } from '@/components/ui/query-error';
import {
  Calendar, MapPin, Loader2, Sparkles, ArrowLeft, Share2,
  Clock, DollarSign, Users, ChevronDown, ChevronRight,
  Footprints, Car, Train, Plane, Hotel, Utensils, Camera,
  Mountain, Coffee, Map, Brain, CloudSun, TrendingDown,
  PiggyBank, MoreHorizontal, Plus, Check, Sun, Trash2,
  Edit3, ListTodo, Award, Heart, Shield, RefreshCw, AlertTriangle
} from 'lucide-react';
import { weatherService } from '@/services/weather.service';

/* ──────────────────────────────
   TYPES & INTERFACES
────────────────────────────── */
interface Destination {
  id: string;
  name: string;
  latitude?: number | null;
  longitude?: number | null;
  arrivalDate?: string;
  nights?: number;
}

interface Activity {
  id: string;
  name: string;
  type?: string;
  location?: string;
  startTime?: string;
  estimatedCost?: number;
  duration?: string;
  notes?: string;
}

interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  packed: boolean;
}

interface Expense {
  id: string;
  name: string;
  cost: number;
  category: string;
  payer: string;
  splitWith: string[]; // members
}

interface JournalEntry {
  id: string;
  dayIndex: number;
  highlight: string;
  notes: string;
  rating: number; // 1-5
  mood: string; // Excited, Tired, Calmed etc.
}

interface Collaborator {
  id: string;
  email: string;
  role: 'OWNER' | 'EDITOR' | 'VIEWER';
}

function getTransportIcon(mode?: string) {
  if (!mode) return <Footprints className="w-3 h-3" />;
  if (/drive|car/i.test(mode)) return <Car className="w-3 h-3" />;
  if (/train|metro|transit/i.test(mode)) return <Train className="w-3 h-3" />;
  if (/fly|flight|air/i.test(mode)) return <Plane className="w-3 h-3" />;
  return <Footprints className="w-3 h-3" />;
}

const CAT: Record<string, { bg: string; iconBg: string; text: string; icon: React.ElementType }> = {
  food:    { bg: 'bg-orange-50', iconBg: 'bg-orange-100', text: 'text-orange-600', icon: Utensils },
  museum:  { bg: 'bg-violet-50', iconBg: 'bg-violet-100', text: 'text-violet-600', icon: Camera },
  nature:  { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', text: 'text-emerald-600', icon: Mountain },
  hotel:   { bg: 'bg-blue-50', iconBg: 'bg-blue-100', text: 'text-blue-600', icon: Hotel },
  coffee:  { bg: 'bg-amber-50', iconBg: 'bg-amber-100', text: 'text-amber-600', icon: Coffee },
  default: { bg: 'bg-slate-50', iconBg: 'bg-slate-100', text: 'text-slate-600', icon: MapPin },
};

function getCat(type?: string) {
  if (!type) return CAT.default;
  const t = type.toLowerCase();
  if (/food|eat|restaurant|dining|lunch|dinner|bistro/.test(t)) return CAT.food;
  if (/museum|gallery|art|culture|temple|church/.test(t)) return CAT.museum;
  if (/park|beach|nature|garden|hike|trek|mountain/.test(t)) return CAT.nature;
  if (/hotel|resort|hostel|stay|accommod/.test(t)) return CAT.hotel;
  if (/coffee|cafe|bakery/.test(t)) return CAT.coffee;
  return CAT.default;
}

/* ──────────────────────────────
   AI COPILOT PANEL
────────────────────────────── */
function AiCopilotPanel({ trip, destinations, totalSpent, totalBudget }: { trip: any; destinations: Destination[]; totalSpent: number; totalBudget: number }) {
  const [copilotMsg, setCopilotMsg] = React.useState('');
  const [messages, setMessages] = React.useState<{ role: 'ai' | 'user'; text: string }[]>([
    {
      role: 'ai',
      text: `I've loaded your ${trip?.title || 'trip'} workspace. I can help you optimize routes, find alternatives, adjust budget, check weather, or answer any travel questions.`,
    }
  ]);
  const [thinking, setThinking] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch current weather for the first geocoded stop
  const firstDest = destinations.find(d => d.latitude && d.longitude);
  const { data: weatherRes } = useQuery({
    queryKey: ['weather', firstDest?.latitude, firstDest?.longitude],
    queryFn: () => weatherService.getCurrentWeather(firstDest!.latitude!, firstDest!.longitude!),
    enabled: !!firstDest?.latitude && !!firstDest?.longitude,
  });
  const weather = weatherRes?.data || (weatherRes as any);

  const handleSend = () => {
    const msg = copilotMsg.trim();
    if (!msg) return;
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setCopilotMsg('');
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      let response = `✨ I analyzed your request. For ${trip?.title || 'your trip'}, keeping your itinerary balanced between highlights and relaxation will give you the best experience!`;
      const m = msg.toLowerCase();
      if (m.includes('weather') || m.includes('rain') || m.includes('forecast')) {
        if (weather && weather.temperatureCelsius !== undefined) {
          response = `🌤 Live Weather check for ${firstDest?.name || 'destination'}: Current temperature is **${Math.round(weather.temperatureCelsius)}°C** with **${weather.conditions?.[0]?.description || 'clear skies'}**. Perfect conditions for outdoor sightseeing!`;
        } else {
          response = `🌤 Expected average weather in ${trip?.city || 'the area'} is pleasant. I suggest outdoor packing for afternoons, and light jackets for evening strolls.`;
        }
      } else if (m.includes('budget') || m.includes('cost')) {
        response = `💰 Looking at your budget splits, you can save roughly 15% by choosing local cafes for lunches instead of hotel restaurants.`;
      } else if (m.includes('optimise') || m.includes('optimize') || m.includes('route')) {
        response = `🗺 Routing Tip: Grouping activities by geographic quarters will reduce travel times by up to 45 minutes daily.`;
      }
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans border-l border-slate-200 w-[320px]">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/25">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs font-black text-slate-900">AI Copilot</p>
          <p className="text-[10px] text-slate-400 font-medium">Continuous intelligence active</p>
        </div>
      </div>

      {/* Weather widget */}
      {weather && weather.temperatureCelsius !== undefined && (
        <div className="p-3 bg-slate-50 border-b border-slate-100 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
            <span>Destination Weather</span>
            <span className="text-blue-600">Live</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CloudSun className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-xs font-bold text-slate-900">{firstDest?.name || 'Tokyo'}</p>
                <p className="text-[9px] text-slate-400 capitalize">{weather.conditions?.[0]?.description || 'clear skies'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-black text-slate-900">{Math.round(weather.temperatureCelsius)}°C</p>
              <p className="text-[9px] text-slate-400">Humidity: {weather.humidity}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Warnings & Alerts */}
      {totalSpent > totalBudget && (
        <div className="p-3 bg-red-50/50 border-b border-red-100/50 flex gap-2.5 items-start">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold text-red-700">Budget Limit Warning</p>
            <p className="text-[9px] text-slate-500 leading-relaxed">Logged expenses are over the target budget by {trip?.currency || '₹'}{typeof totalSpent === 'number' && typeof totalBudget === 'number' ? (totalSpent - totalBudget).toLocaleString() : '0'}. Consider cheaper dining alternatives.</p>
          </div>
        </div>
      )}

      {/* Dynamic Suggestions */}
      <div className="px-3 py-2 border-b border-slate-100 flex gap-1.5 flex-wrap">
        {['Optimize route', 'Check weather', 'Budget tips'].map(q => (
          <button
            key={q}
            onClick={() => setCopilotMsg(q)}
            className="px-2 py-1 bg-slate-50 hover:bg-blue-50:bg-blue-950/40 text-slate-500 hover:text-blue-600:text-blue-400 rounded-lg text-[9px] font-bold border border-slate-100 cursor-pointer transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat scroll workspace */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 chat-scroll">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {m.role === 'ai' && (
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 mt-0.5 text-white text-[9px]">
                🤖
              </div>
            )}
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-[11px] leading-relaxed font-medium ${
              m.role === 'ai' ? 'ai-bubble text-slate-700 bg-slate-50' : 'user-bubble text-white bg-blue-600'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 text-white text-[9px]">
              🤖
            </div>
            <div className="ai-bubble px-3 py-2 rounded-xl flex items-center gap-1 bg-slate-50">
              <span className="thinking-dot" />
              <span className="thinking-dot" />
              <span className="thinking-dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Reasoning log steps */}
      <div className="p-3 bg-slate-50/50 border-t border-slate-100 space-y-1.5">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">AI Reasoning Steps</span>
        <div className="space-y-1">
          {[
            { text: 'Monitoring forecast parameters', done: true },
            { text: 'Validating route coordinates', done: true },
            { text: 'Checking expense category caps', done: totalSpent <= totalBudget }
          ].map((s, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[9px] text-slate-500 font-semibold">
              <Check className={`w-2.5 h-2.5 ${s.done ? 'text-emerald-500' : 'text-slate-300'}`} />
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input row */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex gap-2">
          <input
            value={copilotMsg}
            onChange={e => setCopilotMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot..."
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-900"
          />
          <button
            onClick={handleSend}
            disabled={!copilotMsg.trim()}
            className="px-3 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold hover:shadow-md cursor-pointer"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────
   MAIN WORKSPACE PAGE
────────────────────────────── */
export default function TripDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  // Selected Day & Navigation Tabs
  const [selectedDay, setSelectedDay] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<'timeline' | 'packing' | 'budget' | 'journal' | 'team'>('timeline');
  const [showMap, setShowMap] = React.useState(false);

  // local overrides state (persisted to localStorage)
  const [activitiesOverride, setActivitiesOverride] = React.useState<Record<string, Activity[]>>({});
  const [packingBags, setPackingBags] = React.useState<Record<string, PackingItem[]>>({
    'Main Suitcase': [
      { id: '1', name: 'Passports & Visas', category: 'Documents', quantity: 1, packed: true },
      { id: '2', name: 'Sunscreen lotion', category: 'Toiletries', quantity: 1, packed: false },
      { id: '3', name: 'Swimwear', category: 'Clothing', quantity: 2, packed: false },
      { id: '4', name: 'Travel adapter plug', category: 'Electronics', quantity: 1, packed: true },
    ],
    'Daypack': [
      { id: '5', name: 'Water bottle', category: 'Essentials', quantity: 1, packed: false },
      { id: '6', name: 'Powerbank', category: 'Electronics', quantity: 1, packed: true },
    ]
  });
  const [selectedBag, setSelectedBag] = React.useState('Main Suitcase');
  const [newPackingItem, setNewPackingItem] = React.useState({ name: '', category: 'Clothing', quantity: 1 });

  // Budget expense splits state
  const [expenses, setExpenses] = React.useState<Expense[]>([
    { id: 'e1', name: 'Luxury Boutique Resort', cost: 18400, category: 'Accommodation', payer: 'You', splitWith: ['You', 'Alex'] },
    { id: 'e2', name: 'Traditional Dinner Feast', cost: 3500, category: 'Food & Dining', payer: 'Alex', splitWith: ['You', 'Alex'] },
    { id: 'e3', name: 'Museum Entry Tickets', cost: 1200, category: 'Attractions', payer: 'You', splitWith: ['You', 'Alex'] },
  ]);
  const [newExpense, setNewExpense] = React.useState({ name: '', cost: '', category: 'Accommodation', payer: 'You' });

  // Journal logs
  const [journals, setJournals] = React.useState<Record<number, JournalEntry>>({
    0: { id: 'j1', dayIndex: 0, highlight: 'Arrived safely, food tour was spectacular!', notes: 'Found a beautiful local cafe with fresh croissants.', rating: 5, mood: '🤩 Excited' }
  });
  const [tempJournal, setTempJournal] = React.useState({ highlight: '', notes: '', rating: 5, mood: '😊 Happy' });

  // Collaborators
  const [collaborators, setCollaborators] = React.useState<Collaborator[]>([
    { id: 'c1', email: 'alex.traveler@example.com', role: 'EDITOR' }
  ]);
  const [inviteEmail, setInviteEmail] = React.useState('');

  // Timeline item adding modal
  const [showAddActivityModal, setShowAddActivityModal] = React.useState(false);
  const [newActivity, setNewActivity] = React.useState({
    name: '',
    type: 'default',
    location: '',
    startTime: '10:00 AM',
    estimatedCost: '',
    duration: '2 hours',
    notes: '',
  });

  // Query database trip details
  const { data: tripRes, isLoading: loadingTrip, isError, error, refetch } = useQuery({
    queryKey: ['trips', id],
    queryFn: () => tripService.getTrip(id),
  });

  const { data: destsRes, isLoading: loadingDests } = useQuery({
    queryKey: ['trips', id, 'destinations'],
    queryFn: () => tripService.getDestinations(id),
  });

  const trip = tripRes?.data;
  const destinations: Destination[] = (destsRes?.data as Destination[]) || [];

  const activitiesQueries = useQueries({
    queries: destinations.map(dest => ({
      queryKey: ['destinations', dest.id, 'activities'],
      queryFn: () => tripService.getActivities(dest.id),
      enabled: destinations.length > 0,
    })),
  });

  const isLoading = loadingTrip || loadingDests || activitiesQueries.some(q => q.isLoading);

  // Load custom state from local storage on mount
  React.useEffect(() => {
    try {
      const savedPacking = localStorage.getItem(`packing_${id}`);
      if (savedPacking) setPackingBags(JSON.parse(savedPacking));

      const savedExpenses = localStorage.getItem(`expenses_${id}`);
      if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

      const savedJournals = localStorage.getItem(`journals_${id}`);
      if (savedJournals) setJournals(JSON.parse(savedJournals));

      const savedOverride = localStorage.getItem(`timeline_${id}`);
      if (savedOverride) setActivitiesOverride(JSON.parse(savedOverride));

      const savedCollabs = localStorage.getItem(`collabs_${id}`);
      if (savedCollabs) setCollaborators(JSON.parse(savedCollabs));
    } catch (e) {
      console.error('Failed to parse local overrides:', e);
    }
  }, [id]);

  // Sync state helpers
  const savePackingState = (newBags: typeof packingBags) => {
    setPackingBags(newBags);
    localStorage.setItem(`packing_${id}`, JSON.stringify(newBags));
  };

  const saveExpenseState = (newExpenses: typeof expenses) => {
    setExpenses(newExpenses);
    localStorage.setItem(`expenses_${id}`, JSON.stringify(newExpenses));
  };

  const saveJournalState = (newJournals: typeof journals) => {
    setJournals(newJournals);
    localStorage.setItem(`journals_${id}`, JSON.stringify(newJournals));
  };

  const saveOverrideState = (newOverride: typeof activitiesOverride) => {
    setActivitiesOverride(newOverride);
    localStorage.setItem(`timeline_${id}`, JSON.stringify(newOverride));
  };

  // Build activities list grouped by destination
  const activitiesByDest = React.useMemo(() => {
    const map: Record<string, Activity[]> = {};
    destinations.forEach((dest, i) => {
      // If user has overrides, prioritize them, otherwise take backend data
      if (activitiesOverride[dest.id]) {
        map[dest.id] = activitiesOverride[dest.id];
      } else {
        map[dest.id] = (activitiesQueries[i]?.data?.data as Activity[]) || [];
      }
    });
    return map;
  }, [destinations, activitiesQueries, activitiesOverride]);

  const allActivities = React.useMemo(() =>
    Object.values(activitiesByDest).flat(),
    [activitiesByDest]
  );

  const mapCoords = React.useMemo(() => {
    return destinations
      .filter(d => d.latitude && d.longitude)
      .map((d, idx) => {
        const acts = activitiesByDest[d.id] || [];
        const firstAct = acts[0];
        return {
          latitude: d.latitude!,
          longitude: d.longitude!,
          title: d.name,
          category: firstAct?.type || 'Sightseeing',
          dayNumber: idx + 1,
          cost: firstAct?.estimatedCost || undefined,
        };
      });
  }, [destinations, activitiesByDest]);

  const mapCenter = mapCoords[0] || { latitude: 20.5937, longitude: 78.9629 };

  const tripDuration = trip
    ? Math.max(1, Math.round((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000))
    : 0;

  // Add / delete custom activity handlers
  const handleAddActivity = () => {
    if (!newActivity.name.trim()) return;
    const dest = destinations[selectedDay];
    if (!dest) return;

    const added: Activity = {
      id: `act_${Date.now()}`,
      name: newActivity.name,
      type: newActivity.type,
      location: newActivity.location,
      startTime: newActivity.startTime,
      estimatedCost: newActivity.estimatedCost ? Number(newActivity.estimatedCost) : undefined,
      duration: newActivity.duration,
      notes: newActivity.notes,
    };

    const currentList = activitiesByDest[dest.id] || [];
    const updated = [...currentList, added];

    saveOverrideState({
      ...activitiesOverride,
      [dest.id]: updated
    });

    // Reset Form
    setNewActivity({
      name: '',
      type: 'default',
      location: '',
      startTime: '10:00 AM',
      estimatedCost: '',
      duration: '2 hours',
      notes: '',
    });
    setShowAddActivityModal(false);
    toast.success('Activity added to timeline!');
  };

  const handleDeleteActivity = (destId: string, actId: string) => {
    const currentList = activitiesByDest[destId] || [];
    const updated = currentList.filter(a => a.id !== actId);
    saveOverrideState({
      ...activitiesOverride,
      [destId]: updated
    });
    toast.success('Activity removed.');
  };

  // Packing List actions
  const handleAddPackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingItem.name.trim()) return;

    const newItem: PackingItem = {
      id: `pack_${Date.now()}`,
      name: newPackingItem.name,
      category: newPackingItem.category,
      quantity: newPackingItem.quantity,
      packed: false,
    };

    const currentItems = packingBags[selectedBag] || [];
    const updated = {
      ...packingBags,
      [selectedBag]: [...currentItems, newItem]
    };
    savePackingState(updated);
    setNewPackingItem({ name: '', category: 'Clothing', quantity: 1 });
    toast.success('Item added to bag!');
  };

  const togglePackingItem = (bag: string, itemId: string) => {
    const currentItems = packingBags[bag] || [];
    const updated = currentItems.map(item =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    savePackingState({
      ...packingBags,
      [bag]: updated
    });
  };

  const deletePackingItem = (bag: string, itemId: string) => {
    const currentItems = packingBags[bag] || [];
    const updated = currentItems.filter(item => item.id !== itemId);
    savePackingState({
      ...packingBags,
      [bag]: updated
    });
  };

  // Budget Actions
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.name.trim() || !newExpense.cost) return;

    const item: Expense = {
      id: `exp_${Date.now()}`,
      name: newExpense.name,
      cost: Number(newExpense.cost),
      category: newExpense.category,
      payer: newExpense.payer,
      splitWith: ['You', 'Alex'], // default split
    };

    const updated = [...expenses, item];
    saveExpenseState(updated);
    setNewExpense({ name: '', cost: '', category: 'Accommodation', payer: 'You' });
    toast.success('Expense logged.');
  };

  const handleDeleteExpense = (expId: string) => {
    const updated = expenses.filter(ex => ex.id !== expId);
    saveExpenseState(updated);
  };

  // Journal Actions
  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: JournalEntry = {
      id: journals[selectedDay]?.id || `journ_${Date.now()}`,
      dayIndex: selectedDay,
      highlight: tempJournal.highlight,
      notes: tempJournal.notes,
      rating: tempJournal.rating,
      mood: tempJournal.mood,
    };
    const updated = {
      ...journals,
      [selectedDay]: entry
    };
    saveJournalState(updated);
    toast.success(`Day ${selectedDay + 1} Journal saved!`);
  };

  // Load temp journal details when selected day changes
  React.useEffect(() => {
    const existing = journals[selectedDay];
    if (existing) {
      setTempJournal({
        highlight: existing.highlight,
        notes: existing.notes,
        rating: existing.rating,
        mood: existing.mood,
      });
    } else {
      setTempJournal({
        highlight: '',
        notes: '',
        rating: 5,
        mood: '😊 Happy',
      });
    }
  }, [selectedDay, journals]);

  // Collab Actions
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newCollab: Collaborator = {
      id: `collab_${Date.now()}`,
      email: inviteEmail.trim(),
      role: 'EDITOR'
    };

    const updated = [...collaborators, newCollab];
    setCollaborators(updated);
    localStorage.setItem(`collabs_${id}`, JSON.stringify(updated));
    setInviteEmail('');
    toast.success(`Invitation email sent to ${newCollab.email}`);
  };

  // Calculate budget stats
  const totalBudget = trip?.estimatedBudget || 0;
  const totalSpent = allActivities.reduce((s, a) => s + (a.estimatedCost || 0), 0) + expenses.reduce((s, e) => s + e.cost, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-400">Loading workspace panels...</p>
        </div>
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className="flex items-center justify-center h-[70vh] p-6">
        <QueryError error={error} onRetry={refetch} message="Failed to load trip workspace." />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-slate-50 overflow-hidden font-sans">

      {/* ── TOP HEADER BAR ── */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer text-slate-500"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs shrink-0">
              ✈️
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 tracking-tight">{trip.title}</h1>
              <p className="text-[10px] text-slate-400 font-semibold">
                {tripDuration} Days · {destinations.length} Stops · {trip.city || trip.country || 'Destination unset'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Selector Links */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {([
            { id: 'timeline', label: 'Timeline', icon: Calendar },
            { id: 'packing', label: 'Packing', icon: ListTodo },
            { id: 'budget', label: 'Budget', icon: PiggyBank },
            { id: 'journal', label: 'Journal', icon: Award },
            { id: 'team', label: 'Team', icon: Users },
          ] as const).map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setShowMap(false); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${
                  active && !showMap
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMap(prev => !prev)}
            className={`flex items-center gap-1 px-3 py-1.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
              showMap
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600'
            }`}
            aria-label="Toggle map panel"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
          
          <button
            onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Workspace link copied!'); }}
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 cursor-pointer"
            aria-label="Share workspace"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* ── WORKSPACE CORE GRID ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[250px_1fr_320px] overflow-hidden">
        
        {/* ── LEFT PANEL: DAYS SELECTOR & QUICK METRICS ── */}
        <aside className="border-r border-slate-200 bg-white overflow-y-auto flex flex-col justify-between shrink-0">
          <div>
            <div className="p-3 border-b border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Day Timeline</span>
            </div>
            
            <div className="p-2 space-y-1">
              {destinations.map((dest, di) => {
                const acts = activitiesByDest[dest.id] || [];
                const isSelected = selectedDay === di;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDay(di)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-slate-50:bg-slate-800/60 text-slate-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected ? 'bg-white/20' : 'bg-slate-100 text-slate-550'
                    }`}>
                      D{di + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{dest.name}</p>
                      <p className={`text-[9px] font-semibold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {acts.length} activities
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Spent vs Budget summary widget */}
          <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50/50">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-450 tracking-wider">
              <span>Financial Overview</span>
              <span className={totalSpent > totalBudget ? 'text-red-500' : 'text-emerald-500'}>
                {totalSpent > totalBudget ? 'Over Budget' : 'Safe'}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Total Spent</span>
                <span className="text-slate-900 font-black">{trip?.currency || '₹'}{typeof totalSpent === 'number' ? totalSpent.toLocaleString() : '0'}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${totalSpent > totalBudget ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (totalSpent / (totalBudget || 1)) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                <span>of {trip?.currency || '₹'}{typeof totalBudget === 'number' ? totalBudget.toLocaleString() : '0'} limit</span>
                <span>{Math.round((totalSpent / (totalBudget || 1)) * 100)}%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── CENTER PANEL: TABBED INTERACTIVE VIEWS ── */}
        <main className="overflow-y-auto p-4 bg-slate-50 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {showMap ? (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full rounded-2xl overflow-hidden border border-slate-200"
              >
                <InteractiveMap coordinates={mapCoords} center={mapCenter} />
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* 1. TIMELINE VIEW */}
                {activeTab === 'timeline' && destinations[selectedDay] && (() => {
                  const dest = destinations[selectedDay];
                  const acts = activitiesByDest[dest.id] || [];
                  return (
                    <div className="space-y-4">
                      {/* Day Header details */}
                      <div className="day-header-gradient p-4 border border-slate-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black text-sm flex flex-col items-center justify-center">
                            <span className="text-[8px] opacity-70">DAY</span>
                            <span className="leading-none">{selectedDay + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-xs font-black text-slate-900">{dest.name}</h3>
                            <p className="text-[10px] text-slate-400 font-semibold">
                              {acts.length} scheduled stops · {dest.arrivalDate ? new Date(dest.arrivalDate).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Date unset'}
                            </p>
                          </div>
                        </div>

                        {/* Add activity button */}
                        <button
                          onClick={() => setShowAddActivityModal(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Activity</span>
                        </button>
                      </div>

                      {/* Day journal preview box */}
                      {journals[selectedDay] && (
                        <div className="p-3 bg-violet-55/10 border border-violet-100 rounded-xl flex items-center justify-between text-[11px] text-violet-700">
                          <div className="flex items-center gap-2">
                            <span>{journals[selectedDay].mood}</span>
                            <span className="font-bold">Highlight: &ldquo;{journals[selectedDay].highlight}&rdquo;</span>
                          </div>
                          <span className="text-amber-500 font-bold">★ {journals[selectedDay].rating}/5</span>
                        </div>
                      )}

                      {/* Activity List */}
                      {acts.length === 0 ? (
                        <div className="py-12 border border-dashed border-slate-200 rounded-2xl text-center space-y-2 bg-white">
                          <p className="text-slate-400 text-xl">📋</p>
                          <p className="text-xs text-slate-400 font-semibold">No scheduled stops for this day.</p>
                          <button
                            onClick={() => setShowAddActivityModal(true)}
                            className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                          >
                            Add your first activity →
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2 timeline-line">
                          {acts.map((act, idx) => {
                            const style = getCat(act.type);
                            const Icon = style.icon;
                            return (
                              <div
                                key={act.id}
                                className={`activity-card ml-6 p-4 rounded-xl border border-slate-100 flex gap-3.5 group bg-white`}
                              >
                                <div className={`w-9 h-9 rounded-xl ${style.iconBg} flex items-center justify-center shrink-0`}>
                                  <Icon className={`w-4 h-4 ${style.text}`} />
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs font-bold text-slate-900 leading-snug">{act.name}</p>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{act.startTime || 'Time unset'}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-bold">
                                    {act.location && (
                                      <span className="flex items-center gap-0.5">
                                        <MapPin className="w-2.5 h-2.5" />
                                        {act.location}
                                      </span>
                                    )}
                                    {act.estimatedCost && (
                                      <span className="text-emerald-600 font-bold">
                                        {trip?.currency || '₹'}{typeof act.estimatedCost === 'number' ? act.estimatedCost.toLocaleString() : '0'}
                                      </span>
                                    )}
                                  </div>
                                  {act.notes && (
                                    <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{act.notes}</p>
                                  )}
                                </div>
                                
                                <button
                                  onClick={() => handleDeleteActivity(dest.id, act.id)}
                                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 hover:text-red-600 rounded cursor-pointer self-start transition-all"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* 2. PACKING LIST TAB */}
                {activeTab === 'packing' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex gap-2">
                        {Object.keys(packingBags).map(bag => (
                          <button
                            key={bag}
                            onClick={() => setSelectedBag(bag)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                              selectedBag === bag
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white text-slate-650 hover:bg-slate-100'
                            }`}
                          >
                            {bag}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          const newBagName = prompt('Enter new bag name:');
                          if (newBagName?.trim()) {
                            savePackingState({ ...packingBags, [newBagName]: [] });
                            setSelectedBag(newBagName);
                          }
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-xs font-bold text-blue-600 cursor-pointer"
                      >
                        + New Bag
                      </button>
                    </div>

                    {/* Add Packing Item Form */}
                    <form onSubmit={handleAddPackingItem} className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-wrap gap-3 items-end">
                      <div className="flex-1 min-w-[200px] space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Item Name</label>
                        <input
                          value={newPackingItem.name}
                          onChange={e => setNewPackingItem({ ...newPackingItem, name: e.target.value })}
                          placeholder="e.g. Hiking shoes, Passport copy..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Category</label>
                        <select
                          value={newPackingItem.category}
                          onChange={e => setNewPackingItem({ ...newPackingItem, category: e.target.value })}
                          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        >
                          {['Clothing', 'Toiletries', 'Electronics', 'Documents', 'Essentials'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={newPackingItem.quantity}
                          onChange={e => setNewPackingItem({ ...newPackingItem, quantity: Number(e.target.value) })}
                          className="w-16 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Add Item
                      </button>
                    </form>

                    {/* Packing list items grid */}
                    <div className="space-y-2">
                      {(packingBags[selectedBag] || []).length === 0 ? (
                        <div className="py-8 text-center bg-white border border-dashed border-slate-200 rounded-2xl text-xs text-slate-400 font-medium">
                          No packing items added to {selectedBag} yet.
                        </div>
                      ) : (
                        (packingBags[selectedBag] || []).map(item => (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl hover:border-slate-300:border-slate-700 transition-all ${
                              item.packed ? 'opacity-65' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => togglePackingItem(selectedBag, item.id)}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${
                                  item.packed
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : 'border-slate-300 hover:border-blue-500'
                                }`}
                              >
                                {item.packed && <Check className="w-3.5 h-3.5" />}
                              </button>
                              <div>
                                <p className={`text-xs font-bold ${item.packed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                  {item.name}
                                </p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded">
                                Qty: {item.quantity}
                              </span>
                              <button
                                onClick={() => deletePackingItem(selectedBag, item.id)}
                                className="text-slate-350 hover:text-red-500 cursor-pointer"
                                aria-label="Delete item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 3. BUDGET SPLITS TAB */}
                {activeTab === 'budget' && (
                  <div className="space-y-4">
                    {/* Log New Expense Form */}
                    <form onSubmit={handleAddExpense} className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-wrap gap-3 items-end">
                      <div className="flex-1 min-w-[180px] space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Expense Item</label>
                        <input
                          value={newExpense.name}
                          onChange={e => setNewExpense({ ...newExpense, name: e.target.value })}
                          placeholder="e.g. Car Rental, Dinner..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cost ({trip?.currency || '₹'})</label>
                        <input
                          type="number"
                          value={newExpense.cost}
                          onChange={e => setNewExpense({ ...newExpense, cost: e.target.value })}
                          placeholder="0"
                          className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Category</label>
                        <select
                          value={newExpense.category}
                          onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        >
                          {['Accommodation', 'Transport', 'Food & Dining', 'Attractions', 'Shopping', 'Other'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Paid By</label>
                        <select
                          value={newExpense.payer}
                          onChange={e => setNewExpense({ ...newExpense, payer: e.target.value })}
                          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                        >
                          <option value="You">You</option>
                          <option value="Alex">Alex</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Log Cost
                      </button>
                    </form>

                    {/* Expense logs list */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-black uppercase text-slate-400 tracking-wider">
                        <span>Logged Expenses</span>
                        <span>{expenses.length} Entries</span>
                      </div>
                      
                      <div className="space-y-2">
                        {expenses.map(ex => (
                          <div
                            key={ex.id}
                            className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:border-slate-350 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                                💸
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-900">{ex.name}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                  {ex.category} · Paid by <span className="text-blue-500 font-black">{ex.payer}</span>
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xs font-black text-slate-900">
                                  {trip?.currency || '₹'}{typeof ex.cost === 'number' ? ex.cost.toLocaleString() : '0'}
                                </p>
                                <p className="text-[9px] text-slate-400 font-semibold">
                                  Split equal (You/Alex: {trip?.currency || '₹'}{typeof ex.cost === 'number' ? (ex.cost / 2).toLocaleString() : '0'} each)
                                </p>
                              </div>
                              <button
                                onClick={() => handleDeleteExpense(ex.id)}
                                className="text-slate-300 hover:text-red-500 cursor-pointer"
                                aria-label="Delete expense"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. TRAVEL JOURNAL TAB */}
                {activeTab === 'journal' && (
                  <form onSubmit={handleSaveJournal} className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-xs font-black text-slate-950 uppercase tracking-wider">Day {selectedDay + 1} Travel Journal</h3>
                        <p className="text-[10px] text-slate-400 font-semibold">Log highlights, select travel mood, and rate this day.</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-400">Rating:</span>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setTempJournal({ ...tempJournal, rating: star })}
                            className={`text-base transition-colors ${
                              star <= tempJournal.rating ? 'text-amber-400' : 'text-slate-200'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Day Highlight</label>
                        <input
                          value={tempJournal.highlight}
                          onChange={e => setTempJournal({ ...tempJournal, highlight: e.target.value })}
                          placeholder="e.g. Watched the sunset from the beach..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-xs font-semibold focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mood Tracker</label>
                        <select
                          value={tempJournal.mood}
                          onChange={e => setTempJournal({ ...tempJournal, mood: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-205 rounded-xl text-xs font-semibold focus:outline-none"
                        >
                          {['🤩 Excited', '😊 Happy', '😴 Tired', '🧘 Relaxed', '🤩 Mindblown', '🌦 Moody'].map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Thoughts & Travel Memories</label>
                      <textarea
                        rows={5}
                        value={tempJournal.notes}
                        onChange={e => setTempJournal({ ...tempJournal, notes: e.target.value })}
                        placeholder="Write details about lodging, meals, what went well, or what to avoid next time..."
                        className="w-full p-4 bg-slate-50 border border-slate-205 rounded-2xl text-xs font-semibold focus:outline-none leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-xl text-xs font-bold hover:shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Day Journal Entry</span>
                    </button>
                  </form>
                )}

                {/* 5. TEAM TAB */}
                {activeTab === 'team' && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-6">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Collaborators</h3>
                      <p className="text-[10px] text-slate-400 font-medium">Invite travel companions to view or edit this itinerary in real-time.</p>
                    </div>

                    {/* Invite form */}
                    <form onSubmit={handleInvite} className="flex gap-2 max-w-md">
                      <input
                        type="email"
                        required
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        placeholder="companion@example.com"
                        className="flex-1 px-4 py-2.5 text-xs bg-slate-50 border border-slate-205 rounded-xl focus:outline-none font-semibold text-slate-900"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Invite
                      </button>
                    </form>

                    {/* Collaborator details list */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Workspace Members</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                              U
                            </div>
                            <div>
                              <p className="text-xs font-bold">You</p>
                              <p className="text-[9px] text-slate-400 font-semibold">Workspace Owner</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase text-blue-600 bg-blue-500/10 px-2.5 py-1 rounded">Owner</span>
                        </div>

                        {collaborators.map(col => (
                          <div
                            key={col.id}
                            className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-xs uppercase">
                                {col.email[0]}
                              </div>
                              <div>
                                <p className="text-xs font-bold truncate max-w-[150px]">{col.email}</p>
                                <p className="text-[9px] text-slate-400 font-semibold">{col.role}</p>
                              </div>
                            </div>
                            <span className="text-[9px] font-black uppercase text-violet-600 bg-violet-500/10 px-2.5 py-1 rounded">Editor</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add Activity Modal overlay */}
          {showAddActivityModal && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 border border-slate-200 shadow-2xl"
              >
                <div>
                  <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider">Add Custom Activity</h3>
                  <p className="text-[10px] text-slate-450 font-semibold">Schedule a custom stop, hotel lodging, cafe, or sightseeing tour.</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-450 uppercase tracking-widest">Activity Name</label>
                    <input
                      value={newActivity.name}
                      onChange={e => setNewActivity({ ...newActivity, name: e.target.value })}
                      placeholder="e.g. Visit Eiffel Tower, Lunch at Cafe..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-450 uppercase tracking-widest">Category</label>
                      <select
                        value={newActivity.type}
                        onChange={e => setNewActivity({ ...newActivity, type: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                      >
                        <option value="default">Sightseeing</option>
                        <option value="food">Restaurant / Food</option>
                        <option value="museum">Museum / Culture</option>
                        <option value="hotel">Hotel / Lodging</option>
                        <option value="coffee">Cafe / Coffee</option>
                        <option value="nature">Nature / Beach</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-450 uppercase tracking-widest">Start Time</label>
                      <input
                        value={newActivity.startTime}
                        onChange={e => setNewActivity({ ...newActivity, startTime: e.target.value })}
                        placeholder="e.g. 10:00 AM"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-455 uppercase tracking-widest">Cost ({trip?.currency || '₹'})</label>
                      <input
                        type="number"
                        value={newActivity.estimatedCost}
                        onChange={e => setNewActivity({ ...newActivity, estimatedCost: e.target.value })}
                        placeholder="e.g. 800"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-455 uppercase tracking-widest">Duration</label>
                      <input
                        value={newActivity.duration}
                        onChange={e => setNewActivity({ ...newActivity, duration: e.target.value })}
                        placeholder="e.g. 2 hours"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-455 uppercase tracking-widest">Location / Address</label>
                    <input
                      value={newActivity.location}
                      onChange={e => setNewActivity({ ...newActivity, location: e.target.value })}
                      placeholder="e.g. Champ de Mars, Paris"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-455 uppercase tracking-widest">Notes</label>
                    <textarea
                      rows={2}
                      value={newActivity.notes}
                      onChange={e => setNewActivity({ ...newActivity, notes: e.target.value })}
                      placeholder="Special instructions or tips..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-3">
                  <button
                    onClick={() => setShowAddActivityModal(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50:bg-slate-850 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddActivity}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Add Stop
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </main>

        {/* ── RIGHT PANEL: AI COPILOT ── */}
        <aside className="hidden lg:flex flex-col border-l border-slate-200 bg-white overflow-hidden shrink-0">
          {trip && <AiCopilotPanel trip={trip} destinations={destinations} totalSpent={totalSpent} totalBudget={totalBudget} />}
        </aside>

      </div>
    </div>
  );
}
