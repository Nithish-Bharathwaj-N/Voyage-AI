'use client';

import React, { useState } from 'react';
import { useSettings } from '@/lib/settings/hooks/useSettings';
import { SettingsSidebar, type SettingsSectionId } from '@/components/settings/sidebar/SettingsSidebar';
import { SettingsSkeleton } from '@/components/settings/shared/SettingsSkeleton';
import { AccountCard } from '@/components/settings/cards/AccountCard';
import { TravelPreferencesCard } from '@/components/settings/cards/TravelPreferencesCard';
import { AppearanceCard } from '@/components/settings/cards/AppearanceCard';
import { NotificationsCard } from '@/components/settings/cards/NotificationsCard';
import { PrivacyCard } from '@/components/settings/cards/PrivacyCard';
import { SecurityCard } from '@/components/settings/cards/SecurityCard';
import { ConnectedAccountsCard } from '@/components/settings/cards/ConnectedAccountsCard';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSectionId>('account');
  const { data: settings, isLoading } = useSettings();

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-rose-500 mb-2">Error loading settings</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'account': return <AccountCard settings={settings.account} />;
      case 'preferences': return <TravelPreferencesCard settings={settings.preferences} />;
      case 'appearance': return <AppearanceCard settings={settings.appearance} />;
      case 'notifications': return <NotificationsCard settings={settings.notifications} />;
      case 'privacy': return <PrivacyCard settings={settings.privacy} />;
      case 'security': return <SecurityCard />;
      case 'connected': return <ConnectedAccountsCard />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">Settings</h1>
            <p className="text-muted-foreground text-sm">Manage your account and preferences.</p>
          </div>
          
          <button className="hidden md:flex px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            Save Changes
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-8 relative">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <SettingsSidebar activeSection={activeSection} onChange={setActiveSection} />
          </div>

          {/* Content */}
          <div className="flex-1 max-w-3xl">
            {renderContent()}
          </div>

        </div>

        {/* Mobile Sticky Save */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-white/10 z-50">
          <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
