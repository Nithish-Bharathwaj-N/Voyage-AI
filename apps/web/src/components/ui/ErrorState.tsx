'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Reusable full container for server errors.
 */
export function ErrorState({ title = 'Something went wrong', message = 'We could not fetch the details. Please try again.', onRetry, className = '' }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-red-50/50 border border-red-100 rounded-3xl gap-4 select-none ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-650 shrink-0">
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="text-sm font-extrabold text-red-900 leading-tight font-display">{title}</h4>
        <p className="text-xs text-red-750 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-750 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
  );
}
