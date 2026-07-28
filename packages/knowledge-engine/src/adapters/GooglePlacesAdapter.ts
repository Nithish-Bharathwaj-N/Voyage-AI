import axios from 'axios';
import { Place } from '@voyageai/db';
import { GooglePlacesNormalizer } from '../normalizers/GooglePlacesNormalizer';

export interface IPlaceProvider {
  searchNearby(lat: number, lng: number, radiusMeters: number, type: string, destinationId: string): Promise<Place[]>;
}

export class GooglePlacesAdapter implements IPlaceProvider {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('Google Places API Key is required');
    this.apiKey = apiKey;
  }

  async searchNearby(lat: number, lng: number, radiusMeters: number, type: string, destinationId: string): Promise<Place[]> {
    // Map internal types to Google Place types
    let googleType = 'tourist_attraction';
    if (type === 'RESTAURANT') googleType = 'restaurant';
    if (type === 'HOTEL') googleType = 'lodging';

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          location: `${lat},${lng}`,
          radius: radiusMeters,
          type: googleType,
          key: this.apiKey,
        },
        timeout: 5000,
      });

      const data = response.data;
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google API Error: ${data.status}`);
      }

      const results = data.results || [];
      return results.map((result: any) => GooglePlacesNormalizer.normalize(result, destinationId));
      
    } catch (error: any) {
      // Normalize errors to Domain Errors
      console.error('Provider Adapter Error:', error.message);
      throw new Error(`Failed to fetch places from provider: ${error.message}`);
    }
  }
}
