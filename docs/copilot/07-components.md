# 07. Components

The `CopilotPanel` is a complex composition of React Server Components and Client Components.

## Core Hierarchy
- `<CopilotPanel>`: Client component, fixed right sidebar.
  - `<ConversationHistory>`: Virtualized list of `<ChatMessage>`.
  - `<StreamingMessage>`: Renders incoming markdown chunks.
  - `<ApprovalDialog>`: Framer Motion overlay.
    - `<CommandPreview>`: Visual diff card.
  - `<ChatInput>`: Textarea with auto-resize and "Stop Generation" button.

## Styling
- Heavily relies on Tailwind CSS for dark-mode gradients and glassmorphism.
- Framer Motion is used for layout transitions (e.g., smoothly pushing the chat up when a `CommandPreview` slides in from the bottom).
