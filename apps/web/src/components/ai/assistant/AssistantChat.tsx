'use client';

import React from 'react';
import type { AssistantMessage } from '@/lib/ai/assistant/types';

export function UserBubble({ message }: { message: AssistantMessage }) {
  return (
    <div className="flex w-full justify-end my-4">
      <div className="bg-blue-600 text-white p-4 rounded-2xl max-w-[80%] rounded-tr-sm shadow-md">
        <p className="text-sm font-medium">{message.content}</p>
        <span className="text-[10px] text-blue-200 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export function AssistantBubble({ message }: { message: AssistantMessage }) {
  return (
    <div className="flex w-full justify-start my-4">
      <div className="bg-zinc-800 text-zinc-100 p-4 rounded-2xl max-w-[80%] rounded-tl-sm shadow-md border border-zinc-700">
        <p className="text-sm font-medium whitespace-pre-wrap">{message.content}</p>
        {message.actions && message.actions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-700 flex flex-wrap gap-2">
            {message.actions.map(act => (
              <span key={act.id} className="text-xs px-2 py-1 bg-zinc-700 rounded-md">
                Action: {act.type}
              </span>
            ))}
          </div>
        )}
        {message.followUps && message.followUps.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {message.followUps.map((f, i) => (
              <button key={i} className="text-xs px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-full hover:bg-blue-600/40 transition">
                {f}
              </button>
            ))}
          </div>
        )}
        <span className="text-[10px] text-zinc-500 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start my-4">
      <div className="bg-zinc-800 p-4 rounded-2xl max-w-[80%] rounded-tl-sm shadow-md border border-zinc-700 flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
