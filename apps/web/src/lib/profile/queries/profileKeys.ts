export const profileKeys = {
  all: ['profile'] as const,
  detail: () => [...profileKeys.all, 'detail'] as const,
  stats: () => [...profileKeys.all, 'stats'] as const,
  preferences: () => [...profileKeys.all, 'preferences'] as const,
  timeline: () => [...profileKeys.all, 'timeline'] as const,
};
