import { apiClient } from '../../api-client';
import type { DetailedDestination } from '../types/destination.types';

class DestinationRepository {
  async getDestination(id: string): Promise<DetailedDestination> {
    return apiClient.get(`/explore/destinations/${id}`).then((d: any) => ({
      ...d,
      city: d.city || (id.charAt(0).toUpperCase() + id.slice(1))
    }));
  }
}

export const destinationRepository = new DestinationRepository();
