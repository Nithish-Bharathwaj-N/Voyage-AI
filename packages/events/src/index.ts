import { DomainEvent } from '@voyageai/types';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishMany(events: DomainEvent[]): Promise<void>;
}

export interface EventSubscriber {
  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void;
}

export class InMemoryEventBus implements EventPublisher, EventSubscriber {
  private handlers = new Map<string, Array<(event: DomainEvent) => Promise<void>>>();

  async publish(event: DomainEvent): Promise<void> {
    const eventHandlers = this.handlers.get(event.type) || [];
    await Promise.all(eventHandlers.map(handler => handler(event)));
  }

  async publishMany(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  subscribe(eventType: string, handler: (event: DomainEvent) => Promise<void>): void {
    const current = this.handlers.get(eventType) || [];
    current.push(handler);
    this.handlers.set(eventType, current);
  }
}
