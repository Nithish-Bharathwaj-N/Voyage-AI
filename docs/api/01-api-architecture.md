# 01. API Architecture

## The Adapter Pattern
NestJS is strictly utilized as an **HTTP Adapter**. It maps HTTP semantics (Headers, Status Codes, JSON Bodies) to the pure TypeScript business logic defined in `@voyageai/application` and the engines.

## Controller Rules
1. **No Database Access**: Controllers cannot inject Prisma or Repositories.
2. **No Business Rules**: Controllers cannot decide if a trip is valid.
3. **Maximum Size**: Controllers must remain under 150 lines.
4. **Flow**:
   - `Request` -> `Zod Pipe Validation` -> `Controller`
   - `Controller` constructs `Command/Query`
   - `Controller` calls injected `ApplicationService.execute()`
   - `Controller` unwraps `Result<T,E>` to an HTTP Response.
