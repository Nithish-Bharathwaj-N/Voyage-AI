export const IMAGE_PROVIDER = 'IMAGE_PROVIDER';

export interface ImagesSearchQuery {
  query: string;
  perPage?: number;
  orientation?: 'landscape' | 'portrait' | 'squarish';
}

export interface ImageResult {
  id: string;
  url: string; // raw or regular
  thumbnailUrl: string;
  photographerName: string;
  photographerUrl: string;
  downloadLocation: string; // url to hit when downloaded/viewed
}

export interface IImagesProvider {
  searchImages(query: ImagesSearchQuery): Promise<ImageResult[]>;
}
