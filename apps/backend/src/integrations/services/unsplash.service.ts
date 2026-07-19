import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IImagesProvider, ImagesSearchQuery, ImageResult } from '../interfaces/images.interface';
import { CacheService } from './cache.service';
import { HttpService } from './http.service';

interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    links: { html: string };
  };
  links: {
    download_location: string;
  };
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

const UNSPLASH_API_BASE = 'https://api.unsplash.com';

@Injectable()
export class UnsplashService implements IImagesProvider {
  private readonly logger = new Logger(UnsplashService.name);
  private readonly accessKey: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
    private readonly httpService: HttpService,
  ) {
    this.accessKey = this.configService.get<string>('UNSPLASH_ACCESS_KEY');
    if (!this.accessKey) {
      this.logger.warn(
        'UNSPLASH_ACCESS_KEY is not defined. Image search will return empty results.',
      );
    }
  }

  async searchImages(query: ImagesSearchQuery): Promise<ImageResult[]> {
    const cacheKey = CacheService.buildKey(
      'unsplash',
      'search',
      query.query,
      String(query.perPage || 1),
    );
    const cached = await this.cacheService.get<ImageResult[]>(cacheKey);
    if (cached) {
      return cached;
    }

    if (!this.accessKey) {
      return [];
    }

    try {
      this.logger.debug(`Searching Unsplash for: "${query.query}"`);

      const url = `${UNSPLASH_API_BASE}/search/photos?query=${encodeURIComponent(query.query)}&per_page=${query.perPage || 5}&orientation=${query.orientation || 'landscape'}`;

      const response = await this.httpService.get<UnsplashSearchResponse>('UnsplashService', url, {
        headers: {
          Authorization: `Client-ID ${this.accessKey}`,
          'Accept-Version': 'v1',
        },
      });

      const results: ImageResult[] = response.data.results.map((photo) => ({
        id: photo.id,
        url: photo.urls.regular,
        thumbnailUrl: photo.urls.small,
        photographerName: photo.user.name,
        photographerUrl: `${photo.user.links.html}?utm_source=voyageai&utm_medium=referral`,
        downloadLocation: photo.links.download_location,
      }));

      // Cache for 24 hours to respect rate limits (50/hr demo, 5000/hr production)
      await this.cacheService.set(cacheKey, results, 86400);

      return results;
    } catch (error) {
      this.logger.error(`Unsplash search failed for "${query.query}": ${(error as Error).message}`);
      return [];
    }
  }
}
