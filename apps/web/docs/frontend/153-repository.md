# 153 - Repository

The `CollectionRepository` abstracts the data layer. In Sprint 9A, it uses `mockCollections` and `mockSavedItems` to fulfill promises, simulating a 300-400ms network delay.

## Types
The types (`collections.types.ts`) explicitly define `SavedItemBase` and use TypeScript discriminated unions for each specific item type (e.g., `type: 'destination'`). This allows `SavedItemDispatcher` to have strict type safety in its switch statement.
