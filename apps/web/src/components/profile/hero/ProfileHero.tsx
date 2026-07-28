'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import { useSearch } from '@/components/search/SearchProvider';
import type { UserProfile } from '@/lib/profile/types/profile.types';

export function ProfileHero({ profile }: { profile: UserProfile }) {
  const { setIsOpen } = useSearch();

  return (
    <div className="relative">
      {/* Cover Banner */}
      <div className="h-48 md:h-64 lg:h-80 w-full relative bg-zinc-900 overflow-hidden">
        {profile.coverBannerUrl && (
          <Image
            src={profile.coverBannerUrl}
            alt="Cover Banner"
            fill
            priority
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 lg:p-8 flex items-center justify-end gap-3 z-10">
          <button 
            onClick={() => setIsOpen(true)}
            className="p-2.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur border border-white/20 text-white transition-colors"
            aria-label="Search"
          >
            <Icon name="Search" size={20} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur border border-white/20 text-white font-medium transition-colors text-sm">
            <Icon name="Share" size={16} />
            Share Profile
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20 md:-mt-24">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8 mb-8">
          
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-zinc-800 border-4 border-background overflow-hidden relative shadow-2xl">
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                  <span className="text-4xl font-bold text-primary">{profile.displayName.charAt(0)}</span>
                </div>
              )}
            </div>
            {profile.isVerified && (
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <Icon name="Check" size={18} className="text-primary-foreground font-bold" />
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pb-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 flex items-center gap-3">
              {profile.displayName}
            </h1>
            <p className="text-lg text-muted-foreground font-medium flex items-center gap-2 mb-4">
              {profile.username}
              <span>·</span>
              <span className="text-primary font-bold">{profile.travelLevel}</span>
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Icon name="MapPin" size={16} /> {profile.location}</span>
              <span className="flex items-center gap-1.5"><Icon name="Calendar" size={16} /> Member since {new Date(profile.memberSince).getFullYear()}</span>
            </div>
          </div>

          {/* Edit Button */}
          <div className="pb-2">
            <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg">
              <Icon name="Edit2" size={18} />
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
