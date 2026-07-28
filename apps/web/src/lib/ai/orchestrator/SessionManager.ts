export class SessionManager {
  private activeSessionId: string | null = null;

  startSession(): string {
    this.activeSessionId = `sess_${Date.now()}`;
    return this.activeSessionId;
  }

  getActiveSession(): string | null {
    return this.activeSessionId;
  }

  endSession(): void {
    this.activeSessionId = null;
  }
}

export const sessionManager = new SessionManager();
