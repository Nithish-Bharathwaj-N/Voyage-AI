import * as React from 'react';
import { ChatMessage, PlanContext, ConversationStep } from '../types/planner';
import { conversationService } from '@/services/conversation.service';

export interface UseConversationResult {
  messages: ChatMessage[];
  step: ConversationStep;
  inputText: string;
  chatLoading: boolean;
  setInputText: (text: string) => void;
  setStep: (step: ConversationStep) => void;
  addMessage: (role: 'user' | 'ai' | 'thinking', text: string, id?: string) => string;
  handleSend: (context: PlanContext, onComplete: (ctx: PlanContext) => void) => Promise<void>;
  simulateAiResponse: (text: string) => Promise<void>;
  resetConversation: () => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

/**
 * Hook managing chat conversation flow, delegating prompts and stream updates to ConversationService.
 */
export function useConversation(): UseConversationResult {
  const [messages, setMessages] = React.useState<ChatMessage[]>(() => [
    {
      id: `ai_init_${Date.now()}`,
      role: 'ai',
      text: "👋 Welcome back! I'm VoyageAI.\n\nI'm here to help you build the perfect trip. Where would you like to travel?",
      timestamp: new Date()
    }
  ]);
  const [step, setStep] = React.useState<ConversationStep>('destination');
  const [inputText, setInputText] = React.useState('');
  const [chatLoading, setChatLoading] = React.useState(false);

  const addMessage = React.useCallback((role: 'user' | 'ai' | 'thinking', text: string, id?: string) => {
    const newId = id || `${role}_${Date.now()}`;
    setMessages(prev => [...prev, {
      id: newId,
      role,
      text,
      timestamp: new Date()
    }]);
    return newId;
  }, []);

  const handleSend = React.useCallback(async (context: PlanContext, onComplete: (ctx: PlanContext) => void) => {
    // TODO: Coordinate input parameters through conversationService
    onComplete(context);
  }, []);

  const simulateAiResponse = React.useCallback(async (text: string) => {
    setChatLoading(true);
    // Delegate chunk-typing streams sequence to ConversationService
    await conversationService.streamResponse(text, (chunk) => {
      // TODO: Append chunktxt to messages lists
    });
    setChatLoading(false);
  }, []);

  const resetConversation = React.useCallback(() => {
    setMessages([
      {
        id: `ai_init_${Date.now()}`,
        role: 'ai',
        text: "👋 Welcome back! I'm VoyageAI.\n\nI'm here to help you build the perfect trip. Where would you like to travel?",
        timestamp: new Date()
      }
    ]);
    setStep('destination');
    setInputText('');
    setChatLoading(false);
  }, []);

  return {
    messages,
    step,
    inputText,
    chatLoading,
    setInputText,
    setStep,
    addMessage,
    handleSend,
    simulateAiResponse,
    resetConversation,
    setMessages
  };
}
