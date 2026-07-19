'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { LIVE_WEATHER } from '../dashboard-data';
import { MapPin } from 'lucide-react';

export function LiveWeather() {
  return (
    <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Live Weather</h3>
        <p className="text-slate-500 text-sm">Top destinations today</p>
      </div>

      <div className="space-y-4">
        {LIVE_WEATHER.map((weather, i) => {
          const Icon = weather.icon;
          return (
            <motion.div
              key={weather.city}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{weather.city}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{weather.condition}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>AQI {weather.aqi}</span>
                  </div>
                </div>
              </div>
              <div className="text-xl font-black text-slate-900">{weather.temp}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
