'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function RelatedDestinations({ destination }: { destination: DetailedDestination }) {
  if (!destination.relatedDestinations || destination.relatedDestinations.length === 0) return null;

  return (
    <div className="space-y-6 pt-12 border-t border-white/10">
      <h3 className="text-2xl font-bold text-foreground">Explore More Like {destination.city}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destination.relatedDestinations.map((related) => (
          <Link 
            href={`/destinations/${related.id}`} 
            key={related.id}
            className="group block relative h-48 rounded-2xl overflow-hidden"
          >
            <Image
              src={related.imageUrl}
              alt={related.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-bold text-lg">{related.name}</h4>
              <p className="text-white/70 text-sm">View destination</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
