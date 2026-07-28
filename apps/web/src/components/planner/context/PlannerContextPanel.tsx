"use client";
import React, { useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import { CopilotPanel } from '@/components/copilot/CopilotPanel';

type Tab = 'copilot' | 'budget' | 'weather' | 'notes';

export function PlannerContextPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('copilot');

  React.useEffect(() => {
    const handleOpenCopilot = () => setActiveTab('copilot');
    document.addEventListener('open-copilot-tab', handleOpenCopilot);
    return () => document.removeEventListener('open-copilot-tab', handleOpenCopilot);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-card">
      
      {/* Tabs Header */}
      <div className="flex items-center justify-between px-2 pt-2 border-b border-border/50">
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveTab('copilot')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-md transition-colors ${activeTab === 'copilot' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
          >
            <div className="flex items-center gap-1.5"><Icon name="Sparkles" size={14} /> AI Copilot</div>
          </button>
          <button 
            onClick={() => setActiveTab('budget')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-md transition-colors ${activeTab === 'budget' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
          >
            <div className="flex items-center gap-1.5"><Icon name="Wallet" size={14} /> Budget</div>
          </button>
          <button 
            onClick={() => setActiveTab('weather')}
            className={`px-3 py-2 text-xs font-semibold rounded-t-md transition-colors ${activeTab === 'weather' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
          >
            <div className="flex items-center gap-1.5"><Icon name="CloudRain" size={14} /> Weather</div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {activeTab === 'copilot' && (
          <CopilotPanel />
        )}

        {activeTab === 'budget' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
              <Icon name="PieChart" size={32} className="text-muted-foreground mb-4 opacity-50" />
              <h4 className="font-semibold text-sm mb-1">Budget Tracker</h4>
              <p className="text-xs text-muted-foreground">Financial calculations coming soon.</p>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
              <Icon name="Thermometer" size={32} className="text-muted-foreground mb-4 opacity-50" />
              <h4 className="font-semibold text-sm mb-1">Live Weather</h4>
              <p className="text-xs text-muted-foreground">WeatherAPI integration coming soon.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
