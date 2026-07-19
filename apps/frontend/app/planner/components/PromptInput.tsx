'use client';

import React from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  placeholder?: string;
}

/**
 * Reusable, premium text area prompt input box supporting enter-to-submit keys.
 */
export function PromptInput({ value, onChange, onSubmit, loading, placeholder = 'Ask AI to change, re-budget, or optimize...' }: PromptInputProps) {
  const [focused, setFocused] = React.useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !loading) {
        onSubmit(e as any);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative select-none text-left">
      <div
        className={`bg-slate-50/50 border ${
          focused ? 'border-indigo-500/30 ring-4 ring-indigo-500/10' : 'border-black/[0.06]'
        } rounded-[20px] overflow-hidden transition-all duration-300 p-2.5 flex items-start gap-3`}
      >
        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 text-indigo-600 ring-1 ring-indigo-500/20">
          <Sparkles className="w-4 h-4" />
        </div>

        <textarea
          id="planner-prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className="flex-1 bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none resize-none pt-1.5 leading-relaxed"
        />

        <Button
          type="submit"
          disabled={!value.trim() || loading}
          variant="primary"
          className="!p-2.5 rounded-2xl shrink-0 cursor-pointer self-end"
          icon={<Send className="w-4 h-4" />}
          aria-label="Send message"
        />
      </div>
    </form>
  );
}
