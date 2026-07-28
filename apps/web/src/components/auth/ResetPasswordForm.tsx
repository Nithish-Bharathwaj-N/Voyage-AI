"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '../../lib/supabase/client';
import { resetPasswordSchema, type ResetPasswordFormValues } from './schema';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Icon } from '@/components/icons/Icon';
import { useRouter } from 'next/navigation';

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({
      password: data.password
    });
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={3} className="mb-2">Create new password</Heading>
        <Text variant="muted">Your new password must be at least 8 characters long.</Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
        
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading ? <Icon name="Loader2" className="animate-spin" /> : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}
