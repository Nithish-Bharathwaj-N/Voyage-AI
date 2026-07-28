import { ConversationMemory } from './ConversationMemory';
import type { AITripPlan } from '../planner/types';

export class AssistantSession {
  public id: string;
  public memory: ConversationMemory;
  
  // Version History
  private planHistory: AITripPlan[] = [];
  private historyIndex: number = -1;

  constructor(id: string, initialPlan?: AITripPlan) {
    this.id = id;
    this.memory = new ConversationMemory();
    
    if (initialPlan) {
      this.pushPlanVersion(initialPlan);
    }
  }

  public pushPlanVersion(plan: AITripPlan) {
    // If we're not at the end of history and we push a new version, discard the "future" (redo) branch
    if (this.historyIndex < this.planHistory.length - 1) {
      this.planHistory = this.planHistory.slice(0, this.historyIndex + 1);
    }
    
    // Deep clone to ensure immutability in history
    const clonedPlan = JSON.parse(JSON.stringify(plan));
    this.planHistory.push(clonedPlan);
    this.historyIndex = this.planHistory.length - 1;
    this.memory.context.updateFromPlan(clonedPlan);
  }

  public undo(): AITripPlan | null {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const restored = this.planHistory[this.historyIndex];
      this.memory.context.updateFromPlan(restored);
      return restored;
    }
    return null;
  }

  public redo(): AITripPlan | null {
    if (this.historyIndex < this.planHistory.length - 1) {
      this.historyIndex++;
      const restored = this.planHistory[this.historyIndex];
      this.memory.context.updateFromPlan(restored);
      return restored;
    }
    return null;
  }

  public getCurrentPlan(): AITripPlan | null {
    if (this.historyIndex >= 0 && this.planHistory.length > 0) {
      return this.planHistory[this.historyIndex];
    }
    return null;
  }

  public getHistoryCount(): number {
    return this.planHistory.length;
  }

  public getHistoryIndex(): number {
    return this.historyIndex;
  }
}
