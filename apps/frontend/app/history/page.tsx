'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore, HistoryEvent } from '@/store';
import { 
  Clock, Search, Trash2, Eye, PlusCircle, Pencil, Share2, Download, 
  MapPin, Heart, ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';

const ACTION_ICONS: Record<string, React.ElementType> = {
  viewed: Eye,
  created: PlusCircle,
  updated: Pencil,
  deleted: Trash2,
  shared: Share2,
  exported: Download
};

const ACTION_COLORS: Record<string, string> = {
  viewed: 'bg-blue-100 text-blue-600',
  created: 'bg-emerald-100 text-emerald-600',
  updated: 'bg-amber-100 text-amber-600',
  deleted: 'bg-rose-100 text-rose-600',
  shared: 'bg-indigo-100 text-indigo-600',
  exported: 'bg-purple-100 text-purple-600'
};

export default function HistoryPage() {
  const { history, clearHistory } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter(h => 
    h.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.entityType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Activity History</h1>
            <p className="text-slate-500">A timeline of your entire journey on VoyageAI.</p>
          </div>
          <button 
            onClick={() => { clearHistory(); toast.success('History cleared'); }}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-600 px-6 py-3 rounded-full font-bold shadow-sm transition-all active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search timeline..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative">
          <AnimatePresence>
            {filteredHistory.length > 0 ? (
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {filteredHistory.map((item, index) => {
                  const Icon = ACTION_ICONS[item.action] || Clock;
                  const dateObj = new Date(item.timestamp);
                  
                  return (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.5) }}
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                    >
                      {/* Icon */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${ACTION_COLORS[item.action] || 'bg-slate-100 text-slate-500'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      {/* Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-slate-100 bg-slate-50 group-hover:bg-white group-hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{item.action} {item.entityType}</span>
                          <span className="text-[10px] font-bold text-slate-400">{dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="text-sm font-bold text-slate-800">
                          {item.action === 'viewed' && 'Looked at '}
                          {item.action === 'created' && 'Started planning '}
                          {item.action === 'updated' && 'Made changes to '}
                          {item.action === 'deleted' && 'Removed '}
                          {item.action === 'shared' && 'Shared a link for '}
                          {item.action === 'exported' && 'Downloaded PDF for '}
                          <span className="text-indigo-600">{item.entityName}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-2">
                          {dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Timeline Empty</h3>
                <p className="text-slate-500 text-sm max-w-xs">Your activity will appear here as you explore destinations and plan trips.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
