import type { AIProvider, AIProviderConfig, AIProviderCapabilities, AIProviderResponse, AIStreamChunk } from '../types/provider.types';

export class MockProvider implements AIProvider {
  config: AIProviderConfig;
  capabilities: AIProviderCapabilities;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.capabilities = {
      supportsStreaming: true,
      supportsVision: false,
      supportsTools: true,
      maxTokens: 8000,
    };
  }

  async initialize(): Promise<void> {}

  async chat(messages: unknown[], tools?: unknown[]): Promise<AIProviderResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      content: 'This is a mocked response from the AI Copilot. I cannot access the internet right now, but I can help you plan your itinerary based on the data you provided!',
      tokensUsed: 42,
    };
  }

  async stream(messages: unknown[], tools?: unknown[], onChunk?: (chunk: AIStreamChunk) => void): Promise<AIProviderResponse> {
    const isPlanner = (messages as string[]).some(m => typeof m === 'string' && m.includes('AITripPlan'));

    const mockMarkdown = `Here are some recommendations for your trip:

### Top Attractions
1. **The Colosseum**: An ancient amphitheater in the center of Rome.
2. **Vatican Museums**: Home to the Sistine Chapel and countless Renaissance masterpieces.
3. **Trevi Fountain**: Don't forget to toss a coin to ensure your return to Rome!

### Dining Options
* **Roscioli Salumeria con Cucina**: Famous for their carbonara.
* **Da Enzo al 29**: Authentic Roman trattoria in Trastevere.

Would you like me to add any of these to your itinerary?`;

    const mockJson = JSON.stringify({
      summary: "A thrilling 3-day adventure exploring the best of Rome's history, food, and culture.",
      tripName: "Roman Holiday",
      travelStyle: "Cultural Explorer",
      budget: "$$$",
      weather: "Sunny, 24°C",
      days: [
        {
          day: 1,
          date: "2026-08-01",
          theme: "Ancient Rome",
          morning: [{ id: "m1", time: "09:00", title: "Colosseum Tour", description: "Skip the line tour of the ancient amphitheater.", location: "Colosseum", estimatedCost: 35 }],
          afternoon: [{ id: "a1", time: "14:00", title: "Roman Forum", description: "Walk through the ruins of ancient government buildings.", location: "Roman Forum", estimatedCost: 18 }],
          evening: [{ id: "e1", time: "19:00", title: "Dinner at Trastevere", description: "Authentic Roman pasta.", location: "Da Enzo al 29", estimatedCost: 45 }],
          meals: [],
          transportation: "Walk / Metro",
          estimatedCost: 98,
          weather: "Sunny",
          notes: "Wear comfortable walking shoes."
        },
        {
          day: 2,
          date: "2026-08-02",
          theme: "Vatican & Art",
          morning: [{ id: "m2", time: "08:30", title: "Vatican Museums", description: "Early access to the Sistine Chapel.", location: "Vatican City", estimatedCost: 45 }],
          afternoon: [{ id: "a2", time: "13:00", title: "St. Peter's Basilica", description: "Climb the dome for a panoramic view.", location: "St. Peter's Square", estimatedCost: 20 }],
          evening: [{ id: "e2", time: "18:00", title: "Sunset at Pincio", description: "Enjoy the sunset over Piazza del Popolo.", location: "Pincio Terrace", estimatedCost: 0 }],
          meals: [],
          transportation: "Walk / Bus",
          estimatedCost: 65,
          weather: "Sunny",
          notes: "Shoulders and knees must be covered for the Vatican."
        }
      ],
      transportation: ["Metro", "Bus", "Walking"],
      accommodation: ["Hotel Artemide"],
      restaurants: ["Da Enzo al 29", "Roscioli", "Giolitti"],
      packing: ["Comfortable shoes", "Sunscreen", "Water bottle", "Scarf for churches"],
      warnings: ["Pickpockets in crowded tourist areas", "August can be very hot"],
      tips: ["Buy tickets online in advance", "Water fountains (nasoni) are safe to drink from"],
      recommendations: ["Try the gelato at Giolitti", "Take a sunset stroll along the Tiber"],
      estimatedCost: 850,
      confidence: 0.95,
      metadata: { generatedAt: new Date().toISOString(), model: "mock-provider-v1", tokensUsed: 450 }
    }, null, 2);

    const streamContent = isPlanner ? mockJson : mockMarkdown;

    // Simulate network latency before streaming starts
    await new Promise(resolve => setTimeout(resolve, 800));

    const chunks = streamContent.match(/.{1,15}/g) || [];
    
    let accumulatedContent = '';
    
    for (let i = 0; i < chunks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      accumulatedContent += chunks[i];
      if (onChunk) {
        onChunk({
          content: chunks[i],
          isFinished: i === chunks.length - 1
        });
      }
    }

    return {
      content: streamContent,
      tokensUsed: isPlanner ? 450 : 120
    };
  }

  async embeddings(input: string): Promise<number[]> {
    return Array(1536).fill(0.1);
  }

  async health(): Promise<boolean> {
    return true;
  }

  async dispose(): Promise<void> {}
}
