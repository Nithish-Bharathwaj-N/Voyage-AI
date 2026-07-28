# 151 - Collections Architecture

## Overview
The Collections hub provides a unified interface for organizing Saved Items across VoyageAI. It replaces siloed saved states (e.g. "Saved Destinations" living purely inside the Explore module) with a first-class routing structure under `/collections` and `/collections/[collectionId]`.

## Data Flow
The architecture relies entirely on the `CollectionRepository`:
- **useCollections**: Fetches the top-level list of collections (`Collection[]`), with built-in client-side filtering (by privacy, pinned status, favorite status) and sorting (updated, created, alphabetical).
- **useCollection**: Fetches metadata for a single collection.
- **useCollectionItems**: Fetches the contents (`SavedItem[]`) of a specific collection.
