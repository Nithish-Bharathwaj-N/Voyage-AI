/**
 * Patch: assigns meaningful isFeatured/isTrending/isHiddenGem/isPopular/isWeekendEscape
 * flags to real destinations already in the database. Run once after seeding.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Flag Assignments (real, well-known destinations) ---

// 1 featured destination (hero banner)
const FEATURED = ['Dubai'];

// Top globally-searched trending destinations
const TRENDING = ['Tokyo', 'Paris', 'Barcelona', 'Rome', 'Bali', 'London', 'Singapore', 'Istanbul', 'Kyoto', 'Prague'];

// Curated hidden gems (less mainstream, off-the-beaten-path)
const HIDDEN_GEMS = [
  'Hampi', 'Jaisalmer', 'Pondicherry', 'Mahabalipuram', 'Alleppey',
  'Kanazawa', 'Nara', 'Hakone', 'Sapporo', 'Fukuoka',
  'Sukhothai', 'Ayutthaya', 'Chiang Rai', 'Krabi',
  'Porto', 'Seville', 'Krakow', 'Edinburgh',
];

// Popular this month (high-demand, high-rated)
const POPULAR = [
  'Goa', 'Jaipur', 'Mumbai', 'Delhi', 'Udaipur',
  'Dubai', 'Abu Dhabi', 'Singapore', 'Bangkok', 'Phuket',
  'Venice', 'Florence', 'Amsterdam', 'Vienna', 'Munich',
];

// Weekend escapes (short 1–2 week trips)
const WEEKEND_ESCAPES = [
  'Pondicherry', 'Coorg', 'Mysore', 'Ooty', 'Munnar',
  'Kodaikanal', 'Shimla', 'Manali', 'Darjeeling', 'Gangtok',
  'Sentosa', 'Hua Hin', 'Naha', 'Kobe',
  'Geneva', 'Copenhagen', 'Oslo', 'Stockholm', 'Helsinki',
];

async function patch() {
  console.log('Patching destination flags...');

  const results = await Promise.allSettled([
    // Featured
    prisma.destination.updateMany({
      where: { name: { in: FEATURED } },
      data: { isFeatured: true },
    }),
    // Trending
    prisma.destination.updateMany({
      where: { name: { in: TRENDING } },
      data: { isTrending: true },
    }),
    // Hidden Gems
    prisma.destination.updateMany({
      where: { name: { in: HIDDEN_GEMS } },
      data: { isHiddenGem: true },
    }),
    // Popular
    prisma.destination.updateMany({
      where: { name: { in: POPULAR } },
      data: { isPopular: true },
    }),
    // Weekend Escapes
    prisma.destination.updateMany({
      where: { name: { in: WEEKEND_ESCAPES } },
      data: { isWeekendEscape: true },
    }),
  ]);

  for (const r of results) {
    if (r.status === 'fulfilled') {
      console.log(`  ✓ Updated ${r.value.count} destinations`);
    } else {
      console.error('  ✗ Error:', r.reason);
    }
  }

  // Verify results
  const featured   = await prisma.destination.count({ where: { isFeatured: true } });
  const trending   = await prisma.destination.count({ where: { isTrending: true } });
  const hidden     = await prisma.destination.count({ where: { isHiddenGem: true } });
  const popular    = await prisma.destination.count({ where: { isPopular: true } });
  const weekend    = await prisma.destination.count({ where: { isWeekendEscape: true } });

  console.log('\n--- FLAG SUMMARY ---');
  console.log(`  isFeatured:    ${featured}`);
  console.log(`  isTrending:    ${trending}`);
  console.log(`  isHiddenGem:   ${hidden}`);
  console.log(`  isPopular:     ${popular}`);
  console.log(`  isWeekendEscape: ${weekend}`);
  console.log('Patch complete!');
}

patch()
  .catch((e) => {
    console.error('Patch failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
