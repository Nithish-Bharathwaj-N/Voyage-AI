import * as fs from 'fs';
import * as path from 'path';

// Priority Regions
const regions = [
  {
    country: 'India',
    continent: 'Asia',
    cities: [
      { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
      { name: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025 },
      { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
      { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
      { name: 'Goa', state: 'Goa', lat: 15.2993, lng: 74.1240 },
      { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lng: 73.7125 },
      { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 },
      { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
      { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
      { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
      { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
      { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
      { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
      { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
      { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lng: 76.6394 },
      { name: 'Darjeeling', state: 'West Bengal', lat: 27.0360, lng: 88.2627 },
      { name: 'Rishikesh', state: 'Uttarakhand', lat: 30.0869, lng: 78.2676 },
      { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
      { name: 'Munnar', state: 'Kerala', lat: 10.0889, lng: 77.0595 },
      { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lng: 73.0243 }
    ]
  },
  {
    country: 'Japan',
    continent: 'Asia',
    cities: [
      { name: 'Tokyo', state: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      { name: 'Kyoto', state: 'Kyoto', lat: 35.0116, lng: 135.7681 },
      { name: 'Osaka', state: 'Osaka', lat: 34.6937, lng: 135.5023 },
      { name: 'Sapporo', state: 'Hokkaido', lat: 43.0618, lng: 141.3545 },
      { name: 'Fukuoka', state: 'Fukuoka', lat: 33.5902, lng: 130.4017 },
      { name: 'Nara', state: 'Nara', lat: 34.6851, lng: 135.8048 },
      { name: 'Kobe', state: 'Hyogo', lat: 34.6901, lng: 135.1955 },
      { name: 'Yokohama', state: 'Kanagawa', lat: 35.4437, lng: 139.6380 },
      { name: 'Hiroshima', state: 'Hiroshima', lat: 34.3853, lng: 132.4553 },
      { name: 'Nagoya', state: 'Aichi', lat: 35.1815, lng: 136.9066 },
      { name: 'Kanazawa', state: 'Ishikawa', lat: 36.5613, lng: 136.6562 },
      { name: 'Nagasaki', state: 'Nagasaki', lat: 32.7503, lng: 129.8777 },
      { name: 'Hakone', state: 'Kanagawa', lat: 35.2324, lng: 139.1069 },
      { name: 'Okinawa', state: 'Okinawa', lat: 26.2124, lng: 127.6809 },
      { name: 'Sendai', state: 'Miyagi', lat: 38.2682, lng: 140.8694 }
    ]
  },
  {
    country: 'Thailand',
    continent: 'Asia',
    cities: [
      { name: 'Bangkok', state: 'Bangkok', lat: 13.7563, lng: 100.5018 },
      { name: 'Chiang Mai', state: 'Chiang Mai', lat: 18.7953, lng: 98.9620 },
      { name: 'Phuket', state: 'Phuket', lat: 7.8804, lng: 98.3923 },
      { name: 'Pattaya', state: 'Chonburi', lat: 12.9236, lng: 100.8825 },
      { name: 'Krabi', state: 'Krabi', lat: 8.0863, lng: 98.9063 },
      { name: 'Ayutthaya', state: 'Ayutthaya', lat: 14.3505, lng: 100.5681 },
      { name: 'Hua Hin', state: 'Prachuap Khiri Khan', lat: 12.5684, lng: 99.9577 },
      { name: 'Koh Samui', state: 'Surat Thani', lat: 9.5120, lng: 100.0136 },
      { name: 'Chiang Rai', state: 'Chiang Rai', lat: 19.9105, lng: 99.8406 },
      { name: 'Pai', state: 'Mae Hong Son', lat: 19.3582, lng: 98.4361 }
    ]
  },
  {
    country: 'Singapore',
    continent: 'Asia',
    cities: [
      { name: 'Singapore', state: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { name: 'Sentosa', state: 'Singapore', lat: 1.2494, lng: 103.8303 }
    ]
  },
  {
    country: 'United Arab Emirates',
    continent: 'Asia',
    cities: [
      { name: 'Dubai', state: 'Dubai', lat: 25.2048, lng: 55.2708 },
      { name: 'Abu Dhabi', state: 'Abu Dhabi', lat: 24.4539, lng: 54.3773 },
      { name: 'Sharjah', state: 'Sharjah', lat: 25.3463, lng: 55.4209 },
      { name: 'Ras Al Khaimah', state: 'Ras Al Khaimah', lat: 25.7895, lng: 55.9432 },
      { name: 'Fujairah', state: 'Fujairah', lat: 25.1288, lng: 56.3265 }
    ]
  },
  {
    country: 'France',
    continent: 'Europe',
    cities: [
      { name: 'Paris', state: 'Île-de-France', lat: 48.8566, lng: 2.3522 },
      { name: 'Nice', state: 'Provence-Alpes-Côte d\'Azur', lat: 43.7102, lng: 7.2620 },
      { name: 'Lyon', state: 'Auvergne-Rhône-Alpes', lat: 45.7640, lng: 4.8357 },
      { name: 'Marseille', state: 'Provence-Alpes-Côte d\'Azur', lat: 43.2965, lng: 5.3698 },
      { name: 'Bordeaux', state: 'Nouvelle-Aquitaine', lat: 44.8378, lng: -0.5792 },
      { name: 'Strasbourg', state: 'Grand Est', lat: 48.5734, lng: 7.7521 },
      { name: 'Lille', state: 'Hauts-de-France', lat: 50.6292, lng: 3.0573 }
    ]
  },
  {
    country: 'Italy',
    continent: 'Europe',
    cities: [
      { name: 'Rome', state: 'Lazio', lat: 41.9028, lng: 12.4964 },
      { name: 'Venice', state: 'Veneto', lat: 45.4408, lng: 12.3155 },
      { name: 'Florence', state: 'Tuscany', lat: 43.7696, lng: 11.2558 },
      { name: 'Milan', state: 'Lombardy', lat: 45.4642, lng: 9.1900 },
      { name: 'Naples', state: 'Campania', lat: 40.8518, lng: 14.2681 },
      { name: 'Turin', state: 'Piedmont', lat: 45.0703, lng: 7.6868 },
      { name: 'Bologna', state: 'Emilia-Romagna', lat: 44.4949, lng: 11.3426 }
    ]
  },
  {
    country: 'Spain',
    continent: 'Europe',
    cities: [
      { name: 'Madrid', state: 'Madrid', lat: 40.4168, lng: -3.7038 },
      { name: 'Barcelona', state: 'Catalonia', lat: 41.3851, lng: 2.1734 },
      { name: 'Seville', state: 'Andalusia', lat: 37.3891, lng: -5.9845 },
      { name: 'Valencia', state: 'Valencian Community', lat: 39.4699, lng: -0.3763 },
      { name: 'Granada', state: 'Andalusia', lat: 37.1773, lng: -3.5986 }
    ]
  },
  {
    country: 'United Kingdom',
    continent: 'Europe',
    cities: [
      { name: 'London', state: 'England', lat: 51.5074, lng: -0.1278 },
      { name: 'Edinburgh', state: 'Scotland', lat: 55.9533, lng: -3.1883 },
      { name: 'Manchester', state: 'England', lat: 53.4808, lng: -2.2426 },
      { name: 'Bath', state: 'England', lat: 51.3758, lng: -2.3599 },
      { name: 'York', state: 'England', lat: 53.9590, lng: -1.0815 }
    ]
  },
  {
    country: 'Germany',
    continent: 'Europe',
    cities: [
      { name: 'Berlin', state: 'Berlin', lat: 52.5200, lng: 13.4050 },
      { name: 'Munich', state: 'Bavaria', lat: 48.1351, lng: 11.5820 },
      { name: 'Frankfurt', state: 'Hesse', lat: 50.1109, lng: 8.6821 },
      { name: 'Hamburg', state: 'Hamburg', lat: 53.5511, lng: 9.9937 },
      { name: 'Cologne', state: 'North Rhine-Westphalia', lat: 50.9375, lng: 6.9603 }
    ]
  },
  {
    country: 'United States',
    continent: 'North America',
    cities: [
      { name: 'New York', state: 'New York', lat: 40.7128, lng: -74.0060 },
      { name: 'Los Angeles', state: 'California', lat: 34.0522, lng: -118.2437 },
      { name: 'Chicago', state: 'Illinois', lat: 41.8781, lng: -87.6298 },
      { name: 'Las Vegas', state: 'Nevada', lat: 36.1699, lng: -115.1398 },
      { name: 'Miami', state: 'Florida', lat: 25.7617, lng: -80.1918 },
      { name: 'San Francisco', state: 'California', lat: 37.7749, lng: -122.4194 },
      { name: 'Orlando', state: 'Florida', lat: 28.5383, lng: -81.3792 },
      { name: 'Honolulu', state: 'Hawaii', lat: 21.3069, lng: -157.8583 },
      { name: 'Washington D.C.', state: 'District of Columbia', lat: 38.9072, lng: -77.0369 },
      { name: 'New Orleans', state: 'Louisiana', lat: 29.9511, lng: -90.0715 },
      { name: 'Seattle', state: 'Washington', lat: 47.6062, lng: -122.3321 },
      { name: 'Boston', state: 'Massachusetts', lat: 42.3601, lng: -71.0589 },
      { name: 'San Diego', state: 'California', lat: 32.7157, lng: -117.1611 },
      { name: 'Austin', state: 'Texas', lat: 30.2672, lng: -97.7431 },
      { name: 'Nashville', state: 'Tennessee', lat: 36.1627, lng: -86.7816 },
      { name: 'Denver', state: 'Colorado', lat: 39.7392, lng: -104.9903 },
      { name: 'Portland', state: 'Oregon', lat: 45.5152, lng: -122.6784 },
      { name: 'Atlanta', state: 'Georgia', lat: 33.7490, lng: -84.3880 },
      { name: 'Charleston', state: 'South Carolina', lat: 32.7765, lng: -79.9311 },
      { name: 'Savannah', state: 'Georgia', lat: 32.0809, lng: -81.0912 }
    ]
  }
];

// Helper functions for random generation
const randomElement = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min: number, max: number, decimals: number = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

// Predefined Sets
const categoriesList = ['Nature', 'Culture', 'History', 'Beaches', 'Nightlife', 'Shopping', 'Adventure', 'Relaxation', 'Food', 'Mountains', 'Wildlife', 'Architecture', 'Art', 'Desert'];
const travelStylesList = ['Cultural', 'Relaxation', 'Adventure', 'Family', 'Romantic', 'Luxury', 'Backpacking', 'Road Trip'];
const seasonsList = ['Spring', 'Summer', 'Autumn', 'Winter'];
const tagsList = ['UNESCO', 'Instagrammable', 'Budget-friendly', 'Family-friendly', 'Couples', 'Solo Travel', 'Off the beaten path', 'Must-see', 'Iconic', 'Local vibe', 'Scenic', 'Historical'];
const placeCategoriesList = ['Landmark', 'Museum', 'Park', 'Beach', 'Temple', 'Market', 'Restaurant', 'Shopping Mall', 'Viewpoint', 'Historical Site', 'Gallery', 'Cafe'];

const images = [
  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473625247510-8ceb1760943f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
];

const placeImages = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400&auto=format&fit=crop', // Restaurant
  'https://images.unsplash.com/photo-1518998053401-a4149019a274?q=80&w=400&auto=format&fit=crop', // Museum
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop', // Mountain
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=400&auto=format&fit=crop', // Beach
  'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=400&auto=format&fit=crop', // Temple
  'https://images.unsplash.com/photo-1511739001486-61f88ce8b979?q=80&w=400&auto=format&fit=crop', // Architecture
  'https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=400&auto=format&fit=crop', // Landscape
  'https://images.unsplash.com/photo-1472224371017-08207f84aaae?q=80&w=400&auto=format&fit=crop', // Park
];

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + randomInt(1000, 9999);
}

function generateDestinations() {
  const generatedDestinations = [];

  for (const region of regions) {
    for (const city of region.cities) {
      
      const numPlaces = randomInt(10, 20);
      const generatedPlaces = [];

      for (let i = 0; i < numPlaces; i++) {
        const pType = randomElement(['ATTRACTION', 'RESTAURANT', 'HOTEL', 'ATTRACTION', 'ATTRACTION']);
        const pCat = randomElement(placeCategoriesList);
        // Add random slight variation to lat lng (roughly within a few km)
        const pLat = city.lat + (Math.random() - 0.5) * 0.1;
        const pLng = city.lng + (Math.random() - 0.5) * 0.1;

        generatedPlaces.push({
          name: `${city.name} ${pCat} ${i + 1}`,
          type: pType,
          latitude: pLat,
          longitude: pLng,
          addressJson: {
            street: `${randomInt(1, 999)} Main St`,
            city: city.name,
            state: city.state,
            country: region.country,
          },
          description: `A highly rated ${pCat.toLowerCase()} located in the heart of ${city.name}, offering incredible experiences and beautiful sights.`,
          images: [
            { url: randomElement(placeImages), caption: `${city.name} ${pCat}` }
          ],
          ratingScore: randomFloat(3.5, 5.0),
          ratingCount: randomInt(10, 5000),
          activityCategories: [pCat],
          tags: [randomElement(tagsList), randomElement(tagsList)],
          imageUrl: randomElement(placeImages),
        });
      }

      // Shuffle categories, tags, seasons
      const shuffledCategories = [...categoriesList].sort(() => 0.5 - Math.random()).slice(0, randomInt(3, 6));
      const shuffledTags = [...tagsList].sort(() => 0.5 - Math.random()).slice(0, randomInt(4, 8));
      const shuffledSeasons = [...seasonsList].sort(() => 0.5 - Math.random()).slice(0, randomInt(1, 3));

      generatedDestinations.push({
        slug: generateSlug(city.name),
        name: city.name,
        country: region.country,
        state: city.state,
        region: city.state,
        city: city.name,
        continent: region.continent,
        latitude: city.lat,
        longitude: city.lng,
        description: `Experience the magic of ${city.name}, a premier destination in ${region.country}. Famous for its stunning landscapes, vibrant culture, and unforgettable attractions.`,
        heroImageUrl: randomElement(images),
        imageUrl: randomElement(images),
        thumbnailUrl: randomElement(images),
        activeSeasons: shuffledSeasons,
        averageBudget: randomElement(['low', 'medium', 'high', 'luxury']),
        priceRange: randomElement(['low', 'medium', 'high', 'luxury']),
        rating: randomFloat(4.0, 5.0),
        reviewsCount: randomInt(100, 20000),
        categories: shuffledCategories,
        travelStyle: randomElement(travelStylesList),
        travelDaysRecommended: randomInt(2, 14),
        durationWeeks: randomInt(1, 3),
        bestSeason: randomElement(seasonsList),
        popularityScore: randomInt(50, 100),
        planningScore: randomInt(70, 100),
        isFeatured: Math.random() > 0.8,
        isTrending: Math.random() > 0.7,
        isPopular: Math.random() > 0.5,
        isHiddenGem: Math.random() > 0.8,
        isWeekendEscape: Math.random() > 0.7,
        tags: shuffledTags,
        places: generatedPlaces
      });
    }
  }

  return generatedDestinations;
}

async function run() {
  console.log('Generating destinations programmatically...');
  const data = generateDestinations();
  
  const outPath = path.join(process.cwd(), 'src', 'seed', 'data', 'destinations.json');
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
  
  let placeCount = 0;
  data.forEach(d => placeCount += d.places.length);
  
  console.log(`Generated ${data.length} destinations.`);
  console.log(`Generated ${placeCount} places in total.`);
  console.log(`Wrote JSON to ${outPath}`);
}

run();
