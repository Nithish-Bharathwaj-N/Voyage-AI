import type { AITripPlan } from '../planner/types';

export type AssistantMessageType = 'User' | 'Assistant' | 'System' | 'Tool' | 'Workflow' | 'Error';

export interface AssistantMessage {
  id: string;
  type: AssistantMessageType;
  content: string;
  timestamp: string;
  provider?: string;
  status?: 'pending' | 'streaming' | 'completed' | 'error';
  latency?: number;
  metadata?: Record<string, unknown>;
  citations?: string[];
  actions?: AssistantAction[];
  followUps?: string[];
  attachments?: unknown[];
}

export type AssistantCommand = 
  | 'ModifyDay' | 'AddActivity' | 'RemoveActivity' | 'ReplaceActivity'
  | 'ExtendTrip' | 'ShortenTrip' | 'UpdateBudget' | 'UpdateHotel'
  | 'UpdateTransport' | 'UpdateRestaurant' | 'ExplainRecommendation'
  | 'OptimizePlan' | 'SummarizeTrip' | 'ExportPlan' | 'SavePlan'
  | 'Unknown';

export interface AssistantAction {
  id: string;
  type: string; // e.g., 'apply_plan_diff', 'link_to_external'
  payload: Record<string, unknown>;
  executed?: boolean;
}

export interface AssistantResponse {
  message: string;
  updatedTripPlan?: Partial<AITripPlan>;
  actions?: AssistantAction[];
  followUps?: string[];
  citations?: string[];
  explanations?: Record<string, string>;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

export interface ConversationMetadata {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  isArchived: boolean;
  tripPlanId?: string; // Reference to the active trip plan being modified
}
