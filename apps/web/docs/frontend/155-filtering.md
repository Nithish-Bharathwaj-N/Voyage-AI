# 155 - Filtering & Sorting

Filtering and sorting are managed in the `CollectionsFilter` component. State is lifted to `CollectionsPage` and passed down to `useCollections`.

- **Filters**: `isPinned`, `isFavorite`, `privacy === 'shared'`.
- **Sorts**: `updated`, `created`, `alpha`.
