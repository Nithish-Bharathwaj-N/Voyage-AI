'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Wallet, Users, Compass, Utensils, CheckCircle2, Sparkles } from 'lucide-react';

interface TripBuilderFormProps {
  liveParameters: any;
  onSelectParameter: (key: string, value: string) => void;
  onGenerate: () => void;
}

const DURATIONS = ['2 Days', '3 Days', '5 Days', '7 Days', '10 Days'];
const BUDGETS = ['Budget', 'Moderate', 'Premium', 'Luxury'];
const TRAVELERS = ['Solo', 'Couple', 'Family', 'Friends'];
const STYLES = ['Adventure', 'Nature', 'Relaxation', 'Culture', 'Photography'];
const FOODS = ['Local Cuisine', 'Vegetarian', 'Vegan', 'Halal', 'Fine Dining'];

export function TripBuilderForm({ liveParameters, onSelectParameter, onGenerate }: TripBuilderFormProps) {
  const steps = [
    { key: 'destination', label: 'Destination', value: liveParameters.destination },
    { key: 'duration', label: 'Duration', value: liveParameters.duration },
    { key: 'budget', label: 'Budget', value: liveParameters.budget },
    { key: 'travelers', label: 'Travelers', value: liveParameters.travelers },
    { key: 'style', label: 'Style', value: liveParameters.style },
  ];

  const completedCount = steps.filter(s => s.value).length;
  const progress = (completedCount / steps.length) * 100;

  const renderChips = (key: string, options: string[]) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelectParameter(key, opt)}
          className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 ${
            liveParameters[key] === opt 
              ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-8 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Trip Builder</h2>
        <p className="text-slate-500 font-medium mt-1">Select your preferences or chat with VoyageAI.</p>
        
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase">{Math.round(progress)}% Complete</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Destination</h3>
              <p className="text-sm text-slate-500">{liveParameters.destination || 'Type in chat...'}</p>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Duration</h3>
              <p className="text-sm text-slate-500">{liveParameters.duration || 'Select duration'}</p>
            </div>
          </div>
          {renderChips('duration', DURATIONS)}
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Budget</h3>
              <p className="text-sm text-slate-500">{liveParameters.budget || 'Select budget'}</p>
            </div>
          </div>
          {renderChips('budget', BUDGETS)}
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Travelers</h3>
              <p className="text-sm text-slate-500">{liveParameters.travelers || 'Who is going?'}</p>
            </div>
          </div>
          {renderChips('travelers', TRAVELERS)}
        </div>

        <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Style</h3>
              <p className="text-sm text-slate-500">{liveParameters.style || 'Vibe of the trip?'}</p>
            </div>
          </div>
          {renderChips('style', STYLES)}
        </div>

      </div>

      <AnimatePresence>
        {progress >= 60 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 mb-12 sticky bottom-4 z-10"
          >
            <button
              onClick={onGenerate}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5" />
              Generate Itinerary
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
