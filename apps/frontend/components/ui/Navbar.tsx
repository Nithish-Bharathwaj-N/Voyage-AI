'use client';

import React from 'react';
import Link from 'next/link';
import { Plane } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Reusable layout top navbar shell.
 */
export function Navbar({ children, className = '' }: NavbarProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 h-16 border-b border-slate-100 bg-white/95 backdrop-blur-md shrink-0 flex items-center select-none ${className}`}>
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shadow-md">
            <Plane className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 font-display">VoyageAI</span>
        </Link>
        <div className="flex items-center gap-4">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
