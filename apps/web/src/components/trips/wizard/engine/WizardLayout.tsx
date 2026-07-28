'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from './WizardProvider';
import { WizardSidebar } from './WizardSidebar';
import { WizardProgress } from './WizardProgress';

interface WizardLayoutProps {
  steps: {
    title: string;
    description: string;
    component: React.ReactNode;
  }[];
}

export function WizardLayout({ steps }: WizardLayoutProps) {
  const { currentStep } = useWizard();
  
  const activeStep = steps[currentStep];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background overflow-hidden">
      {/* Mobile Progress */}
      <div className="md:hidden">
        <WizardProgress steps={steps.map(s => s.title)} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 shrink-0 border-r border-white/10 bg-white/[0.02]">
        <WizardSidebar steps={steps.map((s, i) => ({ title: s.title, description: s.description, index: i }))} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-8 md:p-12 relative z-0 pb-32 md:pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="max-w-3xl mx-auto h-full"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">{activeStep.title}</h2>
                <p className="text-muted-foreground mt-2">{activeStep.description}</p>
              </div>
              
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                 {activeStep.component}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
