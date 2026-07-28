import React from 'react';
import { AuthLayout } from '../../../components/auth/AuthLayout';
import { ResetPasswordForm } from '../../../components/auth/ResetPasswordForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Password | VoyageAI',
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
