import { z } from 'zod';

export const AddActivitySchema = z.object({
  type: z.literal('AddActivity'),
  payload: z.object({
    placeId: z.string().describe('The Knowledge Engine ID of the place to add'),
    dayIndex: z.number().describe('The 0-indexed day to add the activity to'),
    startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/).describe('HH:mm format (24-hour)'),
    durationMinutes: z.number().min(15).max(480).describe('Duration in minutes')
  })
});

export const RemoveActivitySchema = z.object({
  type: z.literal('RemoveActivity'),
  payload: z.object({
    activityId: z.string().describe('The planner-assigned ID of the activity to remove')
  })
});

export const UpdateBudgetSchema = z.object({
  type: z.literal('UpdateBudget'),
  payload: z.object({
    newBudgetMax: z.number().positive(),
    currency: z.string().length(3).describe('ISO Currency Code, e.g. USD')
  })
});

export const OutputCommandArraySchema = z.object({
  commands: z.array(z.discriminatedUnion('type', [
    AddActivitySchema,
    RemoveActivitySchema,
    UpdateBudgetSchema
  ])).describe('An array of commands to execute. Return an empty array if no action is needed.')
});

export type AddActivityCommand = z.infer<typeof AddActivitySchema>;
export type RemoveActivityCommand = z.infer<typeof RemoveActivitySchema>;
export type UpdateBudgetCommand = z.infer<typeof UpdateBudgetSchema>;
export type OrchestratorCommands = z.infer<typeof OutputCommandArraySchema>;
