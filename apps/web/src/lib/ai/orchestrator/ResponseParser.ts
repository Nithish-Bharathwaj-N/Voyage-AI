export class ResponseParser {
  /**
   * Identifies if a markdown block contains a specific tool call or component request.
   * E.g. parses ```voyage-component:trip-card\n{"id":"trip_123"}\n```
   */
  parseComponents(markdown: string): { text: string; components: unknown[] } {
    const components: unknown[] = [];
    // Basic regex to strip out custom component tags if needed
    const text = markdown.replace(/```voyage-component:([a-z-]+)\n([\s\S]*?)```/g, (match, type, data) => {
      try {
        components.push({ type, data: JSON.parse(data) });
      } catch (e) {
        console.error('Failed to parse component data', e);
      }
      return ''; // Remove from text
    });
    
    return { text, components };
  }

  /**
   * Extracts citations like [1], [2] from the text and maps them to provided references.
   */
  extractCitations(markdown: string, references: Record<string, string>): { text: string; citations: unknown[] } {
    // For Sprint 11A, we just return the raw text
    return { text: markdown, citations: [] };
  }
}

export const responseParser = new ResponseParser();
