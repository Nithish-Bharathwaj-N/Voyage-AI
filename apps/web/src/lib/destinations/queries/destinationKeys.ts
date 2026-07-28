export const destinationKeys = {
  all: ['destinations'] as const,
  detail: (id: string) => [...destinationKeys.all, 'detail', id] as const,
};
