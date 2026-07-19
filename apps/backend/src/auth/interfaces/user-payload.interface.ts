export interface SupabaseUserPayload {
  sub: string;
  email: string;
  email_verified?: boolean;
  phone?: string;
  role?: string;
  aal?: string;
  amr?: Array<{ method: string; timestamp: number }>;
  session_id?: string;
}
