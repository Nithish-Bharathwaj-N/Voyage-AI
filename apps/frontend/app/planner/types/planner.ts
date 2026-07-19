import { Itinerary } from '@/types/itinerary';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai' | 'thinking';
  text: string;
  timestamp: Date;
}

export interface PlanContext {
  destination?: string;
  dates?: string;
  travelers?: string;
  budget?: string;
  style?: string;
}

export type ConversationStep =
  | 'destination'
  | 'dates'
  | 'travelers'
  | 'budget'
  | 'style'
  | 'generating'
  | 'result';

export interface ThinkingStep {
  icon: string;
  text: string;
}

export interface StopCoordinate {
  id?: string;
  latitude: number;
  longitude: number;
  title: string;
  category: string;
  dayNumber: number;
  cost?: number;
}
