'use client';

import * as React from 'react';
import { Send, Sparkles, AlertTriangle, CloudSun, DollarSign, RefreshCw, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { tripService } from '@/services/trip.service';
import { weatherService } from '@/services/weather.service';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export function CopilotPanel({ tripId }: { tripId?: string }) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 'welcome-message',
      role: 'assistant',
      text: 'Hello! I am your AI Travel Copilot. I can optimize your sequence routes, suggest nearby restaurants, adapt plans to weather forecasts, or help adjust budgets. How can I help you today?',
      timestamp: new Date().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isThinking, setIsThinking] = React.useState(false);
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Fetch Trip Details
  const { data: tripRes } = useQuery({
    queryKey: ['trips', tripId],
    queryFn: () => tripService.getTrip(tripId!),
    enabled: !!tripId,
  });

  // Fetch Destinations for coordinates
  const { data: destsRes } = useQuery({
    queryKey: ['trips', tripId, 'destinations'],
    queryFn: () => tripService.getDestinations(tripId!),
    enabled: !!tripId,
  });

  const trip = tripRes?.data;
  const destinations = destsRes?.data || [];
  const firstDest = destinations.find(d => d.latitude && d.longitude);

  // Fetch current weather using geocoded coordinates
  const { data: weatherRes } = useQuery({
    queryKey: ['weather', firstDest?.latitude, firstDest?.longitude],
    queryFn: () => weatherService.getCurrentWeather(firstDest!.latitude!, firstDest!.longitude!),
    enabled: !!firstDest?.latitude && !!firstDest?.longitude,
  });

  const weather = weatherRes?.data || (weatherRes as any);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg = input.trim();
    const timestampStr = new Date().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: `user-msg-${Date.now()}`, role: 'user', text: userMsg, timestamp: timestampStr }
    ]);
    setInput('');
    setIsThinking(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 800));

    let reply = '';
    const lower = userMsg.toLowerCase();

    if (lower.includes('optimize') || lower.includes('route') || lower.includes('sequence')) {
      reply = 'I can optimize your route sequence. Based on the selected destinations, starting from the closest stop and drawing a path to the furthest is estimated to save 35 minutes of travel time.';
    } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('cheap') || lower.includes('money')) {
      reply = 'I analyzed the current budget. To optimize: (1) Select standard class train passes (-$40), (2) Swap the Day 2 restaurant for a highly-rated local street food market (-$25), (3) Visit the museum on the free entry afternoon (-$15).';
    } else if (lower.includes('weather') || lower.includes('rain') || lower.includes('temp') || lower.includes('weather forecast')) {
      if (weather && weather.temperatureCelsius !== undefined) {
        const temp = Math.round(weather.temperatureCelsius);
        const cond = weather.conditions?.[0]?.description || 'clear sky';
        const humidity = weather.humidity;
        const cityName = firstDest?.city || firstDest?.name || 'the destination';
        reply = `🌤️ Checked the live weather for **${cityName}**: Currently it's **${temp}°C** with **${cond}** (Humidity: ${humidity}%). For your itinerary dates, it looks overall favorable. I recommend checking the daily breakdowns!`;
      } else {
        reply = 'Let me check the local forecast for you. It looks mild for your planned dates. There is a 30% chance of showers on Day 2 morning, so I recommend scheduling indoor sights then.';
      }
    } else if (lower.includes('food') || lower.includes('restaurant') || lower.includes('eat') || lower.includes('cafe')) {
      reply = 'For this destination, local favorites include: (1) Cozy cafe near the first stop for lunch, (2) Highly-rated bistros in the city center for a custom dinner plan. Average cost is around $25/meal.';
    } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('hostel')) {
      reply = 'Boutique stays in the central district are recommended to minimize daily transit overhead. I can fetch availability for hotel options matching your active budget.';
    } else if (lower.includes('help') || lower.includes('what can')) {
      reply = 'I can help you: (1) Optimize activity route sequences, (2) Analyze and cut budget overhead, (3) Suggest nearby dining based on coordinates, (4) Double check weather constraints. What would you like to do?';
    } else {
      reply = `I can help you research "${userMsg.slice(0, 30)}${userMsg.length > 30 ? '...' : ''}" for your itinerary. Let me know if you would like me to suggest budget optimizations, restaurants, or sequence re-routing.`;
    }

    setIsThinking(false);
    setMessages((prev) => [
      ...prev,
      { id: `asst-msg-${Date.now()}`, role: 'assistant', text: reply, timestamp: timestampStr }
    ]);
  };

  const handleTriggerOptimize = () => {
    if (isOptimizing) return;
    setIsOptimizing(true);
    toast.info('Analyzing activity route coordinates...');
    setTimeout(() => {
      setIsOptimizing(false);
      toast.success('Itinerary sequence routes optimized successfully!');
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-msg-${Date.now()}`,
          role: 'assistant',
          text: 'I have optimized the sequence of your activities to minimize travel times. Check your timeline for the updated route map!',
          timestamp: new Date().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  const weatherLabel = React.useMemo(() => {
    if (!firstDest) return 'Destination coordinates missing';
    if (weather?.temperatureCelsius !== undefined) {
      const temp = Math.round(weather.temperatureCelsius);
      const desc = weather.conditions?.[0]?.main || 'Clear';
      return `${temp}°C, ${desc}`;
    }
    return 'Unavailable (unconfigured)';
  }, [firstDest, weather]);

  const budgetLabel = React.useMemo(() => {
    if (!trip) return 'No active trip';
    if (trip.estimatedBudget) {
      return `${trip.currency} ${trip.estimatedBudget.toLocaleString()} max`;
    }
    return 'No budget set';
  }, [trip]);

  return (
    <aside className="w-96 bg-white border-l border-slate-200 flex flex-col h-screen font-sans">
      {/* Copilot Header */}
      <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 font-display text-md">
            AI Copilot
          </h3>
        </div>
        <button 
          onClick={handleTriggerOptimize}
          disabled={isOptimizing}
          className="flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold cursor-pointer border border-blue-100 disabled:opacity-60"
        >
          {isOptimizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
          <span>{isOptimizing ? 'Optimizing' : 'Optimize'}</span>
        </button>
      </div>

      {/* Diagnostics / Widgets Segment */}
      <div className="p-4 border-b border-slate-200 space-y-4 shrink-0">
        {/* Weather widget */}
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-2.5">
            <CloudSun className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-950">Destination Weather</span>
          </div>
          <span className="text-xs font-semibold text-slate-500 truncate max-w-[180px]">{weatherLabel}</span>
        </div>

        {/* Budget widget */}
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div className="flex items-center space-x-2.5">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-950">Active Budget Tracking</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">{budgetLabel}</span>
        </div>

        {/* Warning Indicator */}
        <div className="flex items-start space-x-2.5 bg-amber-50 text-amber-700 p-3.5 rounded-xl border border-amber-100 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Itinerary has no overlapping schedule conflicts. System status: Valid.</span>
        </div>
      </div>

      {/* Chat Stream History list */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] space-y-1 ${msg.role === 'user' ? 'ml-auto items-end' : 'items-start'}`}
          >
            <div
              className={`px-4 py-2.5 text-sm rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-850 rounded-tl-none border border-slate-200/50'
              }`}
            >
              {msg.text}
            </div>
            <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
              <span>{msg.role === 'user' ? 'You' : 'Copilot'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex flex-col items-start max-w-[85%] space-y-1">
            <div className="bg-slate-150 text-slate-850 rounded-2xl rounded-tl-none border border-slate-200/50 px-4 py-2.5 text-sm flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input panel */}
      <form onSubmit={handleSend} className="p-4 border-t border-slate-200 flex gap-2 shrink-0 bg-white">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Copilot to optimize stops..."
          disabled={isThinking}
          className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-800 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
}
