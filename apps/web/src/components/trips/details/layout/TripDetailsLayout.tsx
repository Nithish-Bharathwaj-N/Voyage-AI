'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TripDetailsLayoutProps {
  hero: React.ReactNode;
  tabs: React.ReactNode;
  content: React.ReactNode;
  sidebar: React.ReactNode;
}

export function TripDetailsLayout({ hero, tabs, content, sidebar }: TripDetailsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-x-hidden">
      {/* Hero Section */}
      {hero}

      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:px-12 md:pl-24 flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Main Content (Left) */}
        <div className="flex-1 min-w-0">
          <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {tabs}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="mt-6"
          >
            {content}
          </motion.div>
        </div>

        {/* Sidebar / Quick Actions (Right on Desktop, Bottom on Mobile) */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            {sidebar}
          </div>
        </div>
      </div>
    </div>
  );
}
