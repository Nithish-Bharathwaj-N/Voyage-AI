import { useQuery } from '@tanstack/react-query';
import { aiRepository } from '../repositories/AIRepository';
import { aiKeys } from '../queries/aiKeys';

export function useConversation(id: string | null) {
  return useQuery({
    queryKey: aiKeys.conversation(id ?? ''),
    queryFn: () => id ? aiRepository.getConversation(id) : null,
    enabled: !!id,
    refetchInterval: 1000, // naive polling for this sprint since we don't have websockets
  });
}
