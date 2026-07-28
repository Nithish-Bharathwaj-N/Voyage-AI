'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface CategoryChipsProps {
  selectedCategories: string[];
  onSelectCategory: (category: string) => void;
}

const CATEGORIES = [
  { id: 'All', label: 'All Places' },
  { id: 'Culture', label: '🏛️ Culture' },
  { id: 'Gastronomy', label: '🍜 Gastronomy' },
  { id: 'Beaches', label: '🏖️ Beaches' },
  { id: 'Nature', label: '🌲 Nature' },
  { id: 'Adventure', label: '🧗 Adventure' },
  { id: 'City Breaks', label: '🏙️ City Breaks' },
];

export function CategoryChips({ selectedCategories, onSelectCategory }: CategoryChipsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-1.5 flex gap-2">
      {CATEGORIES.map((cat) => {
        const isSelected = 
          cat.id === 'All' 
            ? selectedCategories.length === 0 
            : selectedCategories.includes(cat.id);

        return (
          <Button
            key={cat.id}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            className={`h-9 rounded-full px-4 text-xs font-semibold shrink-0 border-border transition-all ${
              isSelected 
                ? 'bg-foreground text-background hover:bg-foreground/90 font-bold' 
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}
