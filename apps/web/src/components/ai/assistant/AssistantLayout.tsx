'use client';

import React from 'react';
import Link from 'next/link';

export function AssistantLayout({ children, activeId }: { children: React.ReactNode, activeId?: string }) {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar - Conversation List */}
      <div className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-sm font-semibold mb-4">Travel Assistant</h2>
          <Link href="/ai/assistant" className="block w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-center text-sm font-medium transition">
            + New Chat
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Mock conversations */}
          <Link href="/ai/assistant/chat-1" className={`block p-2 rounded text-sm truncate ${activeId === 'chat-1' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-900'}`}>
            Paris Trip Modification
          </Link>
          <Link href="/ai/assistant/chat-2" className={`block p-2 rounded text-sm truncate ${activeId === 'chat-2' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-900'}`}>
            Japan Budget Optimization
          </Link>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <header className="h-14 border-b border-zinc-800 flex items-center px-6 justify-between bg-zinc-950">
          <h1 className="text-sm font-medium">{activeId ? `Chat: ${activeId}` : 'New Conversation'}</h1>
          <div className="flex space-x-4 text-xs text-zinc-500">
            <button className="hover:text-zinc-300">History</button>
            <button className="hover:text-zinc-300">Export</button>
          </div>
        </header>

        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}
