import { generateSlug } from './slug';

const VALID_CATEGORIES = new Set([
  'BEACH', 'MOUNTAIN', 'HERITAGE', 'CITY', 'NATURE', 'ADVENTURE', 
  'DESERT', 'ISLAND', 'RELIGIOUS', 'FOOD', 'LUXURY', 'WILDLIFE'
]);

function mapCategory(cat: string): string {
  const upper = cat.toUpperCase();
  if (VALID_CATEGORIES.has(upper)) return upper;
  
  // Basic mapping
  if (upper.includes('BEACH')) return 'BEACH';
  if (upper.includes('MOUNTAIN')) return 'MOUNTAIN';
  if (upper.includes('HISTORY') || upper.includes('CULTURE')) return 'HERITAGE';
  if (upper.includes('CITY')) return 'CITY';
  if (upper.includes('NATURE') || upper.includes('PARK')) return 'NATURE';
  if (upper.includes('ADVENTURE')) return 'ADVENTURE';
  if (upper.includes('DESERT')) return 'DESERT';
  if (upper.includes('ISLAND')) return 'ISLAND';
  if (upper.includes('RELIGION') || upper.includes('TEMPLE') || upper.includes('SHRINE')) return 'RELIGIOUS';
  if (upper.includes('FOOD') || upper.includes('CULINARY')) return 'FOOD';
  if (upper.includes('LUXURY')) return 'LUXURY';
  if (upper.includes('WILDLIFE') || upper.includes('ANIMAL')) return 'WILDLIFE';
  
  return 'CITY'; // default fallback
}

export function normalizeDestination(dest: any) {
  // 1. Slugs
  const slug = generateSlug(dest.name);
  
  // 2. Remove AI fields
  delete dest.planningScore;
  delete dest.aiScore;
  delete dest.recommendationScore;

  // 3. Normalize categories
  const rawCats = Array.isArray(dest.categories) ? dest.categories : [dest.categories];
  const uniqueCats = new Set(rawCats.map((c: string) => mapCategory(c || '')));
  dest.categories = Array.from(uniqueCats);

  // 4. Normalize images
  dest.imageUrl = '/placeholders/destination.jpg';
  dest.heroImageUrl = '/placeholders/hero.jpg';
  dest.thumbnailUrl = '/placeholders/thumbnail.jpg';
  
  dest.slug = slug;
  
  // 5. Normalize places
  if (Array.isArray(dest.places)) {
    dest.places = dest.places.map((place: any) => {
      // Arrays for activities
      let activities: string[] = [];
      if (Array.isArray(place.activityCategories)) {
        activities = place.activityCategories.map((a: string) => a.toString());
      } else if (typeof place.activityCategories === 'string') {
        activities = [place.activityCategories];
      } else if (Array.isArray(place.activities)) {
        activities = place.activities.map((a: string) => a.toString());
      } else {
        activities = ['Sightseeing'];
      }
      place.activityCategories = activities;

      // Ensure ticket price object
      if (typeof place.ticketPrice === 'string' || typeof place.ticketPrice === 'number') {
        const val = place.ticketPrice.toString().toLowerCase();
        if (val.includes('free') || val === '0') {
          place.ticketPrice = { type: 'FREE' };
        } else {
          place.ticketPrice = { type: 'ESTIMATED', amount: place.ticketPrice.toString() };
        }
      } else if (!place.ticketPrice) {
        place.ticketPrice = { type: 'ESTIMATED', amount: 'Varies' };
      } else if (typeof place.ticketPrice === 'object' && place.ticketPrice !== null) {
        if (!['FREE', 'ESTIMATED', 'VERIFIED'].includes(place.ticketPrice.type)) {
          place.ticketPrice.type = 'ESTIMATED';
        }
      }

      place.imageUrl = '/placeholders/place.jpg';
      place.addressJson = {
        formattedAddress: place.name + ', ' + dest.name,
        city: dest.city || dest.name,
        country: dest.country || "Unknown"
      };
      place.images = [
        { url: '/placeholders/place.jpg', caption: place.name, isPrimary: true }
      ];
      
      return place;
    });
  } else {
    dest.places = [];
  }

  return dest;
}
