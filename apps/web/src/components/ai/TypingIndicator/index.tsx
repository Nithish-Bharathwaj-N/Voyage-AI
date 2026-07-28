'use client';

import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 p-4 w-fit bg-card rounded-2xl rounded-tl-sm border border-white/5">
      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}
