import { useQuery } from '@tanstack/react-query';
import { collectionRepository } from '../repository/CollectionRepository';
import { collectionKeys } from '../queries/collectionKeys';
import type { CollectionFilter, CollectionSortKey, Collection } from '../types/collections.types';

export function useCollections(filter?: CollectionFilter, sort?: CollectionSortKey) {
  return useQuery<Collection[]>({
    queryKey: [...collectionKeys.lists(), filter, sort],
    queryFn: async () => {
      let data = await collectionRepository.getCollections();
      
      // Filter logic
      if (filter) {
        if (filter.search) {
          const q = filter.search.toLowerCase();
          data = data.filter(c => c.title.toLowerCase().includes(q));
        }
        if (filter.isPinned !== undefined) {
          data = data.filter(c => c.isPinned === filter.isPinned);
        }
        if (filter.isFavorite !== undefined) {
          data = data.filter(c => c.isFavorite === filter.isFavorite);
        }
        if (filter.privacy) {
          data = data.filter(c => c.privacy === filter.privacy);
        }
      }

      // Sort logic
      if (sort === 'alpha') {
        data.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'created') {
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else { // default 'updated'
        data.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      }

      return data;
    },
  });
}
