'use client';

import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ChatMessage, ThinkingStep } from '@/app/planner/types/planner';
import { ChatBubble } from './ChatBubble';
import { ThinkingTimeline } from './ThinkingTimeline';
import { SuggestionCards } from './SuggestionCards';

interface ChatWindowProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  isThinking: boolean;
  thinkingStep: number;
  thinkingSteps: ThinkingStep[];
  showSuggestions: boolean;
  copilotChips?: string[];
  chatLoading?: boolean;
  onSuggestionSelect: (text: string) => void;
  onChipSelect?: (chip: string) => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Renders the scrollable conversation history, AI thinking timeline, copilot chips, and empty state suggestions.
 */
export function ChatWindow({
  messages,
  isGenerating,
  isThinking,
  thinkingStep,
  thinkingSteps,
  showSuggestions,
  copilotChips,
  chatLoading,
  onSuggestionSelect,
  onChipSelect,
  chatEndRef,
}: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {showSuggestions && <SuggestionCards onSelect={onSuggestionSelect} />}

      <AnimatePresence>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      {isThinking && isGenerating && (
        <ThinkingTimeline steps={thinkingSteps} currentStep={thinkingStep} />
      )}

      {chatLoading && (
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
          </div>
          <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-sm">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
            <span className="text-xs text-slate-500 font-medium">Copilot is updating…</span>
          </div>
        </div>
      )}

      {copilotChips && copilotChips.length > 0 && onChipSelect && (
        <div className="flex flex-wrap gap-2 pl-11">
          {copilotChips.map((chip) => (
            <button
              key={chip}
              onClick={() => onChipSelect(chip)}
              disabled={chatLoading}
              className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-100:bg-blue-950/50 transition-all cursor-pointer disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
