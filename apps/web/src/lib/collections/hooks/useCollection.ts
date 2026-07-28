import { useQuery } from '@tanstack/react-query';
import { collectionRepository } from '../repository/CollectionRepository';
import { collectionKeys } from '../queries/collectionKeys';
import type { Collection, SavedItem } from '../types/collections.types';

export function useCollection(id: string) {
  return useQuery<Collection>({
    queryKey: collectionKeys.detail(id),
    queryFn: () => collectionRepository.getCollection(id),
  });
}

export function useCollectionItems(id: string) {
  return useQuery<SavedItem[]>({
    queryKey: collectionKeys.items(id),
    queryFn: () => collectionRepository.getCollectionItems(id),
  });
}
