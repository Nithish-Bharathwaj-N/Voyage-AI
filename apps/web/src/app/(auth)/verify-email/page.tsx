"use client";
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons/Icon';

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Icon name="MailOpen" className="h-8 w-8 text-primary" />
        </div>
        
        <div>
          <Heading level={3} className="mb-2">Verify your email</Heading>
          <Text variant="muted">We&apos;ve sent a verification link to your email address. Please click the link to activate your account.</Text>
        </div>

        <div className="pt-4 border-t border-border/50">
          <Text size="sm" className="mb-4">Didn&apos;t receive the email?</Text>
          <Button variant="outline" className="w-full">
            Resend Verification Email
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
