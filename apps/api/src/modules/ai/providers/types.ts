export interface AIProvider {
  chat(prompt: string, context?: Record<string, unknown>): Promise<string>;
  stream(prompt: string, onToken: (token: string) => void, context?: Record<string, unknown>): Promise<void>;
  health(): Promise<boolean>;
  supportsTools(): boolean;
  supportsVision(): boolean;
  supportsStreaming(): boolean;
  modelMetadata(): Record<string, unknown>;
  dispose(): void;
}
