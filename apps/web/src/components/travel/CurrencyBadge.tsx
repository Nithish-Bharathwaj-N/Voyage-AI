'use client';

import React from 'react';
import { Badge } from '../ui/Badge';

export interface CurrencyBadgeProps {
  code: string;
  symbol?: string;
  className?: string;
}

/**
 * Reusable currency status badge element.
 */
export function CurrencyBadge({ code, symbol = '$', className = '' }: CurrencyBadgeProps) {
  return (
    <Badge variant="info" className={`inline-flex items-center gap-1 !px-2 !py-0.5 font-mono ${className}`}>
      <span className="text-emerald-500 font-extrabold">{symbol}</span>
      <span className="font-extrabold text-[9px] tracking-wider">{code.toUpperCase()}</span>
    </Badge>
  );
}
