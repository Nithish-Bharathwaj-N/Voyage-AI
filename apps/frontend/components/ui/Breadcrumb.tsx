'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Reusable breadcrumbs link bar path navigation.
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-1.5 text-xs font-semibold text-slate-500 select-none ${className}`} aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-350 shrink-0" />}
            {isLast || !item.href ? (
              <span className="text-slate-900 font-extrabold truncate max-w-[120px] md:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-slate-900:text-slate-300 transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
