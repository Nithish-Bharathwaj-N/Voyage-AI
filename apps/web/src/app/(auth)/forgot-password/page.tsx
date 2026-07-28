import React from 'react';
import { AuthLayout } from '../../../components/auth/AuthLayout';
import { ForgotPasswordForm } from '../../../components/auth/ForgotPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | VoyageAI',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout 
      quote="Finally, a travel planner that looks and feels like a professional workspace. The UI is stunning and the offline sync saved me in Tokyo."
      author="Elena Rodriguez, Frequent Flyer"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
