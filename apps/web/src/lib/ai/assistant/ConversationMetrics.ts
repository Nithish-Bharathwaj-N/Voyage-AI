export class ConversationMetrics {
  recordTurn(latencyMs: number, tokensUsed: number, promptType: string) {
    // In a real system, send this to telemetry (Datadog/PostHog/etc)
    console.log(`[Metrics] Turn completed. Latency: ${latencyMs}ms, Tokens: ${tokensUsed}, Domain: ${promptType}`);
  }

  recordCommand(command: string) {
    console.log(`[Metrics] Command parsed: ${command}`);
  }

  recordError(error: Error) {
    console.error(`[Metrics] Error occurred:`, error);
  }
}

export const conversationMetrics = new ConversationMetrics();
