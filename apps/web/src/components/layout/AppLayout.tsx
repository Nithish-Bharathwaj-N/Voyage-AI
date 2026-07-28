'use client';

import React from 'react';
import { TopNavbar } from '../navigation/TopNavbar';
import { Sidebar } from '../navigation/Sidebar';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  navbar?: React.ReactNode;
  noPadding?: boolean;
}

export function AppLayout({ children, sidebar, navbar, noPadding = false }: AppLayoutProps) {
  const pathname = usePathname();
  
  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      {/* Sidebar - No wrapper div needed, Sidebar handles its own flex width */}
      {sidebar !== undefined ? sidebar : <Sidebar />}

      {/* Main Content Area - with curved borders matching Voyage-AI */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-card md:rounded-l-[2rem] md:border-y md:border-l md:border-border md:shadow-2xl md:my-2 z-10 transition-all">
        {navbar !== undefined ? navbar : <TopNavbar />}
        
        <main className={`flex flex-col flex-1 ${noPadding ? 'overflow-hidden' : 'overflow-y-auto overflow-x-hidden p-4 md:p-8'}`}>
          <div className={`mx-auto flex flex-col flex-1 ${noPadding ? 'w-full max-w-none' : 'max-w-7xl w-full'}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.99 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex flex-col flex-1 w-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
