import { AssistantSession } from './AssistantSession';
import type { AITripPlan } from '../planner/types';

export class AssistantRepository {
  private sessions = new Map<string, AssistantSession>();

  public getOrCreateSession(sessionId: string, initialPlan?: AITripPlan): AssistantSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, new AssistantSession(sessionId, initialPlan));
    }
    return this.sessions.get(sessionId)!;
  }

  public getSession(sessionId: string): AssistantSession | undefined {
    return this.sessions.get(sessionId);
  }

  public deleteSession(sessionId: string) {
    this.sessions.delete(sessionId);
  }
}

export const assistantRepository = new AssistantRepository();
