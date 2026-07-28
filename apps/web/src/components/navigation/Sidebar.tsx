'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Compass, Bookmark, History, Settings, User,
  LayoutDashboard, Sparkles, Plus, Command, LogOut,
  BookMarked, CalendarCheck, PanelLeftClose, PanelLeftOpen, Trophy
} from 'lucide-react';
import { useUiStore } from '@/store/useUiStore';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/utils/cn';

const NAV_GROUPS = [
  {
    title: 'Core',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Explore', href: '/explore', icon: Compass },
    ]
  },
  {
    title: 'My Travel',
    items: [
      { label: 'My Trips', href: '/trips', icon: Bookmark },
      { label: 'Collections', href: '/collections', icon: BookMarked },
      { label: 'Reservations', href: '/reservations', icon: CalendarCheck },
    ]
  },
  {
    title: 'Insights',
    items: [
      { label: 'Statistics', href: '/stats', icon: Trophy },
      { label: 'History', href: '/history', icon: History },
    ]
  },
  {
    title: 'Account',
    items: [
      { label: 'Profile', href: '/profile', icon: User },
    ]
  }
];

export function Sidebar({ user }: { user?: { name: string, email: string } }) {
  const pathname = usePathname();
  const { sidebarOpen, setCommandPaletteOpen } = useUiStore();
  const router = useRouter();
  
  // Collapse state for desktop
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const displayName = user?.name || 'Traveler';
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : 'AI';

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    router.push('/');
  };
  
  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 250 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        "bg-background border-r border-border flex flex-col h-screen font-sans shrink-0 relative z-20 transition-transform md:translate-x-0",
        !sidebarOpen && "-translate-x-full absolute md:relative"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between shrink-0">
        <Link href="/dashboard" className={cn("flex items-center space-x-3 group", isCollapsed && "justify-center w-full")}>
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-black text-foreground text-lg tracking-tight"
            >
              VoyageAI
            </motion.span>
          )}
        </Link>
        
        {!isCollapsed && (
          <button onClick={() => setIsCollapsed(true)} className="p-1.5 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <button onClick={() => setIsCollapsed(false)} className="mx-auto mt-2 p-2 text-muted-foreground hover:bg-secondary rounded-xl transition-colors">
          <PanelLeftOpen className="w-5 h-5" />
        </button>
      )}

      {/* Global Search Button */}
      <div className="px-3 mt-4 mb-2 shrink-0">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className={cn(
            "w-full flex items-center bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/20 text-muted-foreground rounded-xl transition-all group",
            isCollapsed ? "justify-center p-2.5" : "px-3 py-2.5 space-x-3"
          )}
        >
          <Command className="w-4 h-4 group-hover:text-primary transition-colors shrink-0" />
          {!isCollapsed && (
            <>
              <span className="text-sm font-semibold flex-1 text-left">Search</span>
              <kbd className="hidden md:flex items-center space-x-0.5 text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded border border-border">
                <span>⌘</span><span>K</span>
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* Smart Context Area */}
      {!isCollapsed && pathname !== '/planner' && (
        <div className="px-4 py-2 shrink-0">
          <Link href="/planner" className="flex flex-col p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center space-x-2 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider text-indigo-100">AI Planner</span>
            </div>
            <span className="text-sm font-semibold">Where to next?</span>
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="w-4 h-4" />
            </div>
          </Link>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-none">
        {NAV_GROUPS.map((group, groupIdx) => (
          <div key={group.title} className="mb-6">
            {!isCollapsed && (
              <h4 className="px-3 mb-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {group.title}
              </h4>
            )}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative flex items-center rounded-xl text-sm font-semibold transition-colors group',
                      isCollapsed ? 'justify-center p-3' : 'px-3 py-2 space-x-3',
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    )}
                    title={isCollapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-accent border border-border shadow-sm rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    
                    <item.icon className={cn(
                      "w-4 h-4 shrink-0 relative z-10 transition-transform",
                      isActive ? "text-primary" : "group-hover:scale-110"
                    )} />
                    
                    {!isCollapsed && (
                      <span className="relative z-10 truncate">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* User Profile / Bottom Actions */}
      <div className="p-3 mt-auto shrink-0 border-t border-border bg-muted/30">
        
        {!isCollapsed && (
          <Link href="/settings" className="flex items-center space-x-3 px-3 py-2 mb-2 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-card hover:shadow-sm hover:text-foreground transition-all group">
            <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>Settings</span>
          </Link>
        )}

        <div className={cn(
          "flex items-center rounded-xl bg-card border border-border p-2 shadow-sm",
          isCollapsed ? "flex-col space-y-3" : "space-x-3"
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {initials}
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
              <p className="text-[10px] font-semibold text-muted-foreground truncate">Explorer Level</p>
            </div>
          )}

          <button 
            onClick={handleSignOut}
            className={cn(
              "text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-destructive/10",
              isCollapsed && "mt-2"
            )}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

    </motion.aside>
  );
}
