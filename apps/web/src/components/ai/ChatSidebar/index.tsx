'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

interface ChatSidebarProps {
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export function ChatSidebar({ activeId, onSelect, onNew }: ChatSidebarProps) {
  // In a real app we'd fetch the conversation list here via useQuery.
  // For Sprint 11A, we're building the foundation, so we'll mock the UI.
  const history = [
    { id: 'conv_1', title: 'Trip to Rome' },
    { id: 'conv_2', title: 'Tokyo Itinerary' },
  ];

  return (
    <div className="w-64 bg-card border-r border-white/10 flex flex-col h-full hidden md:flex">
      <div className="p-4">
        <button 
          onClick={onNew}
          className="w-full flex items-center gap-2 justify-center py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Icon name="Plus" size={18} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Recent</div>
        {history.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors truncate mb-1 ${activeId === chat.id ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
