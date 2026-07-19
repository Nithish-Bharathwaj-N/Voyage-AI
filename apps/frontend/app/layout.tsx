import * as React from 'react';
import type { Metadata } from 'next';
import './globals.css';

import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { AppLayout } from '@/components/layout/app-layout';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'VoyageAI — AI Travel Operating System',
  description: 'AI-powered personalized travel itinerary generation, route optimization, and live maps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
            :root {
              --font-sans: 'Inter', sans-serif;
              --font-display: 'Outfit', sans-serif;
            }
          `}
        </style>
      </head>
      <body className="antialiased font-sans bg-slate-50">
        <QueryProvider>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster richColors closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
