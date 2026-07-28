'use client';

import React from 'react';
import Image from 'next/image';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function Gallery({ destination }: { destination: DetailedDestination }) {
  if (!destination.gallery || destination.gallery.length === 0) return null;

  return (
    <div id="gallery" className="scroll-mt-32 space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Gallery</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {destination.gallery.map((image, i) => (
          <div 
            key={image.id} 
            className={`relative rounded-2xl overflow-hidden group bg-white/5 ${
              i === 0 ? 'col-span-2 md:col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
            }`}
          >
            <Image
              src={image.url}
              alt={image.caption || `${destination.city} photo`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {image.caption && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium line-clamp-2">{image.caption}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
