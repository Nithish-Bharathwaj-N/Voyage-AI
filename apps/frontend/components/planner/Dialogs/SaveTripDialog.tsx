'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';

interface SaveTripDialogProps {
  open: boolean;
  saving: boolean;
  tripName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Renders a save confirmation modal for authenticated users.
 */
export function SaveTripDialog({ open, saving, tripName, onConfirm, onCancel }: SaveTripDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <Check className="w-6 h-6 text-emerald-600" />
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600:text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-black text-slate-900">Save to Workspace</h3>
          {tripName && (
            <p className="text-xs text-slate-500 font-medium">
              Save <span className="font-bold text-slate-700">{tripName}</span> to your trip workspace?
            </p>
          )}
          <p className="text-xs text-slate-400 font-medium">
            You can edit, share, and manage this trip from your dashboard.
          </p>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-slate-200 hover:bg-slate-50:bg-slate-800 rounded-xl text-sm font-bold text-slate-600 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save Trip'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
