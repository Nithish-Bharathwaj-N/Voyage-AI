'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Plane, CalendarDays, CloudSun, Hotel, ArrowUpRight } from 'lucide-react';

export function Chapter6LivingProduct() {
  return (
    <section className="py-40 bg-slate-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 font-display tracking-tight leading-tight">
          Your travel life, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">alive in one place.</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Large Dashboard Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl group hover:shadow-2xl hover:border-indigo-200 transition-all"
        >
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-2">Upcoming Trip</p>
              <h3 className="text-4xl md:text-5xl font-bold mb-2 font-display text-slate-900 tracking-tight">Jaipur, Rajasthan</h3>
              <p className="text-slate-500 text-lg">In 14 days • 5 Days / 4 Nights</p>
            </div>
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <Plane className="w-8 h-8" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-3xl p-6 flex flex-col justify-between border border-slate-100">
              <CloudSun className="w-8 h-8 text-yellow-500 mb-6" />
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Weather</p>
                <p className="font-bold text-slate-900 text-lg">28°C, Sunny</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 flex flex-col justify-between border border-slate-100">
              <Hotel className="w-8 h-8 text-indigo-500 mb-6" />
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Stay</p>
                <p className="font-bold text-slate-900 text-lg truncate">Rambagh Palace</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 flex flex-col justify-between border border-slate-100">
              <CalendarDays className="w-8 h-8 text-purple-500 mb-6" />
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Dates</p>
                <p className="font-bold text-slate-900 text-lg">Oct 12 - 16</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-xl flex flex-col justify-between text-white"
        >
          <div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Travel Passport</p>
            <div className="mb-10">
              <p className="text-slate-400 text-base mb-2">States Visited</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-7xl font-black font-display">12</span>
                <span className="text-slate-500 text-xl">/ 28</span>
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-base mb-2">Total Trips Planned</p>
              <p className="text-4xl font-bold">24</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 font-medium group text-base mt-12 w-fit">
            <span>View full passport</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
