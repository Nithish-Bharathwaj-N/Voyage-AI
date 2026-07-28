import { io, Socket } from 'socket.io-client';
import { plannerCache } from './PlannerCache';
import type { PlannerInputData, AITripPlan } from './types';
import type { WorkflowState } from '../workflows/types';

export class PlannerSession {
  public id: string;
  public state: WorkflowState = 'IDLE';
  public error: string | null = null;
  public currentPlan: Partial<AITripPlan> | null = null;
  private socket: Socket;
  
  constructor(id: string) {
    this.id = id;
    const existing = plannerCache.getPlan(id);
    if (existing) {
      this.currentPlan = existing;
      this.state = 'COMPLETED';
    }

    // Connect to NestJS backend
    this.socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/ai', {
      transports: ['websocket']
    });
  }

  async generate(input: Partial<PlannerInputData>, onUpdate?: (partial: Partial<AITripPlan> | null) => void) {
    return new Promise<void>((resolve, reject) => {
      this.error = null;
      this.state = 'VALIDATING';
      
      this.socket.on('workflow_event', (data: { sessionId: string; state: WorkflowState }) => {
        if (data.sessionId === this.id) {
          this.state = data.state;
        }
      });

      let currentStream = '';
      this.socket.on('stream_token', (data: { sessionId: string; token: string }) => {
        if (data.sessionId === this.id) {
          currentStream += data.token;
          // In real implementation we'd do a partial parse, but for now just wait for final
        }
      });

      this.socket.on('plan_completed', (data: { sessionId: string; plan: AITripPlan }) => {
        if (data.sessionId === this.id) {
          this.state = 'COMPLETED';
          this.currentPlan = data.plan;
          if (onUpdate) onUpdate(data.plan);
          resolve();
        }
      });

      this.socket.on('workflow_error', (data: { sessionId: string; error: string }) => {
        if (data.sessionId === this.id) {
          this.state = 'FAILED';
          this.error = data.error;
          reject(new Error(data.error));
        }
      });

      this.socket.emit('generate_plan', {
        sessionId: this.id,
        inputData: input
      });
    });
  }

  dispose() {
    this.socket.disconnect();
  }
}
