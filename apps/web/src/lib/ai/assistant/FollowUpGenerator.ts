import type { AssistantCommand } from './types';

export class FollowUpGenerator {
  public generate(command: AssistantCommand): string[] {
    switch (command) {
      case 'UpdateBudget':
        return ['Find cheaper hotels', 'Optimize transportation costs', 'Suggest free activities'];
      case 'UpdateHotel':
        return ['Find luxury options', 'Look for Airbnbs', 'Show hotels near the center'];
      case 'ModifyDay':
        return ['Regenerate this entire day', 'Add more downtime', 'Move this to tomorrow'];
      case 'AddActivity':
        return ['Suggest a restaurant near here', 'Is there time for a museum?', 'Check weather for this day'];
      default:
        return ['Generate Packing List', 'Export to PDF', 'Optimize Route', 'Compare Versions'];
    }
  }
}

export const followUpGenerator = new FollowUpGenerator();
