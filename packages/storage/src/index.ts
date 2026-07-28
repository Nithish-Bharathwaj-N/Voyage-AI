export interface UploadOptions {
  folder?: string;
  publicId?: string;
  tags?: string[];
}

export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  bytes: number;
}

export interface StorageClient {
  uploadFile(filePathOrBuffer: string | Buffer, options?: UploadOptions): Promise<UploadResult>;
  deleteFile(publicId: string): Promise<boolean>;
  getSignedUrl(publicId: string, expiresInSeconds?: number): Promise<string>;
}

export class MockStorageClient implements StorageClient {
  async uploadFile(filePathOrBuffer: string | Buffer, options?: UploadOptions): Promise<UploadResult> {
    const id = options?.publicId || 'mock-id';
    return {
      url: `http://mock-storage.local/${id}.jpg`,
      secureUrl: `https://mock-storage.local/${id}.jpg`,
      publicId: id,
      format: 'jpg',
      bytes: 1024,
    };
  }

  async deleteFile(publicId: string): Promise<boolean> {
    return true;
  }

  async getSignedUrl(publicId: string): Promise<string> {
    return `https://mock-storage.local/signed/${publicId}`;
  }
}
