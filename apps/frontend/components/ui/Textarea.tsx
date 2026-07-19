'use client';

import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/**
 * Reusable, premium multiline text area input component.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider select-none">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          className={`w-full bg-white border ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-slate-400'
          } focus:outline-none focus:ring-2 focus:ring-slate-100 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:bg-slate-50:bg-slate-950 transition-all resize-y min-h-[80px]`}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider pl-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
