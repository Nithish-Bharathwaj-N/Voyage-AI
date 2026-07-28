import { apiClient } from '@/lib/api-client';
import type { Collection, SavedItem } from '../types/collections.types';

class CollectionRepository {
  async getCollections(): Promise<Collection[]> {
    return apiClient.get('/collections').then((r: any) => {
      return r.map((c: any) => ({
        id: c.id,
        type: 'custom',
        ownerId: c.userId || 'mock-user-id',
        title: c.title,
        description: c.description || '',
        coverImageUrl: c.coverImage || 'https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c',
        itemCount: c.destinations?.length || 0,
        privacy: c.isPublic ? 'public' : 'private',
        isPinned: false,
        isFavorite: false,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }));
    });
  }

  async getCollection(id: string): Promise<Collection> {
    return apiClient.get(`/collections/${id}`).then((c: any) => ({
      id: c.id,
      type: 'custom',
      ownerId: c.userId || 'mock-user-id',
      title: c.title,
      description: c.description || '',
      coverImageUrl: c.coverImage || 'https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c',
      itemCount: c.destinations?.length || 0,
      privacy: c.isPublic ? 'public' : 'private',
      isPinned: false,
      isFavorite: false,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }

  async getCollectionItems(id: string): Promise<SavedItem[]> {
    // This usually hits /collections/:id/destinations
    return [];
  }
}

export const collectionRepository = new CollectionRepository();
