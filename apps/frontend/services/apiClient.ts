import axios, { AxiosError, AxiosResponse } from 'axios';

import { supabase } from '@/lib/supabaseClient';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  error?: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject Supabase JWT access token
apiClient.interceptors.request.use(async (config) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }
  } catch (error) {
    console.error('Error fetching session for apiClient:', error);
  }
  return config;
});

// Response Interceptor: Parse data and normalize errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401 && typeof window !== 'undefined') {
      document.cookie = 'sb-access-token=; Max-Age=0; path=/';
      document.cookie = 'sb-refresh-token=; Max-Age=0; path=/';
      window.location.href = '/login';
    }

    const errorData = error.response?.data as Record<string, unknown> | undefined;
    const normalizedError: ApiError = {
      success: false,
      message: (errorData?.message as string) || error.message || 'A network error occurred.',
      statusCode: status || 500,
      error: (errorData?.error as string) || 'InternalServerError',
    };
    return Promise.reject(normalizedError);
  }
);

export default apiClient;
