'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useCollectionStore } from '@/store';
import { useRouter } from 'next/navigation';

export function DashboardCollections() {
  const router = useRouter();
  const collections = useCollectionStore((state) => state.collections);

  return (
    <section>
      <div className="mb-8">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Collections</h3>
        <p className="text-slate-500">Explore destinations by theme</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all"
            onClick={() => router.push(`/explore?q=${encodeURIComponent(col.title)}`)}
          >
            <img 
              src={col.coverImage} 
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 p-4 flex items-center justify-center text-center">
              <h4 className="text-white font-bold text-lg drop-shadow-md tracking-wide">{col.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
