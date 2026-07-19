import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

const isMockMode = (supabaseUrl === 'https://mock.supabase.co' || supabaseAnonKey === 'mock-anon-key');

if (process.env.NODE_ENV === 'production' && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn('WARNING: Supabase environment configuration variables are missing in production build environment. Falling back to mockup configurations.');
}

 
let supabaseClientInstance: any;

if (!isMockMode) {
  supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
} else {
  // Zero-config mock fallback auth client for local developer validation
  const mockUser = {
    id: 'e8006e86-fe67-4c5f-8515-50e9af6cdbef',
    email: 'local@example.com',
    user_metadata: { first_name: 'Local', last_name: 'Tester' },
  };

  const mockSession = {
    access_token: 'mock-session-jwt-token-1234',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    user: mockUser,
  };

  supabaseClientInstance = {
    auth: {
      signUp: async ({ email, options }: any) => {
        return {
          data: {
            user: {
              ...mockUser,
              email,
              user_metadata: options?.data || { first_name: 'Local', last_name: 'Tester' }
            }
          },
          error: null
        };
      },
      signInWithPassword: async ({ email }: any) => {
        return {
          data: {
            user: { ...mockUser, email },
            session: mockSession
          },
          error: null
        };
      },
      signOut: async () => {
        return { error: null };
      },
      getSession: async () => {
        return {
          data: { session: mockSession },
          error: null
        };
      },
      onAuthStateChange: (callback: any) => {
        // Invoke callback with signed in session state
        callback('SIGNED_IN', mockSession);
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          }
        };
      }
    }
  };
}
 

export const supabase = supabaseClientInstance as SupabaseClient;

