# 229 - Runbooks

## Scaling the API
- Under heavy load, dynamically increase `api` replicas. Ensure the Redis instance is healthy as it powers the Socket.io adapter.

## Rate Limiting Recovery
- If users are flagged by Throttler (`429 Too Many Requests`), logs will detail their correlation ID and IP.

## API Keys Rotation
- Rotate OpenAI / Gemini / Anthropic keys via the primary Environment Secrets orchestrator. ProviderFactory instantly utilizes new ones upon service restart.
