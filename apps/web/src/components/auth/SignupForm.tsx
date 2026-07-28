"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '../../lib/supabase/client';
import { signupSchema, type SignupFormValues } from './schema';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Icon } from '@/components/icons/Icon';
import { useRouter } from 'next/navigation';

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const password = watch("password", "");

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.name }
      }
    });
    
    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push('/verify-email');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Heading level={3} className="mb-2">Create an account</Heading>
        <Text variant="muted">Start planning smarter today.</Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {error && <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" {...register('name')} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
          {password && password.length < 8 && <p className="text-xs text-muted-foreground">Too short</p>}
          {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" placeholder="••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="terms" {...register('terms')} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <Label htmlFor="terms" className="font-normal text-muted-foreground">I agree to the <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a></Label>
        </div>
        {errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}

        <Button type="submit" disabled={isLoading} className="w-full mt-2">
          {isLoading ? <Icon name="Loader2" className="animate-spin" /> : 'Create Account'}
        </Button>
      </form>

      <Text className="text-center text-sm mt-2">
        Already have an account? <a href="/login" className="font-semibold text-primary hover:underline">Sign in</a>
      </Text>
    </div>
  );
}
