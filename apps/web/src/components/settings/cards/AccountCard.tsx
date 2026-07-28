'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import type { AccountSettings } from '@/lib/settings/types/settings.types';

export function AccountCard({ settings }: { settings: AccountSettings }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Account Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your personal information and identity.</p>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl p-6 space-y-8">
        
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 overflow-hidden relative">
            {settings.avatarUrl ? (
              <Image src={settings.avatarUrl} alt="Avatar" fill className="object-cover" />
            ) : (
              <Icon name="User" size={32} className="absolute inset-0 m-auto text-muted-foreground" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Profile Picture</h4>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm transition-colors hover:bg-primary/90">
                Upload new
              </button>
              <button className="px-4 py-2 bg-white/5 text-foreground font-medium rounded-lg text-sm transition-colors hover:bg-white/10 border border-white/10">
                Remove
              </button>
            </div>
          </div>
        </div>

        <hr className="border-white/5" />

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">First Name</label>
            <input 
              type="text" 
              defaultValue={settings.firstName}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Last Name</label>
            <input 
              type="text" 
              defaultValue={settings.lastName}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <input 
              type="text" 
              defaultValue={settings.username}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              defaultValue={settings.email}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Currency</label>
            <select 
              defaultValue={settings.currency}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
