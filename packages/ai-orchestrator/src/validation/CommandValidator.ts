import { OrchestratorCommands } from '../commands/CommandSchemas';

export class CommandValidator {
  /**
   * The second layer of the gauntlet.
   * Zod already proved the JSON is syntactically correct.
   * Now we prove it doesn't violate domain logic before sending to the DB.
   */
  static async validateDomainRules(commands: OrchestratorCommands, currentBudget: number): Promise<{ isValid: boolean; error?: string }> {
    for (const cmd of commands.commands) {
      if (cmd.type === 'AddActivity') {
        // Pseudo-logic representing a call to PlannerEngine / KnowledgeEngine
        if (cmd.payload.durationMinutes > 480) {
          return { isValid: false, error: `Cannot schedule an activity longer than 8 hours (requested: ${cmd.payload.durationMinutes}m)` };
        }
      }
      
      if (cmd.type === 'UpdateBudget') {
        if (cmd.payload.newBudgetMax < 0) {
          return { isValid: false, error: 'Budget cannot be negative' };
        }
      }
    }
    
    return { isValid: true };
  }
}
