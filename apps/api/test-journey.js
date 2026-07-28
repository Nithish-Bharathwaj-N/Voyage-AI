const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const axios = require('axios');

const prisma = new PrismaClient();
const API_URL = 'http://localhost:3001/api/v1';
const JWT_SECRET = 'super-secret-jwt-key-that-should-be-replaced';

function signJwt(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodeBase64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const encodedHeader = encodeBase64Url(header);
  const encodedPayload = encodeBase64Url(payload);
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url');
  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

async function runJourney() {
  console.log("=== Phase 14 Production Verification Journey ===");
  try {
    const email = `testuser_${Date.now()}@example.com`;
    const user = await prisma.user.create({
      data: {
        email,
        profile: {
          create: {
            displayName: 'Test User'
          }
        }
      }
    });
    console.log(`[1] Created Test User: ${user.id} (${user.email})`);

    const token = signJwt(
      { sub: user.id, email: user.email, role: 'authenticated', exp: Math.floor(Date.now() / 1000) + 3600 },
      JWT_SECRET
    );
    console.log(`[2] Generated JWT: ${token.substring(0, 20)}...`);

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

    const dashRes = await axios.get(`${API_URL}/dashboard`, authHeaders);
    console.log(`[3] Dashboard stats: Trips=${dashRes.data.statistics.totalTrips}, Saved=${dashRes.data.statistics.savedPlacesCount}`);

    const destRes = await axios.get(`${API_URL}/explore/destinations`, authHeaders);
    const destId = destRes.data[0]?.id;
    console.log(`[4] Picked Destination: ${destId}`);

    if (!destId) {
       console.log("No destinations seeded! Aborting...");
       return;
    }

    const saveRes = await axios.post(`${API_URL}/saved-places`, { destinationId: destId }, authHeaders);
    console.log(`[5] Saved Destination Result:`, saveRes.data.id ? "Success" : "Failed");

    const colRes = await axios.post(`${API_URL}/collections`, { title: "Dream Trip", isPublic: false }, authHeaders);
    const colId = colRes.data.id;
    console.log(`[6] Created Collection: ${colId}`);

    const tripRes = await axios.post(`${API_URL}/trips`, {
      destinationId: destId,
      title: "Summer Tokyo Trip",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      budget: "MODERATE",
      travelStyle: "LEISURE",
      companions: 2,
      notes: "First time visiting"
    }, authHeaders);
    const tripId = tripRes.data.id;
    console.log(`[7] Created Trip: ${tripId}`);

    const plannerRes = await axios.get(`${API_URL}/planner/${tripId}`, authHeaders);
    let dayPlanId;
    if (plannerRes.data.itinerary && plannerRes.data.itinerary.days && plannerRes.data.itinerary.days.length > 0) {
      dayPlanId = plannerRes.data.itinerary.days[0].sections ? plannerRes.data.itinerary.days[0].sections[0].id : plannerRes.data.itinerary.days[0].id;
      console.log(`[8] Loaded Planner. DayPlan ID: ${dayPlanId}`);
      
      const actRes = await axios.post(`${API_URL}/planner/${tripId}/activities`, {
        tripId,
        dayId: plannerRes.data.itinerary.days[0].id,
        sectionId: dayPlanId,
        type: "activity",
        title: "Visit Tokyo Tower",
        time: "10:00 AM"
      }, authHeaders);
      console.log(`[9] Added Activity: ${actRes.data.id}`);
    } else {
      console.log(`[8] Loaded Planner but no days found.`);
    }

    const dashRes2 = await axios.get(`${API_URL}/dashboard`, authHeaders);
    console.log(`[10] Updated Dashboard stats: Trips=${dashRes2.data.statistics.totalTrips}, Saved=${dashRes2.data.statistics.savedPlacesCount}`);

    const tripsCount = await prisma.trip.count();
    const tripDayCount = await prisma.dayPlan.count();
    const activityCount = await prisma.activity.count();
    const collectionsCount = await prisma.collection.count();
    const savedDestinationsCount = await prisma.savedDestination.count();
    
    console.log("\n========================================");
    console.log("FINAL POSTGRESQL ROW COUNTS");
    console.log("========================================");
    console.log(`Trips: ${tripsCount}`);
    console.log(`DayPlans: ${tripDayCount}`);
    console.log(`Activities: ${activityCount}`);
    console.log(`Collections: ${collectionsCount}`);
    console.log(`SavedDestinations: ${savedDestinationsCount}`);
    console.log("========================================");

  } catch(e) {
    console.error("Error during journey:", e.response?.data || e.message);
  } finally {
    await prisma.$disconnect();
  }
}

runJourney();
