import { useMemo } from 'react';
import { promptRegistry } from '../prompts/PromptRegistry';
import type { PromptDomain } from '../types/prompt.types';

export function usePrompt(domain: PromptDomain) {
  return useMemo(() => {
    return promptRegistry.getPrompt(domain);
  }, [domain]);
}
