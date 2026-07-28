import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiRepository } from '../repositories/AIRepository';
import { aiKeys } from '../queries/aiKeys';
import type { PromptDomain } from '../types/prompt.types';

export function useAI(conversationId: string) {
  const queryClient = useQueryClient();

  const sendMutation = useMutation({
    mutationFn: async ({ query, domain, onUpdate }: { query: string; domain?: PromptDomain; onUpdate?: (content: string) => void }) => {
      await aiRepository.sendQuery(conversationId, query, domain, onUpdate);
    },
    onSuccess: () => {
      // Invalidate the conversation so the UI refetches the new messages
      queryClient.invalidateQueries({ queryKey: aiKeys.conversation(conversationId) });
    },
  });

  return {
    send: sendMutation.mutateAsync,
    isSending: sendMutation.isPending,
    cancel: aiRepository.cancelStream,
  };
}
