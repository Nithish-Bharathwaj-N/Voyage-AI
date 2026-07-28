# 05. Versioning

VoyageAI V2 APIs are versioned at the URI level.
All routes must be prefixed with `/api/v1`.

## Future Proofing
When breaking changes are introduced to the Application Layer commands, new DTOs and Controllers will be scoped under `src/modules/.../v2/`.
The `v1` controllers will remain intact, utilizing legacy adapter layers if necessary.
