import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '../../utils/cn';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, strokeWidth = 2, className, ...props }: IconProps) {
  const LucideIcon = LucideIcons[name] as React.ElementType;

  if (!LucideIcon) {
    console.warn(`Icon ${name} not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon 
      size={size} 
      strokeWidth={strokeWidth} 
      className={cn('shrink-0', className)} 
      {...props} 
    />
  );
}
