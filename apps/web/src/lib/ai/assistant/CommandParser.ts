import type { AssistantCommand } from './types';
import { conversationMetrics } from './ConversationMetrics';

export class CommandParser {
  public parseCommand(message: string): AssistantCommand {
    const text = message.toLowerCase();
    let command: AssistantCommand = 'Unknown';

    if (text.includes('move') || text.includes('switch day')) command = 'ModifyDay';
    else if (text.includes('add') || text.includes('include')) command = 'AddActivity';
    else if (text.includes('remove') || text.includes('delete')) command = 'RemoveActivity';
    else if (text.includes('replace') || text.includes('instead of')) command = 'ReplaceActivity';
    else if (text.includes('extend') || text.includes('more days')) command = 'ExtendTrip';
    else if (text.includes('shorten') || text.includes('less days')) command = 'ShortenTrip';
    else if (text.includes('budget') || text.includes('cheaper') || text.includes('cost')) command = 'UpdateBudget';
    else if (text.includes('hotel') || text.includes('stay') || text.includes('accommodation')) command = 'UpdateHotel';
    else if (text.includes('transport') || text.includes('flight') || text.includes('train')) command = 'UpdateTransport';
    else if (text.includes('restaurant') || text.includes('food') || text.includes('eat')) command = 'UpdateRestaurant';
    else if (text.includes('why') || text.includes('explain') || text.includes('reason')) command = 'ExplainRecommendation';
    else if (text.includes('optimize') || text.includes('better')) command = 'OptimizePlan';
    else if (text.includes('summarize') || text.includes('summary')) command = 'SummarizeTrip';
    else if (text.includes('export') || text.includes('pdf')) command = 'ExportPlan';
    else if (text.includes('save') || text.includes('keep')) command = 'SavePlan';

    conversationMetrics.recordCommand(command);
    return command;
  }
}

export const commandParser = new CommandParser();
