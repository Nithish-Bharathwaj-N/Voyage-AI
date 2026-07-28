import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');
  
  const dataPath = path.join(process.cwd(), 'src', 'seed', 'data', 'destinations.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const seedPayload = JSON.parse(fileContent);
  const destinations = Array.isArray(seedPayload) ? seedPayload : seedPayload.data;
  const metadata = Array.isArray(seedPayload) ? null : seedPayload.metadata;

  if (metadata) {
    console.log(`--- SEED METADATA ---`);
    console.log(`Version: ${metadata.version}`);
    console.log(`Generated: ${metadata.generatedDate}`);
    console.log(`Countries: ${metadata.countries.join(', ')}`);
    console.log(`Expected Destinations: ${metadata.destinationCount}`);
    console.log(`Expected Attractions: ${metadata.attractionCount}`);
    console.log(`---------------------`);
  }

  console.log(`Loaded ${destinations.length} destinations from dataset.`);
  
  let destCount = 0;
  let placeCount = 0;

  // Verify connection by fetching current counts before seed
  const initialDestCount = await prisma.destination.count();
  console.log(`Initial Destination Count in DB: ${initialDestCount}`);

  // Clear existing data without a transaction (avoids pgbouncer timeout)
  await prisma.place.deleteMany();
  await prisma.destination.deleteMany();
  console.log('Cleared existing Destination and Place records.');

  for (const destData of destinations) {
    const { places, ...destInput } = destData;
    
    const destination = await prisma.destination.create({
      data: { ...destInput },
    });

    console.log(`Created destination: ${destination.name}`);
    destCount++;

    if (places && places.length > 0) {
      const placeData = places.map((place: any) => {
        const formattedPlace = {
          ...place,
          destinationId: destination.id,
        };
        if (typeof formattedPlace.ticketPrice === 'object' && formattedPlace.ticketPrice !== null) {
          formattedPlace.ticketPrice = JSON.stringify(formattedPlace.ticketPrice);
        }
        return formattedPlace;
      });
      
      await prisma.place.createMany({
        data: placeData,
        skipDuplicates: true
      });
      
      console.log(`  Created ${placeData.length} places for ${destination.name}`);
      placeCount += placeData.length;
    }
  }

  const finalDestCount = await prisma.destination.count();
  const finalPlaceCount = await prisma.place.count();

  console.log('--- SEED SUMMARY ---');
  console.log(`Destinations processed: ${destCount}`);
  console.log(`Places processed: ${placeCount}`);
  console.log(`Final Database Destination Count: ${finalDestCount}`);
  console.log(`Final Database Place Count: ${finalPlaceCount}`);
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
