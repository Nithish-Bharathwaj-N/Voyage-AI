// ============================================================
// UndoRedoManager
// Command history stack architecture (no persistence).
// In Sprint 5G, commands will be connected to real mutations.
// ============================================================

export type CommandStatus = 'executed' | 'undone';

export interface PlannerCommand {
  id: string;
  label: string;        // Human-readable description: "Moved 'Dinner' to Evening"
  timestamp: number;
  status: CommandStatus;
  // These will be implemented when mutations are wired:
  execute: () => void;
  undo: () => void;
}

let commandCounter = 0;

export class UndoRedoManager {
  private past: PlannerCommand[] = [];
  private future: PlannerCommand[] = [];
  private listeners: Set<() => void> = new Set();

  // ─── Subscribe ─────────────────────────────────────────────
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // ─── Execute a new command ──────────────────────────────────
  execute(command: Omit<PlannerCommand, 'id' | 'timestamp' | 'status'>): void {
    const cmd: PlannerCommand = {
      ...command,
      id: `cmd-${++commandCounter}`,
      timestamp: Date.now(),
      status: 'executed',
    };
    cmd.execute();
    this.past.push(cmd);
    this.future = []; // Clear redo stack on new action
    this.notify();
  }

  // ─── Undo ──────────────────────────────────────────────────
  undo(): PlannerCommand | null {
    const command = this.past.pop();
    if (!command) return null;
    command.undo();
    command.status = 'undone';
    this.future.unshift(command);
    this.notify();
    return command;
  }

  // ─── Redo ──────────────────────────────────────────────────
  redo(): PlannerCommand | null {
    const command = this.future.shift();
    if (!command) return null;
    command.execute();
    command.status = 'executed';
    this.past.push(command);
    this.notify();
    return command;
  }

  // ─── State queries ─────────────────────────────────────────
  canUndo(): boolean { return this.past.length > 0; }
  canRedo(): boolean { return this.future.length > 0; }
  getHistory(): PlannerCommand[] { return [...this.past].reverse(); }
  getLastCommand(): PlannerCommand | undefined { return this.past[this.past.length - 1]; }
  clear(): void { this.past = []; this.future = []; this.notify(); }
}

// Singleton — shared across the entire Planner workspace
export const plannerHistory = new UndoRedoManager();
