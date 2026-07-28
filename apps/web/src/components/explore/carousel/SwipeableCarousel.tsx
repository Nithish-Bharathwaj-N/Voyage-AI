'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Icon } from '@/components/icons/Icon';
import { Button } from '../../ui/Button';

interface SwipeableCarouselProps {
  children: React.ReactNode[];
}

export function SwipeableCarousel({ children }: SwipeableCarouselProps) {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  const updateScrollState = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollState);
      updateScrollState();
      // Handle resize recalculation
      const observer = new ResizeObserver(updateScrollState);
      observer.observe(el);
      return () => {
        el.removeEventListener('scroll', updateScrollState);
        observer.disconnect();
      };
    }
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmt = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      carouselRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel w-full">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-background/90 border border-border shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-auto"
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
      )}

      {/* Scroll Right Button */}
      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-background/90 border border-border shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-auto"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      )}

      {/* Swipeable Scroll Area */}
      <div 
        ref={carouselRef}
        className="w-full overflow-x-auto scroll-smooth scrollbar-none flex gap-5 py-2 px-1 snap-x snap-mandatory"
      >
        <div ref={trackRef} className="flex gap-5">
          {children.map((child, idx) => (
            <div key={idx} className="snap-start shrink-0 select-none">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
