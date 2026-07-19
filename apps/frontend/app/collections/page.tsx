'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollectionStore, useUserStore } from '@/store';
import { Search, Plus, Trash2, Heart, Edit2, Grid, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function CollectionsPage() {
  const router = useRouter();
  const { collections, deleteCollection } = useCollectionStore();
  const { toggleFavoriteCollection, favorites } = useUserStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-init for demo
  React.useEffect(() => {
    useCollectionStore.getState().initMockCollections();
  }, []);

  const filteredCollections = collections.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">My Collections</h1>
            <p className="text-slate-500">Curate your dream destinations like Pinterest boards.</p>
          </div>
          <button 
            onClick={() => toast.info('Create Collection Dialog')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Collection
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search collections..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900 transition-all"
            />
          </div>
        </div>

        {/* Collections Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCollections.map(collection => {
              const isFav = favorites.collections.includes(collection.id) || collection.isFavorite;
              return (
                <motion.div
                  key={collection.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-slate-100 flex flex-col h-full"
                  onClick={() => router.push(`/explore?q=${encodeURIComponent(collection.title)}`)}
                >
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    <img 
                      src={collection.coverImage} 
                      alt={collection.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                    {/* Floating Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavoriteCollection(collection.id); }}
                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                      </button>
                    </div>

                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toast.info('Edit Collection'); }}
                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-slate-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); deleteCollection(collection.id); toast.success('Collection deleted'); }}
                        className="p-2 bg-white/90 hover:bg-rose-50 rounded-full shadow-sm text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Stats overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        {collection.destinationSlugs.length} saved
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-grow">
                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2 group-hover:text-slate-600 transition-colors">{collection.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{collection.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCollections.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Grid className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No collections found</h3>
            <p className="text-slate-500 max-w-md mb-8">Create your first collection to start saving your favorite destinations.</p>
          </div>
        )}
      </div>
    </div>
  );
}
