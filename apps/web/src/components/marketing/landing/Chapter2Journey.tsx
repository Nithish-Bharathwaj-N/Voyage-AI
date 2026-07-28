'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

const DESTINATIONS = [
  { name: 'LEH', subtitle: 'The Cold Desert', image: 'https://images.unsplash.com/photo-1626025345758-c290c0ef787f?q=80&w=2500' },
  { name: 'KASHMIR', subtitle: 'Paradise on Earth', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2500' },
  { name: 'JAIPUR', subtitle: 'The Pink City', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2500' },
  { name: 'VARANASI', subtitle: 'The Spiritual Capital', image: 'https://images.unsplash.com/photo-1561359313-0639aad81cad?q=80&w=2500' },
  { name: 'GOA', subtitle: 'The Pearl of the Orient', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2500' },
  { name: 'KERALA', subtitle: 'God\'s Own Country', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2500' },
  { name: 'ANDAMAN', subtitle: 'The Emerald Islands', image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f9?q=80&w=2500' }
];

export function Chapter2Journey() {
  return (
    <>
      {DESTINATIONS.map((dest, index) => (
        <section 
          key={dest.name} 
          className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
        >
          {/* Background Image with slight parallax scale on scroll */}
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={dest.image} 
              alt={dest.name} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Foreground Text */}
          <div className="relative z-20 w-full max-w-7xl px-6 md:px-12 mx-auto flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-white font-display font-black text-6xl md:text-9xl tracking-tight leading-none mb-2 drop-shadow-2xl">
                {dest.name}
              </h2>
              <p className="text-white/80 text-2xl md:text-4xl font-light italic font-serif drop-shadow-md">
                {dest.subtitle}
              </p>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
}
