export * from './provider.types';
export * from './conversation.types';
export * from './prompt.types';
export * from './tool.types';

export interface AIContext {
  userId?: string;
  preferences?: Record<string, unknown>;
  currentTripId?: string;
  currentDestinationId?: string;
  searchHistory?: string[];
  location?: string;
  timezone?: string;
  language?: string;
}
