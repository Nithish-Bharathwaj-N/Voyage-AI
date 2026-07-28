const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tripsCount = await prisma.trip.count();
  const tripDayCount = await prisma.dayPlan.count();
  const activityCount = await prisma.activity.count();
  const collectionsCount = await prisma.collection.count();
  const savedDestinationsCount = await prisma.savedDestination.count();
  const recentActivityCount = await prisma.recentActivity.count();
  const statisticsCount = await prisma.tripStatistics.count();
  
  console.log("========================================");
  console.log("POSTGRESQL ROW COUNTS");
  console.log("========================================");
  console.log(`Trips: ${tripsCount}`);
  console.log(`TripDay: ${tripDayCount}`);
  console.log(`Activity: ${activityCount}`);
  console.log(`Collections: ${collectionsCount}`);
  console.log(`SavedDestination: ${savedDestinationsCount}`);
  console.log(`RecentActivity: ${recentActivityCount}`);
  console.log(`TripStatistics: ${statisticsCount}`);
  console.log("========================================");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
