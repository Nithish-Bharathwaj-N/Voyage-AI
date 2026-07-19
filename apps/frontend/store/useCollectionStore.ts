import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Collection } from './types';
import { useUserStore } from './useUserStore';

interface CollectionState {
  collections: Collection[];
  
  // Collection Actions
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  
  // Destination Mapping
  addDestinationToCollection: (collectionId: string, slug: string) => void;
  removeDestinationFromCollection: (collectionId: string, slug: string) => void;
  
  // Initialization
  initMockCollections: () => void;
}

const MOCK_COLLECTIONS: Collection[] = [
  { id: 'c1', title: 'Dream Trips', description: 'Places I must visit soon.', coverImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600', destinationSlugs: ['leh', 'srinagar'], isFavorite: true },
  { id: 'c2', title: 'Weekend Escapes', description: 'Quick getaways from the city.', coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600', destinationSlugs: ['munnar', 'coorg', 'ooty'], isFavorite: false },
  { id: 'c3', title: 'Hidden Gems', description: 'Offbeat locations across India.', coverImage: 'https://images.unsplash.com/photo-1621682436855-520268574163?auto=format&fit=crop&q=80&w=600', destinationSlugs: ['shillong', 'port-blair'], isFavorite: false },
];

export const useCollectionStore = create<CollectionState>()(
  persist(
    (set, get) => ({
      collections: [],

      addCollection: (collection) => {
        set((state) => ({ collections: [...state.collections, collection] }));
        useUserStore.getState().logHistory({
          id: `hist_${Date.now()}`, action: 'created', entityType: 'collection', 
          entityId: collection.id, entityName: collection.title, timestamp: new Date().toISOString()
        });
      },

      updateCollection: (id, updates) => set((state) => ({
        collections: state.collections.map(c => c.id === id ? { ...c, ...updates } : c)
      })),

      deleteCollection: (id) => set((state) => ({
        collections: state.collections.filter(c => c.id !== id)
      })),

      addDestinationToCollection: (collectionId, slug) => set((state) => ({
        collections: state.collections.map(c => 
          c.id === collectionId && !c.destinationSlugs.includes(slug) 
            ? { ...c, destinationSlugs: [...c.destinationSlugs, slug] } 
            : c
        )
      })),

      removeDestinationFromCollection: (collectionId, slug) => set((state) => ({
        collections: state.collections.map(c => 
          c.id === collectionId 
            ? { ...c, destinationSlugs: c.destinationSlugs.filter(s => s !== slug) } 
            : c
        )
      })),

      initMockCollections: () => {
        if (get().collections.length === 0) {
          set({ collections: MOCK_COLLECTIONS });
        }
      }
    }),
    {
      name: 'voyage-collection-storage',
    }
  )
);
