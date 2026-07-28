import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpClientConfig extends AxiosRequestConfig {
  retries?: number;
  retryDelay?: number;
}

export interface HttpClient {
  get<T>(url: string, config?: HttpClientConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T>;
  delete<T>(url: string, config?: HttpClientConfig): Promise<T>;
}

export class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;

  constructor(config?: HttpClientConfig) {
    this.instance = axios.create(config);
    // Setup generic retry interceptors here for production
  }

  async get<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: HttpClientConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: HttpClientConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}
