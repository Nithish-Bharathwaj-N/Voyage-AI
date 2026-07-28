'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DestinationLayoutProps {
  hero: React.ReactNode;
  tabs: React.ReactNode;
  mainContent: React.ReactNode;
  sidebarContent: React.ReactNode;
}

export function DestinationLayout({ hero, tabs, mainContent, sidebarContent }: DestinationLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {hero}
      
      {/* Sticky Tabs */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tabs}
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Main Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 space-y-8"
          >
            {mainContent}
          </motion.div>

          {/* Sticky Sidebar Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-24"
          >
            {sidebarContent}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
