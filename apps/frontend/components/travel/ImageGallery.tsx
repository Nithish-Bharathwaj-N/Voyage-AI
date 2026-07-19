'use client';

import React from 'react';
import { Card } from '../ui/Card';

export interface ImageGalleryProps {
  images: string[];
  className?: string;
}

/**
 * Reusable image layout grid container.
 */
export function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className={`grid grid-cols-12 gap-3 aspect-video md:aspect-[21/9] ${className}`}>
      {/* Primary Hero Image */}
      <Card className="col-span-8 overflow-hidden relative">
        <img src={images[0]} alt="Featured landscape cover" className="w-full h-full object-cover" />
      </Card>

      {/* Supporting Side Grid */}
      <div className="col-span-4 flex flex-col gap-3 h-full">
        {images.slice(1, 3).map((img, idx) => (
          <Card key={idx} className="flex-1 overflow-hidden relative">
            <img src={img} alt="Supporting detail preview" className="w-full h-full object-cover" />
          </Card>
        ))}
      </div>
    </div>
  );
}
