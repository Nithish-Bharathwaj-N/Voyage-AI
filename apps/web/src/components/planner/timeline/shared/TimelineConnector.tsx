import React from 'react';

interface TimelineConnectorProps {
  color?: string;
  isDashed?: boolean;
}

export function TimelineConnector({ color = 'bg-border/50', isDashed = false }: TimelineConnectorProps) {
  return (
    <div className="hidden sm:flex w-10 pt-3 flex-col items-center shrink-0">
      <div className={`h-2 w-2 rounded-full ${color} ${isDashed ? 'border-dashed border border-primary' : 'ring-4 ring-background'} z-10 transition-colors`} />
    </div>
  );
}
