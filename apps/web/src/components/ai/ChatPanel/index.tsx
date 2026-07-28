'use client';

import React, { useState, useEffect } from 'react';
import { aiRepository } from '@/lib/ai/repositories/AIRepository';
import { ChatWindow } from '../ChatWindow';
import { ChatSidebar } from '../ChatSidebar';
import { Icon } from '@/components/icons/Icon';

export function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Initialize a mock conversation for testing the foundation
  useEffect(() => {
    async function init() {
      const conv = await aiRepository.createConversation('Trip to Rome');
      setActiveConversationId(conv.id);
    }
    init();
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <Icon name="Sparkles" size={24} />
      </button>

      {/* Slide-over Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-card border-l border-white/10 shadow-2xl h-full flex overflow-hidden animate-in slide-in-from-right duration-300">
            <ChatSidebar 
              activeId={activeConversationId} 
              onSelect={setActiveConversationId} 
              onNew={() => setActiveConversationId(null)} 
            />
            
            <div className="flex-1 flex flex-col h-full bg-background relative">
              <ChatWindow 
                conversationId={activeConversationId} 
                onClose={() => setIsOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
