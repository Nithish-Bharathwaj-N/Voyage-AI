'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAP_DESTINATIONS = [
  { 
    id: 'ladakh', 
    name: 'Ladakh', 
    top: '15%', 
    left: '30%', 
    image: 'https://images.unsplash.com/photo-1581793746481-2a43f2d4f584?q=80&w=1500',
    weather: '-5°C',
    fact: 'Home to the highest motorable passes in the world.'
  },
  { 
    id: 'kerala', 
    name: 'Kerala', 
    top: '85%', 
    left: '35%', 
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1500',
    weather: '30°C',
    fact: 'Known for its sprawling network of tranquil backwaters.'
  },
  { 
    id: 'jaipur', 
    name: 'Jaipur', 
    top: '35%', 
    left: '25%', 
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1500',
    weather: '25°C',
    fact: 'The entire city was painted pink in 1876 to welcome the Prince of Wales.'
  },
];

export function Chapter3Map() {
  const [activeDest, setActiveDest] = React.useState(MAP_DESTINATIONS[1]);

  return (
    <section className="relative min-h-screen bg-slate-50 py-32 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Map Interactive Container */}
        <div className="w-full lg:w-1/2 relative aspect-square max-w-lg mx-auto">
          {/* Outline Map */}
          <img 
            src="https://raw.githubusercontent.com/utkarshx/India-SVG-Map/master/india.svg" 
            alt="Map of India" 
            className="w-full h-full object-contain drop-shadow-2xl opacity-40"
          />
          
          {/* Points */}
          {MAP_DESTINATIONS.map((dest) => (
            <div 
              key={dest.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: dest.top, left: dest.left }}
              onMouseEnter={() => setActiveDest(dest)}
            >
              <div className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center shadow-lg border-2 border-white ${activeDest.id === dest.id ? 'bg-indigo-600 scale-125' : 'bg-slate-300 hover:bg-indigo-400'}`}>
                {activeDest.id === dest.id && (
                  <span className="absolute w-12 h-12 bg-indigo-500/20 rounded-full animate-ping" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Data Panel */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-12">
            Every route, illuminated.
          </h2>

          <div className="w-full max-w-md bg-white rounded-[2rem] p-6 shadow-2xl border border-slate-100 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-6">
                  <img src={activeDest.image} alt={activeDest.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">{activeDest.name}</h3>
                <p className="text-slate-500 font-serif italic text-lg mb-6">{activeDest.fact}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Weather</span>
                  <span className="text-xl font-bold text-indigo-600">{activeDest.weather}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
