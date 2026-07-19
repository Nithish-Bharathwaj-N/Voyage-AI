import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private clientInstance: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.get<string>('supabase.url');
    const serviceRoleKey = this.configService.get<string>('supabase.serviceRoleKey');

    if (!url || !serviceRoleKey) {
      this.logger.error('Supabase config url or serviceRoleKey is missing.');
      throw new Error('Supabase client failed to initialize due to missing config');
    }

    // We instantiate Supabase client using the service role key for administrative functions (creating users directly, syncing)
    this.clientInstance = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    this.logger.log('Supabase admin client initialized successfully.');
  }

  /**
   * Retrieves the administrative Supabase client instance.
   */
  public getClient(): SupabaseClient {
    return this.clientInstance;
  }
}
