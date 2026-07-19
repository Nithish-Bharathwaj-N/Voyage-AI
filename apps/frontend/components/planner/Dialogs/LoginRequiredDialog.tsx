'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

interface LoginRequiredDialogProps {
  open: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onDismiss: () => void;
}

/**
 * Renders a guest-user login/register prompt modal when attempting to save without authentication.
 */
export function LoginRequiredDialog({ open, onLogin, onRegister, onDismiss }: LoginRequiredDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-2xl text-center"
      >
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6 text-blue-600" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Save Your Travel Plan
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
            Create a free account or log in to sync this plan, access map coordinates, track budgets, and share with co-travelers.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onLogin}
            className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={onRegister}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/20"
          >
            Sign Up Free
          </button>
        </div>

        <button
          onClick={onDismiss}
          className="text-[10px] text-slate-400 font-bold hover:underline cursor-pointer block mx-auto"
        >
          Keep Planning as Guest
        </button>
      </motion.div>
    </div>
  );
}
