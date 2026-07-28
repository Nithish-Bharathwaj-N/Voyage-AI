import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseGuard implements CanActivate {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_ANON_KEY || ''
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('No authorization header');
    
    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    // If using the local mock test-journey.js token with fallback secret, we can try to let it through
    // But since we want strict real JWT, we query Supabase:
    const { data: { user }, error } = await this.supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new UnauthorizedException('Invalid Supabase token');
    }
    
    request.user = { userId: user.id, email: user.email, role: user.role };
    return true;
  }
}
