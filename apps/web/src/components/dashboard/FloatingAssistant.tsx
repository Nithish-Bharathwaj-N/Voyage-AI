'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Plus, Search, Upload, Wallet, Map, PenTool } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function FloatingAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Plus, label: 'New Trip', onClick: () => router.push('/planner') },
    { icon: Search, label: 'Explore India', onClick: () => router.push('/explore') },
    { icon: Upload, label: 'Import Booking', onClick: () => alert('Import booking coming soon') },
    { icon: Wallet, label: 'Travel Budget', onClick: () => router.push('/budget') },
    { icon: PenTool, label: 'Packing List', onClick: () => router.push('/packing') },
    { icon: Map, label: 'AI Planner', onClick: () => router.push('/planner') },
  ];

  const aiSuggestions = [
    "Continue Kerala trip planning",
    "Suggest my next destination",
    "Find cheaper hotels in Goa",
    "Optimize my weekend itinerary"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 bg-white/90 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl w-[340px] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-indigo-600 p-5 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-black text-lg">
                  <Sparkles className="w-5 h-5" /> AI Assistant
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-indigo-100 text-sm">How can I help you travel better today?</p>
            </div>

            {/* AI Suggestions */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Suggestions</h5>
              <div className="flex flex-col gap-2">
                {aiSuggestions.map((s, i) => (
                  <button key={i} className="text-left text-sm font-semibold text-slate-700 bg-white border border-slate-100 py-2 px-3 rounded-xl hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="p-4">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h5>
              <div className="grid grid-cols-3 gap-2">
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 group-hover:bg-indigo-50 transition-colors">
                      <action.icon className="w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 pt-0">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask VoyageAI..." 
                  className="w-full bg-slate-100 border-none py-3 pl-4 pr-10 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
                <button className="absolute right-2 top-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors">
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-800 transition-colors border border-slate-700 relative"
      >
        <Sparkles className="w-6 h-6" />
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-slate-900 rounded-full" />
        )}
      </motion.button>
    </div>
  );
}
