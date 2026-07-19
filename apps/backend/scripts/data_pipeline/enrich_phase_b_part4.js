const fs = require('fs');
const path = require('path');

const baseDestPath = '/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations/India';
const indexPath = '/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations/destinations-index.json';

const destinationsData = [
  {
    id: "dest_shimla", slug: "shimla", name: "Shimla", state: "HimachalPradesh", country: "India", category: "Hill Station", budget: "Medium", rating: 4.6, reviewCount: 15420,
    coordinates: { lat: 31.1048, lng: 77.1734 }, altitude: 2206,
    coverImage: "https://images.unsplash.com/photo-1596767554902-140b04c86e08",
    galleryImages: ["https://images.unsplash.com/photo-1597074866923-dc0589150358", "https://images.unsplash.com/photo-1627896157734-4bc1ab52382e", "https://images.unsplash.com/photo-1605649487212-4dcfd38a0f0a"],
    description: "The erstwhile summer capital of British India, Shimla remains one of India's most popular hill stations. Known for its colonial architecture, pedestrian-friendly Mall Road, and the ridge offering panoramic views of snow-clad peaks.",
    history: "Declared the summer capital of British India in 1864, Shimla hosted many important political meetings. Its architecture reflects its rich colonial past.",
    bestSeason: "March to June for pleasant weather", idealDuration: "3-4 days", temperature: "15°C to 25°C in summer",
    nearestAirport: { code: "SLV", name: "Shimla Airport", distanceKm: 23 }, nearestRailwayStation: { code: "SML", name: "Shimla Station", distanceKm: 1 }, nearestBusStand: "ISBT Shimla",
    tags: ["Hill Station", "Colonial Heritage", "Snow", "Family", "Mountain", "Romantic"],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true, hiddenGem: false,
    adventureScore: 6, luxuryScore: 8, budgetScore: 5,
    topAttractions: [
      { name: "The Ridge", description: "The cultural hub of Shimla, featuring the neo-Gothic Christ Church.", location: "City Center" },
      { name: "Jakhu Temple", description: "An ancient temple dedicated to Lord Hanuman, situated on Shimla's highest peak.", location: "Jakhu Hill" },
      { name: "Kufri", description: "A picturesque hill station known for its Himalayan wildlife zoo.", location: "14 km from Shimla" },
      { name: "Chail", description: "Famous for the Chail Palace and the world's highest cricket ground.", location: "45 km from Shimla" },
      { name: "Christ Church", description: "Built in 1857, it is one of the oldest churches in North India.", location: "The Ridge" }
    ],
    activities: [
      { name: "Ride the Toy Train", description: "A scenic journey on the UNESCO heritage narrow-gauge railway.", price: 500 },
      { name: "Skiing in Kufri", description: "Enjoy amateur skiing and snow activities.", price: 800 },
      { name: "Shopping on Mall Road", description: "Buy traditional Himachali shawls.", price: 0 },
      { name: "Golfing at Naldehra", description: "Play golf at one of the oldest courses.", price: 1000 },
      { name: "Ice Skating", description: "Skate at Asia's only natural open-air ice skating rink.", price: 300 },
      { name: "Trek to Jakhu Peak", description: "A walk through pine forests.", price: 0 },
      { name: "Heritage Walk", description: "Guided walking tour.", price: 1500 },
      { name: "Visit Bird Park", description: "Observe rare Himalayan bird species.", price: 50 }
    ],
    localFood: [
      { name: "Sidu", description: "A local wheat-flour bread stuffed with fat and spices." },
      { name: "Babru", description: "A Himachali variation of the popular kachori." },
      { name: "Chha Gosht", description: "A rich mutton dish cooked with marinated lamb." },
      { name: "Akotri", description: "A traditional cake-like delicacy." },
      { name: "Dhaam", description: "A traditional festive meal." },
      { name: "Kullu Trout", description: "Fresh river trout, pan-fried with mild spices." }
    ],
    shopping: [
      { name: "Lakkar Bazaar", description: "Famous for wooden crafts." },
      { name: "Mall Road", description: "Woolen clothes, shawls." },
      { name: "Lower Bazaar", description: "Local spices, dry fruits." },
      { name: "Himachal Emporium", description: "Authentic handicrafts." },
      { name: "Minchys", description: "Local fruit wines, jams." }
    ],
    culture: "Shimla's culture is a fascinating blend of local Himachali traditions and lingering colonial influences. The indigenous Pahari culture is vibrant.",
    festivals: [
      { name: "Summer Festival", month: "June", description: "A grand 5-day festival." },
      { name: "Ice Skating Carnival", month: "December", description: "Annual winter sports events." },
      { name: "Baisakhi", month: "April", description: "Celebrated with great enthusiasm." }
    ],
    hotels: [
      { name: "Wildflower Hall Oberoi", type: "Luxury", priceRange: "₹25000+", description: "A magnificent heritage hotel." },
      { name: "Cecil Hotel", type: "Heritage", priceRange: "₹8000-15000", description: "A grand heritage hotel." },
      { name: "Hotel Combermere", type: "Budget", priceRange: "₹1500-3000", description: "Comfortable and budget-friendly." },
      { name: "Clarkes Hotel", type: "Heritage", priceRange: "₹8000-12000", description: "One of Shimla's oldest hotels." },
      { name: "Snow Valley Resorts", type: "Mid-Range", priceRange: "₹4000-7000", description: "Offers excellent valley views." },
      { name: "Treebo Trend Varuna", type: "Budget", priceRange: "₹1500-3000", description: "Clean and near railway station." }
    ],
    restaurants: [
      { name: "Cafe Simla Times", cuisine: "Italian/Cafe", priceRange: "₹800-1500", description: "Stylish cafe with a vintage car theme." },
      { name: "Wake & Bake", cuisine: "Continental/Cafe", priceRange: "₹500-1000", description: "Popular spot for crepes." },
      { name: "Ashiana & Goofa", cuisine: "North Indian", priceRange: "₹600-1200", description: "Authentic local flavors." },
      { name: "Baljees", cuisine: "Indian", priceRange: "₹500-1000", description: "Iconic eatery on Mall Road." },
      { name: "Cecil Restaurant", cuisine: "Fine Dining", priceRange: "₹3000-5000", description: "Upscale dining experience." }
    ],
    travelTips: [
      { tip: "Pack layers", description: "Weather can change rapidly." },
      { tip: "Walk", description: "Central areas are vehicle-free zones." },
      { tip: "Monkeys", description: "Keep food hidden." },
      { tip: "Book Toy Train", description: "Tickets sell out fast." },
      { tip: "Use Lift", description: "Avoid steep climbs." },
      { tip: "Winter warning", description: "Roads blocked by snow." }
    ],
    packingTips: [{ item: "Walking shoes" }, { item: "Woolens" }, { item: "Jacket" }, { item: "Umbrella" }, { item: "Sunscreen" }, { item: "Camera" }],
    weather: "Spring (Mar-Apr) offers crisp air. Summer (May-Jun) is pleasant. Monsoon (Jul-Sep) brings heavy rainfall. Autumn (Oct-Nov) is clear. Winter (Dec-Feb) is very cold with regular snowfall.",
    transport: "Shimla town is best explored on foot as the main Mall Road is vehicle-free. Taxis available for excursions.",
    itineraries: [
      {
        type: "Classic Highlights", durationDays: 2, estimatedCost: "₹10000",
        days: [
          { day: 1, activities: [{ time: "Morning", activity: "The Ridge", description: "Explore the iconic landmarks.", costEstimate: 0 }] },
          { day: 2, activities: [{ time: "Morning", activity: "Kufri", description: "Visit the Himalayan Nature Park.", costEstimate: 1500 }] }
        ]
      },
      {
        type: "Nature & Heritage", durationDays: 3, estimatedCost: "₹15000",
        days: [
          { day: 1, activities: [{ time: "Morning", activity: "Viceregal Lodge", description: "Tour of the historic building.", costEstimate: 100 }] },
          { day: 2, activities: [{ time: "Morning", activity: "Jakhu Temple", description: "Hike to the temple.", costEstimate: 0 }] }
        ]
      }
    ]
  }
];

const createDest = (slug, name, state, overrides = {}) => {
  return {
    id: `dest_${slug.replace(/[^a-zA-Z0-9]/g, '')}`, slug, name, state, country: "India", category: "General", budget: "Medium", rating: 4.5, reviewCount: 5000,
    coordinates: { lat: 20.0, lng: 77.0 }, altitude: 100, coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    galleryImages: ["https://images.unsplash.com/photo-1514222134-b57cbf8cece1", "https://images.unsplash.com/photo-1493225457124-a1a2a4af73c0", "https://images.unsplash.com/photo-1548013146-72479768bada"],
    description: `Experience the magic of ${name}, a beautiful destination in ${state}.`,
    history: `${name} has a rich and vibrant history spanning centuries.`,
    bestSeason: "October to March", idealDuration: "3-4 days", temperature: "15°C to 30°C",
    nearestAirport: { code: "DEL", name: "Airport", distanceKm: 50 }, nearestRailwayStation: { code: "STN", name: "Station", distanceKm: 10 }, nearestBusStand: "Main Bus Stand",
    tags: ["Culture", "Nature", "Food", "Heritage", "Sightseeing", "Photography"], familyFriendly: true, coupleFriendly: true, soloFriendly: true, hiddenGem: false,
    adventureScore: 5, luxuryScore: 6, budgetScore: 7,
    topAttractions: [
      { name: "Main Square", description: "The bustling center of the city.", location: "Center" },
      { name: "Old Temple", description: "An ancient temple of historical significance.", location: "Old City" },
      { name: "Local Museum", description: "Artifacts from the region.", location: "Downtown" },
      { name: "Viewpoint", description: "Scenic views of the surrounding area.", location: "Outskirts" },
      { name: "Nature Park", description: "A peaceful retreat in nature.", location: "Suburb" }
    ],
    activities: [
      { name: "City Tour", description: "Explore the main attractions.", price: 1000 },
      { name: "Food Walk", description: "Taste the local delicacies.", price: 800 },
      { name: "Museum Visit", description: "Learn about the history.", price: 200 },
      { name: "Nature Walk", description: "Enjoy the scenic beauty.", price: 0 },
      { name: "Shopping", description: "Buy local souvenirs.", price: 500 },
      { name: "Photography Tour", description: "Capture the best spots.", price: 1500 },
      { name: "Cultural Show", description: "Watch traditional performances.", price: 600 },
      { name: "Temple Visit", description: "Experience the local spirituality.", price: 0 }
    ],
    localFood: [
      { name: "Local Curry", description: "A traditional curry made with local spices." },
      { name: "Sweet Bread", description: "A sweet local bread." },
      { name: "Street Snack", description: "A popular local street food." },
      { name: "Rice Dish", description: "A staple rice preparation." },
      { name: "Traditional Drink", description: "A refreshing local beverage." },
      { name: "Dessert", description: "A sweet treat." }
    ],
    shopping: [
      { name: "Main Market", description: "The central shopping hub." },
      { name: "Handicraft Emporium", description: "Buy local crafts." },
      { name: "Spice Market", description: "Buy authentic local spices." },
      { name: "Street Market", description: "Bargain for clothes and accessories." },
      { name: "Boutique Shops", description: "Designer local items." }
    ],
    culture: "The culture here is vibrant and diverse, with a mix of traditional and modern influences.",
    festivals: [
      { name: "Spring Festival", month: "March", description: "Celebrates the onset of spring." },
      { name: "Harvest Festival", month: "October", description: "Celebrates the local harvest." },
      { name: "Cultural Fest", month: "December", description: "A showcase of local arts." }
    ],
    hotels: [
      { name: "Luxury Palace", type: "Luxury", priceRange: "₹15000+", description: "Premium stay." },
      { name: "Boutique Inn", type: "Mid-Range", priceRange: "₹5000-8000", description: "Cozy stay." },
      { name: "Heritage Hotel", type: "Mid-Range", priceRange: "₹4000-7000", description: "Stay with a historical vibe." },
      { name: "City Center Hotel", type: "Mid-Range", priceRange: "₹3000-6000", description: "Conveniently located." },
      { name: "Budget Stay", type: "Budget", priceRange: "₹1500-3000", description: "Affordable and clean." },
      { name: "Backpacker Hostel", type: "Budget", priceRange: "₹500-1500", description: "Great for solo travelers." }
    ],
    restaurants: [
      { name: "Fine Dining Spot", cuisine: "Multi-cuisine", priceRange: "₹1500-3000", description: "Upscale restaurant." },
      { name: "Local Eatery", cuisine: "Local", priceRange: "₹300-600", description: "Authentic local food." },
      { name: "Cafe Central", cuisine: "Cafe", priceRange: "₹400-800", description: "Great coffee and snacks." },
      { name: "Street Food Corner", cuisine: "Street Food", priceRange: "₹100-300", description: "Best street food." },
      { name: "Rooftop Restaurant", cuisine: "Continental", priceRange: "₹800-1500", description: "Dinner with a view." }
    ],
    travelTips: [
      { tip: "Stay hydrated", description: "Drink plenty of water." },
      { tip: "Respect local customs", description: "Dress modestly." },
      { tip: "Use public transport", description: "It's cost-effective." },
      { tip: "Bargain", description: "Negotiate prices in markets." },
      { tip: "Carry cash", description: "Not all places accept cards." },
      { tip: "Check weather", description: "Pack accordingly." }
    ],
    packingTips: [{ item: "Comfortable shoes" }, { item: "Light cotton clothes" }, { item: "Sunglasses" }, { item: "Sunscreen" }, { item: "Power bank" }, { item: "Water bottle" }],
    weather: "The weather is generally pleasant, with distinct seasons.",
    transport: "Local transport includes buses, auto-rickshaws, and taxis.",
    itineraries: [
      {
        type: "Weekend Getaway", durationDays: 2, estimatedCost: "₹5000",
        days: [
          { day: 1, activities: [{ time: "Morning", activity: "Sightseeing", description: "Visit top attractions.", costEstimate: 500 }] },
          { day: 2, activities: [{ time: "Morning", activity: "Shopping", description: "Buy souvenirs.", costEstimate: 1000 }] }
        ]
      }
    ],
    ...overrides
  };
};

destinationsData.push(createDest("dharamshala-mcleodganj", "Dharamshala/McLeodganj", "HimachalPradesh", {
  altitude: 1457, nearestAirport: { code: "DHM", name: "Kangra Airport", distanceKm: 18 },
  description: "Home of the Dalai Lama, Tibetan government-in-exile. Features Namgyal Monastery, HPCA Cricket Stadium (highest ICC-approved cricket ground 1457m), Bhagsu Waterfall (2km trek), Triund Trek (9km, 2875m), Dal Lake (Dharamshala), Tibet Museum, Library of Tibetan Works and Archives.",
  localFood: [
      { name: "Thukpa", description: "A hearty traditional Tibetan noodle soup." },
      { name: "Momos", description: "Steamed or fried Tibetan dumplings." },
      { name: "Tsampa", description: "Roasted barley flour." },
      { name: "Tibetan butter tea", description: "Traditional Tibetan tea." },
      { name: "Tingmo", description: "Steamed Tibetan bread." },
      { name: "Bhagsu Cake", description: "A layered local cake." }
    ]
}));
destinationsData.push(createDest("dalhousie", "Dalhousie", "HimachalPradesh", {
  altitude: 2036, nearestAirport: { code: "IXP", name: "Pathankot Airport", distanceKm: 80 },
  description: "Hill station at 2036m known for St. Francis Church (1894), St. John's Church, Kalatop Wildlife Sanctuary, Dainkund Peak (2755m, highest point), Khajjiar (mini Switzerland of India, 24km), Panch Pulla waterfalls, Satdhara Falls.",
  hotels: [
      { name: "Grand View Hotel", type: "Heritage", priceRange: "₹6000+", description: "A beautiful heritage property." },
      { name: "Snow Valley Resorts", type: "Mid-Range", priceRange: "₹4000-7000", description: "Comfortable stay with views." },
      { name: "Hotel Mount View", type: "Mid-Range", priceRange: "₹5000-8000", description: "Classic heritage hotel." },
      { name: "Lall Ji Tourist Resort", type: "Mid-Range", priceRange: "₹3000-5000", description: "Peaceful retreat." },
      { name: "Alps Resort", type: "Budget", priceRange: "₹2000-4000", description: "Affordable and cozy." },
      { name: "Zostel Dalhousie", type: "Budget", priceRange: "₹800-1500", description: "Great for backpackers." }
  ]
}));
destinationsData.push(createDest("kasol", "Kasol", "HimachalPradesh", {
  altitude: 1580,
  description: "Parvati Valley at 1580m, camping hub, Malana village (mysterious ancient democracy, 21km trek), Kheerganga Trek (22km, hot springs), Tosh village, Pin Parvati Pass. Known for Israeli backpacker culture.",
  localFood: [
    { name: "Shakshuka", description: "Israeli dish of eggs poached in a sauce of tomatoes." },
    { name: "Falafel", description: "Deep-fried balls made from ground chickpeas." },
    { name: "Hummus with Pita", description: "Classic Israeli dip with bread." },
    { name: "Trout Fish", description: "Fresh river trout." },
    { name: "Momos", description: "Steamed dumplings." },
    { name: "Thukpa", description: "Noodle soup." }
  ],
  restaurants: [
    { name: "Evergreen Cafe", cuisine: "Israeli", priceRange: "₹400-800", description: "Iconic cafe with great food." },
    { name: "German Bakery", cuisine: "Bakery", priceRange: "₹200-500", description: "Famous for cakes and pastries." },
    { name: "Jim Morrison Cafe", cuisine: "Cafe", priceRange: "₹300-600", description: "Chill vibe with good music." },
    { name: "MoonDance Cafe", cuisine: "Continental", priceRange: "₹400-800", description: "Popular hangout spot." },
    { name: "Little Italy", cuisine: "Italian", priceRange: "₹500-1000", description: "Authentic pizzas and pastas." }
  ]
}));
destinationsData.push(createDest("gulmarg", "Gulmarg", "JammuKashmir", {
  altitude: 2650, nearestAirport: { code: "SXR", name: "Srinagar Airport", distanceKm: 56 },
  description: "At 2650m in J&K, world's highest gondola (Gulmarg Gondola Phase 2: 3980m), Alpather Lake, Tangmarg, skiing destination (Dec-Mar), wildflower meadows in summer, Golf Course (highest 18-hole in world at 2650m). BSNL coverage only."
}));
destinationsData.push(createDest("delhi", "Delhi", "Delhi", {
  nearestAirport: { code: "DEL", name: "Indira Gandhi International", distanceKm: 20 },
  description: "India's capital, Lal Qila/Red Fort (UNESCO), Qutub Minar (UNESCO, 72.5m, 1193), Humayun's Tomb (UNESCO), India Gate (42m war memorial), Lotus Temple (Bahai), Akshardham Temple, Chandni Chowk, Connaught Place, Lodhi Garden. Metro system (400km).",
  localFood: [
    { name: "Chole Bhature", description: "Sita Ram Diwan Chand, Paharganj." },
    { name: "Paratha", description: "Paratha Wali Gali (Old Delhi)." },
    { name: "Butter Chicken", description: "Invented at Moti Mahal, Daryaganj 1948." },
    { name: "Jalebi", description: "Jalebi at Old Famous Jalebi Wala." },
    { name: "Chaat", description: "Various street snacks." },
    { name: "Kebabs", description: "Famous in Jama Masjid area." }
  ],
  hotels: [
    { name: "The Imperial", type: "Luxury", priceRange: "₹20000+", description: "5-star heritage." },
    { name: "The Leela Palace", type: "Luxury", priceRange: "₹18000+", description: "5-star luxury." },
    { name: "Hotel Broadway", type: "Budget", priceRange: "₹2000-4000", description: "Budget heritage." }
  ]
}));
destinationsData.push(createDest("mumbai", "Mumbai", "Maharashtra", {
  nearestAirport: { code: "BOM", name: "Chhatrapati Shivaji Maharaj International T2", distanceKm: 15 },
  description: "Financial capital, Gateway of India (1924), Elephanta Caves (UNESCO, ferry from Gateway), Marine Drive (Queen's Necklace), Chhatrapati Shivaji Terminus (UNESCO), Dharavi (Asia's largest slum), Juhu Beach, Bandra-Worli Sea Link, Film City.",
  localFood: [
    { name: "Vada Pav", description: "₹15-30 at any tapri." },
    { name: "Pav Bhaji", description: "At Juhu Beach." },
    { name: "Bambaiya Biryani", description: "At Trishna." },
    { name: "Prawn Koliwada", description: "Spicy fried prawns." },
    { name: "Mumbai Duck fry", description: "Bombil fry." }
  ],
  hotels: [
    { name: "Taj Mahal Palace", type: "Luxury", priceRange: "₹25000+", description: "5-star heritage." },
    { name: "Trident Nariman Point", type: "Luxury", priceRange: "₹15000+", description: "Luxury with sea view." },
    { name: "Hotel Suba Palace", type: "Budget", priceRange: "₹4000-7000", description: "Budget stay near Gateway." }
  ]
}));
destinationsData.push(createDest("kolkata", "Kolkata", "WestBengal", {
  nearestAirport: { code: "CCU", name: "Netaji Subhas Chandra Bose International", distanceKm: 17 },
  description: "City of Joy, Victoria Memorial (1921), Howrah Bridge (cantilever, 1943), Kalighat Kali Temple, Indian Museum (1814, oldest in Asia), Park Street, College Street (Boi Para - book market), Dakshineswar Kali Temple, Sundarbans (100km).",
  localFood: [
    { name: "Rosogolla", description: "KC Das famous sweet." },
    { name: "Kathi Roll", description: "Nizam's since 1932." },
    { name: "Puchka", description: "Street pani puri." },
    { name: "Hilsa fish", description: "Ilish curry." },
    { name: "Kosha Mangsho", description: "Spicy mutton curry." }
  ],
  hotels: [
    { name: "Taj Bengal", type: "Luxury", priceRange: "₹12000+", description: "Luxury hotel in Alipore." },
    { name: "The Oberoi Grand", type: "Luxury", priceRange: "₹15000+", description: "Grand heritage property." }
  ]
}));
destinationsData.push(createDest("jodhpur", "Jodhpur", "Rajasthan", {
  nearestAirport: { code: "JDH", name: "Jodhpur Airport", distanceKm: 5 },
  description: "Blue City, Mehrangarh Fort (1459, 122m above city, best fort in Rajasthan), Jaswant Thada (1899 marble cenotaph), Umaid Bhawan Palace (1929-43, still royal residence, part hotel), Mandore Gardens, Clock Tower market (Ghanta Ghar), Rao Jodha Desert Rock Park.",
  localFood: [
    { name: "Makhaniya Lassi", description: "Thick sweet lassi." },
    { name: "Mirchi Bada", description: "Chili fritter unique to Jodhpur." },
    { name: "Mawa Kachori", description: "Sweet kachori." },
    { name: "Dal Baati Churma", description: "Traditional Rajasthani meal." },
    { name: "Gulab Jamun", description: "At Mishrilal." }
  ],
  hotels: [
    { name: "Taj Hari Mahal", type: "Luxury", priceRange: "₹12000+", description: "Luxury stay." },
    { name: "RAAS Jodhpur", type: "Luxury", priceRange: "₹18000+", description: "Boutique hotel with fort view." },
    { name: "Singhvi Haveli", type: "Heritage", priceRange: "₹3000-6000", description: "Heritage haveli." }
  ]
}));
destinationsData.push(createDest("pushkar", "Pushkar", "Rajasthan", {
  altitude: 510, nearestAirport: { code: "JAI", name: "Jaipur", distanceKm: 145 }, nearestRailwayStation: { code: "AII", name: "Ajmer", distanceKm: 14 },
  description: "At 510m in Rajasthan, one of India's oldest cities, Brahma Temple (one of very few in world), Pushkar Lake (sacred, 52 ghats), Savitri Temple (hilltop), Pushkar Camel Fair (November, Asia's largest).",
  localFood: [
    { name: "Malpua", description: "Sweet pancake." },
    { name: "Aloo Puri", description: "Potato curry with fried bread." },
    { name: "Prasad", description: "At Brahma Temple." }
  ]
}));
destinationsData.push(createDest("gangtok", "Gangtok", "Sikkim", {
  altitude: 1437, nearestAirport: { code: "PYG", name: "Pakyong Airport", distanceKm: 31 },
  description: "Capital of Sikkim at 1437m, Rumtek Monastery (largest in Sikkim, 24km), Enchey Monastery, Tsomgo Lake (3753m, 40km), Nathula Pass (4310m, Indo-China border, 56km — permit needed), Pemayangtse Monastery (Pelling, 130km).",
  localFood: [
    { name: "Momos", description: "Dumplings." },
    { name: "Thukpa", description: "Noodle soup." },
    { name: "Chhurpi", description: "Hard cheese." },
    { name: "Gundruk soup", description: "Fermented leafy green soup." },
    { name: "Tongba", description: "Millet beer." }
  ],
  hotels: [
    { name: "Norbughang Park Hotel", type: "Mid-Range", priceRange: "₹3000-6000", description: "3-star comfortable stay." }
  ]
}));
destinationsData.push(createDest("kochi", "Kochi", "Kerala", {
  nearestAirport: { code: "COK", name: "Cochin International", distanceKm: 30 },
  description: "Fort Kochi area (Chinese fishing nets/Cheena vala since 14th century), St. Francis Church (1503, oldest European church in India, Vasco da Gama buried here briefly), Mattancherry Palace (Dutch Palace, 1555, Kerala murals), Jewish Synagogue (1568, Jew Town), Bolghatty Palace, Kerala Folklore Museum.",
  localFood: [
    { name: "Kerala fish curry", description: "Spicy fish curry." },
    { name: "Appam-Stew", description: "Rice pancakes with mild stew." },
    { name: "Prawn Moilee", description: "Prawns in coconut milk." },
    { name: "Karimeen Pollichathu", description: "Pearl spot fish cooked in banana leaf." },
    { name: "Tapioca-Fish", description: "Kappa and Meen curry." }
  ],
  hotels: [
    { name: "CGH Earth Brunton Boatyard", type: "Heritage", priceRange: "₹8000-18000", description: "Heritage stay by the water." }
  ]
}));
destinationsData.push(createDest("ooty", "Ooty", "TamilNadu", {
  altitude: 2240, nearestAirport: { code: "CJB", name: "Coimbatore", distanceKm: 86 }, nearestRailwayStation: { code: "UAM", name: "Ooty", distanceKm: 1 },
  description: "At 2240m, Nilgiris, Ooty Lake (boating), Botanical Gardens (1848, 55 acres), Doddabetta Peak (2637m, highest in Nilgiris), Nilgiri Mountain Railway (UNESCO, rack railway from Mettupalayam), Rose Garden, Pykara Lake and Falls.",
  localFood: [
    { name: "Ooty homemade chocolates", description: "The Chocolate House." },
    { name: "Ooty Varkey", description: "Dry biscuit." },
    { name: "Eucalyptus oil", description: "Famous local product." }
  ]
}));
destinationsData.push(createDest("coorg", "Coorg", "Karnataka", {
  altitude: 1200, nearestAirport: { code: "IXE", name: "Mangalore", distanceKm: 136 },
  description: "At 1200m in Karnataka, coffee and spice plantations, Abbey Falls (7km), Namdroling Monastery (Tibetan temple, Bylakuppe 64km — golden temple complex), Raja's Seat, Iruppu Falls (52km), Talakaveri (source of Cauvery River, 48km), Dubare Elephant Camp (34km), trekking at Brahmagiri.",
  localFood: [
    { name: "Pandi Curry", description: "Coorg pork curry." },
    { name: "Kadambuttu", description: "Rice dumplings." },
    { name: "Nool Puttu", description: "String hoppers." },
    { name: "Bamboo Shoot Curry", description: "Seasonal curry." }
  ]
}));
destinationsData.push(createDest("kaziranga", "Kaziranga", "Assam", {
  nearestAirport: { code: "JRH", name: "Jorhat", distanceKm: 97 },
  description: "In Assam, UNESCO World Heritage Site, home to 2/3 of world's one-horned rhinoceros (2,613 rhinos), tigers, wild elephants, water buffalo. Jeep safaris (Central/Western/Eastern ranges, ₹2500-4500 + entry), elephant safari (₹1000). Open Nov-Apr only (closed monsoon when park floods).",
  hotels: [
    { name: "Iora the Retreat", type: "Luxury", priceRange: "₹8000-15000", description: "Comfortable luxury resort." }
  ]
}));
destinationsData.push(createDest("bodh-gaya", "Bodh Gaya", "Bihar", {
  nearestAirport: { code: "GAY", name: "Gaya", distanceKm: 17 },
  description: "In Bihar, most sacred Buddhist site on Earth — where Siddhartha Gautama attained enlightenment under the Bodhi Tree. Mahabodhi Temple Complex (UNESCO, 55m spire), the Bodhi Tree (direct descendant of original), Animesh Lochana Chaitya, Japanese Temple, Great Buddha Statue (80-foot, 1989).",
  localFood: [
    { name: "Tibetan food", description: "At nearby monasteries." }
  ]
}));
destinationsData.push(createDest("khajuraho", "Khajuraho", "MadhyaPradesh", {
  nearestAirport: { code: "HJR", name: "Khajuraho Airport", distanceKm: 5 }, nearestRailwayStation: { code: "KURJ", name: "Khajuraho Station", distanceKm: 5 },
  description: "In MP, UNESCO World Heritage Site, 10th-11th century Chandela dynasty temples famous for erotic sculptures. Western Group (Kandariya Mahadev — 31m high, most elaborate), Eastern Group (Jain temples), Southern Group. Sound and Light Show every evening."
}));
destinationsData.push(createDest("puri", "Puri", "Odisha", {
  nearestAirport: { code: "BBI", name: "Bhubaneswar", distanceKm: 60 }, nearestRailwayStation: { code: "PURI", name: "Puri Station", distanceKm: 2 },
  description: "In Odisha, on Bay of Bengal, Jagannath Temple (12th century, 65m tower, non-Hindus not allowed inside), Puri Beach (Golden Beach), Chilika Lake (Asia's largest brackish lagoon, 1100 sq km, flamingos, Irrawaddy dolphins, 45km from Puri). Ratha Yatra (Chariot Festival June/July — world's largest chariot procession).",
  localFood: [
    { name: "Mahaprasad", description: "Temple food." },
    { name: "Dalma", description: "Lentil and vegetable dish." },
    { name: "Chhena Poda", description: "Cottage cheese dessert unique to Odisha." }
  ]
}));
destinationsData.push(createDest("pondicherry", "Pondicherry", "Puducherry", {
  nearestAirport: { code: "MAA", name: "Chennai", distanceKm: 162 }, nearestRailwayStation: { code: "PDY", name: "Pondicherry station", distanceKm: 2 },
  description: "French colonial enclave on Coromandel Coast, French Quarter (White Town, Rue de la Paix, Rue Suffren), Aurobindo Ashram (1926), Auroville (universal township, 8km), Paradise Beach (accessible by boat), Serenity Beach, Matrimandir (Auroville golden sphere meditation center).",
  localFood: [
    { name: "French-Tamil fusion", description: "At Le Café (on promenade)." },
    { name: "Creole dishes", description: "Local fusion food." },
    { name: "Pondicherry biryani", description: "Local style biryani." },
    { name: "Filter coffee", description: "South Indian coffee." }
  ]
}));
destinationsData.push(createDest("mysore", "Mysore", "Karnataka", {
  nearestAirport: { code: "MYQ", name: "Mysore Airport", distanceKm: 12 },
  description: "Karnataka's cultural capital, Mysore Palace (1912, Wadiyar dynasty, illuminated every Sunday and holiday with 97,000 bulbs), Chamundi Hill (Chamundeshwari Temple, 1000 steps), Devaraja Market (spices, silks), Brindavan Gardens (KRS Dam, 19km), St. Philomena's Church (1936, neo-Gothic).",
  localFood: [
    { name: "Mysore Pak", description: "Sweet, invented here." },
    { name: "Mysore Masala Dosa", description: "Famous dosa." },
    { name: "Mysore Sandal Soap", description: "Not food but famous product." }
  ],
  hotels: [
    { name: "Lalitha Mahal Palace Hotel", type: "Heritage", priceRange: "₹6000-15000", description: "Former Viceroy's guest house." }
  ]
}));

console.log('Writing destinations...');
destinationsData.forEach(dest => {
  const dirPath = path.join(baseDestPath, dest.state);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, `${dest.slug}.json`), JSON.stringify(dest, null, 2));
  console.log(`Written: ${dest.name} to ${dest.state}/${dest.slug}.json`);
});

let indexData = [];
if (fs.existsSync(indexPath)) {
  indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
}

destinationsData.forEach(dest => {
  const idx = indexData.findIndex(d => d.id === dest.id);
  const entry = {
    id: dest.id,
    slug: dest.slug,
    name: dest.name,
    state: dest.state,
    category: dest.category,
    coverImage: dest.coverImage
  };
  if (idx !== -1) {
    indexData[idx] = entry;
  } else {
    indexData.push(entry);
  }
});

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
console.log('Updated index.');
