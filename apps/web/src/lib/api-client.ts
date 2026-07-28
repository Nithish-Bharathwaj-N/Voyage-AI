import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// The singleton API client for the frontend.
// It proxies through Next.js rewrite rules or hits the backend directly.

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

import { createClient } from './supabase/client';

// Request Interceptor: Attach Supabase JWT
apiClient.interceptors.request.use(async (config) => {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Response Interceptor: Global Error Mapping
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    // Automatically trigger toasts for generic errors
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
