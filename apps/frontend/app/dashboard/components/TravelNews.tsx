'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TRAVEL_NEWS } from '../dashboard-data';
import { ArrowRight } from 'lucide-react';

export function TravelNews() {
  return (
    <section className="bg-slate-900 rounded-3xl p-6 shadow-sm text-white">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black tracking-tight">Travel News</h3>
          <p className="text-white/60 text-sm">India tourism updates</p>
        </div>
      </div>

      <div className="space-y-4">
        {TRAVEL_NEWS.map((news, i) => {
          const Icon = news.icon;
          return (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group cursor-pointer p-3 rounded-2xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Icon className="w-4 h-4 text-white/80" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1 group-hover:text-indigo-400 transition-colors">{news.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed mb-2 line-clamp-2">{news.description}</p>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">{news.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-bold flex items-center justify-center gap-2">
        Read All Updates <ArrowRight className="w-4 h-4" />
      </button>
    </section>
  );
}
