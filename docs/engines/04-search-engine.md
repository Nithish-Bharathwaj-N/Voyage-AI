# 04. Search Engine Architecture

## Responsibility
Powers the frontend autocomplete and global search bar. Currently relies on Postgres `ILIKE` and trigrams, but designed to abstract a future Elasticsearch or Typesense migration.

## Use Cases
- `GlobalSearchUseCase`
- `AutocompleteDestinationUseCase`
- `SemanticPlaceSearchUseCase`

## Strategies
- **`FuzzyMatchStrategy`**: Handles user typos (e.g. "Pariis" -> "Paris").
- **`VectorSearchStrategy`**: Placeholder for future PGVector or Pinecone integration where users search "A quiet cafe with good wifi".

## Dependency Injection
Requires:
- `DestinationRepository`
- `PlaceRepository`
