# 181 - AI Architecture Overview

The AI Platform for VoyageAI is built on a highly decoupled architecture. The frontend NEVER calls an LLM directly. 
Instead, it communicates with the `AIOrchestrator`, which manages the context, session history, and streams data from an abstracted `AIProvider`.

## Key Layers:
1. **Provider Factory**: Swaps between Gemini, OpenAI, Anthropic, or Mock providers.
2. **Orchestrator**: The central brain. Builds Context -> Formats Prompt -> Calls Provider -> Streams to UI.
3. **Registries**: System prompts and Tool capabilities are strictly typed and registered.
4. **Cache Layer**: `AICache` stores ongoing conversations and prompt templates in memory (extensible to Redis).
