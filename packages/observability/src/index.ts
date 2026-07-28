export interface HealthCheckResult {
  status: 'UP' | 'DOWN';
  components: Record<string, 'UP' | 'DOWN' | 'DEGRADED'>;
  timestamp: string;
}

export interface MetricsClient {
  incrementCounter(name: string, value?: number, tags?: string[]): void;
  recordHistogram(name: string, value: number, tags?: string[]): void;
  gauge(name: string, value: number, tags?: string[]): void;
}

export interface Tracer {
  startSpan(name: string, tags?: Record<string, string>): any;
  finishSpan(span: any): void;
  recordError(span: any, error: Error): void;
}

// In-Memory implementation
export class NoopMetricsClient implements MetricsClient {
  incrementCounter() {}
  recordHistogram() {}
  gauge() {}
}
