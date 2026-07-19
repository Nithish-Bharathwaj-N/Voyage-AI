'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

/**
 * Premium skeleton layout components placeholder.
 */
export function Skeleton({ className = '', variant = 'rect', ...props }: SkeletonProps) {
  const styles = {
    text: 'h-3.5 w-full rounded-md',
    rect: 'h-24 w-full rounded-xl',
    circle: 'w-10 h-10 rounded-full',
  };

  return (
    <div
      className={`bg-slate-100 animate-pulse shrink-0 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
