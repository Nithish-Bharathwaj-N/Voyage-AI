'use client';

import React from 'react';
import { ChatMessage, ThinkingStep } from '@/app/planner/types/planner';
import { ChatWindow } from './Conversation/ChatWindow';
import { PromptInput } from './Conversation/PromptInput';

interface PlannerSidebarProps {
  messages: ChatMessage[];
  inputText: string;
  inputPlaceholder?: string;
  isGenerating: boolean;
  isThinking: boolean;
  thinkingStep: number;
  thinkingSteps: ThinkingStep[];
  showSuggestions: boolean;
  chatLoading: boolean;
  copilotChips?: string[];
  hasItinerary: boolean;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (text: string) => void;
  onSubmit: () => void;
  onSuggestionSelect: (text: string) => void;
  onChipSelect?: (chip: string) => void;
}

/**
 * Renders the full left conversation panel — chat history, thinking timeline, input bar.
 */
export function PlannerSidebar({
  messages,
  inputText,
  inputPlaceholder,
  isGenerating,
  isThinking,
  thinkingStep,
  thinkingSteps,
  showSuggestions,
  chatLoading,
  copilotChips,
  hasItinerary,
  chatEndRef,
  onInputChange,
  onSubmit,
  onSuggestionSelect,
  onChipSelect,
}: PlannerSidebarProps) {
  return (
    <div
      className={`flex flex-col h-full bg-slate-50 transition-all duration-300 ${
        hasItinerary
          ? 'w-[380px] border-r border-slate-200'
          : 'flex-1 max-w-3xl mx-auto w-full'
      }`}
    >
      <ChatWindow
        messages={messages}
        isGenerating={isGenerating}
        isThinking={isThinking}
        thinkingStep={thinkingStep}
        thinkingSteps={thinkingSteps}
        showSuggestions={showSuggestions}
        copilotChips={copilotChips}
        chatLoading={chatLoading}
        onSuggestionSelect={onSuggestionSelect}
        onChipSelect={onChipSelect}
        chatEndRef={chatEndRef}
      />
      <PromptInput
        value={inputText}
        placeholder={inputPlaceholder}
        disabled={isGenerating}
        onChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
