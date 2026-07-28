# 09. Testing

Testing streaming UIs requires specialized setups.

## Approach
- **Component Tests**: Use `@testing-library/react`. Mock `useCopilotStore` to force the `AWAITING_APPROVAL` state, ensuring the `PlannerDiff` renders exactly as expected for an `AddActivity` command.
- **Streaming Mocks**: Mock the global `fetch` API to return a simulated `ReadableStream` of text chunks, verifying that `StreamingMessage` updates correctly.
- **Integration Tests (Cypress/Playwright)**: An end-to-end test where a user types a prompt, waits for the mock stream, clicks "Approve", and verifies the `Timeline` component actually updates.
