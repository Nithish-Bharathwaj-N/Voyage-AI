export interface AIToolParameter {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required?: boolean;
}

export interface AITool {
  name: string;
  description: string;
  parameters: Record<string, AIToolParameter>;
  
  validate(args: Record<string, unknown>): boolean;
  execute(args: Record<string, unknown>): Promise<unknown>;
}
