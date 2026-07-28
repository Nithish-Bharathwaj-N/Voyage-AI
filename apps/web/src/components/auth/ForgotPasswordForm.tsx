"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from './schema';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { Icon } from '@/components/icons/Icon';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    setIsLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setIsSent(true);
    }
  };

  if (isSent) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Icon name="MailCheck" className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <Heading level={3} className="mb-2">Check your email</Heading>
          <Text variant="muted">We sent a password reset link to your email.</Text>
        </div>
        <Button variant="outline" onClick={() => setIsSent(false)}>Back to reset</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={3} className="mb-2">Reset Password</Heading>
        <Text variant="muted">Enter your email and we&apos;ll send you a reset link.</Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading ? <Icon name="Loader2" className="animate-spin" /> : 'Send Reset Link'}
        </Button>
      </form>

      <Text className="text-center text-sm mt-4">
        Remember your password? <a href="/login" className="font-semibold text-primary hover:underline">Sign in</a>
      </Text>
    </div>
  );
}
