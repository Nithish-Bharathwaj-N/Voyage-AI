'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export const FavoriteButton = React.memo(function FavoriteButton({
  isFavorite,
  onToggle,
  className,
}: FavoriteButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      whileTap={{ scale: 0.8 }}
      className={cn(
        'p-1.5 rounded-full transition-colors',
        isFavorite
          ? 'text-rose-400 hover:text-rose-300'
          : 'text-white/50 hover:text-white/90',
        className
      )}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
    >
      <Icon
        name={isFavorite ? 'Heart' : 'Heart'}
        size={16}
        className={cn('transition-all', isFavorite ? 'fill-rose-400' : 'fill-none')}
      />
    </motion.button>
  );
});
