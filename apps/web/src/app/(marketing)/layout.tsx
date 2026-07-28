import React from 'react';
import type { Metadata } from 'next';
import { MarketingNavbar } from '../../components/marketing/navbar/MarketingNavbar';
import { MarketingFooter } from '../../components/marketing/footer/MarketingFooter';

export const metadata: Metadata = {
  title: 'VoyageAI | Travel Intelligence Platform',
  description: 'Plan smarter. Travel confidently. Powered by intelligent planning.',
  openGraph: {
    title: 'VoyageAI | Travel Intelligence Platform',
    description: 'Plan smarter. Travel confidently. Powered by intelligent planning.',
    url: 'https://voyageai.com',
    siteName: 'VoyageAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoyageAI | Travel Intelligence Platform',
    description: 'Plan smarter. Travel confidently. Powered by intelligent planning.',
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <MarketingNavbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
