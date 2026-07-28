'use client';

import React from 'react';
import { Bookmark, FolderOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

interface CollectionItem {
  id: string;
  name: string;
  count: number;
  image?: string;
}

interface CollectionsPanelProps {
  collections: CollectionItem[];
  loading: boolean;
}

/**
 * Lists saved collections folders of traveler spots.
 */
export function CollectionsPanel({ collections, loading }: CollectionsPanelProps) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Collections</h3>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          <Skeleton variant="rect" className="h-20" />
          <Skeleton variant="rect" className="h-20" />
        </div>
      ) : collections.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="w-8 h-8 text-slate-300" />}
          title="No collections saved"
          description="Bookmark sights in explore views to build custom lists."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {collections.slice(0, 4).map((col) => (
            <Card
              key={col.id}
              className="p-3.5 hover:border-slate-350:border-slate-700/80 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-0.5 text-left">
                <h4 className="text-xs font-black text-slate-900 leading-none truncate">
                  {col.name}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  {col.count} items
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
