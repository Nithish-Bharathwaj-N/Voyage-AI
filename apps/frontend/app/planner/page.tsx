'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuth } from '@/components/providers/auth-provider';
import { aiService } from '@/services/ai.service';
import { usePlanner } from './hooks/usePlanner';
import { Itinerary } from '@/types/itinerary';

// UI components
import { PlannerHeader } from './components/PlannerHeader';
import { PlannerSidebar } from './components/PlannerSidebar';
import { PlannerWorkspace } from './components/PlannerWorkspace';
import { PlannerMap } from './components/PlannerMap';
import { PlannerToolbar } from './components/PlannerToolbar';
import { SaveTripDialog } from './components/SaveTripDialog';
import { GuestRestoreDialog } from './components/GuestRestoreDialog';
import { ActivityInspector, InspectedActivity } from '@/components/travel/ActivityInspector';

interface PlanContext {
  destination?: string;
  dates?: string;
  travelers?: string;
  budget?: string;
  style?: string;
}

const QUICK_SUGGESTIONS = [
  'Plan Japan in 7 days',
  'Backpack Europe',
  'Luxury Dubai',
  'Family Kerala',
  'Roadtrip Iceland',
  'Food Tour Italy'
];

const ITINERARY_SUGGESTIONS = [
  '✨ Save ₹2,300 (Switch to Metro)',
  '✨ Better sunset location (Avoid crowds)',
  '✨ Less walking (Optimize Day 2)',
  '✨ Better ramen nearby (Highly rated)',
  '✨ Avoid peak crowds (Reschedule to 8AM)',
  '✨ Move this to Day 2 (Better flow)',
];

function PlannerPageInternal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const planner = usePlanner();

  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [showGuestDialog, setShowGuestDialog] = React.useState(false);
  const [dynamicSuggestions, setDynamicSuggestions] = React.useState<string[]>([]);

  // Map-Timeline Sync State
  const [hoveredActivityId, setHoveredActivityId] = React.useState<string | null>(null);
  const [activeActivityId, setActiveActivityId] = React.useState<string | null>(null);

  // Initialize from persistence on mount
  React.useEffect(() => {
    // Check url search parameters initial values
    const query = searchParams?.get('prompt');
    const dest = searchParams?.get('destination');

    if (query) {
      planner.conversation.setInputText(query);
    } else if (dest) {
      planner.conversation.setInputText(`Plan a trip to ${dest}`);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenSaveDialog = React.useCallback(() => {
    if (!user) {
      setShowGuestDialog(true);
      return;
    }
    setShowSaveDialog(true);
  }, [user]);

  React.useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          if (planner.itinerary.canRedo) planner.itinerary.redo();
        } else {
          e.preventDefault();
          if (planner.itinerary.canUndo) planner.itinerary.undo();
        }
      }
    };

    // Custom events for Command Palette integration
    const handleCustomUndo = () => {
      if (planner.itinerary.canUndo) planner.itinerary.undo();
    };
    const handleCustomRedo = () => {
      if (planner.itinerary.canRedo) planner.itinerary.redo();
    };
    const handleCustomSave = () => {
      handleOpenSaveDialog();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('planner:undo', handleCustomUndo);
    window.addEventListener('planner:redo', handleCustomRedo);
    window.addEventListener('planner:save', handleCustomSave);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('planner:undo', handleCustomUndo);
      window.removeEventListener('planner:redo', handleCustomRedo);
      window.removeEventListener('planner:save', handleCustomSave);
    };
  }, [planner.itinerary, handleOpenSaveDialog]);

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    const txt = planner.conversation.inputText.trim();
    if (!txt) return;

    planner.conversation.addMessage('user', txt);
    planner.conversation.setInputText('');

    planner.thinking.startThinking([
      { icon: '🧠', text: 'Analyzing your request...' }
    ]);

    await submitToAi(txt);
  };

  const handleEditMessage = (id: string, newText: string) => {
    const idx = planner.conversation.messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      const sliced = planner.conversation.messages.slice(0, idx);
      planner.conversation.setMessages(sliced);
      planner.conversation.setInputText(newText);
      // Wait for state to update
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        planner.thinking.startThinking([{ icon: '🧠', text: 'Analyzing your request...' }]);
        submitToAi(newText);
      }, 50);
    }
  };

  const handleRetryMessage = (id: string) => {
    const idx = planner.conversation.messages.findIndex(m => m.id === id);
    if (idx !== -1) {
      const sliced = planner.conversation.messages.slice(0, idx);
      planner.conversation.setMessages(sliced);
      const textToRetry = planner.conversation.messages[idx].text;
      planner.conversation.setInputText(textToRetry);
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        planner.thinking.startThinking([{ icon: '🧠', text: 'Analyzing your request...' }]);
        submitToAi(textToRetry);
      }, 50);
    }
  };

  const submitToAi = async (newUserText?: string) => {
    try {
      // Map conversation messages to expected backend format (excluding 'thinking' roles)
      const messages = planner.conversation.messages
        .filter(m => m.role === 'user' || m.role === 'ai')
        .map(m => ({ role: m.role, content: m.text }));
      
      if (newUserText) {
        messages.push({ role: 'user', content: newUserText });
      }
        
      const token = typeof window !== 'undefined' ? localStorage.getItem('supabase.auth.token') : null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      headers['Authorization'] = `Bearer ${token || 'mock-session-jwt-token'}`;

      const res = await fetch('http://localhost:3001/api/v1/ai/chat/stream', {
        method: 'POST',
        headers,
        body: JSON.stringify({ messages, itinerary: planner.itinerary.plannerState || undefined }),
      });

      if (!res.ok || !res.body) throw new Error('Chat failed');

      planner.thinking.stopThinking();
      
      const aiMessageId = planner.conversation.addMessage('ai', ''); // Create empty message

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullJson = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep the incomplete line in buffer
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.substring(6).trim();
            if (!dataStr) continue;
            
            try {
              console.group("JSON PARSE");
              console.log("TYPE", typeof dataStr);
              console.log("INSTANCE", dataStr?.constructor?.name);
              console.log("VALUE", dataStr);
              console.groupEnd();

              if (typeof dataStr !== "string") continue;

              const parsedSse = JSON.parse(dataStr);
              let chunkStr = "";

              if (typeof parsedSse === "string") {
                chunkStr = parsedSse;
              } else if (typeof parsedSse === "object" && parsedSse !== null) {
                if (typeof parsedSse.data === "string") {
                  chunkStr = parsedSse.data;
                } else if (typeof parsedSse.data === "object" && parsedSse.data !== null) {
                  if (typeof parsedSse.data.data === "string") {
                    chunkStr = parsedSse.data.data;
                  }
                }
              }

              if (chunkStr) {
                fullJson += chunkStr;

                // Naive partial JSON extraction for the message field
                const msgMatch = fullJson.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)/);
                if (msgMatch) {
                   // Update the message live!
                   let partialText = msgMatch[1];
                   // Simple unescape for newlines and quotes
                   partialText = partialText.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                   
                   planner.conversation.setMessages(prev => prev.map(m => 
                     m.id === aiMessageId ? { ...m, text: partialText } : m
                   ));
                }
              }
            } catch (e) {
              console.error('Failed to parse SSE event', e, dataStr);
            }
          }
        }
      }

      // Stream complete, now parse full JSON
      let data;
      console.log('[Stage 2] Reconstructed JSON:', fullJson);
      try {
        console.group("JSON PARSE");
        console.log("TYPE", typeof fullJson);
        console.log("INSTANCE", fullJson?.constructor?.name);
        console.log("VALUE", fullJson);
        console.groupEnd();

        if (typeof fullJson === "string" && fullJson.length > 0 && fullJson.startsWith('{')) {
          data = JSON.parse(fullJson);
        } else {
          data = { intent: 'chat', message: fullJson };
        }
        console.log('[Stage 3] Parsed Object:', data);
      } catch (e) {
        console.error('Failed to parse full AI response JSON', e, fullJson);
        
        if (typeof fullJson === 'object' && fullJson !== null && (fullJson as any).message) {
          data = { intent: 'chat', message: (fullJson as any).message };
        } else {
          data = { intent: 'chat', message: typeof fullJson === 'string' ? fullJson : "I encountered an error formatting my response." };
        }
      }  console.log('[Stage 3] Fallback Parsed Object:', data);

      console.log('[Stage 4] React State BEFORE update:', planner.conversation.messages);

      if (data.intent === 'chat') {
        if (data.suggestedReplies && Array.isArray(data.suggestedReplies)) {
          setDynamicSuggestions(data.suggestedReplies);
        }
        
        if (data.parameters) {
          const p = data.parameters;
          const clean = (val: any) => (val && val !== '<known or null>' && val !== 'null') ? val : undefined;
          
          planner.itinerary.setLiveParameters((prev) => ({
            ...prev,
            destination: clean(p.destination) || prev.destination,
            budget: clean(p.budget) || prev.budget,
            duration: clean(p.duration) || prev.duration,
            companions: clean(p.companions) || prev.companions,
            style: clean(p.style) || prev.style,
            accommodation: clean(p.accommodation) || prev.accommodation,
            food: clean(p.food) || prev.food,
            transport: clean(p.transport) || prev.transport,
            specialRequests: clean(p.specialRequests) || prev.specialRequests,
          }));
        }
      } else if (data.intent === 'plan') {
        planner.conversation.setMessages(prev => {
          const next = prev.map(m => 
            m.id === aiMessageId ? { ...m, text: 'Perfect! I have all the details. Generating your custom itinerary now... ✨' } : m
          );
          console.log('[Stage 5] React State AFTER update:', next);
          return next;
        });
        
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const defaultEnd = new Date(tomorrow);
        defaultEnd.setDate(tomorrow.getDate() + 4); 

        const toISODate = (d: Date) => d.toISOString().split('T')[0];
        
        const planParams = {
          destination: data.parameters.destination,
          budget: data.parameters.budget === 'Moderate' ? 1000 : 2000,
          travelerCount: 2,
          travelStyle: data.parameters.style || 'Cultural',
          startDate: toISODate(tomorrow),
          endDate: toISODate(defaultEnd),
        };

        // Stream the plan to get live progress events
        const planRes = await fetch('http://localhost:3001/api/v1/ai/plan/stream', {
          method: 'POST',
          headers,
          body: JSON.stringify(planParams),
        });

        if (planRes.ok && planRes.body) {
          const planReader = planRes.body.getReader();
          const planDecoder = new TextDecoder('utf-8');
          
          while (true) {
            const { done, value } = await planReader.read();
            if (done) break;

            const chunk = planDecoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const rawEvent = JSON.parse(line.substring(6));
                  // NestJS sometimes wraps the chunk in a data object
                  const event = typeof rawEvent.data === 'string' ? JSON.parse(rawEvent.data) : rawEvent;

                  if (event.type === 'progress') {
                    planner.thinking.setThinkingProgress(event.step, event.text);
                  } else if (event.type === 'result') {
                    // Itinerary is fully generated!
                    const normalized = (await import('@/services/itinerary.service')).itineraryService.validatePlannerResponse(event.itinerary);
                    planner.itinerary.setPlannerState(normalized);
                  }
                } catch (e) {}
              }
            }
          }
        }
        
        planner.thinking.stopThinking();
        planner.conversation.addMessage('ai', `Here is your fully planned trip to ${data.parameters.destination}! Let me know if you want to change anything.`);
      } else if (data.intent === 'edit') {
        planner.conversation.addMessage('ai', `I'm modifying your itinerary to: ${data.prompt}... ✨`);
        planner.thinking.startThinking([
          { icon: '🧠', text: 'Understanding request...' },
          { icon: '✨', text: 'Applying smart edits...' }
        ]);
        await planner.itinerary.editItineraryPlan(planner.itinerary.plannerState!, data.prompt);
        planner.thinking.stopThinking();
        planner.conversation.addMessage('ai', 'I have updated your itinerary! ✨');
      }

    } catch (e) {
      planner.thinking.stopThinking();
      planner.conversation.addMessage('ai', 'Something went wrong when connecting to the AI. Let\'s try again.');
    }
  };

  const handleSaveTripConfirm = async (title: string) => {
    setShowSaveDialog(false);
    if (!planner.itinerary.plannerState) return;

    if (!user) {
      planner.persistence.saveTempItinerary(planner.itinerary.plannerState as any);
      setShowGuestDialog(true);
      return;
    }

    planner.state.setSaving(true);
    try {
      const activePlan = { ...planner.itinerary.plannerState, title };
      const saved = await planner.itinerary.saveTripToWorkspace(activePlan);
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      toast.success('Itinerary saved!');
      router.push(`/trips/${saved.id}`);
    } catch (e) {
      toast.error('Failed to save itinerary.');
    } finally {
      planner.state.setSaving(false);
    }
  };

  const formattedMessages = React.useMemo(() => {
    return planner.conversation.messages.map((m) => ({
      id: m.id,
      role: m.role as 'user' | 'ai' | 'thinking',
      text: m.text,
      timestamp: m.timestamp,
    }));
  }, [planner.conversation.messages]);



  const activeActivity = React.useMemo<InspectedActivity | null>(() => {
    if (!activeActivityId || !planner.itinerary.plannerState) return null;
    for (const day of planner.itinerary.plannerState.timeline) {
      const act = day.activities.find((a) => a.id === activeActivityId);
      if (act) {
        return {
          ...act,
          title: act.activity,
          cost: act.estimatedCost,
          dayNumber: day.day
        } as unknown as InspectedActivity;
      }
    }
    return null;
  }, [activeActivityId, planner.itinerary.plannerState]);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col font-sans text-slate-800">
      <PlannerHeader
        title={planner.itinerary.plannerState?.trip.destination ? `Trip to ${planner.itinerary.plannerState.trip.destination}` : 'New AI Travel Plan'}
        saving={planner.state.saving}
        onSave={handleOpenSaveDialog}
        onReset={planner.handleReset}
        hasItinerary={!!planner.itinerary.plannerState}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <PlannerSidebar
          messages={formattedMessages}
          prompt={planner.conversation.inputText}
          onPromptChange={planner.conversation.setInputText}
          onSubmitPrompt={handleSendPrompt}
          loading={planner.thinking.isThinking}
          suggestions={planner.itinerary.plannerState ? ITINERARY_SUGGESTIONS : (dynamicSuggestions.length > 0 ? dynamicSuggestions : QUICK_SUGGESTIONS)}
          onSuggestionClick={(sug) => planner.conversation.setInputText(sug)}
          hasItinerary={!!planner.itinerary.plannerState}
          thinkingSteps={planner.thinking.thinkingSteps.map((s, sIdx) => ({
            label: s.text,
            status: sIdx < planner.thinking.thinkingStep ? 'done' : sIdx === planner.thinking.thinkingStep ? 'active' : 'pending',
          }))}
          thinkingActiveIndex={planner.thinking.thinkingStep}
          showThinking={planner.thinking.isThinking}
          onEditMessage={handleEditMessage}
          onRetryMessage={handleRetryMessage}
        />

        {/* Center Workspace Panel */}
        <PlannerWorkspace
          plannerState={planner.itinerary.plannerState}
          loading={planner.conversation.chatLoading}
          activeDayIndex={planner.state.selectedDay}
          onActiveDayChange={(idx) => planner.state.setSelectedDay(idx)}
          hoveredActivityId={hoveredActivityId}
          onHoverActivity={setHoveredActivityId}
          onActiveActivity={setActiveActivityId}
          onMoveActivity={planner.itinerary.moveActivity}
          liveParameters={planner.itinerary.liveParameters}
          onSelectParameter={(key, val) => {
            planner.itinerary.setLiveParameters(prev => ({ ...prev, [key]: val }));
          }}
          onGenerateItinerary={() => {
            const p = planner.itinerary.liveParameters;
            const prompt = `Plan a ${p.duration || 'few days'} trip to ${p.destination || 'a nice place'} for ${p.travelers || 'me'}. Budget: ${p.budget || 'Moderate'}. Style: ${p.style || 'Balanced'}.`;
            planner.conversation.setInputText(prompt);
            setTimeout(() => {
              planner.thinking.startThinking([{ icon: '🧠', text: 'Analyzing your request...' }]);
              submitToAi(prompt);
            }, 50);
          }}
        />

        {/* Right Map Canvas Panel */}
        {planner.itinerary.plannerState && (
          <PlannerMap
            plannerState={planner.itinerary.plannerState}
            activeDayIndex={planner.state.selectedDay}
            hoveredActivityId={hoveredActivityId}
            activeActivityId={activeActivityId}
            onHoverActivity={setHoveredActivityId}
          />
        )}
      </div>

      <PlannerToolbar saving={planner.state.saving} />

      <ActivityInspector 
        activity={activeActivity} 
        onClose={() => setActiveActivityId(null)} 
      />

      <SaveTripDialog
        open={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        onConfirm={handleSaveTripConfirm}
        defaultTitle={planner.itinerary.plannerState?.trip?.destination ? `Cherry Blossoms in ${planner.itinerary.plannerState.trip.destination}` : 'My Voyage Plan'}
        loading={planner.state.saving}
      />

      <GuestRestoreDialog
        open={showGuestDialog}
        onClose={() => setShowGuestDialog(false)}
      />
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div>Loading Planner Workspace...</div>}>
      <PlannerPageInternal />
    </Suspense>
  );
}
