export function validateDestination(dest: any, index: number, fileName: string): string[] {
  const errors: string[] = [];

  if (!dest.name) errors.push(`[${fileName} index ${index}] Missing name`);
  if (!dest.country) errors.push(`[${dest.name || index}] Missing country`);
  if (!dest.slug) errors.push(`[${dest.name || index}] Missing slug`);
  
  if (typeof dest.latitude !== 'number' || typeof dest.longitude !== 'number') {
    errors.push(`[${dest.name || index}] Invalid coordinates`);
  }

  if (!Array.isArray(dest.categories) || dest.categories.length === 0) {
    errors.push(`[${dest.name || index}] Missing categories`);
  }

  if (!Array.isArray(dest.places) || dest.places.length === 0) {
    errors.push(`[${dest.name || index}] Missing attractions (places)`);
  } else {
    dest.places.forEach((place: any, pIdx: number) => {
      if (!place.name) errors.push(`[${dest.name} -> Place ${pIdx}] Missing name`);
      if (typeof place.latitude !== 'number' || typeof place.longitude !== 'number') {
        errors.push(`[${dest.name} -> ${place.name || pIdx}] Invalid coordinates`);
      }
      if (!place.ticketPrice || !place.ticketPrice.type) {
        errors.push(`[${dest.name} -> ${place.name || pIdx}] Missing ticketPrice.type`);
      }
    });
  }

  return errors;
}

export function deduplicate(destinations: any[]): any[] {
  const seen = new Set<string>();
  const unique = [];

  for (const dest of destinations) {
    const key = `${dest.name}-${dest.country}`.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(dest);
    }
  }

  return unique;
}
