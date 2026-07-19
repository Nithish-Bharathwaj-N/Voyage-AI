'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Wallet, MapPin } from 'lucide-react';

export function Chapter5Assistant() {
  return (
    <section className="relative w-full h-[120vh] bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2500" 
          alt="Peaceful Landscape" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-black text-white font-display tracking-tight drop-shadow-2xl">
            The AI stays hidden. <br />
            <span className="text-white/60 italic font-serif font-light text-4xl md:text-5xl mt-2 block">Until you need it.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl mt-0 md:mt-24"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Budget Optimized</h3>
            <p className="text-white/70">VoyageAI silently adjusts your itinerary to keep you ₹2,400 under budget while upgrading your stay.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl mt-0 md:-mt-12"
          >
            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 mb-6">
              <CloudSun className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Live Weather Sync</h3>
            <p className="text-white/70">It knows it will rain on Tuesday, so it automatically moved your outdoor trek to Wednesday.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl mt-0 md:mt-32"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Smart Routing</h3>
            <p className="text-white/70">Millions of possible routes analyzed instantly to save you 4 hours of unnecessary transit time.</p>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
