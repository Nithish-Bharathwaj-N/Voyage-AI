# 223 - Performance

## Docker Optimization
- Multi-stage builds are used in `Dockerfile.prod` for both API and Web.
- Node `devDependencies` are stripped from the final runner layer.
- Next.js uses the `standalone` build output for maximum compression.

## Code Optimizations
- Socket.IO bypasses traditional HTTP polling (`transports: ['websocket']`).
- Database queries use Prisma Connection Pooling.
