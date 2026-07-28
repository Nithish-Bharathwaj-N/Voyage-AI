'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '../engine/WizardProvider';
import { destinationSchema, type DestinationFormData } from '@/lib/trips/validations/wizard.schema';
import { searchService, type SearchResultItem } from '@/lib/services/search';
import { Icon } from '@/components/icons/Icon';
import { WizardFooter } from '../navigation/WizardFooter';

export function DestinationStep() {
  const { formData, updateFormData, nextStep, setStepValidity, currentStep } = useWizard();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<DestinationFormData>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      destinations: formData.destinations || [],
    },
    mode: 'onChange',
  });

  const selectedDestinations = watch('destinations');

  // Sync validity with Wizard
  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);

  // Handle Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      try {
        // Search across destinations and cities
        const destResults = await searchService.search(query, 'destinations');
        const cityResults = await searchService.search(query, 'cities');
        const countryResults = await searchService.search(query, 'countries');
        
        // Deduplicate and combine
        const all = [...destResults, ...cityResults, ...countryResults];
        const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
        
        setResults(unique);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const addDestination = (item: SearchResultItem) => {
    if (selectedDestinations.find(d => d.id === item.id)) return;
    const next = [...selectedDestinations, { id: item.id, title: item.title, subtitle: item.subtitle, domain: item.domain }];
    setValue('destinations', next, { shouldValidate: true });
    updateFormData({ destinations: next });
    setQuery('');
    setResults([]);
  };

  const removeDestination = (id: string) => {
    const next = selectedDestinations.filter(d => d.id !== id);
    setValue('destinations', next, { shouldValidate: true });
    updateFormData({ destinations: next });
  };

  const onSubmit = () => {
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">
          Where are you going?
        </label>
        
        {/* Search Input */}
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a city, country, or region..."
            className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoComplete="off"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Icon name="Loader2" size={16} className="text-muted-foreground animate-spin" />
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {results.length > 0 && query && (
          <div className="absolute z-50 w-full mt-2 max-h-64 overflow-y-auto bg-card border border-white/10 rounded-xl shadow-2xl p-2">
            {results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => addDestination(item)}
                className="w-full flex flex-col text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <span className="font-semibold text-foreground">{item.title}</span>
                {item.subtitle && <span className="text-xs text-muted-foreground">{item.subtitle}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Selected Destinations Tags */}
        {selectedDestinations.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedDestinations.map((dest) => (
              <div 
                key={dest.id}
                className="flex items-center gap-2 pl-3 pr-1 py-1 bg-primary/10 border border-primary/20 rounded-lg"
              >
                <div>
                  <div className="text-sm font-semibold text-primary leading-tight">{dest.title}</div>
                  {dest.subtitle && <div className="text-[10px] text-primary/70 leading-tight">{dest.subtitle}</div>}
                </div>
                <button
                  type="button"
                  onClick={() => removeDestination(dest.id)}
                  className="p-1.5 hover:bg-primary/20 rounded-md text-primary transition-colors"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <WizardFooter isValid={isValid} onNext={handleSubmit(onSubmit)} />
    </form>
  );
}
