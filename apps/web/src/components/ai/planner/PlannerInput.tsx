'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';

export function PlannerInput({ onRefine }: { onRefine: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onRefine(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative mt-8 max-w-4xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Refine this plan (e.g. 'Add more vegetarian restaurants', 'Make it cheaper')..."
        className="w-full bg-card border border-white/10 rounded-2xl pl-4 pr-12 py-4 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-xl"
      />
      <button 
        type="submit"
        disabled={!query.trim()}
        className="absolute right-2 top-2 p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:bg-white/10 disabled:text-muted-foreground transition-all"
      >
        <Icon name="Sparkles" size={18} />
      </button>
    </form>
  );
}
