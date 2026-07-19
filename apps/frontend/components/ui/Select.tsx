'use client';

import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

/**
 * Reusable select drop-down select field components wrapper.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, options, error, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider select-none">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`w-full bg-white border ${
              error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:border-slate-400'
            } focus:outline-none focus:ring-2 focus:ring-slate-100 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 disabled:opacity-50 disabled:bg-slate-50:bg-slate-950 transition-all appearance-none cursor-pointer`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider pl-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
