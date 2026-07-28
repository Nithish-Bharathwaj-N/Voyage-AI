import * as fs from 'fs';
import * as path from 'path';

import india from './raw_data/india';
import asia from './raw_data/asia';
import uae from './raw_data/uae';
import europe from './raw_data/europe';
import usa from './raw_data/usa';

async function main() {
  const allDestinations = [
    ...india,
    ...asia,
    ...uae,
    ...europe,
    ...usa
  ];

  let destCount = 0;
  let placeCount = 0;

  const processed = allDestinations.map(d => {
    destCount++;
    if (!d.slug) {
      d.slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
    }
    if (d.places) {
      placeCount += d.places.length;
    }
    return d;
  });

  const outPath = path.join(__dirname, 'data', 'destinations.json');
  fs.writeFileSync(outPath, JSON.stringify(processed, null, 2), 'utf-8');

  console.log(`Successfully bundled ${destCount} real destinations.`);
  console.log(`Successfully bundled ${placeCount} real places.`);
}

main().catch(console.error);
