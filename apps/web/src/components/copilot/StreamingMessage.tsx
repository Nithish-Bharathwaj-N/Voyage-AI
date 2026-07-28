'use client';

import React from 'react';
import { ChatMessage } from '../../stores/useCopilotStore';

export const StreamingMessage = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[85%] rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-bl-none'
        }`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};
