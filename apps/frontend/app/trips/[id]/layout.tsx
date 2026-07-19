'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, Map, FileText, Settings, Layers } from 'lucide-react';
import { CopilotPanel } from '@/components/layout/copilot-panel';
import { useParams, useSearchParams } from 'next/navigation';
import { useUiStore } from '@/store/useUiStore';

export default function TripWorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id } = useParams() as { id: string };
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'timeline';
  const copilotOpen = useUiStore((s) => s.copilotOpen);

  const navItems = [
    { label: 'Stop Timeline', icon: FileText, href: `/trips/${id}?tab=timeline`, active: activeTab === 'timeline' },
    { label: 'Map Workspace', icon: Map, href: `/trips/${id}?tab=map`, active: activeTab === 'map' },
    { label: 'Layer Settings', icon: Layers, href: `/trips/${id}?tab=layers`, active: activeTab === 'layers' },
    { label: 'Collaborators', icon: Settings, href: `/trips/${id}?tab=collaborators`, active: activeTab === 'collaborators' },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden font-sans bg-slate-50 text-slate-800">
      {/* Dynamic Left panel sub navigation menu */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 hidden md:flex">
        {/* Back Link */}
        <div className="p-4 border-b border-slate-200">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Workspace views navigation shortcuts */}
        <nav className="flex-1 p-4 space-y-1.5" aria-label="Workspace views">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:bg-slate-50:bg-slate-800/60 hover:text-slate-900:text-white'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Dynamic Center panel workspace */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {children}
      </div>

      {/* Right panel AI Copilot widget panel */}
      {copilotOpen && (
        <div className="shrink-0 hidden lg:block">
          <CopilotPanel tripId={id} />
        </div>
      )}
    </div>
  );
}
