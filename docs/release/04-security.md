# 04. Security

## Zero Trust AI
The LLM is explicitly classified as an **untrusted client**. All JSON payloads returned by the AI are subjected to the exact same Zod validation and Business Rules engine as if a malicious user had typed them manually.

## Data Protection
- **Row Level Security (RLS)**: Enforced via Prisma middleware. User A can never query User B's trips.
- **API Keys**: LLM provider keys (OpenAI, Gemini) are strictly sequestered in the backend environment. The Next.js frontend NEVER communicates directly with Gemini.
