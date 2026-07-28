'use client';

import React, { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { useCopilotStore } from '../../stores/useCopilotStore';
import { StreamingMessage } from './StreamingMessage';
import { PlannerDiff } from './PlannerDiff';

export const CopilotPanel = () => {
  const { messages, addMessage, status, setPendingCommands } = useCopilotStore();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // ... inside handleSubmit
    const userMessage = input;
    addMessage({ role: 'user', content: userMessage });
    setInput('');
    
    // Create a loading message id to update later, or just let streaming handle it
    const msgId = Date.now().toString();
    
    apiClient.post('/ai/assistant/chat', { 
      sessionId: 't-1', // Fallback to placeholder if no real trip
      message: userMessage, 
      context: {} 
    })
    .then((res: any) => {
      // The backend returns { response: "..." }
      const text = res.response || "I couldn't process that request.";
      // addMessage directly adds to store, streaming visual effect is handled by StreamingMessage component
      addMessage({ role: 'assistant', content: text, isStreaming: true });
    })
    .catch((err) => {
      console.error('AI chat failed:', err);
      addMessage({ role: 'assistant', content: 'Sorry, I encountered an error connecting to the AI.' });
    });
  };

  return (
    <div className="w-full flex flex-col h-full relative">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/50 backdrop-blur-md">
        <h2 className="text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          VoyageAI Copilot
        </h2>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col relative">
        {messages.map((msg) => (
          <StreamingMessage key={msg.id} message={msg} />
        ))}
        {messages.length === 0 && (
          <div className="m-auto text-center opacity-50">
            <p className="text-sm text-muted-foreground">Ask me to modify your itinerary...</p>
          </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className="p-4 relative">
        <PlannerDiff />
        
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={status === 'AWAITING_APPROVAL'}
            placeholder="Type a command..."
            className="w-full bg-background border border-input rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 shadow-sm"
          />
        </form>
      </div>
    </div>
  );
}
