import * as React from 'react';
import { ThinkingStep } from '../types/planner';

export interface UseThinkingAnimationResult {
  thinkingStep: number;
  thinkingSteps: ThinkingStep[];
  isThinking: boolean;
  startThinking: (customSteps?: ThinkingStep[]) => Promise<void>;
  stopThinking: () => void;
  setThinkingProgress: (stepIndex: number, text: string) => void;
}

const THINKING_STEPS: ThinkingStep[] = [
  { icon: '🧠', text: 'Understanding request' },
  { icon: '🌍', text: 'Searching destinations' },
  { icon: '🌤️', text: 'Checking weather' },
  { icon: '🗺️', text: 'Building route' },
  { icon: '💰', text: 'Calculating budget' },
  { icon: '🏛️', text: 'Finding attractions' },
  { icon: '📅', text: 'Generating itinerary' },
  { icon: '✨', text: 'Optimizing travel' },
  { icon: '✅', text: 'Finalizing' }
];

/**
 * Hook driving the step-by-step thinking visualizer loop for real-time progress reasoning overlays.
 */
export function useThinkingAnimation(): UseThinkingAnimationResult {
  const [thinkingStep, setThinkingStep] = React.useState<number>(0);
  const [isThinking, setIsThinking] = React.useState<boolean>(false);
  const [activeSteps, setActiveSteps] = React.useState<ThinkingStep[]>(THINKING_STEPS);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startThinking = React.useCallback(async (customSteps?: ThinkingStep[]) => {
    const stepsToUse = customSteps || THINKING_STEPS;
    setActiveSteps(stepsToUse);
    setIsThinking(true);
    setThinkingStep(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 1;
      if (current >= stepsToUse.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } else {
        setThinkingStep(current);
      }
    }, 600);
  }, []);

  const stopThinking = React.useCallback(() => {
    setIsThinking(false);
    setThinkingStep(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const setThinkingProgress = React.useCallback((stepIndex: number, text: string) => {
    setIsThinking(true);
    setThinkingStep(stepIndex);
    setActiveSteps(prev => {
      const next = [...prev];
      if (!next[stepIndex]) {
         next[stepIndex] = { icon: '🧠', text };
      } else {
         next[stepIndex] = { ...next[stepIndex], text };
      }
      return next;
    });
    // If it's a live stream, cancel the fake interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    thinkingStep,
    thinkingSteps: activeSteps,
    isThinking,
    startThinking,
    stopThinking,
    setThinkingProgress
  };
}
