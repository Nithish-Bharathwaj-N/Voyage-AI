import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { Text } from '../typography/Text';

interface AuthLayoutProps {
  children: React.ReactNode;
  quote?: string;
  author?: string;
}

export function AuthLayout({ 
  children, 
  quote = "The spatial planner completely changed how I organize my trips. It's like having a digital travel agent.",
  author = "Sarah Jenkins, Explorer"
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      
      {/* Left Form Panel */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <Icon name="Plane" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight text-xl">VoyageAI</span>
          </Link>
          
          {children}
        </div>
      </div>

      {/* Right Image/Quote Panel */}
      <div className="hidden lg:block relative w-full bg-muted/30">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-16 pb-24">
          <Icon name="Quote" size={48} className="text-primary/20 mb-6" />
          <Text size="xl" className="font-medium text-foreground max-w-lg leading-relaxed mb-4">
            &ldquo;{quote}&rdquo;
          </Text>
          <Text variant="muted" className="font-semibold tracking-tight uppercase text-xs">
            {author}
          </Text>
        </div>
      </div>
      
    </div>
  );
}
