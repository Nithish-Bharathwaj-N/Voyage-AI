# 06. OpenAPI (Swagger)

## NestJS Swagger Integration
We utilize `@nestjs/swagger` to auto-generate the API contract.

## Rules
- Every DTO in the Application layer must be decorated with `@ApiProperty()`.
- Every Controller method must include:
  - `@ApiOperation()`
  - `@ApiResponse({ status: 200, description: '...' })`
  - `@ApiBadRequestResponse()`
- The Swagger UI will be mounted at `/docs` in development environments only.
