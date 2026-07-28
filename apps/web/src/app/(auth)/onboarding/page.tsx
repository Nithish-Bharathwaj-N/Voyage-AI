"use client";
import React, { useState } from 'react';
import { AuthLayout } from '../../../components/auth/AuthLayout';
import { Heading } from '../../../components/typography/Heading';
import { Text } from '../../../components/typography/Text';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
import { Icon } from '../../../components/icons/Icon';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock save profile logic
    setTimeout(() => {
      setIsLoading(false);
      router.push('/app'); // Redirect to dashboard
    }, 1000);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <div>
          <Heading level={3} className="mb-2">Just one more step</Heading>
          <Text variant="muted">Set up your profile to personalize your travel planning experience.</Text>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" placeholder="How should we call you?" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Preferred Currency</Label>
            <select id="currency" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-4">
            {isLoading ? <Icon name="Loader2" className="animate-spin" /> : 'Complete Setup'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
