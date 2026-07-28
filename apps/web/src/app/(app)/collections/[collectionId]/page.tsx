'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCollection, useCollectionItems } from '@/lib/collections/hooks/useCollection';
import { CollectionDetailSkeleton } from '@/components/collections/shared/Skeletons';
import { SavedItemDispatcher } from '@/components/collections/items/SavedItemDispatcher';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/lib/utils';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = (Array.isArray(params.collectionId) ? params.collectionId[0] : params.collectionId) || '';

  const { data: collection, isLoading: isLoadingCol, error: errorCol } = useCollection(collectionId);
  const { data: items, isLoading: isLoadingItems } = useCollectionItems(collectionId);

  const isLoading = isLoadingCol || isLoadingItems;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <CollectionDetailSkeleton />
      </div>
    );
  }

  if (errorCol || !collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
          <Icon name="AlertTriangle" size={32} className="text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Collection Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The collection you are looking for does not exist or you don&apos;t have permission to view it.
        </p>
        <button 
          onClick={() => router.push('/collections')}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden bg-zinc-900">
        {collection.coverImageUrl && (
          <Image
            src={collection.coverImageUrl}
            alt={collection.title}
            fill
            priority
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <button 
              onClick={() => router.push('/collections')}
              className="flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <Icon name="ArrowLeft" size={16} />
              <span className="text-sm font-medium">Back to Collections</span>
            </button>
            
            <div className="flex items-center gap-3 mb-2">
              <div className={cn(
                "px-2 py-1 rounded text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md",
                collection.privacy === 'public' ? 'bg-emerald-500/80' : 
                collection.privacy === 'shared' ? 'bg-sky-500/80' : 'bg-white/20'
              )}>
                <Icon name={collection.privacy === 'public' ? 'Globe' : collection.privacy === 'shared' ? 'Users' : 'Lock'} size={12} />
                {collection.privacy}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {collection.title}
            </h1>
            
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-1.5">
                <Icon name="Folder" size={16} />
                <span>{collection.itemCount} items</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Clock" size={16} />
                <span>Updated {new Date(collection.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar / Actions */}
      <div className="border-b border-white/10 sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Icon name="Share" size={16} /> Share
          </button>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium rounded-lg transition-colors flex items-center gap-2 text-sm">
            <Icon name="Edit2" size={16} /> Edit
          </button>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 font-medium rounded-lg transition-colors flex items-center gap-2 text-sm ml-auto">
            <Icon name="Trash2" size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {!items || items.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.02] border border-white/5 rounded-3xl">
            <Icon name="FolderOpen" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">This collection is empty</h3>
            <p className="text-muted-foreground">Start adding items from the Explore page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <SavedItemDispatcher key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
