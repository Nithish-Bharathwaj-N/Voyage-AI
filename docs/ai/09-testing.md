# 09. Testing

AI orchestration requires unique testing strategies to handle non-deterministic outputs.

## Strategies
- **Mocked Providers**: 95% of tests should mock `IModelProvider` to return hardcoded JSON strings. This tests our Validation and Command pipelines deterministically.
- **Eval Tests**: A separate suite of tests that run against real LLMs. These tests assert on semantics (e.g. `expect(response).toIncludeSemanticContext('rain')`).
- **Context Snapshotting**: Assert that the ContextBuilder generates the exact expected compressed JSON string for a given trip state.
