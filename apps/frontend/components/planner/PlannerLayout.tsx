'use client';

import React from 'react';
import { Itinerary } from '@/types/itinerary';
import { ChatMessage, ThinkingStep, StopCoordinate } from '@/app/planner/types/planner';
import { PlannerHeader } from './PlannerHeader';
import { PlannerSidebar } from './PlannerSidebar';
import { PlannerWorkspace } from './PlannerWorkspace';
import { LoginRequiredDialog } from './Dialogs/LoginRequiredDialog';

interface PlannerLayoutProps {
  // Conversation
  messages: ChatMessage[];
  inputText: string;
  inputPlaceholder?: string;
  isGenerating: boolean;
  isThinking: boolean;
  thinkingStep: number;
  thinkingSteps: ThinkingStep[];
  chatLoading: boolean;
  copilotChips?: string[];
  // Itinerary
  itinerary: Itinerary | null;
  mapCoords: StopCoordinate[];
  mapCenter: { latitude: number; longitude: number };
  budgetTotal: number;
  budgetLimit: number;
  // UI state
  saving: boolean;
  selectedActivityId?: string | null;
  showLoginDialog: boolean;
  // Callbacks
  onInputChange: (text: string) => void;
  onSubmit: () => void;
  onSuggestionSelect: (text: string) => void;
  onChipSelect?: (chip: string) => void;
  onSave: () => void;
  onReset: () => void;
  onActivityClick?: (id: string) => void;
  onLoginRedirect: () => void;
  onRegisterRedirect: () => void;
  onDismissLoginDialog: () => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
}

const COPILOT_CHIPS = [
  'Make it cheaper',
  'Add a beach day',
  'Upgrade to luxury',
  'More food options',
  'Shorten to 3 days',
];

/**
 * Root layout component composing the full planner canvas — header, sidebar, workspace, and dialogs.
 */
export function PlannerLayout({
  messages,
  inputText,
  inputPlaceholder,
  isGenerating,
  isThinking,
  thinkingStep,
  thinkingSteps,
  chatLoading,
  copilotChips = COPILOT_CHIPS,
  itinerary,
  mapCoords,
  mapCenter,
  budgetTotal,
  budgetLimit,
  saving,
  selectedActivityId,
  showLoginDialog,
  onInputChange,
  onSubmit,
  onSuggestionSelect,
  onChipSelect,
  onSave,
  onReset,
  onActivityClick,
  onLoginRedirect,
  onRegisterRedirect,
  onDismissLoginDialog,
  chatEndRef,
}: PlannerLayoutProps) {
  const hasItinerary = itinerary !== null;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <PlannerHeader
        hasItinerary={hasItinerary}
        saving={saving}
        onSave={onSave}
        onReset={onReset}
      />

      <div className="flex-1 flex overflow-hidden">
        <PlannerSidebar
          messages={messages}
          inputText={inputText}
          inputPlaceholder={inputPlaceholder}
          isGenerating={isGenerating}
          isThinking={isThinking}
          thinkingStep={thinkingStep}
          thinkingSteps={thinkingSteps}
          showSuggestions={messages.length === 0}
          chatLoading={chatLoading}
          copilotChips={hasItinerary && !isGenerating ? copilotChips : undefined}
          hasItinerary={hasItinerary}
          chatEndRef={chatEndRef}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onSuggestionSelect={onSuggestionSelect}
          onChipSelect={onChipSelect}
        />

        {hasItinerary && itinerary && (
          <PlannerWorkspace
            itinerary={itinerary}
            mapCoords={mapCoords}
            mapCenter={mapCenter}
            budgetTotal={budgetTotal}
            budgetLimit={budgetLimit}
            saving={saving}
            selectedActivityId={selectedActivityId}
            onSave={onSave}
            onReset={onReset}
            onActivityClick={onActivityClick}
          />
        )}
      </div>

      <LoginRequiredDialog
        open={showLoginDialog}
        onLogin={onLoginRedirect}
        onRegister={onRegisterRedirect}
        onDismiss={onDismissLoginDialog}
      />
    </div>
  );
}
