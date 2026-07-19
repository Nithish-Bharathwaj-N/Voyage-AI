'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Premium mobile bottom drawer or side drawer component.
 */
export function Drawer({ open, onClose, title, children, className = '' }: DrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`bg-white border-t border-slate-100 rounded-t-3xl p-6 shadow-2xl relative w-full max-w-lg z-10 flex flex-col gap-4 max-h-[85vh] overflow-y-auto ${className}`}
          >
            {/* Grab Drag handle */}
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto select-none shrink-0" />

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
            <div className="flex-1 text-sm font-medium">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
