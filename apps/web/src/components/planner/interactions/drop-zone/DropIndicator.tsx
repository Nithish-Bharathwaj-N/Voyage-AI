import React from 'react';

export function DropIndicator() {
  return (
    <div className="h-0.5 w-full bg-primary/50 rounded-full relative my-1">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border-2 border-primary bg-background" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border-2 border-primary bg-background" />
    </div>
  );
}
