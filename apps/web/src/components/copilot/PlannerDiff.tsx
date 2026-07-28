'use client';

import React from 'react';
import { useCopilotStore } from '../../stores/useCopilotStore';
import { CommandPreview } from './CommandPreview';

export const PlannerDiff = () => {
  const { pendingCommands, clearPending, status } = useCopilotStore();

  if (status !== 'AWAITING_APPROVAL' || pendingCommands.length === 0) return null;

  const handleApprove = () => {
    // In a real app, this dispatches to usePlannerStore
    console.log('Approved commands:', pendingCommands);
    clearPending();
  };

  const handleReject = () => {
    console.log('Rejected commands');
    clearPending();
  };

  return (
    <div className="absolute inset-x-0 bottom-full mb-4 bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-2xl backdrop-blur-md">
      <h3 className="text-sm font-medium text-white mb-3">Proposed Changes</h3>
      
      <div className="max-h-[200px] overflow-y-auto mb-4">
        {pendingCommands.map((cmd, idx) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <CommandPreview key={idx} command={cmd as any} />
        ))}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={handleApprove}
          className="flex-1 bg-white text-black text-sm font-medium py-2 rounded hover:bg-zinc-200 transition-colors"
        >
          Approve
        </button>
        <button 
          onClick={handleReject}
          className="flex-1 bg-transparent border border-zinc-600 text-zinc-300 text-sm font-medium py-2 rounded hover:bg-zinc-800 transition-colors"
        >
          Reject
        </button>
      </div>
    </div>
  );
};
