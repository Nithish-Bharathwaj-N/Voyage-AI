'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface TripCoverImageProps {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const GRADIENT_FALLBACKS = [
  'from-violet-900 to-blue-900',
  'from-rose-900 to-orange-900',
  'from-emerald-900 to-teal-900',
  'from-blue-900 to-cyan-900',
  'from-amber-900 to-rose-900',
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export const TripCoverImage = React.memo(function TripCoverImage({
  src,
  alt,
  className,
  priority = false,
}: TripCoverImageProps) {
  const gradient = GRADIENT_FALLBACKS[hashString(alt) % GRADIENT_FALLBACKS.length];

  if (!src) {
    return (
      <div
        className={cn('absolute inset-0 bg-gradient-to-br', gradient, className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn('object-cover', className)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
    />
  );
});
