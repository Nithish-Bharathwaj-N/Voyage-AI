'use client';

import React from 'react';
import type { AIMessage } from '@/lib/ai/types/conversation.types';
import { StreamingText } from '../StreamingText';
import { TypingIndicator } from '../TypingIndicator';
import { Icon } from '@/components/icons/Icon';

export function Messages({ messages }: { messages: AIMessage[] }) {
  return (
    <div className="flex flex-col gap-6 pb-2">
      {messages.map((message) => {
        const isUser = message.role === 'user';
        
        return (
          <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-foreground'}`}>
                <Icon name={isUser ? 'User' : 'Sparkles'} size={14} />
              </div>

              {/* Message Bubble */}
              {message.status === 'thinking' ? (
                <TypingIndicator />
              ) : (
                <div 
                  className={`p-4 rounded-2xl text-sm ${
                    isUser 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-card border border-white/5 text-foreground rounded-tl-sm'
                  }`}
                >
                  {message.status === 'streaming' ? (
                    <StreamingText content={message.content} />
                  ) : (
                    <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">
                      {message.content}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        );
      })}
    </div>
  );
}
