'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
}

/**
 * Premium side sheet modal drawer (e.g. for itinerary cost details panel).
 */
export function Sheet({ open, onClose, title, side = 'right', children, className = '' }: SheetProps) {
  const isLeft = side === 'left';

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Sheet Body */}
          <motion.div
            initial={{ x: isLeft ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isLeft ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className={`bg-white border-${
              isLeft ? 'r' : 'l'
            } border-slate-100 p-6 shadow-2xl relative w-80 md:w-96 z-10 flex flex-col gap-5 h-full ${
              isLeft ? 'mr-auto' : 'ml-auto'
            } ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
              {title && <h3 className="text-base font-black text-slate-900 leading-none">{title}</h3>}
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-slate-50:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto text-sm font-medium pr-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
