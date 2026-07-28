'use client';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Singleton QueryClient with planner-optimized settings
const plannerQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 minutes before data is considered stale
      gcTime: 1000 * 60 * 30,    // 30 minutes in garbage collection (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

interface PlannerQueryProviderProps {
  children: ReactNode;
}

export function PlannerQueryProvider({ children }: PlannerQueryProviderProps) {
  return (
    <QueryClientProvider client={plannerQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
