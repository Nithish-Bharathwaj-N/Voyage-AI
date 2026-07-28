'use client';

import React from 'react';
// In a real application we would use react-markdown here
// For Sprint 11A mock, we'll just render it as raw text with whitespace preserved.

export function StreamingText({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
      {content}
      <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />
    </div>
  );
}
