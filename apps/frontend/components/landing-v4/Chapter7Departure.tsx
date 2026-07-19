'use client';

import * as React from 'react';
import Link from 'next/link';

export function Chapter7Departure() {
  return (
    <section className="relative h-[80vh] bg-black flex flex-col items-center justify-center text-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
        
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white font-display leading-tight tracking-tight mb-16">
          Where will your <br className="hidden md:block" /> story begin?
        </h2>

        <Link 
          href="/dashboard"
          className="bg-white text-slate-900 font-bold text-lg md:text-xl px-12 py-5 rounded-full hover:bg-slate-200 hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        >
          Start Planning Now
        </Link>
        
      </div>

      <div className="absolute bottom-10 text-slate-600 text-sm font-medium tracking-widest uppercase">
        © 2026 VoyageAI — India
      </div>

    </section>
  );
}
