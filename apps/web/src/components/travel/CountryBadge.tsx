'use client';

import React from 'react';
import { Badge } from '../ui/Badge';

export interface CountryBadgeProps {
  code: string;
  name: string;
  className?: string;
}

/**
 * Reusable country flag metadata indicator.
 */
export function CountryBadge({ code, name, className = '' }: CountryBadgeProps) {
  // Simple flag emoji generator from ISO code
  const getFlag = (iso: string) => {
    const charCodeOffset = 127397;
    const codePoints = iso
      .toUpperCase()
      .split('')
      .map((char) => char.charCodeAt(0) + charCodeOffset);
    try {
      return String.fromCodePoint(...codePoints);
    } catch {
      return '📍';
    }
  };

  return (
    <Badge variant="default" className={`inline-flex items-center gap-1.5 !px-2.5 !py-1 ${className}`}>
      <span className="text-[11px] leading-none select-none">{getFlag(code)}</span>
      <span className="font-extrabold text-[10px] tracking-wide text-slate-800 uppercase">{name}</span>
    </Badge>
  );
}
