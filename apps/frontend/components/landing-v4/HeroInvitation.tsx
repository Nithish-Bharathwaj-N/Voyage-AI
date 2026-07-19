'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Plane, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export function HeroInvitation() {
  const scrollToJourney = () => {
    document.getElementById('chapter-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center text-center">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=3000" 
          alt="Cinematic Space" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center"
      >
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-black text-white text-xl tracking-widest uppercase">VoyageAI</span>
        </div>

        {/* Powerful Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight font-display tracking-tight mb-8 drop-shadow-2xl">
          Every Journey Begins <br className="hidden md:block" /> 
          With One Conversation.
        </h1>

        {/* Short Sentence */}
        <p className="text-xl md:text-3xl text-white/70 font-serif italic mb-16 max-w-3xl drop-shadow-md">
          The AI-powered travel platform built specifically for India.
        </p>

        {/* Choose Your Experience */}
        <div className="flex flex-col items-center">
          <span className="text-white/50 text-xs font-bold uppercase tracking-[0.3em] mb-6">
            ✨ Choose Your Experience
          </span>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={scrollToJourney}
              className="flex items-center justify-center space-x-3 text-sm font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-colors w-64"
            >
              <Globe className="w-5 h-5" />
              <span>Experience the Journey</span>
            </button>
            <Link 
              href="/dashboard"
              className="flex items-center justify-center space-x-3 text-sm font-bold text-slate-900 bg-white px-8 py-4 rounded-full hover:bg-slate-200 transition-colors w-64 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <Plane className="w-5 h-5" />
              <span>Start Planning Now</span>
            </Link>
          </div>
        </div>

      </motion.div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 flex flex-col items-center z-10 cursor-pointer"
        onClick={scrollToJourney}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </motion.div>

    </section>
  );
}
