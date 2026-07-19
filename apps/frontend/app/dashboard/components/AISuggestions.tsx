'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface AISuggestionsProps {
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  'Continue planning Japan trip',
  'Optimize Paris itinerary for walking route',
  'Find boutique hotels under $150 in Rome',
  'Suggest local food spots near Kyoto station',
  'Re-budget yesterday\'s Bali plans',
];

/**
 * Perplexity-style prompt suggestion deck. Clicking a card navigates to the planner
 * with the pre-filled prompt in workspace state.
 */
export function AISuggestions({ suggestions = DEFAULT_SUGGESTIONS }: AISuggestionsProps) {
  const router = useRouter();

  const handleSuggestionClick = (prompt: string) => {
    // Navigate to planner with prompt query parameter
    router.push(`/planner?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
        <h3 className="text-xs font-black uppercase tracking-widest">AI Travel Agent</h3>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {suggestions.map((sug, idx) => (
          <Card
            key={idx}
            onClick={() => handleSuggestionClick(sug)}
            className="p-3.5 hover:border-slate-300:border-slate-700/80 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] hover:bg-slate-50/50:bg-slate-800/30 flex items-center justify-between"
          >
            <span className="text-xs font-extrabold text-slate-700 leading-tight">
              {sug}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-350 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>
    </div>
  );
}
