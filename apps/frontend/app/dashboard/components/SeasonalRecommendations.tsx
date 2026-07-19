'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Map } from 'lucide-react';
import { SEASONAL_RECOMMENDATIONS } from '../dashboard-data';
import { useRouter } from 'next/navigation';

export function SeasonalRecommendations() {
  const router = useRouter();

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Seasonal Recommendations</h3>
          <p className="text-slate-500">Perfect escapes for the current weather</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SEASONAL_RECOMMENDATIONS.map((rec, i) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => router.push(`/explore?q=${encodeURIComponent(rec.title)}`)}
          >
            <img 
              src={rec.image} 
              alt={rec.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold mb-3 border border-white/30">
                {rec.destinations}
              </span>
              <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{rec.title}</h4>
              <p className="text-white/80 text-sm mb-4 drop-shadow">{rec.subtitle}</p>
              
              <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                <button className="bg-white text-slate-900 px-5 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                  <Map className="w-4 h-4" /> Open Collection <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
