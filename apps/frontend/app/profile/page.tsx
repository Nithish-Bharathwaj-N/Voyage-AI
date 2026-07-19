'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store';
import { 
  User, Settings, Award, Shield, Heart, MapPin, 
  Wallet, Utensils, Home, Compass, Edit2
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { profile, updatePreferences } = useUserStore();

  if (!profile) return null; // Wait for init

  const handlePrefChange = (key: keyof typeof profile.preferences, value: string) => {
    updatePreferences({ [key]: value });
    toast.success('Preference updated successfully');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header / Hero */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-10" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-slate-200 rounded-full border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-slate-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 text-white rounded-full border-2 border-white hover:bg-indigo-700 transition-colors">
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
            
            <div className="text-center md:text-left flex-1 mt-2">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">{profile.name}</h1>
              <p className="text-slate-500 font-medium">{profile.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                {profile.badges.map(badge => (
                  <span key={badge} className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-md text-xs font-bold">
                    <Award className="w-3 h-3" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800 transition-colors shadow-sm">
              <Settings className="w-4 h-4" />
              Account Settings
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Preferences */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" />
                Travel Preferences
              </h3>
              
              <div className="space-y-6">
                {/* Budget */}
                <div>
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                    <Wallet className="w-4 h-4 text-slate-400" /> Budget Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['budget', 'standard', 'luxury'].map(level => (
                      <button
                        key={level}
                        onClick={() => handlePrefChange('budgetPreference', level)}
                        className={`p-3 rounded-xl border text-sm font-bold capitalize transition-all ${
                          profile.preferences.budgetPreference === level 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                    <Compass className="w-4 h-4 text-slate-400" /> Travel Style
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['solo', 'couple', 'family', 'group'].map(style => (
                      <button
                        key={style}
                        onClick={() => handlePrefChange('travelStyle', style)}
                        className={`p-3 rounded-xl border text-sm font-bold capitalize transition-all ${
                          profile.preferences.travelStyle === style 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Food */}
                <div>
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                    <Utensils className="w-4 h-4 text-slate-400" /> Dietary Preference
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['veg', 'non-veg', 'vegan', 'any'].map(food => (
                      <button
                        key={food}
                        onClick={() => handlePrefChange('foodPreference', food)}
                        className={`p-3 rounded-xl border text-sm font-bold capitalize transition-all ${
                          profile.preferences.foodPreference === food 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {food === 'veg' ? 'Vegetarian' : food}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accommodation */}
                <div>
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-3">
                    <Home className="w-4 h-4 text-slate-400" /> Accommodation
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['hotel', 'hostel', 'resort', 'homestay'].map(acc => (
                      <button
                        key={acc}
                        onClick={() => handlePrefChange('accommodation', acc)}
                        className={`p-3 rounded-xl border text-sm font-bold capitalize transition-all ${
                          profile.preferences.accommodation === acc 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        {acc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Private Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                Private Details
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Emergency Contact</div>
                  <div className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                    Not configured
                    <button className="text-indigo-600 text-xs hover:underline">Add</button>
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Passport Details</div>
                  <div className="text-sm font-semibold text-slate-700 flex items-center justify-between">
                    Not configured
                    <button className="text-indigo-600 text-xs hover:underline">Add</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                Visited Map
              </h3>
              <div className="aspect-square bg-slate-100 rounded-2xl border border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="w-10 h-10 text-slate-300 mb-3" />
                <p className="text-sm text-slate-500 font-medium">Map visualization unlocks when you complete 3 trips.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
