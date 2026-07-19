'use client';

import React from 'react';
import { ArrowLeft, RefreshCw, Bookmark, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

interface PlannerHeaderProps {
  title: string;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
  hasItinerary: boolean;
}

/**
 * Top toolbar for the planner, providing options to save or reset the workspace.
 */
export function PlannerHeader({ title, saving, onSave, onReset, hasItinerary }: PlannerHeaderProps) {
  const router = useRouter();

  return (
    <header className="h-16 border-b border-slate-100 bg-white/95 backdrop-blur-md px-6 flex items-center justify-between shrink-0 select-none">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/dashboard')}
          className="!p-2 hover:bg-slate-50 rounded-xl"
          icon={<ArrowLeft className="w-4 h-4 text-slate-500" />}
          aria-label="Back to dashboard"
        />
        <h1 className="text-base font-black font-display text-slate-900 truncate max-w-[200px] md:max-w-none">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {hasItinerary && (
          <div className="flex items-center gap-1.5 mr-2 text-xs font-semibold text-slate-400 min-w-[140px] justify-end overflow-hidden">
            <AnimatePresence mode="wait">
              {saving ? (
                <motion.span 
                  key="saving"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-1 text-slate-500"
                >
                  <RefreshCw className="w-3 h-3 animate-spin" /> Autosaving...
                </motion.span>
              ) : (
                <motion.span 
                  key="saved"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 text-emerald-500/80 bg-emerald-50/50 px-2 py-1 rounded-full shadow-sm"
                >
                  <Check className="w-3 h-3" /> Saved to workspace
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}
        {hasItinerary && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
        )}
        <Button
          variant="primary"
          size="sm"
          loading={saving}
          disabled={!hasItinerary}
          onClick={onSave}
          icon={<Bookmark className="w-3.5 h-3.5" />}
        >
          Save Trip
        </Button>
      </div>
    </header>
  );
}
