'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './sidebar';
import { Navbar } from './navbar';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useKeyboardShortcuts();

  // Routes that should NOT show the navigation shell
  const noShellRoutes = ['/', '/login', '/register', '/forgot-password'];
  const isNoShell = noShellRoutes.includes(pathname);

  // Routes that need full-height layout without inner scroll (e.g. planner chat)
  const fullHeightRoutes = ['/planner'];
  const isFullHeight = fullHeightRoutes.includes(pathname);

  if (isNoShell) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden w-full bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white md:rounded-l-3xl md:border-y md:border-l md:border-slate-200 md:shadow-2xl md:my-2 z-10 relative">
        <Navbar />
        <main className={`flex-1 ${isFullHeight ? 'overflow-hidden flex flex-col' : 'overflow-y-auto overflow-x-hidden'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={isFullHeight ? 'flex-1 flex flex-col h-full' : 'h-full'}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
