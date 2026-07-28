import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

interface DashboardData {
  upcomingTrips: any[];
  recentTrips: any[];
  statistics: any;
  collections: any[];
  savedDestinations: any[];
  recentActivity: any[];
}

export function useDashboardData() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.get<DashboardData>('/dashboard').then(res => res as unknown as DashboardData),
  });
}
