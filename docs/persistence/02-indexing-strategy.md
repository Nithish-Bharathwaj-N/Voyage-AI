# 02. Indexing Strategy

To support the heavy read-loads of a Travel Intelligence Platform, PostgreSQL indices must be meticulously designed.

## B-Tree Indices
Standard Prisma `@@index` (B-Tree) is applied to:
- `User.email` (Unique lookup during auth).
- `Trip.ownerId` (Fast retrieval of a user's trips).
- `Review.placeId` (Aggregating ratings for a Place).
- `Destination.country` (Filtering macro-regions).

## Composite Indices
Used to optimize frequent complex queries.
- `PlaceEdge.sourceId_targetId_relationship` (Unique composite to prevent duplicate edges and quickly traverse paths like "Find all places NEAR Place A").

## Spatial Indices (PostGIS)
*Note: Prisma does not natively support PostGIS schema modeling via the Prisma language. We model `latitude` and `longitude` as standard Floats for ease of ORM mapping.*
However, to perform radius queries ("Find restaurants within 5km"), we will:
1. Create a raw SQL migration to add a computed `geometry` column:
   `ALTER TABLE "Place" ADD COLUMN geom geometry(Point, 4326) GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED;`
2. Create a raw GiST index:
   `CREATE INDEX place_geom_idx ON "Place" USING GIST (geom);`
3. Expose these searches via `$queryRaw` in the Repository layer, shielding the business logic from the SQL implementation.
