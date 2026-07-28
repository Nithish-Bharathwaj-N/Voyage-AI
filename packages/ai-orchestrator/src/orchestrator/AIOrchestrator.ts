import { IModelProvider } from '../interfaces/IModelProvider';
import { PromptRegistry } from '../prompts/PromptRegistry';
import { ContextBuilder, PlannerTripState, KnowledgeContext } from '../context/ContextBuilder';
import { OutputCommandArraySchema, OrchestratorCommands } from '../commands/CommandSchemas';
import { CommandValidator } from '../validation/CommandValidator';
import { ConversationMemory } from '../memory/ConversationMemory';

export class AIOrchestrator {
  constructor(
    private readonly provider: IModelProvider,
    private readonly memory: ConversationMemory
  ) {}

  async processUserMessage(
    tripState: PlannerTripState,
    knowledge: KnowledgeContext,
    userMessage: string
  ): Promise<{ responseMsg: string; commandsExecuted: OrchestratorCommands }> {
    
    // 1. Build Context
    const compressedContext = ContextBuilder.buildPromptContext(tripState, knowledge, userMessage);
    const systemPrompt = PromptRegistry.getSystemPrompt('trip-editor.v1');
    
    // 2. Fetch History
    await this.memory.addMessage(tripState.id, 'user', userMessage);
    
    let retries = 0;
    const maxRetries = 2;
    let currentPrompt = compressedContext;

    // 3. Execution & Validation Loop
    while (retries <= maxRetries) {
      try {
        const response = await this.provider.generateStructured(
          currentPrompt, 
          OutputCommandArraySchema, 
          systemPrompt
        );

        const commands = response.data;

        // 4. Domain Validation
        const validationResult = await CommandValidator.validateDomainRules(commands, tripState.budget);
        
        if (!validationResult.isValid) {
          // Force LLM to correct itself
          currentPrompt += `\n\nSYSTEM ERROR: Your previous command was rejected because: ${validationResult.error}. Please adjust and output valid JSON commands.`;
          retries++;
          continue;
        }

        // 5. Success. In a real flow, we dispatch to PlannerEngine here.
        await this.memory.addMessage(tripState.id, 'assistant', JSON.stringify(commands));

        return {
          responseMsg: 'I have updated your itinerary based on your request.',
          commandsExecuted: commands
        };

      } catch (error: any) {
        console.error('LLM Execution Failed:', error.message);
        retries++;
        if (retries > maxRetries) {
          throw new Error('AI Orchestrator failed to produce valid commands after 3 attempts.');
        }
      }
    }
    
    throw new Error('AI Orchestrator unexpected failure.');
  }
}
