'use client';

import React from 'react';
import { Send } from 'lucide-react';

interface PromptInputProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (text: string) => void;
  onSubmit: () => void;
}

/**
 * Renders the chat input text box and send button. Pure presentational — no side effects.
 */
export function PromptInput({ value, placeholder, disabled, onChange, onSubmit }: PromptInputProps) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="p-4 border-t border-slate-200 bg-white/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <input
            type="text"
            value={value}
            placeholder={placeholder ?? 'Ask me anything about your trip…'}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 outline-none disabled:opacity-50"
            autoFocus
          />
        </div>

        <button
          onClick={onSubmit}
          disabled={!value.trim() || disabled}
          className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
        Press Enter to send · VoyageAI uses real destination data
      </p>
    </div>
  );
}
