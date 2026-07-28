import React from 'react';
import { AuthLayout } from '../../../components/auth/AuthLayout';
import { LoginForm } from '../../../components/auth/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in | VoyageAI',
};

export default function LoginPage() {
  return (
    <AuthLayout 
      quote="VoyageAI completely replaced my 20-tab Google Sheets setup. The spatial awareness when organizing days is mind-blowing."
      author="Sarah Jenkins, Travel Blogger"
    >
      <LoginForm />
    </AuthLayout>
  );
}
