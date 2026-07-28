import { PlannerSession } from './PlannerSession';

class PlannerRepository {
  private activeSessions: Map<string, PlannerSession> = new Map();

  getSession(id: string): PlannerSession {
    if (!this.activeSessions.has(id)) {
      this.activeSessions.set(id, new PlannerSession(id));
    }
    return this.activeSessions.get(id)!;
  }
}

export const plannerRepository = new PlannerRepository();
