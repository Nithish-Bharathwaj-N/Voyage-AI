'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

/**
 * Reusable, premium button component supporting variants, loading spinners, and icons.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    const baseStyle =
      'inline-flex items-center justify-center font-medium transition-all rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.1)]:bg-slate-100_0_1px_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)]',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-950:bg-slate-700/80 border border-transparent',
      outline: 'border border-black/[0.08] hover:border-black/[0.15] text-slate-800:border-white/[0.2] bg-transparent',
      ghost: 'hover:bg-slate-100 text-slate-600:bg-slate-800/50 bg-transparent',
      danger: 'bg-red-500 hover:bg-red-600 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_2px_4px_rgba(239,68,68,0.2)]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4.5 py-2.5 text-sm gap-2',
      lg: 'px-6 py-3.5 text-base gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
