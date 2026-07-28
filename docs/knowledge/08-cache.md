# 08. Cache Strategy

The Knowledge Engine relies heavily on Redis (`@voyageai/cache`) to minimize expensive Graph traversals and 3rd-party API calls.

## Strategies
- **Destination Cache**: Highly static. A city's boundaries and main attractions can be cached for weeks (TTL: 14 days).
- **Nearby Cache**: Geohash-based caching. "Places in Geohash `u09tv`" (TTL: 24 hours).
- **Weather Cache**: Highly volatile. (TTL: 3 hours).
- **Autocomplete Cache**: Extreme read-heavy. (TTL: 7 days).

## Eviction
Standard LRU (Least Recently Used) eviction policy enforced by Redis.
