'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const MOMENTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1500', title: 'Friends in Ladakh' },
  { id: 2, image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1500', title: 'Family in Alleppey' },
  { id: 3, image: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=1500', title: 'Sunrise in Munnar' },
];

export function Chapter4Moments() {
  return (
    <section className="relative py-32 bg-white">
      
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 font-display tracking-tight leading-tight max-w-4xl mx-auto">
          It&apos;s never about the software.<br />
          <span className="text-indigo-600">It&apos;s about the feeling.</span>
        </h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {MOMENTS.map((moment, index) => (
            <motion.div 
              key={moment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="group relative"
            >
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src={moment.image} 
                  alt={moment.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <p className="mt-6 text-center text-slate-500 font-serif italic text-xl">
                {moment.title}
              </p>
            </motion.div>
          ))}
          
        </div>
      </div>

    </section>
  );
}
