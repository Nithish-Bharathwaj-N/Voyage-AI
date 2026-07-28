'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { useAI } from '@/lib/ai/hooks/useAI';

interface ChatInputProps {
  conversationId: string | null;
}

export function ChatInput({ conversationId }: ChatInputProps) {
  const [query, setQuery] = useState('');
  const { send, isSending } = useAI(conversationId ?? 'new_session');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSending) return;
    
    const text = query;
    setQuery('');
    
    await send({ query: text, domain: 'general' });
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask anything..."
        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
        disabled={isSending}
      />
      <button 
        type="submit"
        disabled={!query.trim() || isSending}
        className="absolute right-2 top-2 p-1.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:bg-white/10 disabled:text-muted-foreground transition-all"
      >
        <Icon name="Send" size={18} />
      </button>
    </form>
  );
}
