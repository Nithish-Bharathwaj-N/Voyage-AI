'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Premium accessible modal dialog wrapper with AnimatePresence.
 */
export function Dialog({ open, onClose, title, description, children, className = '' }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Dialog Body */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={`bg-white border border-slate-100 rounded-3xl p-6 shadow-2xl relative w-full max-w-md z-10 flex flex-col gap-4 text-slate-800 ${className}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-slate-50:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            {(title || description) && (
              <div className="space-y-1 pr-6 text-left">
                {title && <h3 className="text-base font-black text-slate-900 leading-none">{title}</h3>}
                {description && <p className="text-xs text-slate-500 font-semibold">{description}</p>}
              </div>
            )}

            {/* Content */}
            <div className="flex-1 text-sm font-medium">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
