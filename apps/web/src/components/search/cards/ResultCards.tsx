'use client';

import React from 'react';
import Image from 'next/image';
import { Icon, type IconName } from '@/components/icons/Icon';
import { SearchResultItem } from '@/lib/services/search';

interface ResultProps {
  item: SearchResultItem;
  isSelected: boolean;
  onClick: () => void;
}

export function DestinationResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      {item.imageUrl ? (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-muted">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
          <Icon name="Compass" size={20} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground">• Destination</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
      </div>
      {item.metadata && (
        <div className="text-right shrink-0">
          <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs justify-end">
            <Icon name="Star" size={10} className="fill-current" />
            {item.metadata.rating}
          </div>
          <span className="text-[10px] text-muted-foreground font-medium block mt-0.5">{item.metadata.price}</span>
        </div>
      )}
    </div>
  );
}

export function TripResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary">
        <Icon name="Map" size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground">• Trip Planner</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
      </div>
      {item.subtitle && (
        <span className="text-[10px] font-bold bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 shrink-0 uppercase tracking-wider">
          {item.subtitle}
        </span>
      )}
    </div>
  );
}

export function ActivityResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
        <Icon name="Sparkles" size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground">• Activity</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.subtitle} • {item.description}</p>
      </div>
      {item.metadata && (
        <span className="text-xs font-bold text-emerald-600 shrink-0">
          {item.metadata.cost}
        </span>
      )}
    </div>
  );
}

export function HotelResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-600">
        <Icon name="Home" size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground">• Hotel</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.subtitle} • {item.description}</p>
      </div>
      {item.metadata && (
        <div className="text-right shrink-0">
          <div className="flex items-center gap-0.5 text-amber-500 font-bold text-xs justify-end">
            <Icon name="Star" size={10} className="fill-current" />
            {item.metadata.rating}
          </div>
          <span className="text-[10px] text-muted-foreground block mt-0.5">
            {item.metadata.stars} Star(s)
          </span>
        </div>
      )}
    </div>
  );
}

export function RestaurantResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-600">
        <Icon name="Store" size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground">• Restaurant</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.subtitle} • {item.description}</p>
      </div>
      {item.metadata && (
        <span className="text-xs font-bold text-foreground shrink-0">
          {item.metadata.price}
        </span>
      )}
    </div>
  );
}

export function FlightResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center shrink-0 text-foreground">
        <Icon name="Plane" size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground">• Flight</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.subtitle} • {item.description}</p>
      </div>
    </div>
  );
}

export function CommandResult({ item, isSelected, onClick }: ResultProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20 animate-none' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 text-primary">
        <Icon name="Terminal" size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-primary/70 font-semibold">• Shortcut Action</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
      </div>
      <div className="shrink-0 flex items-center gap-0.5">
        <kbd className="h-5 px-1.5 rounded border border-border bg-muted flex items-center justify-center text-[10px] font-mono text-muted-foreground font-bold shadow-sm">
          ⏎
        </kbd>
      </div>
    </div>
  );
}

export function GenericResult({ item, isSelected, onClick }: ResultProps) {
  const getIcon = (domain: string): IconName => {
    switch (domain) {
      case 'collections': return 'Bookmark';
      case 'users': return 'User';
      default: return 'Compass';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/40 border border-transparent'
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
        <Icon name={getIcon(item.domain)} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-sm text-foreground truncate">{item.title}</h4>
          <span className="text-[10px] text-muted-foreground block capitalize">• {item.domain}</span>
        </div>
        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
      </div>
    </div>
  );
}

export function UnifiedResultCard({ item, isSelected, onClick }: ResultProps) {
  switch (item.domain) {
    case 'destinations':
      return <DestinationResult item={item} isSelected={isSelected} onClick={onClick} />;
    case 'trips':
      return <TripResult item={item} isSelected={isSelected} onClick={onClick} />;
    case 'activities':
      return <ActivityResult item={item} isSelected={isSelected} onClick={onClick} />;
    case 'hotels':
      return <HotelResult item={item} isSelected={isSelected} onClick={onClick} />;
    case 'restaurants':
      return <RestaurantResult item={item} isSelected={isSelected} onClick={onClick} />;
    case 'flights':
      return <FlightResult item={item} isSelected={isSelected} onClick={onClick} />;
    case 'commands':
      return <CommandResult item={item} isSelected={isSelected} onClick={onClick} />;
    default:
      return <GenericResult item={item} isSelected={isSelected} onClick={onClick} />;
  }
}
