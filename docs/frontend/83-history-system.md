# 83. History System

`UndoRedoManager` is a singleton class implementing a command pattern stack.
- `execute(command)`: Runs the command and pushes to the `past` stack, clearing the `future` stack.
- `undo()`: Pops from `past`, calls `command.undo()`, pushes to `future`.
- `redo()`: Shifts from `future`, calls `command.execute()`, pushes to `past`.
- `subscribe(listener)`: Components can observe history changes via a pub/sub model.

In Sprint 5G, mutation hooks will call `plannerHistory.execute()` with real undo lambdas (e.g., reverting optimistic cache updates).
