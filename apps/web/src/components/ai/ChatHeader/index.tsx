'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

interface ChatHeaderProps {
  title: string;
  onClose: () => void;
}

export function ChatHeader({ title, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-card">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon name="Sparkles" size={16} className="text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">VoyageAI Copilot</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-colors">
          <Icon name="MoreVertical" size={18} />
        </button>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-colors"
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
}
