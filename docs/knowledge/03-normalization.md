# 03. Normalization

All provider responses pass through the Normalization Layer to ensure absolute schema consistency.

## Target Entities
- `Destination` (Cities, Regions, Countries)
- `Place` (Points of Interest)
- `Restaurant` (Food & Beverage)
- `Hotel` (Accommodation)
- `Activity` (Tours, Events)
- `Weather` (Forecasts)

## Example Transformation
A Google Places response containing `business_status`, `geometry`, `icon`, `plus_code`, etc., is reduced to:
```typescript
interface Place {
  id: string; // our internal ID, mapping to external reference ID
  name: string;
  coordinates: { lat: number, lng: number };
  categories: PlaceCategory[];
  rating: number;
  images: string[];
}
```
