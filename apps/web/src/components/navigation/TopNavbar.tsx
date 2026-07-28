"use client";
import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '../ui/Button';
import { useAuth } from '@/providers/AuthProvider';

interface TopNavbarProps {
  user?: { name: string; email: string; avatarUrl?: string };
}

export function TopNavbar({ user: propUser }: TopNavbarProps) {
  const { user: authUser, signOut } = useAuth();
  const userName = authUser?.user_metadata?.name || authUser?.email?.split('@')[0] || propUser?.name || 'User';
  const initials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="h-14 shrink-0 flex items-center justify-between px-4 lg:px-8 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden shrink-0">
            <Icon name="Menu" />
          </Button>
          <span className="font-semibold tracking-tight text-sm text-foreground hidden sm:inline-flex items-center gap-2">
            Voyage Workspace
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden md:flex gap-1.5 h-8">
            <Icon name="Plus" size={14} /> Create
          </Button>

          <div 
            className="relative hidden md:flex items-center cursor-pointer group"
            onClick={() => setIsSearchOpen(true)}
          >
            <Icon name="Search" size={16} className="absolute left-2.5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <div className="h-8 w-56 rounded-md border border-input bg-muted/30 px-8 py-1.5 text-xs text-muted-foreground group-hover:bg-muted/50 transition-colors flex items-center justify-between">
              Search trips, places...
              <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground hover:text-foreground relative">
            <Icon name="Bell" size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0 shadow-sm cursor-pointer hover:opacity-90">
            {initials}
          </div>
        </div>
      </header>

      {/* Command Palette Mockup */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-card w-full max-w-lg rounded-xl shadow-2xl border border-border overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-border/50">
              <Icon name="Search" size={18} className="text-muted-foreground mr-3" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search anything..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs text-muted-foreground hover:text-foreground bg-muted px-2 py-1 rounded">ESC</button>
            </div>
            <div className="p-2">
              <div className="text-xs font-semibold text-muted-foreground px-2 py-1.5 mb-1 uppercase tracking-wider">Recent Searches</div>
              <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50 cursor-pointer">
                <Icon name="MapPin" size={16} className="text-muted-foreground" />
                <span>Tokyo Itinerary</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50 cursor-pointer">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span>December Trips</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
