'use client';

import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

import { motion } from 'framer-motion';

/**
 * Reusable layout card representing empty lists or charts.
 */
export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`relative flex flex-col items-center justify-center text-center p-10 border border-slate-200/60 bg-white/40 backdrop-blur-3xl rounded-3xl gap-5 select-none shadow-[0_8px_30px_rgb(0,0,0,0.04)]_8px_30px_rgb(0,0,0,0.2)] overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-50" />
      
      {icon && (
        <div className="relative text-slate-400 shrink-0 bg-slate-50 p-4 rounded-2xl shadow-inner border border-white/20">
          {icon}
        </div>
      )}
      
      <div className="relative space-y-2 max-w-sm z-10">
        <h4 className="text-base font-bold text-slate-900 font-display leading-tight tracking-tight">{title}</h4>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">{description}</p>
      </div>
      
      {action && <div className="relative pt-3 z-10">{action}</div>}
    </motion.div>
  );
}
