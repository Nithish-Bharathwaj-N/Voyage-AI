'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/lib/utils';
import type { Collection, CollectionPrivacy } from '@/lib/collections/types/collections.types';

function PrivacyBadge({ privacy }: { privacy: CollectionPrivacy }) {
  if (privacy === 'public') {
    return <div className="bg-emerald-500/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1"><Icon name="Globe" size={10} /> Public</div>;
  }
  if (privacy === 'shared') {
    return <div className="bg-sky-500/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1"><Icon name="Users" size={10} /> Shared</div>;
  }
  return <div className="bg-black/40 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-1"><Icon name="Lock" size={10} /> Private</div>;
}

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link 
      href={`/collections/${collection.id}`}
      className="group flex flex-col gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
        {collection.coverImageUrl ? (
          <Image
            src={collection.coverImageUrl}
            alt={collection.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="Folder" size={48} className="text-white/10" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <PrivacyBadge privacy={collection.privacy} />
          
          <div className="flex gap-1.5">
            {collection.isPinned && (
              <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
                <Icon name="Pin" size={12} className="text-white" />
              </div>
            )}
            {collection.isFavorite && (
              <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
                <Icon name="Heart" size={12} className="fill-rose-500 text-rose-500" />
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center border border-white/20 shrink-0">
            <span className="text-sm font-bold text-white">{collection.itemCount}</span>
          </div>
          <span className="text-xs text-white/80 font-medium">Saved items</span>
        </div>
      </div>
      
      <div className="px-1">
        <h3 className="font-bold text-foreground text-base truncate group-hover:text-primary transition-colors">
          {collection.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
          <Icon name="Clock" size={12} />
          Updated {new Date(collection.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
