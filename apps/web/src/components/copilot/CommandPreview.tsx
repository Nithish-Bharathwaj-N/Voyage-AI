'use client';

import React from 'react';

interface CommandPayload {
  dayIndex?: number;
  startTime?: string;
  newBudgetMax?: number;
  currency?: string;
}

interface CommandObject {
  type: string;
  payload?: CommandPayload;
}

export const CommandPreview = ({ command }: { command: CommandObject }) => {
  // Renders a human-readable interpretation of the raw JSON command
  
  const getActionColor = (type: string) => {
    switch (type) {
      case 'AddActivity': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'RemoveActivity': return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'UpdateBudget': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  const getActionText = (cmd: CommandObject) => {
    if (cmd.type === 'AddActivity' && cmd.payload) {
      const dayIdx = cmd.payload.dayIndex !== undefined ? cmd.payload.dayIndex + 1 : 1;
      return `Add place to Day ${dayIdx} at ${cmd.payload.startTime || ''}`;
    }
    if (cmd.type === 'UpdateBudget' && cmd.payload) {
      return `Update budget to ${cmd.payload.newBudgetMax || 0} ${cmd.payload.currency || ''}`;
    }
    return `Execute ${cmd.type}`;
  };

  return (
    <div className={`p-3 rounded-md border ${getActionColor(command.type)} mb-2`}>
      <h4 className="text-sm font-semibold">{command.type}</h4>
      <p className="text-xs mt-1 opacity-80">{getActionText(command)}</p>
    </div>
  );
};
