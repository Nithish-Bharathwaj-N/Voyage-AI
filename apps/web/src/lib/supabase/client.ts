/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserClient } from '@supabase/ssr';

function createMockSupabaseClient() {
  return {
    auth: {
      async signUp({ email, password, options }: any) {
        const user = {
          id: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
          email,
          user_metadata: options?.data || { full_name: email.split('@')[0] },
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('supabase.auth.mock-user', JSON.stringify(user));
          document.cookie = `sb-mock-session=${JSON.stringify(user)}; path=/`;
        }
        return { data: { user }, error: null };
      },
      async signInWithPassword({ email }: any) {
        const user = {
          id: 'mock-user-id',
          email,
          user_metadata: { full_name: email.split('@')[0] },
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('supabase.auth.mock-user', JSON.stringify(user));
          document.cookie = `sb-mock-session=${JSON.stringify(user)}; path=/`;
        }
        return { data: { user }, error: null };
      },
      async signInWithOAuth({ provider, options }: any) {
        const user = {
          id: 'mock-oauth-id',
          email: 'oauth-user@example.com',
          user_metadata: { full_name: 'OAuth Explorer' },
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('supabase.auth.mock-user', JSON.stringify(user));
          document.cookie = `sb-mock-session=${JSON.stringify(user)}; path=/`;
          if (options?.redirectTo) {
            window.location.href = options.redirectTo;
          }
        }
        return { data: { user }, error: null };
      },
      async signOut() {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('supabase.auth.mock-user');
          document.cookie = 'sb-mock-session=; Max-Age=0; path=/';
        }
        return { error: null };
      },
      async getUser() {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('supabase.auth.mock-user');
          if (stored) {
            return { data: { user: JSON.parse(stored) }, error: null };
          }
        }
        return { data: { user: null }, error: null };
      },
      async getSession() {
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('supabase.auth.mock-user');
          if (stored) {
            return { data: { session: { user: JSON.parse(stored) } }, error: null };
          }
        }
        return { data: { session: null }, error: null };
      },
    },
  } as any;
}

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('mock-url')) {
    return createMockSupabaseClient();
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
