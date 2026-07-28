import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const headingVariants = cva('text-foreground font-semibold tracking-tight', {
  variants: {
    level: {
      1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter',
      2: 'text-3xl md:text-4xl',
      3: 'text-2xl md:text-3xl',
      4: 'text-xl md:text-2xl',
      5: 'text-lg md:text-xl',
      6: 'text-base md:text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    level: 1,
    weight: 'semibold',
  },
});

export interface HeadingProps 
  extends React.HTMLAttributes<HTMLHeadingElement>, 
  VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({ className, level, weight, as, ...props }: HeadingProps) {
  const Comp = (as || `h${level || 1}`) as React.ElementType;
  return (
    <Comp className={cn(headingVariants({ level, weight, className }))} {...props} />
  );
}
