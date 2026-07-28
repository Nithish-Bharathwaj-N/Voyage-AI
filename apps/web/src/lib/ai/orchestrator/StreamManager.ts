import type { AIStreamChunk } from '../types/provider.types';

export class StreamManager {
  private activeStreams: Map<string, boolean> = new Map();

  startStream(id: string): void {
    this.activeStreams.set(id, true);
  }

  cancelStream(id: string): void {
    this.activeStreams.set(id, false);
  }

  isStreamActive(id: string): boolean {
    return this.activeStreams.get(id) ?? false;
  }

  handleChunk(id: string, chunk: AIStreamChunk, onUpdate: (content: string) => void): boolean {
    if (!this.isStreamActive(id)) {
      return false; // Tells the caller to stop streaming
    }
    
    onUpdate(chunk.content);
    
    if (chunk.isFinished) {
      this.activeStreams.delete(id);
    }
    
    return true;
  }
}

export const streamManager = new StreamManager();
