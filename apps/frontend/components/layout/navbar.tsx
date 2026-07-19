'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Sun, Moon, Search, Command } from 'lucide-react';
import { useUiStore } from '@/store/useUiStore';

import { useAuth } from '@/components/providers/auth-provider';
import { CommandPalette } from '@/components/ui/command-palette';

export function Navbar() {
  const { toggleSidebar, setCommandPaletteOpen } = useUiStore();
  const pathname = usePathname();

  // Create simple breadcrumbs from pathname
  const paths = pathname.split('/').filter(Boolean);
  const breadcrumb = paths.length > 0 
    ? paths[0].charAt(0).toUpperCase() + paths[0].slice(1)
    : 'Dashboard';

  return (
    <>
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 flex items-center justify-between font-sans sticky top-0 z-40 transition-all">
        <div className="flex items-center space-x-4">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 -ml-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center space-x-2 text-sm font-semibold text-slate-400">
            <span className="hover:text-slate-600 cursor-pointer transition-colors">VoyageAI</span>
            <span>/</span>
            <span className="text-slate-900">{breadcrumb}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <button
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer relative"
          >
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette open={useUiStore(s => s.commandPaletteOpen)} onClose={() => setCommandPaletteOpen(false)} />
    </>
  );
}
