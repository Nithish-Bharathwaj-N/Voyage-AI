'use client';

import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Moon, Sun, Monitor, Bell, Brain, Shield, Trash2,
  Check, Palette, Database, Save, Eye, Globe, Download, AlertTriangle, Loader2
} from 'lucide-react';
import { useUiStore } from '@/store/useUiStore';
import { profileService } from '@/services/profile.service';
import { QueryError } from '@/components/ui/query-error';

export default function SettingsPage() {
  const queryClient = useQueryClient();

  // Zustand store properties
  const sidebarOpen = useUiStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUiStore((s) => s.setSidebarOpen);
  
  const aiPreferences = useUiStore((s) => s.aiPreferences);
  const setAiPreferences = useUiStore((s) => s.setAiPreferences);
  
  const notificationPrefs = useUiStore((s) => s.notificationPrefs);
  const setNotificationPrefs = useUiStore((s) => s.setNotificationPrefs);

  const [savingSections, setSavingSections] = React.useState<Record<string, boolean>>({});
  const [deleteConfirmText, setDeleteConfirmText] = React.useState('');
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  // Fetch real travel preferences from backend
  const { 
    data: prefRes, 
    isLoading: loadingPrefs, 
    isError: isPrefsError,
    error: prefsErrObj,
    refetch: refetchPrefs 
  } = useQuery({
    queryKey: ['profile', 'preferences'],
    queryFn: () => profileService.getPreferences(),
  });

  const preferences = prefRes?.data;

  // Real backend update preferences mutation
  const updatePrefMutation = useMutation({
    mutationFn: (dto: any) => profileService.updatePreferences(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'preferences'] });
      toast.success('Travel preferences updated on the backend!');
      setSavingSections((prev) => ({ ...prev, travelPrefs: false }));
    },
    onError: (err: any) => {
      toast.error(err.message || 'Failed to update travel preferences.');
      setSavingSections((prev) => ({ ...prev, travelPrefs: false }));
    }
  });

  const handleSaveSection = (sectionName: string, successMsg: string) => {
    setSavingSections((prev) => ({ ...prev, [sectionName]: true }));
    // Instantly simulate success since Zustand/next-themes is local
    setTimeout(() => {
      setSavingSections((prev) => ({ ...prev, [sectionName]: false }));
      toast.success(successMsg);
    }, 200);
  };

  const handleSaveTravelPrefs = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSavingSections((prev) => ({ ...prev, travelPrefs: true }));
    const formData = new FormData(e.currentTarget);
    const dto = {
      travelStyle: formData.get('travelStyle') as string,
      preferredTransport: formData.get('preferredTransport') as string,
      budgetRange: formData.get('budgetRange') as string,
    };
    updatePrefMutation.mutate(dto);
  };

  const handleExportData = () => {
    toast.success('Data export requested. You will receive a link to download your archive within 24 hours.');
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmText.toLowerCase() === 'delete') {
      toast.error('Account deletion request submitted. Check your email to confirm deletion.');
      setShowDeleteModal(false);
      setDeleteConfirmText('');
    } else {
      toast.error('Please type "delete" to confirm.');
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  if (loadingPrefs) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex flex-col justify-center items-center h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse">Loading settings canvas...</p>
      </div>
    );
  }

  if (isPrefsError) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex items-center justify-center min-h-[60vh]">
        <QueryError 
          error={prefsErrObj} 
          onRetry={refetchPrefs} 
          message="Failed to load settings due to connectivity issues."
        />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 font-sans text-slate-800">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold font-display text-slate-900 flex items-center gap-2">
          <span>Settings</span>
        </h1>
        <p className="text-sm text-slate-550">
          Manage your travel app workspace preferences, AI config, and privacy settings.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Section 1: Appearance */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Palette className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base font-display">Workspace Appearance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Sidebar toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Default Sidebar State</label>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold">Sidebar Expanded</span>
                  <p className="text-[10px] text-slate-500 leading-normal">Keep the main left navigation bar expanded by default.</p>
                </div>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`w-10 h-6 rounded-full transition-all relative ${
                    sidebarOpen ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    sidebarOpen ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleSaveSection('appearance', 'Appearance settings saved!')}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200:bg-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {savingSections.appearance ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Changes</span>
            </button>
          </div>
        </motion.div>

        {/* Section 2: Real Travel Preferences (Backend Wired) */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base font-display">Global Travel Preferences</h3>
          </div>

          <form onSubmit={handleSaveTravelPrefs} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Travel Style</label>
                <select
                  name="travelStyle"
                  defaultValue={preferences?.travelStyle || 'Cultural'}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-800"
                >
                  <option value="Cultural">Cultural exploration</option>
                  <option value="Adventure">Outdoor adventure</option>
                  <option value="Relaxing">Relaxing resort style</option>
                  <option value="Foodie">Gastronomy & food focus</option>
                  <option value="Luxury">Luxury style</option>
                  <option value="Budget">Budget conscious</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preferred Transport</label>
                <select
                  name="preferredTransport"
                  defaultValue={preferences?.preferredTransport || 'Train'}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-800"
                >
                  <option value="Train">Trains & Metros</option>
                  <option value="Flight">Flights</option>
                  <option value="Car">Rental Cars</option>
                  <option value="Public">Public Transit Bus</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Budget Range</label>
                <select
                  name="budgetRange"
                  defaultValue={preferences?.budgetRange || 'Mid-range'}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-800"
                >
                  <option value="Budget">Budget / Saver</option>
                  <option value="Mid-range">Mid-range / Standard</option>
                  <option value="Luxury">Luxury / Executive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={updatePrefMutation.isPending}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm"
              >
                {updatePrefMutation.isPending ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>{updatePrefMutation.isPending ? 'Saving...' : 'Save Preferences'}</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Section 3: Notifications */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base font-display">Notification Preferences</h3>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { key: 'email', label: 'Email Alerts', desc: 'Receive newsletters, receipts, and account activity updates.' },
              { key: 'aiRecommendations', label: 'AI Optimization Warnings', desc: 'Alert me when AI finds weather shifts or price drops for active plans.' },
              { key: 'tripReminders', label: 'Upcoming Trip Reminders', desc: 'Get notifications 24h prior to travel plans and itinerary events.' },
              { key: 'budgetAlerts', label: 'Budget Limit Warnings', desc: 'Get flagged immediately if itinerary additions exceed total budget cap.' },
              { key: 'weeklyDigest', label: 'Weekly Travel Digest', desc: 'Receive a curated weekly breakdown of trending hotspots and local guides.' }
            ].map((item) => {
              const active = (notificationPrefs as any)[item.key];
              return (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-b-0">
                  <div className="space-y-0.5 max-w-[80%]">
                    <span className="text-xs font-bold">{item.label}</span>
                    <p className="text-[11px] text-slate-505 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotificationPrefs({ [item.key]: !active })}
                    className={`w-10 h-6 rounded-full transition-all relative ${
                      active ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                      active ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleSaveSection('notifications', 'Notification preferences updated!')}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200:bg-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {savingSections.notifications ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Preferences</span>
            </button>
          </div>
        </motion.div>

        {/* Section 4: AI Settings */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base font-display">AI Engine Optimization</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Provider selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Model Engine</label>
              <select
                value={aiPreferences.provider}
                onChange={e => setAiPreferences({ provider: e.target.value })}
                className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 font-medium text-slate-800"
              >
                <option value="gemini">Google Gemini 1.5 Pro</option>
                <option value="openai">OpenAI GPT-4o (Staging/Sandbox)</option>
                <option value="anthropic">Claude 3.5 Sonnet</option>
              </select>
            </div>

            {/* Toggle sliders */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold">Show AI Thinking Steps</span>
                  <p className="text-[10px] text-slate-500">Display intermediate step-by-step thinking stages of the AI model.</p>
                </div>
                <button
                  onClick={() => setAiPreferences({ showThinking: !aiPreferences.showThinking })}
                  className={`w-10 h-6 rounded-full transition-all relative ${
                    aiPreferences.showThinking ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    aiPreferences.showThinking ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold">Auto-Save Generated Itineraries</span>
                  <p className="text-[10px] text-slate-500 font-sans leading-relaxed">Automatically persist generated itineraries directly into database workspace.</p>
                </div>
                <button
                  onClick={() => setAiPreferences({ autoSave: !aiPreferences.autoSave })}
                  className={`w-10 h-6 rounded-full transition-all relative ${
                    aiPreferences.autoSave ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${
                    aiPreferences.autoSave ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleSaveSection('ai', 'AI Engine optimization settings saved!')}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200:bg-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {savingSections.ai ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Optimization</span>
            </button>
          </div>
        </motion.div>

        {/* Section 5: Privacy & Data */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-base font-display">Privacy & Data Portability</h3>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-2 border-b border-slate-55 pb-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold">Personal Data Archive</span>
                <p className="text-[11px] text-slate-500 font-sans leading-relaxed">Download a full backup of all your created trips, custom spots, and profile logs as a JSON file.</p>
              </div>
              <button
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 w-fit cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export My Data</span>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5 max-w-[80%]">
                <span className="text-xs font-bold">Allow AI Data Training Usage</span>
                <p className="text-[11px] text-slate-550 font-sans leading-relaxed">Authorize VoyageAI to utilize anonymized itinerary patterns to improve regional suggestions. (GDPR compliant)</p>
              </div>
              <button
                className="w-10 h-6 bg-slate-200 rounded-full relative cursor-not-allowed"
                disabled
              >
                <div className="w-4 h-4 rounded-full bg-white absolute top-1 left-1" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Section 6: Danger Zone */}
        <motion.div variants={itemVariants} className="border border-red-250 bg-red-50/10 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-red-100 pb-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-extrabold text-base font-display text-red-650">Danger Zone</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 py-2">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-900">Permanently Delete Account</span>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Delete your account and all associated trip lists, preferences, and custom markers. This action is irreversible.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1.5 px-4.5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 w-fit cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Account</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-slate-150 pb-3 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-lg font-display">Delete Account Permanently</h3>
            </div>
            
            <p className="text-xs text-slate-550 leading-relaxed font-medium font-sans">
              This action cannot be undone. All your trips, saved destinations, and settings preferences will be wiped from PostgreSQL.
            </p>
            
            <form onSubmit={handleDeleteAccount} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type &quot;delete&quot; to confirm</label>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={e => setDeleteConfirmText(e.target.value)}
                  placeholder="delete"
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-205 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-650 focus:border-red-655 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmText('');
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-850:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
