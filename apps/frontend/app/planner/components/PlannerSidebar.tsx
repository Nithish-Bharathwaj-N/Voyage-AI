'use client';

import React from 'react';
import { Sparkles, Calendar, Settings, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConversationPanel, ChatMessage } from './ConversationPanel';
import { PromptInput } from './PromptInput';
import { SuggestionChips } from './SuggestionChips';
import { ThinkingTimeline, ThinkingStep } from './ThinkingTimeline';

interface PlannerSidebarProps {
  messages: ChatMessage[];
  prompt: string;
  onPromptChange: (val: string) => void;
  onSubmitPrompt: (e: React.FormEvent) => void;
  loading: boolean;
  suggestions: string[];
  onSuggestionClick: (val: string) => void;
  thinkingSteps: ThinkingStep[];
  thinkingActiveIndex: number;
  showThinking: boolean;
  hasItinerary: boolean;
  onEditMessage?: (id: string, newText: string) => void;
  onRetryMessage?: (id: string) => void;
}

/**
 * AI Planner Sidebar Panel (Left Panel). Wraps conversation bubble lists, prompt inputs,
 * reply chips, and parameter context selectors (budget sliders, style selectors).
 */
export function PlannerSidebar({
  messages,
  prompt,
  onPromptChange,
  onSubmitPrompt,
  loading,
  suggestions,
  onSuggestionClick,
  thinkingSteps,
  thinkingActiveIndex,
  showThinking,
  hasItinerary,
  onEditMessage,
  onRetryMessage,
}: PlannerSidebarProps) {
  const stylesList = ['Adventure', 'Culture', 'Relaxing', 'Foodie', 'Luxury', 'Budget'];
  const companionList = ['Solo', 'Couple', 'Family', 'Friends'];

  console.log('[Stage 6] PlannerSidebar Rendering');
  console.log(' - messages.length:', messages.length);
  console.log(' - messages array:', messages);
  console.log(' - suggestions:', suggestions);

  return (
    <div className="w-[35%] min-w-[320px] max-w-[450px] border-r border-slate-100 bg-white/60 backdrop-blur-md flex flex-col h-full shrink-0 relative text-left shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
      {/* Message window */}
      <ConversationPanel messages={messages} onEdit={onEditMessage} onRetry={onRetryMessage}>
        {showThinking && (
          <ThinkingTimeline steps={thinkingSteps} activeStepIndex={thinkingActiveIndex} />
        )}
      </ConversationPanel>

      {/* Input controls footer */}
      <div className="p-4 border-t border-slate-100 space-y-3 shrink-0">
        {!showThinking && (hasItinerary || messages.length < 5) && (
          <SuggestionChips suggestions={suggestions} onClick={onSuggestionClick} />
        )}
        <PromptInput
          value={prompt}
          onChange={onPromptChange}
          onSubmit={onSubmitPrompt}
          loading={loading}
        />
      </div>
    </div>
  );
}
