'use client';

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

/**
 * Reusable, premium text input wrapper supporting label text, error notes, and icons.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-xs font-medium text-slate-500 tracking-wide select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-400 shrink-0 select-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full bg-slate-50/50 border ${
              error ? 'border-red-500 focus:ring-red-200' : 'border-black/[0.06] focus:border-blue-500/50:border-blue-400/50'
            } focus:outline-none focus:ring-4 focus:ring-blue-500/10:ring-blue-400/10 rounded-xl py-2.5 ${
              icon ? 'pl-10' : 'pl-4'
            } pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 disabled:opacity-50 disabled:bg-slate-50:bg-slate-950 transition-all duration-300`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[10px] font-medium text-red-500 uppercase tracking-wider pl-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
