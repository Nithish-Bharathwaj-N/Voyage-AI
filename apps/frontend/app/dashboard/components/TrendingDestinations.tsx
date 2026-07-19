'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Thermometer, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function TrendingDestinations({ destinations }: { destinations: any[] }) {
  const router = useRouter();

  // Curate trending items (Leh, Munnar, Goa, Kashmir, Coorg, Meghalaya, Andaman, Ooty, Jaipur, Udaipur)
  const trendingSlugs = ['leh', 'munnar', 'goa', 'srinagar', 'coorg', 'shillong', 'port-blair', 'ooty', 'jaipur', 'udaipur'];
  
  const trending = destinations
    .filter(d => trendingSlugs.includes(d.slug))
    .sort((a, b) => trendingSlugs.indexOf(a.slug) - trendingSlugs.indexOf(b.slug));

  if (!trending.length) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Trending Across India</h3>
          <p className="text-slate-500">Live popularity based on recent bookings</p>
        </div>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {trending.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="shrink-0 w-[300px] snap-center group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
            onClick={() => router.push(`/explore/${dest.slug}`)}
          >
            <div className="relative h-[400px] overflow-hidden">
              <img 
                src={dest.coverImage} 
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1">
                  #{i + 1} Trending
                </span>
              </div>

              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {typeof dest.rating === 'number' ? dest.rating.toFixed(1) : Number(dest.rating || 4.5).toFixed(1)}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h4 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{dest.name}</h4>
                <div className="flex items-center gap-1 text-white/80 text-sm mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {dest.state}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 text-white">
                    <div className="flex items-center gap-1 text-[10px] text-white/70 uppercase font-bold mb-1">
                      <Thermometer className="w-3 h-3" /> Season
                    </div>
                    <div className="text-xs font-semibold truncate">{(dest.bestSeason || 'All Year').split(' ')[0]}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20 text-white">
                    <div className="flex items-center gap-1 text-[10px] text-white/70 uppercase font-bold mb-1">
                      <Calendar className="w-3 h-3" /> Duration
                    </div>
                    <div className="text-xs font-semibold truncate">{dest.idealDuration}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
