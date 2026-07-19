'use client';

import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onClick: (val: string) => void;
}

/**
 * Lists suggestions chips for quick replies in conversational panels.
 */
export function SuggestionChips({ suggestions, onClick }: SuggestionChipsProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap justify-start select-none">
      {(suggestions ?? []).map((sug) => (
        <button
          key={sug}
          type="button"
          onClick={() => onClick(sug)}
          className="px-3.5 py-1.5 bg-white hover:bg-slate-50:bg-slate-800/80 border border-slate-200/80 shadow-sm text-slate-600 hover:text-blue-600:text-blue-400 rounded-full text-[11px] font-semibold transition-all duration-200 cursor-pointer select-none flex items-center hover:-translate-y-0.5 hover:shadow-md"
        >
          {sug}
        </button>
      ))}
    </div>
  );
}
