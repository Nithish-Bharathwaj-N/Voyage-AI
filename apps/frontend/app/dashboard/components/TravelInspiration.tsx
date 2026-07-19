'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function TravelInspiration({ destinations }: { destinations: any[] }) {
  const router = useRouter();

  if (!destinations.length) return null;

  // Create curations
  const curations = [
    {
      title: 'Hidden Gems',
      items: destinations.filter(d => d.hiddenGem).slice(0, 8)
    },
    {
      title: 'Luxury Escapes',
      items: destinations.filter(d => d.budget === 'Luxury').slice(0, 8)
    },
    {
      title: 'Adventure Trips',
      items: destinations.filter(d => d.category === 'Adventure').slice(0, 8)
    }
  ];

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Travel Inspiration</h3>
          <p className="text-slate-500">Curated collections just for you</p>
        </div>
      </div>

      <div className="space-y-10">
        {curations.map((curation, idx) => {
          if (!curation.items.length) return null;
          return (
            <div key={curation.title}>
              <div className="flex items-center justify-between mb-4 px-1">
                <h4 className="text-xl font-bold text-slate-800">{curation.title}</h4>
                <button 
                  onClick={() => router.push(`/explore?q=${encodeURIComponent(curation.title)}`)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
                >
                  See all <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                {curation.items.map((dest, i) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="shrink-0 w-[240px] snap-center group cursor-pointer"
                    onClick={() => router.push(`/explore/${dest.slug}`)}
                  >
                    <div className="relative h-[160px] rounded-2xl overflow-hidden mb-3 bg-slate-100">
                      <img 
                        src={dest.coverImage} 
                        alt={dest.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h5 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{dest.name}</h5>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{dest.state}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
