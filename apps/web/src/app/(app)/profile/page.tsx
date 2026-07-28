'use client';

import React, { useState } from 'react';
import { useProfile, useProfileStats, useTravelPreferences, useActivityTimeline } from '@/lib/profile/hooks/useProfile';
import { ProfileHero } from '@/components/profile/hero/ProfileHero';
import { ProfileTabs, type ProfileTabId } from '@/components/profile/tabs/ProfileTabs';
import { ProfileStats } from '@/components/profile/cards/ProfileStats';
import { OverviewCard } from '@/components/profile/cards/OverviewCard';
import { TravelPreferencesCard } from '@/components/profile/cards/TravelPreferencesCard';
import { AchievementsCard } from '@/components/profile/cards/AchievementsCard';
import { RecentTripsCard } from '@/components/profile/cards/RecentTripsCard';
import { CollectionsPreviewCard } from '@/components/profile/cards/CollectionsPreviewCard';
import { ActivityTimeline } from '@/components/profile/activity/ActivityTimeline';
import { ProfileSkeleton } from '@/components/profile/shared/ProfileSkeleton';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('overview');
  
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: stats, isLoading: isLoadingStats } = useProfileStats();
  const { data: preferences, isLoading: isLoadingPrefs } = useTravelPreferences();
  const { data: timeline, isLoading: isLoadingTimeline } = useActivityTimeline();

  const isLoading = isLoadingProfile || isLoadingStats || isLoadingPrefs || isLoadingTimeline;

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile || !stats) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-rose-500 mb-2">Error loading profile</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">
        <OverviewCard profile={profile} />
        {preferences && <TravelPreferencesCard preferences={preferences} />}
        <RecentTripsCard />
        <CollectionsPreviewCard />
      </div>
      
      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-8">
        {timeline && <ActivityTimeline events={timeline} />}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <ProfileHero profile={profile} />
      
      <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileStats stats={stats} />
        
        <div className="mt-8">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'achievements' && (
            <div className="max-w-3xl mx-auto"><AchievementsCard /></div>
          )}
          {activeTab === 'preferences' && preferences && (
            <div className="max-w-3xl mx-auto"><TravelPreferencesCard preferences={preferences} /></div>
          )}
          {activeTab === 'trips' && (
            <div className="max-w-3xl mx-auto"><RecentTripsCard /></div>
          )}
          {activeTab === 'collections' && (
            <div className="max-w-3xl mx-auto"><CollectionsPreviewCard /></div>
          )}
        </div>
      </div>
    </div>
  );
}
