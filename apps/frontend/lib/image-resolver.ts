import { INDIAN_DESTINATIONS } from '@/data/explore-destinations';

const DEFAULT_PLACEHOLDER = '/images/hero-bg.png';

// Fallback images for destinations to guarantee we never miss a cover.
const DESTINATION_HEROES: Record<string, string> = {
  ooty: 'https://images.unsplash.com/photo-1605553018284-5f80786cf6f2?auto=format&fit=crop&q=80',
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80',
  leh: 'https://images.unsplash.com/photo-1598426746814-724f7fdb7cd9?auto=format&fit=crop&q=80',
  kochi: 'https://images.unsplash.com/photo-1582885994269-8979db1fc442?auto=format&fit=crop&q=80',
  tokyo: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e907600e6ce?auto=format&fit=crop&q=80',
  'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80',
  singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80',
};

// Internal asset catalog mapping prominent landmarks to real images
const LANDMARK_REGISTRY: Record<string, Record<string, string>> = {
  ooty: {
    'lake': 'https://images.unsplash.com/photo-1604987747879-11c1d02c842b?auto=format&fit=crop&q=80',
    'botanical': 'https://images.unsplash.com/photo-1598282869557-6dbf58d04423?auto=format&fit=crop&q=80',
    'train': 'https://images.unsplash.com/photo-1620302821102-1fa9cc6770e7?auto=format&fit=crop&q=80',
    'doddabetta': 'https://images.unsplash.com/photo-1598282869557-6dbf58d04423?auto=format&fit=crop&q=80',
    'pykara': 'https://images.unsplash.com/photo-1605553018284-5f80786cf6f2?auto=format&fit=crop&q=80',
  },
  goa: {
    'beach': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80',
    'aguada': 'https://images.unsplash.com/photo-1565551910609-b78917812ff6?auto=format&fit=crop&q=80',
    'chapora': 'https://images.unsplash.com/photo-1565551910609-b78917812ff6?auto=format&fit=crop&q=80',
    'church': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80',
  },
  leh: {
    'pangong': 'https://images.unsplash.com/photo-1598426746814-724f7fdb7cd9?auto=format&fit=crop&q=80',
    'nubra': 'https://images.unsplash.com/photo-1581458920959-1e4fbab2a715?auto=format&fit=crop&q=80',
    'thiksey': 'https://images.unsplash.com/photo-1586714072671-55db3dcf9e9c?auto=format&fit=crop&q=80',
    'khardung': 'https://images.unsplash.com/photo-1581458920959-1e4fbab2a715?auto=format&fit=crop&q=80',
  },
  kochi: {
    'fishing': 'https://images.unsplash.com/photo-1582885994269-8979db1fc442?auto=format&fit=crop&q=80',
    'mattancherry': 'https://images.unsplash.com/photo-1599818817743-1eeb5c8a32bb?auto=format&fit=crop&q=80',
    'fort': 'https://images.unsplash.com/photo-1582885994269-8979db1fc442?auto=format&fit=crop&q=80',
    'marine': 'https://images.unsplash.com/photo-1627917811776-e17f04ef3ec4?auto=format&fit=crop&q=80',
    'jew': 'https://images.unsplash.com/photo-1599818817743-1eeb5c8a32bb?auto=format&fit=crop&q=80',
  },
  tokyo: {
    'temple': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&q=80',
    'shibuya': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80',
    'fuji': 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80',
    'tower': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80',
  },
  paris: {
    'eiffel': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80',
    'louvre': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80',
    'notre': 'https://images.unsplash.com/photo-1502602898657-3e907600e6ce?auto=format&fit=crop&q=80',
    'seine': 'https://images.unsplash.com/photo-1502602898657-3e907600e6ce?auto=format&fit=crop&q=80',
  },
  'new york': {
    'liberty': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80',
    'central park': 'https://images.unsplash.com/photo-1522083111300-983173099955?auto=format&fit=crop&q=80',
    'times square': 'https://images.unsplash.com/photo-1500916434205-0c77489c6211?auto=format&fit=crop&q=80',
    'empire': 'https://images.unsplash.com/photo-1555109307-f7d9ec115862?auto=format&fit=crop&q=80',
  },
  singapore: {
    'marina': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80',
    'gardens': 'https://images.unsplash.com/photo-1560088514-469cbafdb52d?auto=format&fit=crop&q=80',
    'sentosa': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
    'zoo': 'https://images.unsplash.com/photo-1628187834570-5b7fb785c490?auto=format&fit=crop&q=80',
  },
};

/**
 * Validates if the given string is a structurally safe URL for Next.js Image rendering.
 */
function isValidUrlFormat(src: string): boolean {
  if (!src) return false;
  const s = src.toLowerCase().trim();
  return (
    s.startsWith('https://') ||
    s.startsWith('http://') ||
    s.startsWith('/images/') ||
    s.startsWith('/assets/') ||
    s.startsWith('data:image') ||
    s.startsWith('blob:')
  );
}

/**
 * Safely resolves AI-hallucinated image strings (e.g. "Ooty Lake") into valid URLs.
 * Implements strict fallbacks so React never crashes.
 */
export function resolveImageSource(
  rawSrc?: string,
  context?: { destination?: string; category?: string }
): string {
  // 1. Direct Pass-through for valid URLs
  if (rawSrc && isValidUrlFormat(rawSrc)) {
    return rawSrc;
  }

  const query = (rawSrc || context?.category || '').toLowerCase().trim();
  let destKey = (context?.destination || '').toLowerCase().trim();
  
  // Clean up destination (e.g., "Kochi, Kerala" -> "kochi")
  if (destKey.includes(',')) destKey = destKey.split(',')[0].trim();

  // 2. Smart Registry Lookup
  if (destKey && LANDMARK_REGISTRY[destKey]) {
    const landmarks = LANDMARK_REGISTRY[destKey];
    for (const [key, url] of Object.entries(landmarks)) {
      if (query.includes(key)) {
        return url;
      }
    }
  }

  // 3. Global Explore Dataset Fallback (if destination exists in dataset)
  if (destKey) {
    const exploreMatch = INDIAN_DESTINATIONS.find(d => d.name.toLowerCase() === destKey);
    if (exploreMatch?.heroImage) {
      return exploreMatch.heroImage;
    }
  }

  // 4. Central Destination Hero Fallback
  if (destKey && DESTINATION_HEROES[destKey]) {
    return DESTINATION_HEROES[destKey];
  }

  // 5. Category Fallback
  if (context?.category) {
    const cat = context.category.toLowerCase();
    if (cat.includes('hotel') || cat.includes('accommodation')) return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80';
    if (cat.includes('restaurant') || cat.includes('food') || cat.includes('dining')) return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80';
    if (cat.includes('nature') || cat.includes('park')) return 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80';
  }

  // 6. Final Failsafe
  return DEFAULT_PLACEHOLDER;
}
