import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function CollectionsEmptyState({ searchQuery }: { searchQuery?: string }) {
  if (searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
          <Icon name="SearchX" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">No collections found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t find any collections matching &quot;{searchQuery}&quot;. Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center px-4">
      <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
        <Icon name="FolderPlus" size={32} className="text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">Create your first collection</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        Group your favorite destinations, saved hotels, and planned trips into custom collections to share with friends or keep for yourself.
      </p>
      <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25">
        New Collection
      </button>
    </div>
  );
}
