export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'lists'] as const,
  detail: (id: string) => [...collectionKeys.all, 'detail', id] as const,
  items: (id: string) => [...collectionKeys.detail(id), 'items'] as const,
};
