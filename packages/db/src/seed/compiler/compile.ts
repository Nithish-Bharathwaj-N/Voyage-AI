import * as fs from 'fs';
import * as path from 'path';
import { normalizeDestination } from './normalize';
import { validateDestination, deduplicate } from './validator';

// Required modules
const rawDataDir = path.join(__dirname, '../raw_data');
const outPath = path.join(__dirname, '../data', 'destinations.json');

async function main() {
  console.log('--- VOYAGE AI DATA COMPILER ---');
  
  if (!fs.existsSync(rawDataDir)) {
    console.error(`Error: raw_data directory not found at ${rawDataDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(rawDataDir).filter(f => f.endsWith('.ts'));
  console.log(`Found ${files.length} regional files: ${files.join(', ')}`);

  let allDestinations: any[] = [];

  for (const file of files) {
    const fullPath = path.join(rawDataDir, file);
    try {
      // Use require for dynamic loading since ts-node handles it
      const mod = require(fullPath);
      const data = mod.default || mod;
      
      if (Array.isArray(data)) {
        allDestinations = allDestinations.concat(data);
        console.log(`- Loaded ${data.length} destinations from ${file}`);
      } else {
        console.warn(`- Warning: ${file} does not export an array!`);
      }
    } catch (e) {
      console.error(`- Error loading ${file}:`, e);
    }
  }

  console.log(`Total raw destinations: ${allDestinations.length}`);

  // 1. Deduplicate
  const uniqueDestinations = deduplicate(allDestinations);
  console.log(`Removed ${allDestinations.length - uniqueDestinations.length} duplicates.`);

  // 2. Normalize & Sort
  const normalizedDestinations = uniqueDestinations.map(normalizeDestination);
  normalizedDestinations.sort((a, b) => a.name.localeCompare(b.name));

  // 3. Validate
  let hasCriticalErrors = false;
  let totalPlaces = 0;
  const uniqueCountries = new Set<string>();
  const uniqueCategories = new Set<string>();

  console.log('--- VALIDATION PHASE ---');
  normalizedDestinations.forEach((dest, idx) => {
    const errors = validateDestination(dest, idx, 'Aggregated Data');
    if (errors.length > 0) {
      hasCriticalErrors = true;
      errors.forEach(err => console.error(`ERROR: ${err}`));
    }
    
    totalPlaces += (dest.places?.length || 0);
    if (dest.country) uniqueCountries.add(dest.country);
    if (dest.categories) {
      dest.categories.forEach((c: string) => uniqueCategories.add(c));
    }
  });

  if (hasCriticalErrors) {
    console.error('Validation failed! Fix the errors before compiling.');
    process.exit(1);
  }
  
  console.log('Validation passed!');

  // 4. Generate Metadata Wrapper
  const seedPayload = {
    metadata: {
      version: '1.0.0',
      generatedDate: new Date().toISOString(),
      destinationCount: normalizedDestinations.length,
      attractionCount: totalPlaces,
      countries: Array.from(uniqueCountries).sort(),
      categories: Array.from(uniqueCategories).sort()
    },
    data: normalizedDestinations
  };

  // 5. Write file
  fs.writeFileSync(outPath, JSON.stringify(seedPayload, null, 2), 'utf-8');
  console.log('--- COMPILATION SUMMARY ---');
  console.log(`Destination count: ${seedPayload.metadata.destinationCount}`);
  console.log(`Attraction count: ${seedPayload.metadata.attractionCount}`);
  console.log(`Countries covered: ${seedPayload.metadata.countries.length}`);
  console.log(`Categories covered: ${seedPayload.metadata.categories.length}`);
  console.log(`Saved output to: ${outPath}`);
}

main().catch(console.error);
