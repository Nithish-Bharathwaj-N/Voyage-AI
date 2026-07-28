import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface CopilotState {
  messages: ChatMessage[];
  isStreaming: boolean;
  pendingCommands: unknown[]; // The structured commands parsed from AI
  status: 'IDLE' | 'STREAMING' | 'AWAITING_APPROVAL' | 'ERROR';
  
  // Actions
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  appendStreamChunk: (chunk: string) => void;
  setPendingCommands: (commands: unknown[]) => void;
  clearPending: () => void;
  setStatus: (status: CopilotState['status']) => void;
}

export const useCopilotStore = create<CopilotState>((set) => ({
  messages: [],
  isStreaming: false,
  pendingCommands: [],
  status: 'IDLE',

  addMessage: (msg) => set((state) => ({
    messages: [
      ...state.messages, 
      { ...msg, id: Math.random().toString(), timestamp: Date.now() }
    ]
  })),

  appendStreamChunk: (chunk) => set((state) => {
    const lastMsg = state.messages[state.messages.length - 1];
    if (!lastMsg || lastMsg.role !== 'assistant') return state;
    
    // Immutable update of the last assistant message
    const updatedMessages = [...state.messages];
    updatedMessages[updatedMessages.length - 1] = {
      ...lastMsg,
      content: lastMsg.content + chunk
    };
    
    return { messages: updatedMessages };
  }),

  setPendingCommands: (commands) => set({ pendingCommands: commands, status: 'AWAITING_APPROVAL' }),
  
  clearPending: () => set({ pendingCommands: [], status: 'IDLE' }),
  
  setStatus: (status) => set({ status })
}));
