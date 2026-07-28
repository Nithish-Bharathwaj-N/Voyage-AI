'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';
import type { SharedUser } from '@/lib/trips/types/trips.types';

interface TravelersChipProps {
  count: number;
  sharedWith?: SharedUser[];
  className?: string;
}

export const TravelersChip = React.memo(function TravelersChip({
  count,
  sharedWith,
  className,
}: TravelersChipProps) {
  const avatarsToShow = sharedWith?.slice(0, 3) ?? [];

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {avatarsToShow.length > 0 ? (
        <div className="flex -space-x-1.5">
          {avatarsToShow.map((user) =>
            user.avatarUrl ? (
              <div
                key={user.id}
                className="w-5 h-5 rounded-full border border-black/30 overflow-hidden"
              >
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                key={user.id}
                className="w-5 h-5 rounded-full border border-black/30 bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary"
              >
                {user.name.charAt(0)}
              </div>
            )
          )}
        </div>
      ) : (
        <Icon name="Users" size={12} className="text-white/50" />
      )}
      <span className="text-[11px] text-white/60 font-medium">
        {count} {count === 1 ? 'traveler' : 'travelers'}
      </span>
    </div>
  );
});
