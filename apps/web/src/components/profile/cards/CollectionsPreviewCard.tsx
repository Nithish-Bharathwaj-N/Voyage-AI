'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';

export function CollectionsPreviewCard() {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 rounded-xl">
            <Icon name="FolderHeart" size={24} className="text-rose-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Saved Collections</h2>
        </div>
        <Link href="/collections" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Placeholder UI for collections */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-2 opacity-50 cursor-not-allowed">
             <div className="aspect-[4/3] rounded-xl bg-white/5 border border-white/10" />
             <div className="h-4 bg-white/10 rounded w-3/4 mx-1 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
