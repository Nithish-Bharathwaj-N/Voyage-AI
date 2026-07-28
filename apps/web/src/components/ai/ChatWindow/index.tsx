'use client';

import React from 'react';
import { ChatHeader } from '../ChatHeader';
import { ChatInput } from '../ChatInput';
import { Messages } from '../Messages';
import { Suggestions } from '../Suggestions';
import { useConversation } from '@/lib/ai/hooks/useConversation';

interface ChatWindowProps {
  conversationId: string | null;
  onClose: () => void;
}

export function ChatWindow({ conversationId, onClose }: ChatWindowProps) {
  const { data: conversation } = useConversation(conversationId);

  return (
    <>
      <ChatHeader title={conversation?.title || 'New Chat'} onClose={onClose} />
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {conversation?.messages.length === 0 || !conversationId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
            <h3 className="text-xl font-bold mb-2">How can I help you travel?</h3>
            <p className="text-sm">Ask me to plan an itinerary, find flights, or suggest restaurants.</p>
          </div>
        ) : (
          <Messages messages={conversation?.messages ?? []} />
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-background">
        <Suggestions />
        <ChatInput conversationId={conversationId} />
      </div>
    </>
  );
}
