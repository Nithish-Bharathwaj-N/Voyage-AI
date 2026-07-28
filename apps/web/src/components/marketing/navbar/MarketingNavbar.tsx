"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons/Icon';

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary px-4 py-2 text-center flex items-center justify-center relative">
      <p className="text-primary-foreground text-sm font-medium">
        🚀 AI-powered travel planning is here. <a href="#" className="underline underline-offset-2 ml-1">Learn More</a>
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
        aria-label="Dismiss banner"
      >
        <Icon name="X" size={16} />
      </button>
    </div>
  );
}

export function MarketingNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBanner />
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Icon name="Plane" size={18} className="text-primary-foreground" />
              </div>
              <span className="font-bold tracking-tight text-xl">VoyageAI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
            {/* Mobile menu trigger */}
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Icon name="Menu" />
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
