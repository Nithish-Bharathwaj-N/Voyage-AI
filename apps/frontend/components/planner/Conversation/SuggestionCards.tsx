'use client';

import React from 'react';

const SUGGESTIONS = [
  '🗼 7 days in Paris, romantic trip',
  '🏖️ Bali on a budget, 10 days',
  '🎌 Tokyo adventure, first time, 5 days',
  '🏔️ Swiss Alps hiking, 6 days',
  '🌴 Thailand island hop, 2 weeks',
  '🏛️ Rome & Amalfi Coast, 8 days',
];

interface SuggestionCardsProps {
  onSelect: (text: string) => void;
}

/**
 * Renders empty-state quick-start suggestion chips.
 */
export function SuggestionCards({ onSelect }: SuggestionCardsProps) {
  return (
    <div className="py-8 space-y-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-black font-display text-slate-900">
          Where do you want to go?
        </h2>
        <p className="text-sm text-slate-500 font-medium max-w-md mx-auto">
          Just tell me in plain language. No forms, no dropdowns — just a conversation.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 max-w-lg mx-auto">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="px-3 py-2.5 text-left text-xs font-semibold bg-white border border-slate-200 rounded-xl hover:border-blue-300:border-blue-700 hover:bg-blue-50:bg-blue-950/30 transition-all text-slate-600 hover:text-blue-700:text-blue-300 cursor-pointer"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
