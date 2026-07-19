'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { SMART_INSIGHTS } from '../dashboard-data';

export function SmartInsights() {
  return (
    <section>
      <div className="mb-8">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Smart Insights</h3>
        <p className="text-slate-500">AI-powered recommendations for your travel style</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SMART_INSIGHTS.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${insight.bg}`}>
                <Icon className={`w-6 h-6 ${insight.color}`} />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{insight.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{insight.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
