import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

const DATA_DIR = '/home/nithish/.gemini/antigravity/scratch/Voyage-AI-v2/apps/web/public/data/destinations/India';

async function processDirectory(directory: string) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'states.json') {
      await processFile(fullPath);
    }
  }
}

async function processFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const dest = JSON.parse(content);
    console.log(`Processing: ${dest.name}`);

    const bestSeasonArr = [];
    const seasonStr = (dest.bestSeason || '').toLowerCase();
    if (seasonStr.includes('oct') || seasonStr.includes('nov') || seasonStr.includes('dec') || seasonStr.includes('jan') || seasonStr.includes('feb') || seasonStr.includes('mar') || seasonStr.includes('winter') || seasonStr.includes('autumn')) {
        bestSeasonArr.push('Autumn', 'Winter');
    }
    if (seasonStr.includes('apr') || seasonStr.includes('may') || seasonStr.includes('jun') || seasonStr.includes('spring')) {
        bestSeasonArr.push('Spring', 'Summer');
    }
    if (seasonStr.includes('jul') || seasonStr.includes('aug') || seasonStr.includes('sep') || seasonStr.includes('monsoon')) {
        bestSeasonArr.push('Monsoon');
    }
    const uniqueSeasons = Array.from(new Set(bestSeasonArr));
    if (uniqueSeasons.length === 0) uniqueSeasons.push('All Year');

    let idealDurationWeeks = 1;
    const durationStr = (dest.idealDuration || '').toLowerCase();
    if (durationStr.includes('week') && !durationStr.includes('1-2')) idealDurationWeeks = 2;
    
    const popularityScore = Math.round((dest.adventureScore || 5) * 10);
    const isFeatured = ['jaipur', 'kerala', 'goa', 'manali'].includes((dest.name || '').toLowerCase());
    const isTrending = (dest.rating || 0) >= 4.6;
    const isPopular = (dest.reviewCount || 0) >= 20000;
    const isHiddenGem = dest.hiddenGem === true || ((dest.adventureScore || 0) <= 3 && (dest.reviewCount || 0) < 5000);
    const isWeekendEscape = durationStr.includes('2') || durationStr.includes('3');
    
    // Add missing fields to Destination model
    const destinationData = {
        name: dest.name || 'Unknown',
        country: 'India',
        state: dest.state || '',
        region: dest.state || '',
        city: dest.name || '',
        continent: 'Asia',
        latitude: dest.coordinates?.lat || 20.0,
        longitude: dest.coordinates?.lng || 78.0,
        description: dest.description || '',
        heroImageUrl: dest.coverImage || '',
        imageUrl: dest.coverImage || '',
        thumbnailUrl: dest.coverImage || '',
        activeSeasons: uniqueSeasons,
        averageBudget: dest.budget || 'Medium',
        priceRange: dest.budget || 'Medium',
        rating: dest.rating ? parseFloat(dest.rating) : 4.0,
        reviewsCount: dest.reviewCount || 0,
        categories: dest.category ? [dest.category] : [],
        travelStyle: dest.category || 'Cultural',
        travelDaysRecommended: durationStr.includes('2') ? 2 : (durationStr.includes('3') ? 3 : 7),
        durationWeeks: idealDurationWeeks,
        bestSeason: dest.bestSeason || '',
        popularityScore: popularityScore,
        planningScore: 80,
        isFeatured: isFeatured,
        isTrending: isTrending,
        isPopular: isPopular,
        isHiddenGem: isHiddenGem,
        isWeekendEscape: isWeekendEscape,
        tags: dest.tags || [],
        galleryImages: dest.galleryImages || [],
        history: dest.history || '',
        idealDuration: dest.idealDuration || '',
        temperature: dest.temperature || '',
        nearestAirport: dest.nearestAirport || '',
        nearestRailway: dest.nearestRailwayStation || '',
        nearestBusStand: dest.nearestBusStand || '',
        localFood: dest.localFood || [],
        shopping: dest.shopping || [],
        culture: dest.culture || '',
        festivals: dest.festivals || [],
        travelTips: dest.travelTips || [],
        packingTips: dest.packingTips || [],
        weatherInfo: dest.weather || '',
        transport: dest.transport || '',
        familyFriendly: dest.familyFriendly ?? true,
        coupleFriendly: dest.coupleFriendly ?? true,
        soloFriendly: dest.soloFriendly ?? true,
        adventureScore: dest.adventureScore || 5,
        luxuryScore: dest.luxuryScore || 5,
        budgetScore: dest.budgetScore || 5
    };

    const destination = await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: destinationData,
      create: {
          slug: dest.slug,
          ...destinationData
      }
    });

    // Handle Places
    await prisma.place.deleteMany({
        where: { destinationId: destination.id }
    });

    const places = [];
    if (dest.topAttractions) {
        for (const attr of dest.topAttractions) {
            places.push({
                destinationId: destination.id,
                name: attr.name || 'Unknown Attraction',
                type: 'ATTRACTION',
                latitude: dest.coordinates?.lat || 20.0,
                longitude: dest.coordinates?.lng || 78.0,
                addressJson: { formatted: attr.location || '' },
                description: attr.description || '',
                images: [],
                activityCategories: dest.category ? [dest.category] : [],
                cuisines: [],
                budgetCategory: null,
                accommodationType: null,
                tags: dest.tags || [],
                openingHours: '',
                estimatedVisitDuration: '2 hours',
                ticketPrice: '',
                website: '',
                phone: '',
                imageUrl: ''
            });
        }
    }
    
    if (dest.activities) {
        for (const act of dest.activities) {
            places.push({
                destinationId: destination.id,
                name: act.name || 'Unknown Activity',
                type: 'ACTIVITY',
                latitude: dest.coordinates?.lat || 20.0,
                longitude: dest.coordinates?.lng || 78.0,
                addressJson: { formatted: dest.name || '' },
                description: act.description || `Cost: ${act.price || 'N/A'}`,
                images: [],
                activityCategories: dest.category ? [dest.category] : [],
                cuisines: [],
                budgetCategory: null,
                accommodationType: null,
                tags: dest.tags || [],
                openingHours: '',
                estimatedVisitDuration: '2 hours',
                ticketPrice: act.price || '',
                website: '',
                phone: '',
                imageUrl: ''
            });
        }
    }
    
    if (places.length > 0) {
        await prisma.place.createMany({
            data: places
        });
    }

  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

async function main() {
  console.log('Starting migration...');
  await processDirectory(DATA_DIR);
  console.log('Migration complete!');
  const count = await prisma.destination.count();
  const placeCount = await prisma.place.count();
  console.log(`Total Destinations: ${count}`);
  console.log(`Total Places: ${placeCount}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
