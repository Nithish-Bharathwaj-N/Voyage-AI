import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const textVariants = cva('text-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    variant: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: {
    size: 'base',
    variant: 'default',
    weight: 'normal',
  },
});

export interface TextProps 
  extends React.HTMLAttributes<HTMLElement>, 
  VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div' | 'label';
}

export function Text({ className, size, variant, weight, as = 'p', ...props }: TextProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp className={cn(textVariants({ size, variant, weight, className }))} {...props} />
  );
}
