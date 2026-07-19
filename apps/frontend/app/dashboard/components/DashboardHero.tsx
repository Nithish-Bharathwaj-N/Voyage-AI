'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DashboardHero() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  const quickSearches = ['🏔 Leh', '🌴 Goa', '🌿 Munnar', '🏖 Andaman', '🕌 Jaipur'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
    }
  };

  const handleQuickSearch = (tag: string) => {
    const term = tag.replace(/[^a-zA-Z]/g, '').trim();
    router.push(`/explore?q=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden rounded-3xl mx-auto mt-6 px-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=2000" 
          alt="India Heritage" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Minimal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/90" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-2xl md:text-3xl font-medium text-white/90 mb-2 tracking-wide drop-shadow-md">
            Good Evening, <span className="font-bold text-white">Nithish 👋</span>
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight drop-shadow-lg leading-tight">
            Where in India would you <br className="hidden md:block"/> like to travel next?
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Sparkles className="h-6 w-6 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'I need a 5-day Kerala trip' or 'Budget trip from Chennai'"
              className="w-full block pl-16 pr-6 py-5 rounded-2xl text-lg bg-white/90 backdrop-blur-xl border border-white/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 shadow-2xl shadow-black/10 transition-all font-medium"
            />
            <button 
              type="submit"
              className="absolute inset-y-2 right-2 bg-slate-900 text-white px-6 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-md"
            >
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-semibold text-slate-700/80 uppercase tracking-widest mr-2">Popular</span>
            {quickSearches.map(tag => (
              <button
                key={tag}
                onClick={() => handleQuickSearch(tag)}
                className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-slate-800 text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
