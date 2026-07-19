import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a dummy user
  const userId = '00000000-0000-0000-0000-000000000000'; // predictable ID for testing
  const user = await prisma.user.upsert({
    where: { email: 'traveler@voyageai.com' },
    update: {},
    create: {
      id: userId,
      email: 'traveler@voyageai.com',
      profile: {
        create: {
          firstName: 'Alex',
          lastName: 'Traveler',
          travelStyle: 'Luxury',
          budgetRange: 'High',
        }
      }
    },
  });

  // 2. Create Upcoming Trip (Japan)
  const japanTripId = uuidv4();
  await prisma.trip.create({
    data: {
      id: japanTripId,
      ownerId: user.id,
      title: 'Japan Spring Escape',
      description: 'Cherry blossom tour across Tokyo and Kyoto',
      coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
      startDate: new Date(new Date().setDate(new Date().getDate() + 15)), // 15 days from now
      endDate: new Date(new Date().setDate(new Date().getDate() + 25)),
      status: 'PLANNING',
      estimatedBudget: 4500,
      actualBudget: 0,
      country: 'Japan',
      city: 'Tokyo',
      isArchived: false,
      destinations: {
        create: [
          {
            name: 'Tokyo',
            country: 'Japan',
            order: 1,
            arrivalDate: new Date(new Date().setDate(new Date().getDate() + 15)),
            departureDate: new Date(new Date().setDate(new Date().getDate() + 20)),
            activities: {
              create: [
                {
                  tripId: japanTripId,
                  name: 'Flight SFO to HND',
                  description: 'JL001 - Seat 4A',
                  locationName: 'San Francisco International Airport',
                  startTime: new Date(new Date().setDate(new Date().getDate() + 14)),
                  endTime: new Date(new Date().setDate(new Date().getDate() + 15)),
                  cost: 1200,
                  order: 1,
                  notes: 'flight' // Hack: Use notes to pass category for now
                },
                {
                  tripId: japanTripId,
                  name: 'Check-in: Aman Tokyo',
                  description: 'Confirmation: #JPTKY892',
                  locationName: 'Tokyo, Japan',
                  startTime: new Date(new Date().setDate(new Date().getDate() + 15)),
                  cost: 1500,
                  order: 2,
                  notes: 'hotel'
                },
                {
                  tripId: japanTripId,
                  name: 'TeamLab Planets',
                  description: 'Digital art museum',
                  locationName: 'Toyosu, Tokyo',
                  startTime: new Date(new Date().setDate(new Date().getDate() + 16)),
                  cost: 35,
                  order: 3,
                  notes: 'activity'
                }
              ]
            }
          }
        ]
      },
    }
  });

  // 3. Create Past Trip (Paris)
  const parisTripId = uuidv4();
  await prisma.trip.create({
    data: {
      id: parisTripId,
      ownerId: user.id,
      title: 'Paris Weekend',
      description: 'Quick getaway to France',
      coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)), 
      endDate: new Date(new Date().setDate(new Date().getDate() - 25)),
      status: 'COMPLETED',
      estimatedBudget: 2000,
      actualBudget: 2350,
      country: 'France',
      city: 'Paris',
      isArchived: true,
    }
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
