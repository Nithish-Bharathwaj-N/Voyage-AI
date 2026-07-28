'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function Chapter1Arrival() {
  return (
    <section id="chapter-1" className="relative w-full h-screen bg-slate-900 overflow-hidden flex items-center justify-center">
      
      {/* Cinematic Aerial Video / Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=3000" 
          alt="Aerial view" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Soft morning sunlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-blue-900/40 mix-blend-overlay" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <h2 className="text-white font-display font-black text-6xl md:text-8xl tracking-tight leading-tight drop-shadow-2xl">
          The World is Vast. <br />
          <span className="text-white/70 italic font-serif text-4xl md:text-6xl mt-4 block font-light">India is awakening.</span>
        </h2>
      </motion.div>

    </section>
  );
}
