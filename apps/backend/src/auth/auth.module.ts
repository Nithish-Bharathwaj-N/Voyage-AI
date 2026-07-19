import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SupabaseStrategy } from './strategies/supabase.strategy';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'supabase-jwt' })],
  controllers: [AuthController],
  providers: [AuthService, SupabaseStrategy, SupabaseAuthGuard],
  exports: [SupabaseAuthGuard],
})
export class AuthModule {}
