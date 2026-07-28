export interface AIDailyActivity {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  estimatedCost?: number;
}

export interface AIDailyPlan {
  day: number;
  date: string;
  theme?: string;
  morning: AIDailyActivity[];
  afternoon: AIDailyActivity[];
  evening: AIDailyActivity[];
  meals: AIDailyActivity[];
  transportation: string;
  estimatedCost: number;
  weather?: string;
  notes?: string;
}

export interface AITripPlan {
  summary: string;
  tripName: string;
  travelStyle: string;
  budget: string;
  weather: string;
  days: AIDailyPlan[];
  transportation: string[];
  accommodation: string[];
  restaurants: string[];
  packing: string[];
  warnings: string[];
  tips: string[];
  recommendations: string[];
  estimatedCost: number;
  confidence: number;
  metadata: {
    generatedAt: string;
    model: string;
    tokensUsed: number;
  };
}

export interface PlannerInputData {
  destinations: string[];
  travelDates: { start: string; end: string };
  budget: string;
  currency: string;
  travelStyle: string[];
  travelers: number;
  ageGroup: string;
  interests: string[];
  accommodation: string[];
  transportation: string[];
  accessibility: string[];
  dietary: string[];
  language: string;
  timezone: string;
}
