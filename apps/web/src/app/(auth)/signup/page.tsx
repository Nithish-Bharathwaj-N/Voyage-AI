import React from 'react';
import { AuthLayout } from '../../../components/auth/AuthLayout';
import { SignupForm } from '../../../components/auth/SignupForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up | VoyageAI',
};

export default function SignupPage() {
  return (
    <AuthLayout 
      quote="The Copilot is the first AI tool I've used that actually respects constraints. I told it my budget was $2,000 and it flagged expensive restaurants instantly."
      author="David Chen, Digital Nomad"
    >
      <SignupForm />
    </AuthLayout>
  );
}
