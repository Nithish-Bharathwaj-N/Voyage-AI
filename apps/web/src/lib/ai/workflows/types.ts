export type WorkflowState = 
  | 'IDLE'
  | 'VALIDATING'
  | 'LOADING_CONTEXT'
  | 'EXECUTING_AI'
  | 'STREAMING'
  | 'VALIDATING_OUTPUT'
  | 'SAVING'
  | 'COMPLETED'
  | 'FAILED';

export interface AIWorkflow<TInput, TResult> {
  execute(
    sessionId: string,
    input: TInput,
    onStateChange?: (state: WorkflowState) => void,
    onStreamUpdate?: (partial: Partial<TResult> | null) => void
  ): Promise<TResult>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PlannerContext<TInput = any> {
  input: TInput;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  weather?: any;
}
