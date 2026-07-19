'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';

/**
 * Premium ThemeToggle using client-only fallback checks.
 */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    // Simple state binding mapping DOM elements
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      icon={theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      aria-label="Toggle Theme"
      className="!p-2.5 rounded-xl border border-slate-200/40"
    />
  );
}
