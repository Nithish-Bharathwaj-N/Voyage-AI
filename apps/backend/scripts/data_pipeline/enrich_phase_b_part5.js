const fs = require('fs');
const path = require('path');

const DESTINATIONS = [
  {
    id: "dest-jodhpur",
    slug: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    country: "India",
    category: "Heritage",
    budget: "Medium",
    rating: 4.6,
    reviewCount: 3200,
    coordinates: { lat: 26.2389, lng: 73.0243 },
    altitude: "231m",
    coverImage: "https://images.unsplash.com/photo-1599661555358-0ea15104be99?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1595844730298-b960fad99667?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Known as the Blue City due to the vivid blue-painted houses around the Mehrangarh Fort. Jodhpur is a vibrant city with a rich history, offering stunning views from its colossal fort, bustling markets, and magnificent palaces. It seamlessly blends traditional Rajput culture with modern energy, making it an essential stop in Rajasthan.",
    history: "Founded in 1459 by Rao Jodha, a Rajput chief of the Rathore clan, Jodhpur was the capital of the Kingdom of Marwar. It thrived due to its location on the strategic road linking Delhi to Gujarat.",
    bestSeason: "October to March",
    idealDuration: "2-3 days",
    temperature: "15°C to 30°C in winter, 35°C to 45°C in summer",
    nearestAirport: "JDH - 5km",
    nearestRailwayStation: "Jodhpur Junction",
    nearestBusStand: "Jodhpur Bus Stand",
    tags: ["Forts", "Palaces", "Culture", "Blue City", "Architecture", "Desert"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 4,
    luxuryScore: 7,
    budgetScore: 6,
    topAttractions: [
      { name: "Mehrangarh Fort", description: "One of the largest forts in India, built in around 1459 by Rao Jodha. The fort is situated 410 feet above the city and is enclosed by imposing thick walls.", location: "Fort Rd, Jodhpur" },
      { name: "Umaid Bhawan Palace", description: "One of the world's largest private residences, part of which is a heritage hotel and museum.", location: "Circuit House Rd" },
      { name: "Jaswant Thada", description: "A beautifully carved white marble cenotaph built in 1899 in memory of Maharaja Jaswant Singh II.", location: "Lawaran" },
      { name: "Mandore Gardens", description: "Historic garden containing cenotaphs of former rulers of Jodhpur, set amidst landscaped grounds.", location: "Mandore" },
      { name: "Clock Tower & Sardar Market", description: "A bustling market area offering spices, textiles, and handicrafts, with a prominent clock tower.", location: "Ghantaghar" }
    ],
    activities: [
      { name: "Zip-lining at Mehrangarh", price: 1800 },
      { name: "Bishnoi Village Safari", price: 2500 },
      { name: "Camel Trekking", price: 1500 },
      { name: "Rao Jodha Desert Rock Park Walk", price: 100 },
      { name: "Blue City Heritage Walk", price: 800 },
      { name: "Cooking Class", price: 1200 },
      { name: "Shopping at Sardar Market", price: 0 },
      { name: "Dining at a Rooftop Cafe", price: 800 }
    ],
    localFood: [
      "Mirchi Bada",
      "Pyaaz Kachori",
      "Mawa Kachori",
      "Makhaniya Lassi",
      "Gatte ki Sabzi",
      "Ker Sangri"
    ],
    shopping: [
      "Bandhani Textiles",
      "Jodhpuri Juttis",
      "Spices (Mathaniya Red Chilli)",
      "Handicrafts",
      "Silver Jewelry"
    ],
    culture: "Deeply rooted in Rajput traditions with vibrant folk music, dance, and colorful attire. The Marwari language is widely spoken.",
    festivals: [
      "Marwar Festival (October)",
      "Rajasthan International Folk Festival (October)",
      "Gangaur (March-April)"
    ],
    hotels: [
      { name: "Umaid Bhawan Palace", priceRange: "₹40,000 - ₹1,00,000+" },
      { name: "Raas Jodhpur", priceRange: "₹20,000 - ₹40,000" },
      { name: "Ajit Bhawan Palace", priceRange: "₹10,000 - ₹20,000" },
      { name: "Pal Haveli", priceRange: "₹5,000 - ₹10,000" },
      { name: "Moustache Jodhpur", priceRange: "₹1,000 - ₹3,000" },
      { name: "Zostel Jodhpur", priceRange: "₹800 - ₹2,500" }
    ],
    restaurants: [
      { name: "Gypsy Restaurant", type: "Vegetarian Thali" },
      { name: "Indique", type: "Rooftop Multi-cuisine" },
      { name: "Janta Sweet Home", type: "Snacks & Sweets" },
      { name: "Shri Mishrilal Hotel", type: "Makhaniya Lassi" },
      { name: "On the Rocks", type: "Bar & Restaurant" }
    ],
    travelTips: [
      "Visit Mehrangarh Fort early to avoid crowds.",
      "Stay hydrated as it gets very dry.",
      "Bargain politely at local markets.",
      "Wear comfortable walking shoes for the fort and old city.",
      "Try to stay in a heritage haveli for the local experience.",
      "Beware of monkeys near temples and the fort."
    ],
    packingTips: [
      "Light cotton clothes",
      "Sunscreen",
      "Sunglasses",
      "Hat",
      "Comfortable walking shoes",
      "A light jacket for winter evenings"
    ],
    weather: {
      "January": "Cool, 10-25°C",
      "May": "Very hot, 30-42°C",
      "August": "Warm with some rain, 26-34°C"
    },
    transport: [
      { mode: "Auto Rickshaw", price: "₹50 - ₹150 per trip" },
      { mode: "Taxi", price: "₹1000 - ₹2000 per day" },
      { mode: "Rental Scooter", price: "₹400 - ₹600 per day" }
    ],
    itineraries: [
      {
        name: "Jodhpur Highlights in 2 Days",
        days: [
          { day: 1, description: "Morning at Mehrangarh Fort and Jaswant Thada. Afternoon exploring the Blue City alleys and Rao Jodha Rock Park. Evening at Ghantaghar." },
          { day: 2, description: "Morning visit to Umaid Bhawan Palace Museum. Afternoon trip to Mandore Gardens. Evening shopping at Sardar Market." }
        ]
      }
    ]
  },
  {
    id: "dest-andaman",
    slug: "andaman-islands",
    name: "Andaman Islands",
    state: "AndamanNicobar",
    country: "India",
    category: "Islands & Beaches",
    budget: "High",
    rating: 4.8,
    reviewCount: 5100,
    coordinates: { lat: 11.6234, lng: 92.7265 },
    altitude: "10m",
    coverImage: "https://images.unsplash.com/photo-1616128479592-7486e9690d5f?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632731518386-bf5ecfdf6328?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "An archipelago of 572 islands in the Bay of Bengal (37 inhabited), the Andaman Islands offer pristine beaches, incredible coral reefs, and a rich colonial history. From the world-famous Radhanagar Beach on Swaraj Dweep to the historic Cellular Jail in Port Blair, it's a tropical paradise perfect for water sports and relaxation.",
    history: "Used as a penal colony by the British, the infamous Cellular Jail (Kala Pani) housed Indian freedom fighters. The islands were occupied by the Japanese during WWII before becoming an Indian Union Territory.",
    bestSeason: "October to May",
    idealDuration: "6-8 days",
    temperature: "23°C to 30°C",
    nearestAirport: "Veer Savarkar International Airport, Port Blair (IXZ) - 0km",
    nearestRailwayStation: "None",
    nearestBusStand: "Port Blair Bus Terminus",
    tags: ["Beaches", "Scuba Diving", "History", "Nature", "Islands", "Water Sports"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 9,
    luxuryScore: 8,
    budgetScore: 4,
    topAttractions: [
      { name: "Cellular Jail", description: "1906, 7-wing radial prison where Indian freedom fighters were imprisoned. Features an evening Sound & Light show.", location: "Port Blair" },
      { name: "Radhanagar Beach", description: "Located on Havelock/Swaraj Dweep, often rated as Asia's best beach with pristine white sand and clear waters.", location: "Havelock Island" },
      { name: "Neil Island (Shaheed Dweep)", description: "Known for Bharatpur Beach and the Natural Bridge/Howrah Bridge rock formation.", location: "Neil Island" },
      { name: "Baratang Island", description: "Famous for natural Limestone caves and mud volcanoes. Reached via a journey through dense forests.", location: "Baratang" },
      { name: "Mahatma Gandhi Marine National Park", description: "Located at Wandoor, offering glass-bottom boat rides to view coral reefs and marine life.", location: "Wandoor" },
      { name: "Corbyn's Cove Beach", description: "A crescent-shaped coconut palm-fringed beach close to Port Blair.", location: "Port Blair" }
    ],
    activities: [
      { name: "Scuba Diving at Havelock", price: 4000 },
      { name: "Snorkeling at Elephant Beach", price: 1000 },
      { name: "Sea Walk at North Bay", price: 3500 },
      { name: "Glass Bottom Boat Ride", price: 800 },
      { name: "Cellular Jail Sound & Light Show", price: 300 },
      { name: "Ferry Ride to Islands", price: 1500 },
      { name: "Kayaking in Mangroves", price: 2500 },
      { name: "Trekking to Elephant Beach", price: 500 }
    ],
    localFood: [
      "Freshly grilled seafood",
      "Coconut-based curries",
      "Fish Curry",
      "Lobster dishes",
      "Crab Masala",
      "Amritsari Kulcha (local variant)"
    ],
    shopping: [
      "Shell jewelry",
      "Pearl ornaments",
      "Coconut shell handicrafts",
      "Spices",
      "Timber crafts"
    ],
    culture: "A melting pot of cultures from mainland India (Bengali, Tamil, Telugu) with unique indigenous tribes in restricted areas.",
    festivals: [
      "Island Tourism Festival (January)",
      "Subhash Mela (January)",
      "Monsoon Festival (August)"
    ],
    hotels: [
      { name: "Taj Exotica Resort & Spa, Havelock", priceRange: "₹25,000 - ₹50,000+" },
      { name: "Barefoot at Havelock", priceRange: "₹12,000 - ₹25,000" },
      { name: "Symphony Palms Beach Resort", priceRange: "₹6,000 - ₹12,000" },
      { name: "Sea Shell, Port Blair", priceRange: "₹5,000 - ₹10,000" },
      { name: "Sinclairs Bayview", priceRange: "₹7,000 - ₹14,000" },
      { name: "Budget Guesthouses in Port Blair", priceRange: "₹1,500 - ₹3,000" }
    ],
    restaurants: [
      { name: "Something Different (Havelock)", type: "Multi-cuisine, Seafood" },
      { name: "Full Moon Cafe (Havelock)", type: "Cafe, Seafood" },
      { name: "Lighthouse Residency (Port Blair)", type: "Seafood" },
      { name: "Amaya (Port Blair)", type: "Rooftop Dining" },
      { name: "Anju Coco Resto", type: "Multi-cuisine" }
    ],
    travelTips: [
      "Book ferries between islands well in advance.",
      "Carry ample cash as ATMs on islands like Havelock and Neil can be unreliable.",
      "Do not collect or buy corals, it's illegal.",
      "Pack light, breathable cotton clothes and good swimwear.",
      "Respect tribal areas and do not take photos where prohibited."
    ],
    packingTips: [
      "Swimwear and beach towels",
      "High SPF Sunscreen",
      "Mosquito repellent",
      "Waterproof bags for electronics",
      "Light cotton clothing",
      "Flip-flops and comfortable walking shoes"
    ],
    weather: {
      "January": "Pleasant, 23-29°C",
      "May": "Hot and humid, 26-32°C",
      "August": "Heavy monsoons, 24-29°C"
    },
    transport: [
      { mode: "Government Ferry", price: "₹600 - ₹1000 per sector" },
      { mode: "Private Cruise (Makruzz/Green Ocean)", price: "₹1500 - ₹2500 per sector" },
      { mode: "Rental Scooter", price: "₹500 - ₹800 per day" }
    ],
    itineraries: [
      {
        name: "Andaman Highlights in 6 Days",
        days: [
          { day: 1, description: "Arrive in Port Blair, visit Cellular Jail and attend the Sound & Light show." },
          { day: 2, description: "Take a ferry to Havelock Island. Relax at Radhanagar Beach in the evening." },
          { day: 3, description: "Scuba diving in the morning, visit Elephant Beach for water sports." },
          { day: 4, description: "Ferry to Neil Island. Visit Bharatpur Beach and the Natural Bridge." },
          { day: 5, description: "Return ferry to Port Blair. Half-day city tour or shopping." },
          { day: 6, description: "Departure from Port Blair." }
        ]
      }
    ]
  },
  {
    id: "dest-lakshadweep",
    slug: "lakshadweep",
    name: "Lakshadweep",
    state: "Lakshadweep",
    country: "India",
    category: "Islands & Beaches",
    budget: "High",
    rating: 4.7,
    reviewCount: 1500,
    coordinates: { lat: 10.5667, lng: 72.6167 },
    altitude: "2m",
    coverImage: "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1616128479592-7486e9690d5f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632731518386-bf5ecfdf6328?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "A breathtaking archipelago of 36 coral islands in the Arabian Sea, Lakshadweep is India's smallest Union Territory. Known for its pristine, uncrowded beaches, stunning coral reefs, and tranquil lagoons. Tourism is highly regulated to preserve the delicate ecology, offering an exclusive and secluded tropical experience.",
    history: "Inhabited for centuries, heavily influenced by Arab traders. Ruled by the Arakkal kingdom of Kannur before British administration. The Minicoy lighthouse was built in 1885.",
    bestSeason: "October to mid-May",
    idealDuration: "4-5 days",
    temperature: "27°C to 32°C",
    nearestAirport: "Agatti Airport (AGX) - 1.5 hr flight from Kochi",
    nearestRailwayStation: "None",
    nearestBusStand: "None",
    tags: ["Coral Reefs", "Scuba Diving", "Secluded Beaches", "Lagoon", "Eco-Tourism", "Water Sports"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: false,
    hiddenGem: true,
    adventureScore: 8,
    luxuryScore: 6,
    budgetScore: 2,
    topAttractions: [
      { name: "Agatti Island", description: "The main gateway with the only airport. Features stunning lagoons and coral reefs.", location: "Agatti" },
      { name: "Bangaram Island", description: "An uninhabited island known for beautiful coral reefs. Hosts the only resort where alcohol is permitted.", location: "Bangaram" },
      { name: "Kadmat Island", description: "Famous for water sports, long sandy beaches, and excellent diving spots.", location: "Kadmat" },
      { name: "Minicoy Island", description: "The southernmost island with unique Maldivian cultural influences, tuna fishing, and a historic 1885 lighthouse.", location: "Minicoy" },
      { name: "Kavaratti Island", description: "The administrative capital, featuring beautiful mosques and an aquarium.", location: "Kavaratti" }
    ],
    activities: [
      { name: "Scuba Diving at Bangaram", price: 4500 },
      { name: "Snorkeling in Agatti Lagoon", price: 1500 },
      { name: "Kayaking", price: 800 },
      { name: "Glass Bottom Boat Ride", price: 1000 },
      { name: "Visit Minicoy Lighthouse", price: 200 },
      { name: "Lagoon Fishing", price: 2000 },
      { name: "Turtle Watching", price: 1500 },
      { name: "Island Hopping by Speedboat", price: 3000 }
    ],
    localFood: [
      "Kavaratti Tuna Curry",
      "Mus Kavaab (Tuna)",
      "Octopus Fry",
      "Coconut-based vegetarian curries",
      "Rice and Fish",
      "Bonda"
    ],
    shopping: [
      "Coir products",
      "Coconut shell curios",
      "Packaged Tuna",
      "Seashell crafts"
    ],
    culture: "Predominantly Islamic culture with strong Malayalam and Mahl (in Minicoy) linguistic influences. Traditional tuna fishing is a major way of life.",
    festivals: [
      "Eid ul-Fitr",
      "Eid ul-Adha",
      "Milad-un-Nabi"
    ],
    hotels: [
      { name: "Bangaram Island Resort (CGH Earth)", priceRange: "₹15,000 - ₹30,000+" },
      { name: "Agatti Island Beach Resort", priceRange: "₹10,000 - ₹20,000" },
      { name: "Kadmat Beach Resort", priceRange: "₹8,000 - ₹15,000" },
      { name: "Kavaratti Island Beach Resort", priceRange: "₹7,000 - ₹12,000" },
      { name: "Minicoy Resort", priceRange: "₹8,000 - ₹14,000" }
    ],
    restaurants: [
      { name: "Resort Dining (Bangaram)", type: "Buffet, Seafood" },
      { name: "Agatti Resort Restaurant", type: "Local & Indian" },
      { name: "Local homestay meals", type: "Authentic Lakshadweep food" }
    ],
    travelTips: [
      "A permit is mandatory for all non-Lakshadweep residents (apply via Lakshadweep Administration in Kochi).",
      "Alcohol is prohibited on all islands except Bangaram.",
      "Flights from Kochi to Agatti are limited; book well in advance.",
      "Carry sufficient cash as ATMs are sparse.",
      "BSNL and Airtel are the main mobile networks; connectivity can be patchy."
    ],
    packingTips: [
      "Light cotton clothing",
      "Modest clothing for inhabited islands",
      "Swimwear (for uninhabited islands/resorts)",
      "High SPF sunscreen and sunglasses",
      "Basic medicines (pharmacies are limited)",
      "Underwater camera/GoPro"
    ],
    weather: {
      "January": "Perfect, 26-30°C",
      "May": "Warm, 28-33°C",
      "August": "Monsoon, flights/ships often cancelled, 26-30°C"
    },
    transport: [
      { mode: "Helicopter (between islands)", price: "₹4000 - ₹6000" },
      { mode: "Speedboat (between islands)", price: "₹1500 - ₹3000" },
      { mode: "Bicycle on islands", price: "₹200 per day" }
    ],
    itineraries: [
      {
        name: "Lakshadweep Tropical Escape in 4 Days",
        days: [
          { day: 1, description: "Fly from Kochi to Agatti. Transfer to Bangaram Island. Relax on the beach." },
          { day: 2, description: "Scuba diving or snorkeling in the morning. Afternoon kayaking in the lagoon." },
          { day: 3, description: "Day trip to Thinnakara or Parali islands for turtle watching." },
          { day: 4, description: "Transfer back to Agatti for the flight back to Kochi." }
        ]
      }
    ]
  },
  {
    id: "dest-rishikesh",
    slug: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    country: "India",
    category: "Spiritual & Adventure",
    budget: "Low",
    rating: 4.8,
    reviewCount: 15400,
    coordinates: { lat: 30.0869, lng: 78.2676 },
    altitude: "340m",
    coverImage: "https://images.unsplash.com/photo-1598585449909-0f04c637fa9d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1626025114707-fa57ec1b66b0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Known as the Yoga Capital of the World, Rishikesh is beautifully situated on the banks of the Ganges River, surrounded by the Himalayas. It is a major center for spiritual studies, yoga ashrams, and adventure sports like white-water rafting and bungee jumping.",
    history: "A renowned pilgrimage destination for centuries, Rishikesh gained global fame in 1968 when the Beatles stayed at the Maharishi Mahesh Yogi Ashram.",
    bestSeason: "September to June",
    idealDuration: "3-4 days",
    temperature: "15°C to 35°C",
    nearestAirport: "Jolly Grant Airport, Dehradun (DED) - 21km",
    nearestRailwayStation: "Rishikesh Railway Station",
    nearestBusStand: "Rishikesh ISBT",
    tags: ["Yoga", "Spirituality", "River Rafting", "Ganges", "Ashrams", "Adventure"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 10,
    luxuryScore: 6,
    budgetScore: 9,
    topAttractions: [
      { name: "Triveni Ghat", description: "The biggest and most famous ghat in Rishikesh, known for the evening Maha Aarti.", location: "Rishikesh Town" },
      { name: "Parmarth Niketan", description: "One of the largest ashrams in Rishikesh, famous for its grand evening Ganga Aarti.", location: "Swarg Ashram" },
      { name: "Beatles Ashram", description: "The Chaurasi Kutia ashram where The Beatles learned transcendental meditation in 1968.", location: "Swarg Ashram" },
      { name: "Lakshman Jhula & Ram Jhula", description: "Iconic iron suspension bridges over the Ganges (Lakshman Jhula is currently closed for pedestrians, but area is famous).", location: "Tapovan" },
      { name: "Neelkanth Mahadev Temple", description: "A famous Shiva temple situated at a height of 1330m, 32km from Rishikesh.", location: "Pauri Garhwal" }
    ],
    activities: [
      { name: "White Water Rafting (Shivpuri)", price: 1500 },
      { name: "Bungee Jumping (Jumpin Heights)", price: 3500 },
      { name: "Yoga and Meditation Classes", price: 500 },
      { name: "Attend Evening Ganga Aarti", price: 0 },
      { name: "Camping by the Ganges", price: 2000 },
      { name: "Trek to Neer Garh Waterfall", price: 50 },
      { name: "Flying Fox", price: 1800 },
      { name: "Ayurvedic Massage", price: 1500 }
    ],
    localFood: [
      "Aloo Puri",
      "Chole Bhature",
      "Pahadi Maggi",
      "Ayurvedic Thali",
      "Masala Chai",
      "Samosa"
    ],
    shopping: [
      "Rudraksha malas",
      "Yoga gear and mats",
      "Ayurvedic medicines",
      "Spiritual books",
      "Handicrafts"
    ],
    culture: "Deeply spiritual and yogic culture. It is a strict vegetarian and alcohol-free city.",
    festivals: [
      "International Yoga Festival (March)",
      "Kanwar Yatra (July/August)",
      "Maha Shivaratri"
    ],
    hotels: [
      { name: "Ananda in the Himalayas", priceRange: "₹40,000 - ₹80,000+" },
      { name: "Taj Rishikesh Resort & Spa", priceRange: "₹25,000 - ₹45,000" },
      { name: "Aloha On The Ganges", priceRange: "₹8,000 - ₹15,000" },
      { name: "Divine Resort", priceRange: "₹5,000 - ₹10,000" },
      { name: "Zostel Rishikesh", priceRange: "₹600 - ₹2,500" },
      { name: "Parmarth Niketan Ashram", priceRange: "₹1,000 - ₹3,000" }
    ],
    restaurants: [
      { name: "Chotiwala Restaurant", type: "Indian Thali" },
      { name: "Little Buddha Cafe", type: "Multi-cuisine, Vegan" },
      { name: "The Sitting Elephant", type: "Fine Dining" },
      { name: "Tat Cafe", type: "Cafe, Healthy" },
      { name: "Freedom Cafe", type: "Continental, Indian" }
    ],
    travelTips: [
      "Rishikesh is completely vegetarian and alcohol-free by law.",
      "Book rafting and bungee jumping in advance during peak season.",
      "Dress modestly, especially when visiting ashrams and temples.",
      "Beware of monkeys, especially on the bridges.",
      "Rent a scooter to easily navigate between Tapovan and town."
    ],
    packingTips: [
      "Comfortable yoga clothes",
      "Modest clothing for temples",
      "Trekking shoes",
      "Swimwear for rafting (worn under clothes)",
      "Jacket for winter evenings",
      "Quick-dry towel"
    ],
    weather: {
      "January": "Cold mornings, 8-20°C",
      "May": "Hot, 25-38°C",
      "August": "Heavy rain, rafting closed, 24-32°C"
    },
    transport: [
      { mode: "Rental Scooter", price: "₹400 - ₹600 per day" },
      { mode: "Shared Vikram/Auto", price: "₹20 - ₹50 per seat" },
      { mode: "Taxi", price: "₹1500 - ₹2500 per day" }
    ],
    itineraries: [
      {
        name: "Rishikesh Action & Spirit in 3 Days",
        days: [
          { day: 1, description: "Arrive and check in. Visit the Beatles Ashram. Attend the Ganga Aarti at Parmarth Niketan in the evening." },
          { day: 2, description: "Morning white-water rafting from Shivpuri. Afternoon visit to Neer Garh waterfall. Cafe hopping in Tapovan." },
          { day: 3, description: "Early morning Yoga session. Visit Triveni Ghat and local markets. Depart in the afternoon." }
        ]
      }
    ]
  },
  {
    id: "dest-varanasi",
    slug: "varanasi",
    name: "Varanasi",
    state: "UttarPradesh",
    country: "India",
    category: "Spiritual",
    budget: "Medium",
    rating: 4.7,
    reviewCount: 22000,
    coordinates: { lat: 25.3176, lng: 82.9739 },
    altitude: "81m",
    coverImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598395927056-8d895e701c3b?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "One of the oldest continuously inhabited cities in the world, Varanasi (Kashi/Banaras) is the spiritual heart of India. Situated on the banks of the sacred Ganges river, the city is a labyrinth of narrow alleys, ancient temples, and over 80 ghats where life and death coalesce in profound daily rituals.",
    history: "Believed by Hindus to be founded by Lord Shiva. It has been a cultural and religious center in northern India for thousands of years, producing renowned writers, musicians, and philosophers.",
    bestSeason: "October to March",
    idealDuration: "2-3 days",
    temperature: "10°C to 25°C in winter, 30°C to 45°C in summer",
    nearestAirport: "Lal Bahadur Shastri International Airport (VNS) - 26km",
    nearestRailwayStation: "Varanasi Junction (BSB)",
    nearestBusStand: "Varanasi Cantt Bus Station",
    tags: ["Spirituality", "Ghats", "Temples", "Ganges", "Culture", "History"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 3,
    luxuryScore: 6,
    budgetScore: 8,
    topAttractions: [
      { name: "Dashashwamedh Ghat", description: "The main and most spectacular ghat, known for the magnificent daily evening Ganga Aarti.", location: "Godowlia" },
      { name: "Kashi Vishwanath Temple", description: "One of the 12 Jyotirlingas, this golden temple is the most important Shiva temple in Varanasi.", location: "Vishwanath Gali" },
      { name: "Manikarnika Ghat", description: "The main cremation ghat where pyres burn 24/7, symbolizing the Hindu concept of moksha (liberation).", location: "Riverfront" },
      { name: "Sarnath", description: "Located 10km away, this is where Lord Buddha gave his first sermon after attaining enlightenment.", location: "Sarnath" },
      { name: "Assi Ghat", description: "The southernmost ghat, popular with students and foreigners, hosts the morning Subah-e-Banaras aarti.", location: "Assi" }
    ],
    activities: [
      { name: "Sunrise Boat Ride on the Ganges", price: 400 },
      { name: "Attend Evening Ganga Aarti", price: 0 },
      { name: "Walk the Ghats", price: 0 },
      { name: "Visit Sarnath and the Museum", price: 200 },
      { name: "Weaver Village Tour (Banarasi Sarees)", price: 1000 },
      { name: "Street Food Tour", price: 800 },
      { name: "Morning Subah-e-Banaras at Assi Ghat", price: 0 },
      { name: "Visit Ramnagar Fort", price: 300 }
    ],
    localFood: [
      "Banarasi Paan",
      "Malaiyyo (Winter only sweet)",
      "Kachori Sabzi",
      "Tamatar Chaat",
      "Lassi (Blue Lassi Shop)",
      "Baati Chokha"
    ],
    shopping: [
      "Banarasi Silk Sarees",
      "Brassware",
      "Wooden Toys",
      "Rudraksha Beads",
      "Ganga Jal (Holy Water in brass pots)"
    ],
    culture: "The epicenter of Hindu spirituality, classical music (Banaras Gharana), and traditional scholarship.",
    festivals: [
      "Dev Deepawali (November)",
      "Maha Shivaratri (February/March)",
      "Holi (March)"
    ],
    hotels: [
      { name: "BrijRama Palace", priceRange: "₹25,000 - ₹50,000" },
      { name: "Taj Ganges", priceRange: "₹15,000 - ₹30,000" },
      { name: "Amritara Suryauday Haveli", priceRange: "₹8,000 - ₹15,000" },
      { name: "Guleria Kothi", priceRange: "₹10,000 - ₹18,000" },
      { name: "Ganpati Guest House", priceRange: "₹2,500 - ₹5,000" },
      { name: "Zostel Varanasi", priceRange: "₹700 - ₹2,500" }
    ],
    restaurants: [
      { name: "Baati Chokha Restaurant", type: "Authentic UP Food" },
      { name: "Pizzeria Vaatika Cafe", type: "Italian, Apple Pie (Assi Ghat)" },
      { name: "Deena Chaat Bhandar", type: "Street Food/Chaat" },
      { name: "Blue Lassi Shop", type: "Famous Lassi" },
      { name: "Kashi Chat Bhandar", type: "Chaat" }
    ],
    travelTips: [
      "Take a sunrise boat ride for the most magical views of the ghats.",
      "Be respectful at the cremation ghats (Manikarnika/Harishchandra); photography is strictly prohibited.",
      "The narrow alleys (galis) are a maze; rely on locals or GPS and beware of bulls.",
      "Try the local street food, but ensure water is bottled.",
      "Book boat rides directly with boatmen at the ghats and bargain."
    ],
    packingTips: [
      "Conservative clothing",
      "Comfortable slip-on shoes (for frequent temple visits)",
      "Hand sanitizer",
      "Shawl or light jacket for winter mornings on the river",
      "Camera (but use discreetly)"
    ],
    weather: {
      "January": "Cold and foggy, 8-20°C",
      "May": "Extremely hot, 32-45°C",
      "August": "Humid with heavy rain, river level high, 28-34°C"
    },
    transport: [
      { mode: "Cycle Rickshaw", price: "₹30 - ₹100 for short trips" },
      { mode: "Auto Rickshaw", price: "₹50 - ₹200 per trip" },
      { mode: "E-Rickshaw", price: "₹20 - ₹50 on shared routes" }
    ],
    itineraries: [
      {
        name: "Varanasi Soul in 2 Days",
        days: [
          { day: 1, description: "Sunrise boat ride. Walk through the ghats to Manikarnika. Visit Kashi Vishwanath Temple. Evening Ganga Aarti at Dashashwamedh Ghat." },
          { day: 2, description: "Morning trip to Sarnath to see Buddhist stupas and museum. Afternoon exploring the galis and enjoying local chaat. Sunset at Assi Ghat." }
        ]
      }
    ]
  },
  {
    id: "dest-amritsar",
    slug: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    country: "India",
    category: "Culture & Heritage",
    budget: "Medium",
    rating: 4.8,
    reviewCount: 25000,
    coordinates: { lat: 31.6340, lng: 74.8723 },
    altitude: "234m",
    coverImage: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1603513723363-2fdb3bcce596?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626025114707-fa57ec1b66b0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "The spiritual and cultural center of the Sikh religion, Amritsar is home to the magnificent Golden Temple. The city offers a profound mix of deep spirituality, poignant history (Jallianwala Bagh), patriotic fervor (Wagah Border), and some of the richest, most flavorful food in all of India.",
    history: "Founded in 1577 by Ram Das, the fourth Sikh Guru. The city witnessed the tragic Jallianwala Bagh massacre in 1919 and heavy action during the 1947 partition and 1984 Operation Blue Star.",
    bestSeason: "October to March",
    idealDuration: "2 days",
    temperature: "4°C to 20°C in winter, 30°C to 42°C in summer",
    nearestAirport: "Sri Guru Ram Dass Jee International Airport (ATQ) - 11km",
    nearestRailwayStation: "Amritsar Junction (ASR)",
    nearestBusStand: "Amritsar ISBT",
    tags: ["Golden Temple", "Sikhism", "History", "Food", "Patriotism", "Culture"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 2,
    luxuryScore: 6,
    budgetScore: 8,
    topAttractions: [
      { name: "Golden Temple (Harmandir Sahib)", description: "The holiest Gurdwara of Sikhism. A stunning golden structure surrounded by a sacred pool. The community kitchen (Langar) feeds up to 100,000 people daily.", location: "Golden Temple Rd" },
      { name: "Jallianwala Bagh", description: "A historic garden and memorial honoring the peaceful gatherers massacred by British forces in 1919.", location: "Near Golden Temple" },
      { name: "Wagah Border", description: "The border separating India and Pakistan, famous for the daily, energetic Beating Retreat border ceremony.", location: "Attari-Wagah Border (30km)" },
      { name: "Partition Museum", description: "The world's first museum dedicated to the memory of the 1947 partition of India.", location: "Town Hall" },
      { name: "Gobindgarh Fort", description: "A historic military fort built by Maharaja Ranjit Singh, now featuring museums and cultural shows.", location: "Old Cantt Rd" }
    ],
    activities: [
      { name: "Visit Golden Temple at Night", price: 0 },
      { name: "Volunteer at the Langar", price: 0 },
      { name: "Attend Wagah Border Ceremony", price: 0 },
      { name: "Heritage Village Tour (Sadda Pind)", price: 800 },
      { name: "Amritsari Food Walk", price: 1500 },
      { name: "Visit Khalsa College for Architecture", price: 50 },
      { name: "Shopping at Hall Bazaar", price: 0 }
    ],
    localFood: [
      "Amritsari Kulcha",
      "Makki di Roti & Sarson da Saag",
      "Lassi (Ahuja Lassi)",
      "Amritsari Fish Tikka",
      "Karah Parshad",
      "Pinni"
    ],
    shopping: [
      "Phulkari Embroidery",
      "Punjabi Juttis",
      "Papad and Wariyan",
      "Karas (Sikh bangles)",
      "Woolen Shawls"
    ],
    culture: "Heart of Punjabi culture and Sikh tradition, known for incredible hospitality, vibrant Bhangra music, and rich agricultural heritage.",
    festivals: [
      "Baisakhi (April)",
      "Diwali at Golden Temple (October/November)",
      "Guru Nanak Jayanti (November)"
    ],
    hotels: [
      { name: "Taj Swarna", priceRange: "₹10,000 - ₹20,000" },
      { name: "Welcomhotel by ITC Hotels", priceRange: "₹8,000 - ₹15,000" },
      { name: "Hyatt Regency Amritsar", priceRange: "₹7,000 - ₹14,000" },
      { name: "Ramada by Wyndham", priceRange: "₹5,000 - ₹9,000" },
      { name: "Golden Tulip", priceRange: "₹3,500 - ₹6,000" },
      { name: "Hosteller Amritsar", priceRange: "₹800 - ₹2,000" }
    ],
    restaurants: [
      { name: "Kesar Da Dhaba", type: "Vegetarian Punjabi, Dal Makhani" },
      { name: "Kulcha Land", type: "Amritsari Kulcha" },
      { name: "Makhan Fish and Chicken Corner", type: "Amritsari Fish" },
      { name: "Beera Chicken House", type: "Roast Chicken" },
      { name: "Ahuja Milk Bhandar", type: "Lassi" }
    ],
    travelTips: [
      "Head cover and modest dress are mandatory inside the Golden Temple (scarves are provided).",
      "Reach the Wagah border by 3:30 PM to get good seats for the ceremony.",
      "The Golden Temple looks spectacular at night; visit twice if possible.",
      "Eat at the Langar (community kitchen) for a humbling experience.",
      "The area around the Golden Temple is a no-vehicle zone; be prepared to walk."
    ],
    packingTips: [
      "Scarf or bandana to cover head",
      "Comfortable slip-on shoes",
      "Warm clothing for winter (it gets very cold)",
      "Hand sanitizer",
      "Sunglasses for the bright marble floors"
    ],
    weather: {
      "January": "Cold, 4-18°C",
      "May": "Very hot, 25-40°C",
      "August": "Hot and humid, 26-34°C"
    },
    transport: [
      { mode: "Auto Rickshaw", price: "₹50 - ₹150 for local trips" },
      { mode: "Taxi (to Wagah)", price: "₹1200 - ₹1800 round trip" },
      { mode: "Hop-on Hop-off Bus", price: "₹250 per ticket" }
    ],
    itineraries: [
      {
        name: "Amritsar Essence in 2 Days",
        days: [
          { day: 1, description: "Morning visit to Golden Temple and Jallianwala Bagh. Lunch at Kesar Da Dhaba. Afternoon trip to Wagah Border. Evening view of the illuminated Golden Temple." },
          { day: 2, description: "Visit the Partition Museum. Shopping in Hall Bazaar. Afternoon at Sadda Pind to experience traditional Punjabi village life." }
        ]
      }
    ]
  },
  {
    id: "dest-nainital",
    slug: "nainital",
    name: "Nainital",
    state: "Uttarakhand",
    country: "India",
    category: "Hill Station",
    budget: "Medium",
    rating: 4.5,
    reviewCount: 12000,
    coordinates: { lat: 29.3919, lng: 79.4542 },
    altitude: "2084m",
    coverImage: "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "A charming hill station built around a beautiful, eye-shaped emerald lake. Located in the Kumaon foothills of the outer Himalayas, Nainital offers a perfect escape from the summer heat with its colonial-era architecture, boating, and panoramic views of the snow-capped peaks.",
    history: "Founded by the British sugar merchant P. Barron in 1841. It became a popular health resort and the summer headquarters of the United Provinces.",
    bestSeason: "March to June, September to November",
    idealDuration: "2-3 days",
    temperature: "0°C to 15°C in winter, 10°C to 25°C in summer",
    nearestAirport: "Pantnagar Airport (PGH) - 65km",
    nearestRailwayStation: "Kathgodam (KGM) - 34km",
    nearestBusStand: "Tallital Bus Stand",
    tags: ["Lakes", "Mountains", "Boating", "Views", "Nature", "Kumaon"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 4,
    luxuryScore: 6,
    budgetScore: 7,
    topAttractions: [
      { name: "Naini Lake", description: "The iconic crescent-shaped lake in the heart of the town. Boating here is a must-do activity (₹150/30min).", location: "Center of Nainital" },
      { name: "Naina Devi Temple", description: "A revered Hindu temple located on the northern shore of Naini Lake.", location: "Mallital" },
      { name: "Snow View Point", description: "Offers majestic views of the Himalayas including Nanda Devi. Reached via a cable car (₹150).", location: "Mallital (Cable Car Station)" },
      { name: "Tiffin Top (Dorothy's Seat)", description: "A terraced hill top at 2292m offering 360-degree views. Reached via a 4km trek or horseback.", location: "Ayarpatta Hill" },
      { name: "Bhimtal", description: "Located 22km away, a larger lake with an island in the center containing an aquarium.", location: "Bhimtal" }
    ],
    activities: [
      { name: "Boating on Naini Lake", price: 210 },
      { name: "Cable Car Ride to Snow View", price: 300 },
      { name: "Trek to Naina Peak", price: 0 },
      { name: "Visit G.B. Pant High Altitude Zoo", price: 100 },
      { name: "Horse Riding to Tiffin Top", price: 800 },
      { name: "Shopping at Mall Road & Tibetan Market", price: 0 },
      { name: "Day trip to Jim Corbett NP (65km)", price: 4000 },
      { name: "Visit Eco Cave Gardens", price: 60 }
    ],
    localFood: [
      "Bal Mithai (Uttarakhand's famous fudge-like chocolate sweet)",
      "Singori",
      "Kumaoni Raita",
      "Bhatt ki Churkani",
      "Aloo ke Gutke",
      "Momos and Thukpa"
    ],
    shopping: [
      "Pine cone decorations",
      "Woolen garments",
      "Bal Mithai (from Thagunis)",
      "Aromatic candles",
      "Wooden handicrafts"
    ],
    culture: "Predominantly Kumaoni culture, mixed with colonial British legacy. The town has a strong tradition of boarding schools.",
    festivals: [
      "Nanda Devi Mahotsav (September)",
      "Sharadotsav (Winter Festival)",
      "Phool Dei"
    ],
    hotels: [
      { name: "The Manu Maharani", priceRange: "₹10,000 - ₹20,000" },
      { name: "Shervani Hilltop", priceRange: "₹8,000 - ₹15,000" },
      { name: "The Naini Retreat", priceRange: "₹7,000 - ₹14,000" },
      { name: "Alka The Lake Side Hotel", priceRange: "₹5,000 - ₹9,000" },
      { name: "Hotel Himalaya", priceRange: "₹3,000 - ₹6,000" },
      { name: "Zostel Nainital", priceRange: "₹800 - ₹2,500" }
    ],
    restaurants: [
      { name: "Machan Restaurant", type: "Multi-cuisine, Mall Road" },
      { name: "Sakley's Restaurant & Pastry Shop", type: "Continental, Bakery" },
      { name: "Chandni Chowk", type: "Indian Vegetarian" },
      { name: "Sonam Fast Food", type: "Momos in Tibetan Market" },
      { name: "Cafe Chica", type: "Continental, Heritage Vibe" }
    ],
    travelTips: [
      "Mall Road is closed for vehicles in the evening for a pedestrian promenade.",
      "Bargain with horse riders and taxi drivers for local sightseeing.",
      "Book the cable car early in the day as queues get very long.",
      "Nainital can get very crowded during May-June; book hotels in advance.",
      "Take a shared taxi from Kathgodam station to Nainital."
    ],
    packingTips: [
      "Light woolens for summer evenings",
      "Heavy jackets, thermals, and gloves for winter",
      "Comfortable walking shoes/trekking shoes",
      "Umbrella (frequent showers in afternoons)",
      "Motion sickness pills for the hill drive"
    ],
    weather: {
      "January": "Very cold, frequent snow, 0-10°C",
      "May": "Pleasant, 14-25°C",
      "August": "Heavy monsoons, prone to landslides, 15-21°C"
    },
    transport: [
      { mode: "Cycle Rickshaw (Mall Road only)", price: "₹20 - ₹50" },
      { mode: "Taxi for Lake Tour", price: "₹1500 - ₹2500" },
      { mode: "Shared Jeep (to Kathgodam)", price: "₹100 - ₹150 per seat" }
    ],
    itineraries: [
      {
        name: "Nainital Lake District in 2 Days",
        days: [
          { day: 1, description: "Boating on Naini Lake, visit Naina Devi Temple. Cable car to Snow View point. Evening walk on Mall Road and Tibetan market." },
          { day: 2, description: "Lake tour covering Bhimtal, Sattal, and Naukuchiatal. Afternoon visit to Eco Cave Gardens or High Altitude Zoo." }
        ]
      }
    ]
  },
  {
    id: "dest-mussoorie",
    slug: "mussoorie",
    name: "Mussoorie",
    state: "Uttarakhand",
    country: "India",
    category: "Hill Station",
    budget: "Medium",
    rating: 4.4,
    reviewCount: 14500,
    coordinates: { lat: 30.4598, lng: 78.0664 },
    altitude: "2005m",
    coverImage: "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Known as the 'Queen of the Hills', Mussoorie offers stunning views of the Doon Valley and the distant snow-capped Himalayas. Famous for its colonial charm, bustling Mall Road, and nearby serene cantonment town of Landour, home to author Ruskin Bond.",
    history: "Established by the British in 1823 as a retreat from the heat of the plains. It later became the first residence of the Dalai Lama in India before he moved to Dharamshala.",
    bestSeason: "March to June, September to November",
    idealDuration: "2-3 days",
    temperature: "2°C to 15°C in winter, 15°C to 25°C in summer",
    nearestAirport: "Jolly Grant Airport, Dehradun (DED) - 60km",
    nearestRailwayStation: "Dehradun (34km)",
    nearestBusStand: "Library Bus Stand / Picture Palace Bus Stand",
    tags: ["Mountains", "Views", "Colonial", "Nature", "Waterfalls", "Garhwal"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 5,
    luxuryScore: 6,
    budgetScore: 7,
    topAttractions: [
      { name: "Mall Road", description: "The 2km long vibrant promenade featuring shops, cafes, and viewpoints.", location: "Center of Mussoorie" },
      { name: "Kempty Falls", description: "A famous 40m waterfall located 15km from town. Can be crowded but remains iconic.", location: "Chakrata Road" },
      { name: "Gun Hill", description: "The second highest point in Mussoorie. Reached via a cable car ride (₹100) or a short steep trek.", location: "Accessible from Mall Road" },
      { name: "Landour", description: "A quiet, idyllic cantonment town adjacent to Mussoorie, famous for its pine forests, Char Dukan, and Ruskin Bond.", location: "Landour" },
      { name: "Lal Tibba", description: "The highest point (2275m) in the area, offering spectacular views of Himalayan peaks like Gangotri and Yamunotri.", location: "Landour" }
    ],
    activities: [
      { name: "Cable Car to Gun Hill", price: 150 },
      { name: "Visit George Everest's House", price: 0 },
      { name: "Bathing at Kempty Falls", price: 0 },
      { name: "Walk down Camel's Back Road", price: 0 },
      { name: "Zip-lining and Adventure Park", price: 800 },
      { name: "Pancake eating at Char Dukan", price: 300 },
      { name: "Trek to Jharipani or Bhatta Falls", price: 0 },
      { name: "Visit Company Garden", price: 25 }
    ],
    localFood: [
      "Maggi at Gun Hill stalls (a tradition)",
      "Tibetan food (Momos, Thukpa) at Little Llama cafe",
      "Pancakes and Waffles at Char Dukan",
      "Garhwali Thali",
      "Aloo Tikki on Mall Road",
      "Omelettes at Lovely Omelette Centre"
    ],
    shopping: [
      "Wooden handicrafts",
      "Tibetan artifacts and prayer wheels",
      "Woolen shawls and sweaters",
      "Brass statues",
      "Books (from Cambridge Book Depot where Ruskin Bond visits)"
    ],
    culture: "Garhwali culture heavily mixed with Tibetan influences and a lingering British colonial atmosphere.",
    festivals: [
      "Autumn Festival",
      "Bhadraj Fair (August)",
      "Summer Festival"
    ],
    hotels: [
      { name: "JW Marriott Mussoorie Walnut Grove", priceRange: "₹20,000 - ₹40,000" },
      { name: "Welcomhotel The Savoy", priceRange: "₹12,000 - ₹25,000" },
      { name: "Jaypee Residency Manor", priceRange: "₹10,000 - ₹18,000" },
      { name: "Rokeby Manor (Landour)", priceRange: "₹8,000 - ₹15,000" },
      { name: "Honeymoon Inn", priceRange: "₹4,000 - ₹8,000" },
      { name: "Hosteller Mussoorie", priceRange: "₹800 - ₹2,000" }
    ],
    restaurants: [
      { name: "Kalsang Friends Corner", type: "Authentic Tibetan & Chinese" },
      { name: "Cafe Ivy (Landour)", type: "Cafe, Pizzas, Views" },
      { name: "Little Llama Cafe", type: "Continental, Burgers" },
      { name: "Lovely Omelette Centre", type: "Famous Omelettes (Expect a queue)" },
      { name: "Landour Bakehouse", type: "Colonial Era Bakery" }
    ],
    travelTips: [
      "Mall Road has two ends: Library end and Picture Palace end. Vehicles cannot cross between them.",
      "Stay in Landour if you prefer peace, quiet, and old-world charm over the bustling Mall Road.",
      "Expect heavy traffic jams on the Dehradun-Mussoorie road during summer weekends.",
      "Kempty Falls can get extremely crowded in summer; go early morning.",
      "Visit Cambridge Book Depot on Saturdays; author Ruskin Bond often signs books there."
    ],
    packingTips: [
      "Good walking shoes (steep inclines)",
      "Heavy woolens for winter (December-February)",
      "Light jacket for summer evenings",
      "Umbrella during July-September",
      "Motion sickness medication for the winding road"
    ],
    weather: {
      "January": "Very cold, occasional snow, 2-10°C",
      "May": "Pleasant, 15-25°C",
      "August": "Heavy rain, misty, 16-22°C"
    },
    transport: [
      { mode: "Cycle Rickshaw (Mall Road only)", price: "₹50 - ₹100" },
      { mode: "Taxi to Kempty Falls", price: "₹1200 - ₹1800" },
      { mode: "Rental Scooter", price: "₹500 - ₹800 per day" }
    ],
    itineraries: [
      {
        name: "Queen of Hills in 2 Days",
        days: [
          { day: 1, description: "Morning walk on Camel's Back Road. Cable car to Gun Hill. Evening stroll on Mall Road and dinner at Kalsang." },
          { day: 2, description: "Half-day trip to Kempty Falls. Afternoon explore Landour, Char Dukan, and watch the sunset from Lal Tibba." }
        ]
      }
    ]
  },
  {
    id: "dest-auli",
    slug: "auli",
    name: "Auli",
    state: "Uttarakhand",
    country: "India",
    category: "Adventure & Skiing",
    budget: "Medium",
    rating: 4.6,
    reviewCount: 4500,
    coordinates: { lat: 30.5333, lng: 79.5667 },
    altitude: "2519m",
    coverImage: "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "India's premier ski resort destination, Auli is surrounded by coniferous and oak forests, offering panoramic views of some of India's highest peaks, including Nanda Devi. It transforms into a winter wonderland from December to March, and a lush green meadow in summer.",
    history: "Originally a training ground for the Indo-Tibetan Border Police. It was developed as a ski resort in the 1980s. Adjacent Joshimath is a highly sacred town established by Adi Shankaracharya.",
    bestSeason: "December to March (for skiing), May to November (for nature)",
    idealDuration: "3-4 days",
    temperature: "-4°C to 10°C in winter, 10°C to 20°C in summer",
    nearestAirport: "Jolly Grant Airport, Dehradun (DED) - 280km",
    nearestRailwayStation: "Rishikesh (250km)",
    nearestBusStand: "Joshimath Bus Stand",
    tags: ["Skiing", "Snow", "Mountains", "Trekking", "Himalayas", "Adventure"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: true,
    adventureScore: 9,
    luxuryScore: 5,
    budgetScore: 6,
    topAttractions: [
      { name: "Auli Ropeway (Gondola)", description: "Asia's longest gondola ride (4km) connecting Joshimath to Auli (₹1000 return), offering spectacular views.", location: "Joshimath to Auli" },
      { name: "Ski Slopes", description: "650m slopes with a 15-degree gradient, perfect for beginners and professionals during winter.", location: "Auli" },
      { name: "Auli Artificial Lake", description: "The world's highest man-made lake, created to produce artificial snow for the ski slopes.", location: "Auli" },
      { name: "Gurso Bugyal", description: "A 3km trek from Auli, this meadow offers majestic views of Nanda Devi, Trishul, and Dron Parvat.", location: "Near Auli" },
      { name: "Joshimath", description: "The gateway to Auli and Badrinath, featuring ancient temples and mutts.", location: "Joshimath (16km by road)" }
    ],
    activities: [
      { name: "Skiing (Equipment + Instructor)", price: 1500 },
      { name: "Snowboarding", price: 2000 },
      { name: "Trek to Gurso Bugyal", price: 0 },
      { name: "Gondola Ride", price: 1000 },
      { name: "Chairlift Ride", price: 500 },
      { name: "Camping", price: 2500 },
      { name: "Kuari Pass Trek", price: 8000 },
      { name: "Visit Badrinath (90km away)", price: 3000 }
    ],
    localFood: [
      "Kachmauli (Stuffed goat)",
      "Bal Mithai",
      "Singori",
      "Pahadi Maggi",
      "Garhwali Dal",
      "Bhaang ki Chutney"
    ],
    shopping: [
      "Ski gear (usually rented)",
      "Woolen caps and gloves",
      "Handicrafts in Joshimath",
      "Local pulses and spices"
    ],
    culture: "Deeply connected to the spiritual heritage of the Garhwal Himalayas. The local Bhotia tribe culture is prevalent.",
    festivals: [
      "National Winter Games (Feb/March)",
      "Mata Murti Ka Mela (September)"
    ],
    hotels: [
      { name: "Clifftop Club Resort", priceRange: "₹8,000 - ₹15,000" },
      { name: "GMVN Tourist Rest House (Auli)", priceRange: "₹1,500 - ₹4,000" },
      { name: "Blue Poppy Resorts", priceRange: "₹6,000 - ₹10,000" },
      { name: "Mountain Rover", priceRange: "₹4,000 - ₹8,000" },
      { name: "Nanda Inn (Joshimath)", priceRange: "₹2,000 - ₹4,000" }
    ],
    restaurants: [
      { name: "GMVN Restaurant", type: "Indian Thali, Basics" },
      { name: "Clifftop Club Restaurant", type: "Multi-cuisine" },
      { name: "Pahadi Maggi Stalls", type: "Maggi, Tea, Coffee" },
      { name: "Joshimath local dhabas", type: "North Indian" }
    ],
    travelTips: [
      "The road from Joshimath to Auli is often closed due to snow in winter; rely on the cable car.",
      "Book the GMVN rest house or ski packages months in advance for winter.",
      "The cable car from Joshimath runs on a schedule; check the last timing.",
      "Ensure you have proper snow boots and heavy winter gear.",
      "Altitude sickness can be an issue; take it slow on the first day."
    ],
    packingTips: [
      "Heavy thermals, fleece, and down jackets",
      "Waterproof snow pants and gloves",
      "Snow boots (can be rented)",
      "UV protection sunglasses (snow glare is intense)",
      "High SPF sunscreen and lip balm",
      "Basic medical kit"
    ],
    weather: {
      "January": "Freezing, heavy snow, -4 to 5°C",
      "May": "Pleasant and green, 10-20°C",
      "August": "Monsoon, high risk of landslides on route, 12-18°C"
    },
    transport: [
      { mode: "Ropeway (Joshimath to Auli)", price: "₹1000 return" },
      { mode: "Chairlift (within Auli)", price: "₹500" },
      { mode: "Taxi (Rishikesh to Joshimath)", price: "₹6000 - ₹8000" }
    ],
    itineraries: [
      {
        name: "Auli Winter Wonderland in 4 Days",
        days: [
          { day: 1, description: "Drive from Rishikesh to Joshimath (10 hours). Rest overnight." },
          { day: 2, description: "Take the morning Gondola to Auli. Check-in. Skiing lessons on the beginner slopes." },
          { day: 3, description: "More skiing or a guided snow trek to Gurso Bugyal for views of Nanda Devi. Visit the artificial lake." },
          { day: 4, description: "Cable car back to Joshimath and drive back down to Rishikesh/Dehradun." }
        ]
      }
    ]
  },
  {
    id: "dest-dehradun",
    slug: "dehradun",
    name: "Dehradun",
    state: "Uttarakhand",
    country: "India",
    category: "City & Nature",
    budget: "Medium",
    rating: 4.3,
    reviewCount: 9500,
    coordinates: { lat: 30.3165, lng: 78.0322 },
    altitude: "640m",
    coverImage: "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "The capital city of Uttarakhand, nestled in the Doon Valley between the Himalayas and the Shivaliks. Known for its elite boarding schools, military academies, colonial architecture, and as a gateway to major tourist destinations like Mussoorie, Rishikesh, and Haridwar.",
    history: "Founded in the 17th century by the Sikh Guru Ram Rai. It became a major center for the British military and education, establishing institutions like the Forest Research Institute and the Indian Military Academy.",
    bestSeason: "March to June, October to December",
    idealDuration: "1-2 days",
    temperature: "5°C to 20°C in winter, 20°C to 35°C in summer",
    nearestAirport: "Jolly Grant Airport (DED) - 25km",
    nearestRailwayStation: "Dehradun Station",
    nearestBusStand: "Dehradun ISBT",
    tags: ["Capital City", "Colonial", "Nature", "Caves", "Institutions", "Valley"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 3,
    luxuryScore: 6,
    budgetScore: 7,
    topAttractions: [
      { name: "Robber's Cave (Guchu Pani)", description: "A natural river cave formation where you can walk through a stream inside a dark cave.", location: "Anarwala" },
      { name: "Forest Research Institute (FRI)", description: "Established in 1906, a magnificent Greco-Roman colonial building set in a lush 450-acre estate. The largest of its kind in Asia.", location: "Chakrata Road" },
      { name: "Mindrolling Monastery", description: "A large Tibetan Buddhist monastery built in 1965, featuring a 60m tall Great Stupa and beautiful gardens.", location: "Clement Town" },
      { name: "Tapkeshwar Temple", description: "An ancient Shiva temple located in a cave where water drops naturally on the Shivalinga (5.5km from center).", location: "Garhi Cantt" },
      { name: "Malsi Deer Park", description: "A zoological park at the base of the Shivalik range, housing deer, leopards, and birds.", location: "Mussoorie Road" }
    ],
    activities: [
      { name: "Wading through Robber's Cave", price: 30 },
      { name: "Visit FRI Museums", price: 50 },
      { name: "Trek to Sahastradhara", price: 0 },
      { name: "Shopping at Paltan Bazaar", price: 0 },
      { name: "Visit the Indian Military Academy (outside view)", price: 0 },
      { name: "Cafes on Rajpur Road", price: 500 }
    ],
    localFood: [
      "Pahadi food (Jhangora Ki Kheer, Chainsaw, Singori)",
      "Kandalee Ka Saag",
      "Stick Jaws Toffee from Ellora's",
      "Bakery items from Sunrise Bakers",
      "Momos in Clement Town"
    ],
    shopping: [
      "Basmati Rice",
      "Bakery products (Ellora's Melting Moments)",
      "Woolen garments from Tibetan Market",
      "Brass statues",
      "Spices"
    ],
    culture: "A cosmopolitan mix of Garhwali, Kumaoni, Punjabi, and Tibetan cultures, with a strong colonial and military influence.",
    festivals: [
      "Jhanda Fair (March/April)",
      "Magh Mela",
      "Vasant Panchami"
    ],
    hotels: [
      { name: "Hyatt Regency Dehradun", priceRange: "₹12,000 - ₹25,000" },
      { name: "Lemon Tree Hotel", priceRange: "₹5,000 - ₹9,000" },
      { name: "Ramada by Wyndham", priceRange: "₹4,000 - ₹8,000" },
      { name: "Four Points by Sheraton", priceRange: "₹6,000 - ₹10,000" },
      { name: "Seyfert Sarovar Premiere", priceRange: "₹5,000 - ₹9,000" },
      { name: "Nomads House Hostel", priceRange: "₹700 - ₹1,500" }
    ],
    restaurants: [
      { name: "Kalsang Friends Corner", type: "Tibetan & Chinese" },
      { name: "Orchard", type: "Thai, Chinese, Tibetan" },
      { name: "Ellora's Melting Moments", type: "Bakery & Confectionery" },
      { name: "Chetan Puri Wala", type: "Puri Sabzi" },
      { name: "The Great Indian Pub", type: "Bar & Food" }
    ],
    travelTips: [
      "Carry water shoes or flip-flops for Robber's Cave.",
      "Paltan Bazaar is very crowded; walk instead of driving.",
      "Check timings for FRI; it is usually closed on weekends.",
      "Dehradun traffic can be heavy, plan travel times accordingly.",
      "Try the famous bakeries on Rajpur Road."
    ],
    packingTips: [
      "Light cottons for summer",
      "Heavy woolens for winter",
      "Water shoes (for Robber's Cave/Sahastradhara)",
      "Umbrella (frequent showers)",
      "Comfortable walking shoes"
    ],
    weather: {
      "January": "Cold, 5-18°C",
      "May": "Hot, 22-38°C",
      "August": "Heavy rain, humid, 22-30°C"
    },
    transport: [
      { mode: "Auto Rickshaw (Vikram)", price: "₹20 - ₹50 on shared routes" },
      { mode: "City Bus", price: "₹10 - ₹30" },
      { mode: "Ola/Uber", price: "₹100 - ₹300 per trip" }
    ],
    itineraries: [
      {
        name: "Dehradun City Tour in 1 Day",
        days: [
          { day: 1, description: "Morning visit to Forest Research Institute and Tapkeshwar Temple. Afternoon wading at Robber's Cave. Evening at Mindrolling Monastery and dinner on Rajpur Road." }
        ]
      }
    ]
  },
  {
    id: "dest-ajmer",
    slug: "ajmer",
    name: "Ajmer",
    state: "Rajasthan",
    country: "India",
    category: "Spiritual & Heritage",
    budget: "Low",
    rating: 4.2,
    reviewCount: 8500,
    coordinates: { lat: 26.4499, lng: 74.6399 },
    altitude: "480m",
    coverImage: "https://images.unsplash.com/photo-1595844730298-b960fad99667?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1599661555358-0ea15104be99?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Nestled in the Aravalli Mountains, Ajmer is a significant pilgrimage center for both Muslims and Hindus. It is most famous for the Dargah Sharif, the tomb of the revered Sufi saint Moinuddin Chishti. It serves as the gateway to the holy town of Pushkar, located just 14km away.",
    history: "Founded by the Chahamana ruler Ajayadeva in the 12th century. It was an important center under the Mughals; Emperor Akbar used to walk here from Agra. The British later made it their administrative headquarters for Rajputana.",
    bestSeason: "October to March",
    idealDuration: "1-2 days",
    temperature: "10°C to 25°C in winter, 30°C to 45°C in summer",
    nearestAirport: "Jaipur International Airport (JAI) - 132km",
    nearestRailwayStation: "Ajmer Junction",
    nearestBusStand: "Ajmer Central Bus Stand",
    tags: ["Sufism", "Shrine", "Lakes", "History", "Pilgrimage", "Rajasthan"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 2,
    luxuryScore: 4,
    budgetScore: 8,
    topAttractions: [
      { name: "Dargah Sharif of Mua'in ud-Din Chishti", description: "The most important Sufi shrine in India, visited by millions of all faiths. Famous for its massive cooking pots (Deghs).", location: "Dargah Bazaar" },
      { name: "Ana Sagar Lake", description: "An artificial lake built in 1150 CE by Anaji Chauhan, featuring marble pavilions (Baradari) built by Shah Jahan.", location: "City Center" },
      { name: "Adhai Din ka Jhonpra", description: "The oldest mosque in Rajasthan, built in 1193 CE by Qutb-ud-Din-Aibak on the ruins of a Sanskrit college. Features incredible Indo-Islamic architecture.", location: "Near Dargah" },
      { name: "Taragarh Fort", description: "A historic fort built in 1354 CE, located on a steep hill overlooking the city. Known for its massive gateways.", location: "Taragarh Hill" },
      { name: "Nasiyan Jain Temple (Soniji Ki Nasiyan)", description: "A Jain temple featuring a spectacular wooden diorama plated with gold depicting the Jain concept of the universe.", location: "Prithvi Raj Marg" }
    ],
    activities: [
      { name: "Offer Chadar at Dargah Sharif", price: 500 },
      { name: "Boating in Ana Sagar Lake", price: 150 },
      { name: "Qawwali Session at Dargah", price: 0 },
      { name: "Trek to Taragarh Fort", price: 0 },
      { name: "Day trip to Pushkar (14km)", price: 500 },
      { name: "Visit Akbari Fort & Museum", price: 50 }
    ],
    localFood: [
      "Sohan Halwa",
      "Kachori",
      "Mutton Korma (in Dargah Bazaar)",
      "Biryani",
      "Malpua (in Pushkar)",
      "Lassi"
    ],
    shopping: [
      "Ittar (Perfume)",
      "Chadars and religious offerings",
      "Silver jewelry",
      "Bandhani textiles",
      "Leather goods"
    ],
    culture: "A beautiful syncretic blend of Islamic Sufi traditions and Rajput Hindu culture.",
    festivals: [
      "Urs Festival (Commemorates the death anniversary of Moinuddin Chishti, dates vary)",
      "Pushkar Camel Fair (November, 14km away)",
      "Maha Shivaratri"
    ],
    hotels: [
      { name: "Mansingh Palace Hotel", priceRange: "₹4,000 - ₹8,000" },
      { name: "Bravia Hotel", priceRange: "₹3,000 - ₹6,000" },
      { name: "Hotel Ajmer Inn", priceRange: "₹2,500 - ₹5,000" },
      { name: "The Fern Residency", priceRange: "₹4,000 - ₹7,000" },
      { name: "Zostel Pushkar (14km away)", priceRange: "₹600 - ₹2,000" }
    ],
    restaurants: [
      { name: "Mango Masala", type: "Vegetarian Multi-cuisine" },
      { name: "Honeydew Restaurant", type: "Indian & Continental" },
      { name: "Pehli Manzil (Dargah Bazaar)", type: "Mughlai" },
      { name: "Shankar Chaat", type: "Street Food" }
    ],
    travelTips: [
      "Dress modestly when visiting the Dargah (head must be covered, no shorts).",
      "The Dargah Bazaar is heavily crowded and inaccessible to cars; take an auto or walk.",
      "Beware of overly aggressive 'khadims' (guides/priests) demanding large donations at the Dargah.",
      "Visit Ana Sagar Lake during sunset for the best views.",
      "Combine your trip with Pushkar for a complete experience."
    ],
    packingTips: [
      "Scarf or handkerchief to cover head",
      "Slip-on shoes",
      "Light cotton clothes",
      "Sunscreen and hat",
      "Hand sanitizer"
    ],
    weather: {
      "January": "Cool, 8-22°C",
      "May": "Very hot, 30-42°C",
      "August": "Humid with moderate rain, 25-32°C"
    },
    transport: [
      { mode: "Auto Rickshaw", price: "₹50 - ₹150 for local trips" },
      { mode: "E-Rickshaw", price: "₹20 - ₹50 in narrow lanes" },
      { mode: "Bus to Pushkar", price: "₹30" }
    ],
    itineraries: [
      {
        name: "Ajmer Pilgrimage in 1 Day",
        days: [
          { day: 1, description: "Morning visit to Dargah Sharif and Adhai Din ka Jhonpra. Afternoon visit to Nasiyan Jain Temple. Evening sunset at Ana Sagar Lake." }
        ]
      }
    ]
  },
  {
    id: "dest-bikaner",
    slug: "bikaner",
    name: "Bikaner",
    state: "Rajasthan",
    country: "India",
    category: "Heritage & Desert",
    budget: "Medium",
    rating: 4.5,
    reviewCount: 6500,
    coordinates: { lat: 28.0229, lng: 73.3119 },
    altitude: "242m",
    coverImage: "https://images.unsplash.com/photo-1599661555358-0ea15104be99?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1595844730298-b960fad99667?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "A vibrant, dust-swirling desert town with a fabulous fort and an energizing outpost feel. Famous for its savory Bhujia snack, majestic palaces, and the unique Karni Mata 'Rat Temple' in nearby Deshnok. It's less commercialized than Jaipur or Jodhpur, offering a raw Rajasthani experience.",
    history: "Founded in 1488 by Rao Bika, a Rajput prince. The city flourished as an important trade center on the caravan routes between Central Asia and the Gujarat coast.",
    bestSeason: "October to March",
    idealDuration: "2 days",
    temperature: "8°C to 25°C in winter, 35°C to 48°C in summer",
    nearestAirport: "Bikaner Airport (BKB) - 13km / Jodhpur (JDH) - 250km",
    nearestRailwayStation: "Bikaner Junction",
    nearestBusStand: "Bikaner Bus Stand",
    tags: ["Desert", "Forts", "Camels", "Rats Temple", "Heritage", "Snacks"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: true,
    adventureScore: 5,
    luxuryScore: 6,
    budgetScore: 8,
    topAttractions: [
      { name: "Junagarh Fort", description: "Built in 1593, this fort was never conquered. It houses 37 stunning palaces, temples, and pavilions made of red sandstone and marble.", location: "Bikaner Center" },
      { name: "Karni Mata Temple (Deshnok)", description: "Located 30km away, this temple is famous for its 25,000 revered black rats (kabbas) that roam freely. Spotting a white rat is considered highly auspicious.", location: "Deshnok" },
      { name: "National Research Centre on Camel", description: "Asia's only camel breeding farm. You can taste camel milk ice cream and learn about different camel breeds (8km away).", location: "Jodhpur Bypass" },
      { name: "Lalgarh Palace", description: "Built in 1902 by Maharaja Ganga Singh. A magnificent architectural masterpiece in red sandstone and Belgian glass. Part of it is a heritage hotel.", location: "Lalgarh" },
      { name: "Rampuria Haveli", description: "A cluster of incredibly ornate merchant houses built in the 15th century in red sandstone, reflecting Victorian and Rajput architecture.", location: "Old City" }
    ],
    activities: [
      { name: "Desert Camel Safari", price: 1500 },
      { name: "Visit Karni Mata Rat Temple", price: 0 },
      { name: "Taste Camel Milk Ice Cream", price: 50 },
      { name: "Heritage Walk through Old City Havelis", price: 500 },
      { name: "Junagarh Fort Tour", price: 300 },
      { name: "Buy authentic Bikaneri Bhujia", price: 200 }
    ],
    localFood: [
      "Bikaneri Bhujia (Spiced namkeen, a national snack)",
      "Bikaneri Rasgulla",
      "Gatte ki Sabzi",
      "Raj Kachori",
      "Camel Milk Tea",
      "Ker Sangri"
    ],
    shopping: [
      "Bikaneri Bhujia (from Chhotu Motu Joshi or Haldiram's base)",
      "Camel Leather goods (Mojaris, bags)",
      "Miniature Paintings",
      "Kundan Jewelry",
      "Usta Art (Gold embossing on camel bone/leather)"
    ],
    culture: "Strong Marwari culture. Renowned for Usta art and a deep reliance on the camel ('Ship of the Desert').",
    festivals: [
      "Bikaner Camel Festival (January)",
      "Karni Mata Fair (March-April)",
      "Gangaur (March)"
    ],
    hotels: [
      { name: "Narendra Bhawan", priceRange: "₹12,000 - ₹25,000" },
      { name: "Laxmi Niwas Palace", priceRange: "₹8,000 - ₹18,000" },
      { name: "Gajner Palace (30km away)", priceRange: "₹7,000 - ₹15,000" },
      { name: "Vesta Bikaner Palace", priceRange: "₹4,000 - ₹8,000" },
      { name: "Hotel Bhairon Vilas", priceRange: "₹2,500 - ₹5,000" },
      { name: "Hosteller Bikaner", priceRange: "₹700 - ₹1,800" }
    ],
    restaurants: [
      { name: "Chhotu Motu Joshi Sweet Shop", type: "Snacks, Bhujia, Rasgulla" },
      { name: "Gallops", type: "Multi-cuisine, near Junagarh Fort" },
      { name: "Heeralal's", type: "Vegetarian Thali" },
      { name: "Urmila Restaurant", type: "Rajasthani" }
    ],
    travelTips: [
      "Karni Mata temple requires walking barefoot or in socks where rats roam freely; bring a spare pair of socks.",
      "The Old City havelis are best explored on foot or via a tuk-tuk.",
      "Buy Bhujia from local old shops, not just commercialized brands.",
      "Bikaner gets extremely hot; avoid visiting between April and July.",
      "Camel farm timings are usually limited to afternoon hours (check before visiting)."
    ],
    packingTips: [
      "Light cotton clothes",
      "Spare socks for the Rat Temple",
      "Sunscreen, sunglasses, and a wide-brimmed hat",
      "Moisturizer (the desert air is very dry)",
      "Warm jacket for winter nights"
    ],
    weather: {
      "January": "Cool days, cold nights, 8-22°C",
      "May": "Scorching heat, 32-45°C",
      "August": "Hot and humid, very little rain, 28-36°C"
    },
    transport: [
      { mode: "Auto Rickshaw", price: "₹50 - ₹150 for local trips" },
      { mode: "Tanga (Horse Cart)", price: "₹100 - ₹200 for Old City" },
      { mode: "Taxi for Deshnok", price: "₹1000 - ₹1500 round trip" }
    ],
    itineraries: [
      {
        name: "Bikaner Heritage & Rats in 2 Days",
        days: [
          { day: 1, description: "Morning visit to Junagarh Fort. Walk through the Old City to see Rampuria Haveli. Afternoon visit to the Camel Breeding Farm." },
          { day: 2, description: "Morning trip to Deshnok to visit the Karni Mata Rat Temple. Afternoon shopping for Bhujia and Usta art. Visit Lalgarh Palace." }
        ]
      }
    ]
  },
  {
    id: "dest-chittorgarh",
    slug: "chittorgarh",
    name: "Chittorgarh",
    state: "Rajasthan",
    country: "India",
    category: "Heritage & History",
    budget: "Medium",
    rating: 4.6,
    reviewCount: 7200,
    coordinates: { lat: 24.8887, lng: 74.6269 },
    altitude: "394m",
    coverImage: "https://images.unsplash.com/photo-1595844730298-b960fad99667?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1599661555358-0ea15104be99?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Home to the largest fort in India, Chittorgarh epitomizes Rajput pride, romance, and spirit. The massive plateau fort resonates with tales of bravery, sieges, and the tragic Jauhars (mass self-immolation) of Rajput women who chose death over dishonor.",
    history: "Capital of Mewar. Founded by the Maurya dynasty. Famous for three great sieges (1303 by Alauddin Khalji, 1535 by Bahadur Shah of Gujarat, 1568 by Emperor Akbar) leading to three tragic Jauhars.",
    bestSeason: "October to March",
    idealDuration: "1-2 days",
    temperature: "10°C to 28°C in winter, 30°C to 42°C in summer",
    nearestAirport: "Maharana Pratap Airport, Udaipur (UDR) - 112km",
    nearestRailwayStation: "Chittorgarh Junction",
    nearestBusStand: "Chittorgarh Bus Stand",
    tags: ["Fort", "Rajputs", "History", "Bravery", "Jauhar", "Rajasthan"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 3,
    luxuryScore: 4,
    budgetScore: 8,
    topAttractions: [
      { name: "Chittorgarh Fort", description: "A UNESCO World Heritage site spanning 700 acres on a 180m high hill. It is the largest fort in India and Asia.", location: "Chittorgarh Hill" },
      { name: "Vijay Stambha (Tower of Victory)", description: "A 37m, 9-story tower built in 1448 by Rana Kumbha to commemorate his victory over Mahmud Khilji. Intricately carved.", location: "Inside Fort" },
      { name: "Rani Padmavati's Palace", description: "A beautiful three-story white building surrounded by water, associated with the legendary Queen Padmini.", location: "Inside Fort" },
      { name: "Kirti Stambha (Tower of Fame)", description: "A 22m, 12th-century Jain monument dedicated to Adinath, the first Jain Tirthankara.", location: "Inside Fort" },
      { name: "Meera Bai Temple", description: "A temple associated with the mystic poetess Meera Bai, a devoted follower of Lord Krishna.", location: "Inside Fort" },
      { name: "Gaumukh Reservoir", description: "A deep tank fed by a spring issuing from a rock face carved like a cow's mouth.", location: "Inside Fort" }
    ],
    activities: [
      { name: "Full Day Fort Exploration", price: 100 },
      { name: "Sound and Light Show", price: 150 },
      { name: "Climb Vijay Stambha", price: 0 },
      { name: "Visit Jauhar Kund site", price: 0 },
      { name: "Photography at Gaumukh Reservoir", price: 0 }
    ],
    localFood: [
      "Dal Baati Churma",
      "Laal Maas (Spicy Mutton Curry)",
      "Pyaaz Kachori",
      "Ghevar",
      "Gatte ki Sabzi"
    ],
    shopping: [
      "Thewa Jewelry",
      "Wooden toys (from nearby Bassi)",
      "Akola printed fabrics",
      "Metalwork",
      "Leather juttis"
    ],
    culture: "Deeply entrenched in the heroic ballads of Rajput valor, particularly the tales of Rana Kumbha, Maharana Pratap, and Rani Padmini.",
    festivals: [
      "Jauhar Mela (February/March)",
      "Meera Mahotsav (October)",
      "Teej"
    ],
    hotels: [
      { name: "Lake Nahargarh Palace", priceRange: "₹6,000 - ₹12,000" },
      { name: "Bassi Fort Palace (25km away)", priceRange: "₹5,000 - ₹10,000" },
      { name: "Hotel Padmini", priceRange: "₹3,000 - ₹6,000" },
      { name: "Castle Bijaipur (40km away)", priceRange: "₹6,000 - ₹10,000" },
      { name: "RTDC Hotel Panna", priceRange: "₹1,500 - ₹3,000" }
    ],
    restaurants: [
      { name: "Manuhar Dining Hall", type: "Rajasthani Thali" },
      { name: "Padmavati Lake Resort Restaurant", type: "Multi-cuisine" },
      { name: "Chhapiya Mama", type: "Local Indian" },
      { name: "Desert Cafe", type: "Cafe & Snacks" }
    ],
    travelTips: [
      "The fort is massive (700 acres); hire an auto-rickshaw or taxi to tour it rather than walking.",
      "Hire an authorized guide to fully understand the deep history and legends of the fort.",
      "Stay for the evening Sound and Light Show.",
      "Beware of monkeys around Gaumukh Reservoir.",
      "Chittorgarh is best done as a day trip or 1-night stopover between Udaipur and Jaipur."
    ],
    packingTips: [
      "Comfortable walking shoes (uneven ruins)",
      "Sunscreen and a hat (very little shade in the fort)",
      "Water bottle",
      "Modest clothes for the temples inside",
      "Camera with a good zoom for architectural details"
    ],
    weather: {
      "January": "Pleasant days, cold nights, 8-24°C",
      "May": "Scorching, 32-42°C",
      "August": "Warm with some rain, 25-32°C"
    },
    transport: [
      { mode: "Auto Rickshaw for Fort Tour", price: "₹400 - ₹600" },
      { mode: "Taxi for Fort Tour", price: "₹800 - ₹1200" },
      { mode: "Train to Udaipur", price: "₹100 - ₹300" }
    ],
    itineraries: [
      {
        name: "Pride of Rajputana in 1 Day",
        days: [
          { day: 1, description: "Arrive in Chittorgarh. Take a 4-hour guided tour of the fort covering Vijay Stambha, Kirti Stambha, Padmini Palace, and Gaumukh Reservoir. Evening Sound and Light show." }
        ]
      }
    ]
  },
  {
    id: "dest-mount-abu",
    slug: "mount-abu",
    name: "Mount Abu",
    state: "Rajasthan",
    country: "India",
    category: "Hill Station",
    budget: "Medium",
    rating: 4.4,
    reviewCount: 9800,
    coordinates: { lat: 24.5926, lng: 72.7156 },
    altitude: "1220m",
    coverImage: "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595844730298-b960fad99667?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "The only hill station in Rajasthan, set on a high rocky plateau in the Aravalli Range. Known for its cool climate amidst the desert state, the serene Nakki Lake, and the astonishingly intricate marble carvings of the Dilwara Jain Temples.",
    history: "Historically part of the Chauhan kingdom, it served as a summer resort for the Rajputana rulers and later the British. It is a major pilgrimage site for Jains and Hindus.",
    bestSeason: "October to March, July to September (Monsoon)",
    idealDuration: "2 days",
    temperature: "10°C to 22°C in winter, 20°C to 33°C in summer",
    nearestAirport: "Udaipur Airport (UDR) - 185km",
    nearestRailwayStation: "Abu Road (ABR) - 27km",
    nearestBusStand: "Mount Abu Bus Stand",
    tags: ["Hill Station", "Jain Temples", "Lake", "Oasis", "Aravalli", "Rajasthan"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 4,
    luxuryScore: 5,
    budgetScore: 7,
    topAttractions: [
      { name: "Dilwara Jain Temples", description: "Built between the 11th and 13th centuries, these temples boast some of the finest, most intricate marble carvings in the world.", location: "Dilwara Road" },
      { name: "Nakki Lake", description: "A picturesque, toad-rock fringed lake in the center of town. Legend says it was dug out by gods using their nails (nakh).", location: "Town Center" },
      { name: "Guru Shikhar", description: "The highest peak in the Aravalli range (1722m), offering panoramic views and a temple dedicated to Dattatreya.", location: "15km from town" },
      { name: "Sunset Point", description: "A famous spot to watch the sun set over the Aravalli hills (expect large crowds).", location: "Sunset Road" },
      { name: "Achalgarh Fort", description: "A 15th-century fort built by Rana Kumbha, housing the Achaleshwar Mahadev Temple.", location: "11km from town" }
    ],
    activities: [
      { name: "Boating in Nakki Lake", price: 300 },
      { name: "Trek to Guru Shikhar", price: 0 },
      { name: "Visit Dilwara Temples", price: 0 },
      { name: "Sunset watching", price: 0 },
      { name: "Wildlife Sanctuary Jeep Safari", price: 800 },
      { name: "Crocodile spotting at Trevor's Tank", price: 50 }
    ],
    localFood: [
      "Rajasthani Thali",
      "Gujarati Thali (due to proximity to Gujarat border)",
      "Rabdi Malpua",
      "Kachori",
      "Dal Baati Churma"
    ],
    shopping: [
      "Sandalwood products",
      "Kota Saris",
      "Rajasthani handicrafts",
      "Silver jewelry",
      "Leather goods"
    ],
    culture: "A mix of Rajasthani and Gujarati culture, with a heavy influx of Gujarati tourists, leading to a strong vegetarian culinary influence.",
    festivals: [
      "Summer Festival (May)",
      "Winter Festival (December)",
      "Navratri"
    ],
    hotels: [
      { name: "Bikaner House (Palace Hotel)", priceRange: "₹8,000 - ₹15,000" },
      { name: "WelcomHeritage Connaught House", priceRange: "₹7,000 - ₹12,000" },
      { name: "Cama Rajputana Club Resort", priceRange: "₹6,000 - ₹10,000" },
      { name: "Hotel Hillock", priceRange: "₹5,000 - ₹9,000" },
      { name: "Zostel Mount Abu", priceRange: "₹800 - ₹2,000" }
    ],
    restaurants: [
      { name: "Mulberry Tree", type: "Multi-cuisine, Continental" },
      { name: "Arbuda Restaurant", type: "Vegetarian Thali" },
      { name: "Jodhpur Bhojanalaya", type: "Rajasthani Thali" },
      { name: "Chacha Cafe", type: "Indian & Fast Food" }
    ],
    travelTips: [
      "Photography is strictly prohibited inside the Dilwara Temples.",
      "Mount Abu gets extremely crowded on long weekends and Gujarati holidays.",
      "Sunset point requires a 1km walk from the parking area; avoid taking the horse/pram rides.",
      "The drive from Abu Road station is steep and winding (45 mins).",
      "Vegetarian food dominates the town."
    ],
    packingTips: [
      "Light woolens for winter evenings",
      "Comfortable shoes for walking around Nakki Lake and temples",
      "Modest clothing for Dilwara temples",
      "Motion sickness pills for the hill drive",
      "Umbrella (it gets good rainfall during monsoon)"
    ],
    weather: {
      "January": "Cool, 10-20°C",
      "May": "Warm but pleasant, 23-33°C",
      "August": "Lush green, heavy rain, 18-24°C"
    },
    transport: [
      { mode: "Shared Taxi (Abu Road to Mt Abu)", price: "₹100 per seat" },
      { mode: "Rental Scooter", price: "₹400 - ₹600 per day" },
      { mode: "Taxi for local sightseeing", price: "₹1200 - ₹1800 per day" }
    ],
    itineraries: [
      {
        name: "Oasis of Rajasthan in 2 Days",
        days: [
          { day: 1, description: "Morning visit to Dilwara Temples. Afternoon boating at Nakki Lake. Evening walk to Sunset Point." },
          { day: 2, description: "Drive up to Guru Shikhar for panoramic views. Visit Achalgarh Fort and Trevor's Tank. Shopping in local markets." }
        ]
      }
    ]
  },
  {
    id: "dest-chandigarh",
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Chandigarh",
    country: "India",
    category: "City & Architecture",
    budget: "Medium",
    rating: 4.5,
    reviewCount: 11000,
    coordinates: { lat: 30.7333, lng: 76.7794 },
    altitude: "321m",
    coverImage: "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "India's first planned city post-independence, designed by the Swiss-French architect Le Corbusier. It serves as the shared capital of Punjab and Haryana. Known for its urban design, modernist architecture, sector layout, and extensive green belts. It is one of the cleanest and wealthiest cities in India.",
    history: "Commissioned by Jawaharlal Nehru in 1952 to replace Lahore as the capital of Indian Punjab after the 1947 partition. Le Corbusier's master plan divided the city into self-contained sectors.",
    bestSeason: "October to March",
    idealDuration: "1-2 days",
    temperature: "8°C to 20°C in winter, 30°C to 40°C in summer",
    nearestAirport: "Chandigarh International Airport (IXC) - 11km",
    nearestRailwayStation: "Chandigarh Railway Station",
    nearestBusStand: "ISBT Sector 17 / ISBT Sector 43",
    tags: ["Planned City", "Architecture", "Le Corbusier", "Gardens", "Clean", "Urban"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 2,
    luxuryScore: 7,
    budgetScore: 6,
    topAttractions: [
      { name: "Capitol Complex", description: "A UNESCO World Heritage site designed by Le Corbusier, containing the Secretariat, High Court, and Legislative Assembly, plus the Open Hand Monument.", location: "Sector 1" },
      { name: "Rock Garden", description: "A 40-acre massive sculpture garden built secretly by Nek Chand using industrial and home waste (outsider art).", location: "Sector 1" },
      { name: "Sukhna Lake", description: "A 3km artificial rain-fed lake at the foothills of the Himalayas, popular for boating and evening walks.", location: "Sector 1" },
      { name: "Zakir Hussain Rose Garden", description: "Asia's largest rose garden, spanning 30 acres with over 1600 varieties of roses.", location: "Sector 16" },
      { name: "Sector 17 Plaza", description: "The main commercial and pedestrian center of the city, famous for shopping and musical fountains.", location: "Sector 17" }
    ],
    activities: [
      { name: "Boating in Sukhna Lake", price: 200 },
      { name: "Walk through Rock Garden", price: 30 },
      { name: "Guided tour of Capitol Complex", price: 0 },
      { name: "Shopping in Sector 17 & 22", price: 0 },
      { name: "Visit Government Museum & Art Gallery", price: 20 }
    ],
    localFood: [
      "Chole Bhature",
      "Amritsari Kulcha",
      "Makki di Roti with Sarson da Saag",
      "Butter Chicken",
      "Lassi",
      "Garg Chaat (Sector 23)"
    ],
    shopping: [
      "Phulkari dupattas",
      "Punjabi Juttis (Sector 22 Market)",
      "High-end brands (Elante Mall)",
      "Handicrafts"
    ],
    culture: "A modern, cosmopolitan lifestyle with strong Punjabi roots. High standard of living, known for its car culture and organized civic life.",
    festivals: [
      "Festival of Gardens (Rose Festival) (February)",
      "Baisakhi (April)",
      "Chandigarh Carnival (November)"
    ],
    hotels: [
      { name: "Taj Chandigarh", priceRange: "₹8,000 - ₹15,000" },
      { name: "JW Marriott Hotel", priceRange: "₹12,000 - ₹22,000" },
      { name: "The Lalit Chandigarh", priceRange: "₹9,000 - ₹16,000" },
      { name: "Hyatt Regency", priceRange: "₹8,000 - ₹14,000" },
      { name: "Hotel Shivalikview", priceRange: "₹4,000 - ₹7,000" }
    ],
    restaurants: [
      { name: "Pal Dhaba (Sector 28)", type: "Authentic Punjabi, Butter Chicken" },
      { name: "Virgin Courtyard", type: "Italian, Fine Dining" },
      { name: "Gopal's", type: "Vegetarian, Sweets" },
      { name: "Backpackers Cafe", type: "Continental, Breakfast" },
      { name: "Swagath", type: "Seafood, North Indian" }
    ],
    travelTips: [
      "A permit is required to visit the Capitol Complex (can be obtained online or at the tourist center in Sector 1).",
      "The city is divided into Sectors; address navigation is very logical.",
      "Traffic rules are strictly enforced; always wear helmets and seatbelts.",
      "Elante Mall is one of the largest in North India, good for evening entertainment.",
      "Sukhna Lake can get very crowded on weekends."
    ],
    packingTips: [
      "Comfortable walking shoes for Rock Garden and Sukhna Lake",
      "Light cottons for summer",
      "Heavy jackets for winter (December/January)",
      "Sunscreen for outdoor walks"
    ],
    weather: {
      "January": "Cold, foggy, 6-18°C",
      "May": "Very hot, 25-40°C",
      "August": "Hot and humid, 24-32°C"
    },
    transport: [
      { mode: "Ola/Uber", price: "₹100 - ₹250 per trip" },
      { mode: "CTU City Bus", price: "₹10 - ₹25" },
      { mode: "Auto Rickshaw", price: "₹50 - ₹150 (Ensure meter usage)" }
    ],
    itineraries: [
      {
        name: "Modern City Architecture in 1 Day",
        days: [
          { day: 1, description: "Morning visit to Capitol Complex and Rock Garden. Afternoon stroll in Rose Garden. Evening boating at Sukhna Lake and dinner in Sector 17." }
        ]
      }
    ]
  },
  {
    id: "dest-ahmedabad",
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    category: "Heritage & Culture",
    budget: "Medium",
    rating: 4.5,
    reviewCount: 16500,
    coordinates: { lat: 23.0225, lng: 72.5714 },
    altitude: "53m",
    coverImage: "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1595844730298-b960fad99667?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Gujarat's largest city and India's first UNESCO World Heritage City. It offers a fascinating mix of ancient Islamic architecture in the Old City (pol neighborhoods), the peaceful Sabarmati Ashram connected to Mahatma Gandhi, and the modern urban vibe of western Ahmedabad.",
    history: "Founded in 1411 by Sultan Ahmed Shah. It was a major textile hub known as the 'Manchester of the East'. Mahatma Gandhi set up his ashram here, starting the famous Dandi Salt March in 1930.",
    bestSeason: "October to March",
    idealDuration: "2-3 days",
    temperature: "12°C to 28°C in winter, 30°C to 45°C in summer",
    nearestAirport: "Sardar Vallabhbhai Patel International Airport (AMD) - 10km",
    nearestRailwayStation: "Ahmedabad Junction (ADI)",
    nearestBusStand: "Geeta Mandir Bus Stand / Paldi",
    tags: ["Heritage City", "Gandhi", "Textiles", "Architecture", "Stepwells", "Food"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 2,
    luxuryScore: 6,
    budgetScore: 8,
    topAttractions: [
      { name: "Sabarmati Ashram", description: "Mahatma Gandhi's headquarters from 1917 to 1930. A peaceful retreat preserving his spartan living quarters (Hriday Kunj).", location: "Ashram Road" },
      { name: "Adalaj Stepwell (Vav)", description: "A magnificent 1498 five-story octagonal stepwell featuring stunning Indo-Islamic stone carvings.", location: "Adalaj (18km)" },
      { name: "Sidi Saiyyed Mosque", description: "Built in 1573, famous for its iconic, incredibly intricate stone latticework windows (Jalis) depicting the tree of life.", location: "Lal Darwaja" },
      { name: "Akshardham Temple (Gandhinagar)", description: "A massive, intricately carved pink sandstone Hindu temple complex dedicated to Swaminarayan.", location: "Gandhinagar (30km)" },
      { name: "Calico Museum of Textiles", description: "Considered one of the world's finest textile museums, showcasing India's rich weaving heritage (needs prior booking).", location: "Shahibaug" },
      { name: "Old City Pols & Jama Masjid", description: "A maze of traditional neighborhoods with wooden carved houses, and the massive 1424 Jama Masjid.", location: "Old City" }
    ],
    activities: [
      { name: "Heritage Walk of Old City", price: 200 },
      { name: "Visit Sabarmati Ashram", price: 0 },
      { name: "Stroll on Sabarmati Riverfront", price: 0 },
      { name: "Textile Tour at Calico Museum", price: 0 },
      { name: "Kite Flying (during Uttarayan)", price: 0 },
      { name: "Street Food Tour at Manek Chowk", price: 500 }
    ],
    localFood: [
      "Thepla",
      "Khaman Dhokla",
      "Fafda-Jalebi",
      "Undhiyu (Winter only)",
      "Sev Tameta nu Shaak",
      "Gujarati Thali"
    ],
    shopping: [
      "Patola Sarees",
      "Bandhani and Kutch Embroidery",
      "Khadi clothing",
      "Silver jewelry (Law Garden)",
      "Chaniya Cholis (Navratri attire)"
    ],
    culture: "Deeply entrepreneurial Gujarati culture, highly vegetarian, strictly dry state (no alcohol), known for vibrant festivals and immense civic pride.",
    festivals: [
      "Uttarayan (International Kite Festival) (January 14)",
      "Navratri (September/October - 9 nights of Garba)",
      "Rath Yatra"
    ],
    hotels: [
      { name: "The House of MG (Heritage)", priceRange: "₹8,000 - ₹15,000" },
      { name: "Taj Skyline", priceRange: "₹10,000 - ₹18,000" },
      { name: "Courtyard by Marriott", priceRange: "₹7,000 - ₹12,000" },
      { name: "Hyatt Regency", priceRange: "₹8,000 - ₹14,000" },
      { name: "Mangalbag Gallery and Residency", priceRange: "₹6,000 - ₹10,000" }
    ],
    restaurants: [
      { name: "Agashiye (The House of MG)", type: "Premium Gujarati Thali" },
      { name: "Vishalla", type: "Village themed Gujarati Thali" },
      { name: "Manek Chowk (Night)", type: "Street Food (Pav Bhaji, Dosa)" },
      { name: "Swati Snacks", type: "Premium Gujarati Snacks" },
      { name: "Das Khaman House", type: "Fafda, Dhokla, Khaman" }
    ],
    travelTips: [
      "Gujarat is a dry state; foreigners/non-residents can get liquor permits online or at the airport, but drinking in public is forbidden.",
      "Take the AMC guided Heritage Walk (starts 8 AM from Swaminarayan Temple) to understand the Old City.",
      "Book the Calico Museum tour weeks in advance; they allow limited visitors per day.",
      "Manek Chowk is a jewelry market by day and a bustling street food hub by night.",
      "Try to visit during Navratri for the world's longest dance festival (Garba)."
    ],
    packingTips: [
      "Light cotton clothing",
      "Comfortable walking shoes for the Old City",
      "Modest clothing for mosques and temples",
      "Sunscreen and hat (it gets very hot)",
      "A printed copy of your liquor permit if you applied for one"
    ],
    weather: {
      "January": "Pleasant, 12-28°C",
      "May": "Scorching, 32-45°C",
      "August": "Humid, moderate rain, 26-32°C"
    },
    transport: [
      { mode: "BRTS (Bus Rapid Transit)", price: "₹10 - ₹25" },
      { mode: "Auto Rickshaw", price: "₹40 - ₹150" },
      { mode: "Metro", price: "₹10 - ₹30" }
    ],
    itineraries: [
      {
        name: "Heritage & Gandhi in 2 Days",
        days: [
          { day: 1, description: "Morning Heritage Walk in Old City covering Jama Masjid and Sidi Saiyyed. Afternoon at Sabarmati Ashram. Evening street food at Manek Chowk." },
          { day: 2, description: "Morning trip to Adalaj Stepwell and Akshardham Temple in Gandhinagar. Afternoon visit to Calico Museum (if booked). Evening stroll on the Riverfront." }
        ]
      }
    ]
  },
  {
    id: "dest-hyderabad",
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    country: "India",
    category: "Heritage & Modern City",
    budget: "Medium",
    rating: 4.6,
    reviewCount: 28000,
    coordinates: { lat: 17.3850, lng: 78.4867 },
    altitude: "542m",
    coverImage: "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "The capital of Telangana, Hyderabad is the 'City of Pearls'. It is a fascinating juxtaposition of a rich Islamic heritage—manifested in ancient forts, royal palaces, and the iconic Charminar—and a booming modern IT hub (Cyberabad). World famous for its Biryani.",
    history: "Founded in 1591 by Muhammad Quli Qutb Shah. Ruled by the Qutb Shahi dynasty and later the Nizams of Hyderabad, who were among the wealthiest royals in the world. Merged into India in 1948.",
    bestSeason: "October to March",
    idealDuration: "3 days",
    temperature: "15°C to 30°C in winter, 30°C to 42°C in summer",
    nearestAirport: "Rajiv Gandhi International Airport (HYD) - 22km",
    nearestRailwayStation: "Secunderabad Junction / Hyderabad Deccan",
    nearestBusStand: "Mahatma Gandhi Bus Station (MGBS)",
    tags: ["Biryani", "Charminar", "Nizams", "IT Hub", "Palaces", "Forts"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 3,
    luxuryScore: 8,
    budgetScore: 7,
    topAttractions: [
      { name: "Charminar", description: "The iconic 1591 monument with four 56m minarets, built to celebrate the end of a plague. Surrounded by bustling markets.", location: "Old City" },
      { name: "Golconda Fort", description: "A massive 16th-century fortress, once the center of a diamond trade (Hope Diamond origin). Famous for its acoustic clapping system.", location: "Ibrahim Bagh" },
      { name: "Ramoji Film City", description: "The world's largest film studio complex (Guinness Record), spreading over 2000 acres.", location: "Anaspur Village (30km)" },
      { name: "Salar Jung Museum", description: "The world's largest one-man collection of art and artifacts, featuring over 35,000 items.", location: "Darulshifa" },
      { name: "Chowmahalla Palace", description: "The spectacular former official residence of the Nizams, featuring vintage cars and grand durbars.", location: "Motigalli" },
      { name: "Hussain Sagar Lake", description: "A heart-shaped lake dividing Hyderabad and Secunderabad, featuring a massive monolithic Buddha statue in the center.", location: "Necklace Road" }
    ],
    activities: [
      { name: "Climb Charminar", price: 25 },
      { name: "Golconda Fort Sound & Light Show", price: 140 },
      { name: "Ramoji Film City Full Day Tour", price: 1250 },
      { name: "Boating to Buddha Statue", price: 100 },
      { name: "Pearl Shopping in Laad Bazaar", price: 0 },
      { name: "Eat Authentic Hyderabadi Biryani", price: 300 }
    ],
    localFood: [
      "Hyderabadi Dum Biryani",
      "Haleem (Especially during Ramadan)",
      "Irani Chai with Osmania Biscuit",
      "Double ka Meetha / Qubani ka Meetha",
      "Pathar ka Gosht",
      "Mirchi ka Salan"
    ],
    shopping: [
      "Pearls (from Mangatrai or Old City)",
      "Bangles (Laad Bazaar near Charminar)",
      "Ittar (Perfume)",
      "Bidriware (metal handicraft)",
      "Pochampally Sarees"
    ],
    culture: "A rich Ganga-Jamuni Tehzeeb (Hindu-Muslim syncretism). A linguistic mix of Telugu and distinct Dakhini Urdu. High-tech corporate culture in the HITEC City area.",
    festivals: [
      "Ramadan / Eid ul-Fitr",
      "Bonalu (July/August)",
      "Ganesh Chaturthi",
      "Deccan Festival (February)"
    ],
    hotels: [
      { name: "Taj Falaknuma Palace", priceRange: "₹35,000 - ₹80,000+" },
      { name: "ITC Kohenur", priceRange: "₹12,000 - ₹25,000" },
      { name: "Park Hyatt Hyderabad", priceRange: "₹10,000 - ₹20,000" },
      { name: "Trident Hyderabad", priceRange: "₹8,000 - ₹15,000" },
      { name: "Novotel Hyderabad Convention Centre", priceRange: "₹7,000 - ₹12,000" },
      { name: "Zostel Hyderabad", priceRange: "₹700 - ₹2,000" }
    ],
    restaurants: [
      { name: "Paradise / Bawarchi / Cafe Bahar", type: "Hyderabadi Biryani" },
      { name: "Nimrah Cafe and Bakery", type: "Irani Chai & Views of Charminar" },
      { name: "Jewel of Nizam (The Minar)", type: "Fine Dining, Nizami Cuisine" },
      { name: "Shah Ghouse", type: "Biryani & Haleem" },
      { name: "Chutneys", type: "South Indian, Guntur Idli" }
    ],
    travelTips: [
      "The Old City around Charminar is very crowded; use auto-rickshaws instead of cabs.",
      "Hyderabadi Biryani is spicier than Lucknowi/Delhi variations.",
      "Try to visit Golconda Fort in the late afternoon to transition into the evening Sound and Light show.",
      "Ramoji Film City takes a full day and involves lots of walking/bus rides.",
      "Buy pearls only from certified shops to avoid fakes."
    ],
    packingTips: [
      "Light cotton clothes",
      "Comfortable walking shoes for Golconda and Ramoji",
      "Modest clothing for Old City and mosques",
      "Umbrella/Sunscreen"
    ],
    weather: {
      "January": "Pleasant, 15-28°C",
      "May": "Very hot, 32-42°C",
      "August": "Warm with rain, 24-30°C"
    },
    transport: [
      { mode: "Hyderabad Metro", price: "₹10 - ₹60" },
      { mode: "Ola/Uber/Rapido", price: "₹100 - ₹400 per trip" },
      { mode: "Auto Rickshaw", price: "₹50 - ₹150" }
    ],
    itineraries: [
      {
        name: "Nizam's Glory in 2 Days",
        days: [
          { day: 1, description: "Morning visit to Golconda Fort. Afternoon at Chowmahalla Palace. Evening at Charminar, Laad Bazaar, and dinner at Cafe Bahar." },
          { day: 2, description: "Morning at Salar Jung Museum. Afternoon visit to Hussain Sagar Lake. Evening in the HITEC City area for modern cafes and pubs." }
        ]
      }
    ]
  },
  {
    id: "dest-kanyakumari",
    slug: "kanyakumari",
    name: "Kanyakumari",
    state: "TamilNadu",
    country: "India",
    category: "Spiritual & Coastal",
    budget: "Medium",
    rating: 4.4,
    reviewCount: 13500,
    coordinates: { lat: 8.0883, lng: 77.5385 },
    altitude: "0m",
    coverImage: "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "The southernmost tip of the Indian subcontinent where three mighty bodies of water meet: the Arabian Sea, the Bay of Bengal, and the Indian Ocean (Triveni Sangam). Famous for its spectacular sunrises and sunsets, ancient temples, and monumental offshore statues.",
    history: "Historically known as Cape Comorin. Ruled by Cholas, Cheras, Pandyas, and Nayaks. Swami Vivekananda meditated on the offshore rock in 1892 before his famous Chicago address.",
    bestSeason: "October to March",
    idealDuration: "1-2 days",
    temperature: "22°C to 30°C year-round",
    nearestAirport: "Trivandrum International Airport (TRV) - 90km",
    nearestRailwayStation: "Kanyakumari Station (CAPE)",
    nearestBusStand: "Kanyakumari Bus Stand",
    tags: ["Cape", "Ocean Meet", "Sunrise", "Vivekananda", "Spiritual", "South Tip"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 3,
    luxuryScore: 4,
    budgetScore: 8,
    topAttractions: [
      { name: "Vivekananda Rock Memorial", description: "Built in 1970 on an island 500m offshore where Swami Vivekananda meditated. Accessible by ferry (₹45).", location: "Offshore" },
      { name: "Thiruvalluvar Statue", description: "A towering 133-foot stone sculpture of the Tamil poet and philosopher Thiruvalluvar, located on an adjacent rock.", location: "Offshore" },
      { name: "Kumari Amman Temple", description: "An ancient temple dedicated to the virgin goddess Kanya Kumari. Overlooks the Triveni Sangam bathing ghat.", location: "Sea Shore" },
      { name: "Triveni Sangam", description: "The exact confluence of the three oceans. A holy place for taking a dip.", location: "Sea Shore" },
      { name: "Padmanabhapuram Palace", description: "Located 35km away, this is the largest wooden palace in Asia, showcasing incredible Kerala architecture.", location: "Thuckalay" }
    ],
    activities: [
      { name: "Watch Sunrise from the beach", price: 0 },
      { name: "Ferry ride to Vivekananda Rock", price: 45 },
      { name: "Dip at Triveni Sangam", price: 0 },
      { name: "Visit Mahatma Gandhi Memorial", price: 0 },
      { name: "Day trip to Padmanabhapuram Palace", price: 100 },
      { name: "Visit Our Lady of Ransom Church", price: 0 }
    ],
    localFood: [
      "Kothu Parotta",
      "Meen Kuzhambu (Fish Curry)",
      "Appam with Stew",
      "Banana Chips",
      "Pazham Pori",
      "South Indian Thali"
    ],
    shopping: [
      "Seashell handicrafts",
      "Coir products",
      "Palm leaf products",
      "Spices",
      "Painted shells"
    ],
    culture: "A blend of Tamil and Kerala (Malayali) cultures due to its border location. Strong Christian, Hindu, and Islamic coastal communities.",
    festivals: [
      "Chaitra Purnima (April/May) - See sunset & moonrise simultaneously",
      "Navratri",
      "Cape Festival (October)"
    ],
    hotels: [
      { name: "Sparsa Resort", priceRange: "₹5,000 - ₹9,000" },
      { name: "Hotel Sea View", priceRange: "₹3,500 - ₹6,000" },
      { name: "Annai Resorts & Spa", priceRange: "₹6,000 - ₹10,000" },
      { name: "The Gopinivas Grand", priceRange: "₹3,000 - ₹5,000" },
      { name: "Tamil Nadu Tourism (TTDC) Hotel", priceRange: "₹2,000 - ₹4,000" }
    ],
    restaurants: [
      { name: "The Ocean Heritage", type: "South Indian, Seafood" },
      { name: "Sangam Restaurant", type: "Vegetarian Thali" },
      { name: "Sea View Restaurant", type: "Multi-cuisine, Coastal" },
      { name: "Saravana Bhavan (not the chain)", type: "Basic Vegetarian" }
    ],
    travelTips: [
      "Men must remove their shirts before entering the Kumari Amman Temple.",
      "The ferry queue for Vivekananda Rock gets very long; go early morning.",
      "Check the lunar calendar: on Chaitra Purnima (full moon in April), you can see the sunset and moonrise over the ocean simultaneously.",
      "The beach is rocky and currents are strong; it's not a swimming beach.",
      "Hire a taxi for a half-day trip to Padmanabhapuram Palace and Suchindram Temple."
    ],
    packingTips: [
      "Light cotton clothing",
      "Slip-on shoes for temples",
      "Sun hat and high SPF sunscreen",
      "Umbrella (coastal showers are common)",
      "Binoculars for the statues"
    ],
    weather: {
      "January": "Pleasant, 22-30°C",
      "May": "Hot and humid, 26-33°C",
      "August": "Windy, moderate rain, 24-30°C"
    },
    transport: [
      { mode: "Auto Rickshaw", price: "₹50 - ₹100 local trips" },
      { mode: "Ferry to Rock", price: "₹45" },
      { mode: "Taxi to Trivandrum", price: "₹2000 - ₹2500" }
    ],
    itineraries: [
      {
        name: "Land's End in 1 Day",
        days: [
          { day: 1, description: "Watch the sunrise. Take the early ferry to Vivekananda Rock and Thiruvalluvar Statue. Visit Kumari Amman Temple and Gandhi Memorial. Watch sunset from the viewing tower." }
        ]
      }
    ]
  },
  {
    id: "dest-madurai",
    slug: "madurai",
    name: "Madurai",
    state: "TamilNadu",
    country: "India",
    category: "Heritage & Temple City",
    budget: "Medium",
    rating: 4.6,
    reviewCount: 20000,
    coordinates: { lat: 9.9252, lng: 78.1198 },
    altitude: "101m",
    coverImage: "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Known as the 'Athens of the East', Madurai is one of the oldest continuously inhabited cities in the world. It is built around the staggering Meenakshi Amman Temple. A center of Tamil culture, literature, and incredible street food, it never sleeps (Thoonga Nagaram).",
    history: "Capital of the great Pandya kings. Sangam literature flourished here over 2000 years ago. Later ruled by the Cholas, Madurai Sultanate, Vijayanagar Empire, and the Nayaks who built the current temple structure.",
    bestSeason: "October to March",
    idealDuration: "2 days",
    temperature: "20°C to 32°C in winter, 30°C to 42°C in summer",
    nearestAirport: "Madurai International Airport (IXM) - 12km",
    nearestRailwayStation: "Madurai Junction (MDU)",
    nearestBusStand: "Mattuthavani Bus Terminus / Periyar Bus Stand",
    tags: ["Temples", "Dravidian", "Tamil Culture", "Street Food", "History", "Meenakshi"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 2,
    luxuryScore: 5,
    budgetScore: 8,
    topAttractions: [
      { name: "Meenakshi Amman Temple", description: "A 16th-century architectural marvel with 14 towering gopurams (tallest 51m), 33,000 sculptures, and the Hall of Thousand Pillars. A massive, living temple complex.", location: "Center of Madurai" },
      { name: "Thirumalai Nayakkar Mahal", description: "A stunning 1636 palace blending Dravidian and Islamic styles, known for its giant pillars and evening Sound & Light show.", location: "Near Temple" },
      { name: "Gandhi Memorial Museum", description: "Housed in a 17th-century palace, it contains the blood-stained dhoti Gandhi wore when assassinated.", location: "Collector Office Rd" },
      { name: "Azhagar Kovil", description: "A revered Vishnu temple located 21km away in the picturesque Alagar hills.", location: "Alagar Hills" },
      { name: "Vandiyur Mariamman Teppakulam", description: "A massive 16th-century temple tank covering 16 acres, used for the float festival.", location: "Vandiyur" }
    ],
    activities: [
      { name: "Explore Meenakshi Temple", price: 50 },
      { name: "Attend Temple Night Ceremony (Putting deities to sleep)", price: 0 },
      { name: "Palace Sound & Light Show", price: 50 },
      { name: "Madurai Food Walk", price: 800 },
      { name: "Shopping at Puthu Mandapam", price: 0 }
    ],
    localFood: [
      "Jigarthanda (Unique Madurai dessert drink)",
      "Kari Dosa (Mutton Dosa)",
      "Paruthi Paal (Cottonseed milk)",
      "Kothu Parotta",
      "Mutton Chukka",
      "Madurai Idli"
    ],
    shopping: [
      "Sungudi Sarees",
      "Brass lamps",
      "Jasmine flowers (Madurai Malli)",
      "Cotton fabrics",
      "Handicrafts from Puthu Mandapam"
    ],
    culture: "The soul of Tamil Nadu. The city has a deep connection with the Tamil language (Sangams) and is famous for its vibrant, unapologetically authentic local culture and food.",
    festivals: [
      "Chithirai Festival (April/May - 1 million attendees)",
      "Float Festival (Teppam) (January/February)",
      "Pongal (January - features Jallikattu in nearby villages)"
    ],
    hotels: [
      { name: "Heritage Madurai", priceRange: "₹7,000 - ₹12,000" },
      { name: "Taj Banni Thekkady (Nearby)", priceRange: "₹15,000+" },
      { name: "Courtyard by Marriott Madurai", priceRange: "₹6,000 - ₹10,000" },
      { name: "Fortune Pandiyan Hotel", priceRange: "₹4,000 - ₹8,000" },
      { name: "JC Residency", priceRange: "₹3,500 - ₹6,000" },
      { name: "Zostel Madurai", priceRange: "₹600 - ₹1,500" }
    ],
    restaurants: [
      { name: "Kumar Mess", type: "Non-Veg, Biryani, Mutton Chukka" },
      { name: "Murugan Idli Shop", type: "Idli, Dosa, Chutneys" },
      { name: "Amma Mess", type: "Famous Non-Veg" },
      { name: "Famous Jigarthanda (East Marret St)", type: "Jigarthanda drink" },
      { name: "Phil's Bistro", type: "Italian & Continental" }
    ],
    travelTips: [
      "Phones, cameras, and bags are strictly not allowed inside the Meenakshi Temple. Lockers are available outside.",
      "Dress code for the temple: Men must wear full pants/dhoti, women must wear long skirts, sarees, or suits with dupatta. No shorts/leggings.",
      "The temple closes between 12:30 PM and 4:00 PM.",
      "Try the street food, but rely on popular, crowded spots for hygiene.",
      "The city center is heavily congested; walking or auto-rickshaws are best."
    ],
    packingTips: [
      "Conservative clothing (mandatory for temple)",
      "Slip-on shoes",
      "Light cottons (very hot most of the year)",
      "Small pouch for cash/ID (since bags aren't allowed in temple)"
    ],
    weather: {
      "January": "Pleasant, 20-30°C",
      "May": "Scorching hot, 26-40°C",
      "August": "Hot with passing showers, 25-35°C"
    },
    transport: [
      { mode: "Auto Rickshaw", price: "₹50 - ₹150" },
      { mode: "City Bus", price: "₹10 - ₹20" },
      { mode: "Ola/Uber/Rapido", price: "₹80 - ₹200" }
    ],
    itineraries: [
      {
        name: "Soul of Tamil Nadu in 2 Days",
        days: [
          { day: 1, description: "Early morning Meenakshi Temple tour. Afternoon visit to Thirumalai Nayakkar Palace. Evening Food walk and Jigarthanda." },
          { day: 2, description: "Morning trip to Azhagar Kovil. Afternoon visit to Gandhi Museum. Evening temple night ceremony." }
        ]
      }
    ]
  },
  {
    id: "dest-chennai",
    slug: "chennai",
    name: "Chennai",
    state: "TamilNadu",
    country: "India",
    category: "Metro & Coastal",
    budget: "Medium",
    rating: 4.3,
    reviewCount: 35000,
    coordinates: { lat: 13.0827, lng: 80.2707 },
    altitude: "6m",
    coverImage: "https://images.unsplash.com/photo-1588612140409-906d2091410d?q=80&w=2070&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1596701389599-281b6c0b39be?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627961918349-f00e9647242d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601058269786-21820b411ce3?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "The capital of Tamil Nadu and the cultural capital of South India. Chennai is a sprawling metropolis on the Coromandel Coast, blending ancient Dravidian temples, colonial British architecture, long sandy beaches, and a booming IT/Automobile industry.",
    history: "Originally Madras, founded by the British East India Company in 1639 with the construction of Fort St. George. It was the center of the Madras Presidency. The Mylapore area predates the British by centuries.",
    bestSeason: "November to February",
    idealDuration: "2-3 days",
    temperature: "20°C to 30°C in winter, 28°C to 40°C in summer",
    nearestAirport: "Chennai International Airport (MAA) - 16km",
    nearestRailwayStation: "Chennai Central (MAS) / Egmore (MS)",
    nearestBusStand: "CMBT Koyambedu",
    tags: ["Metropolis", "Beaches", "Temples", "Culture", "Colonial", "South India"],
    familyFriendly: true,
    coupleFriendly: true,
    soloFriendly: true,
    hiddenGem: false,
    adventureScore: 3,
    luxuryScore: 8,
    budgetScore: 7,
    topAttractions: [
      { name: "Marina Beach", description: "The second longest urban beach in the world (13km). Famous for evening strolls, statues, and street food.", location: "Kamarajar Salai" },
      { name: "Kapaleeshwarar Temple", description: "A 7th-century Shiva temple in Mylapore, featuring incredible Dravidian architecture and a massive gopuram.", location: "Mylapore" },
      { name: "Fort St. George", description: "Built in 1644, the first English fortress in India. Now houses the Tamil Nadu legislature and a museum.", location: "George Town" },
      { name: "Government Museum", description: "The second oldest museum in India (1851), famous for its unparalleled collection of Chola bronze sculptures.", location: "Egmore" },
      { name: "Mahabalipuram", description: "Located 60km away on the ECR, a UNESCO site famous for 7th-century Pallava rock-cut temples and the Shore Temple.", location: "Mahabalipuram" },
      { name: "Santhome Cathedral Basilica", description: "Built over the tomb of St. Thomas the Apostle in the 16th century by the Portuguese.", location: "Mylapore" }
    ],
    activities: [
      { name: "Walk on Marina/Besant Nagar Beach", price: 0 },
      { name: "Day trip to Mahabalipuram", price: 1500 },
      { name: "Attend a Carnatic Music Concert", price: 500 },
      { name: "Shopping in T. Nagar", price: 0 },
      { name: "Drive on East Coast Road (ECR)", price: 0 },
      { name: "Visit DakshinaChitra Heritage Museum", price: 250 }
    ],
    localFood: [
      "Filter Coffee",
      "Idli, Vada, Sambar",
      "Chettinad Chicken",
      "Masala Dosa",
      "Kothu Parotta",
      "Sundal (on the beach)"
    ],
    shopping: [
      "Kanchipuram Silk Sarees (T. Nagar)",
      "Gold Jewelry",
      "Handicrafts (Victoria Technical Institute)",
      "Filter Coffee Powder"
    ],
    culture: "Fiercely proud of Tamil heritage. The epicenter of Carnatic classical music and Bharatanatyam dance. The Tamil film industry (Kollywood) is massive here.",
    festivals: [
      "Pongal (January)",
      "Madras Music Season (December/January - world's largest cultural event)",
      "Karthigai Deepam"
    ],
    hotels: [
      { name: "ITC Grand Chola", priceRange: "₹15,000 - ₹30,000+" },
      { name: "Taj Coromandel", priceRange: "₹12,000 - ₹25,000" },
      { name: "The Leela Palace", priceRange: "₹14,000 - ₹28,000" },
      { name: "Taj Connemara (Heritage)", priceRange: "₹9,000 - ₹18,000" },
      { name: "Residency Towers", priceRange: "₹6,000 - ₹12,000" },
      { name: "Zostel Chennai", priceRange: "₹800 - ₹2,000" }
    ],
    restaurants: [
      { name: "Saravana Bhavan / Sangeetha", type: "Classic South Indian Veg" },
      { name: "Annalakshmi", type: "Premium Vegetarian" },
      { name: "Ponnusamy / Nair Mess", type: "Non-Veg, Chettinad, Seafood" },
      { name: "Murugan Idli Shop", type: "Idlis and Chutneys" },
      { name: "Southern Spice (Taj Coromandel)", type: "Fine Dining South Indian" }
    ],
    travelTips: [
      "Chennai is hot and humid nearly all year round; November-January is the only pleasant time.",
      "T. Nagar is incredibly crowded; beware of pickpockets and terrible traffic.",
      "Do not swim at Marina Beach; the undercurrents are very strong and dangerous.",
      "Learn a few basic Tamil words; Hindi is rarely spoken or appreciated.",
      "Use the local train (MRTS) or Metro to beat road traffic."
    ],
    packingTips: [
      "Cotton and linen clothes",
      "Sunglasses and sunscreen",
      "Umbrella (for sun and sudden showers)",
      "Modest clothing for temples",
      "Mosquito repellent"
    ],
    weather: {
      "January": "Pleasant, 21-29°C",
      "May": "Extremely hot and humid, 28-40°C",
      "August": "Hot, humid, occasional rain, 26-34°C"
    },
    transport: [
      { mode: "Chennai Metro", price: "₹10 - ₹50" },
      { mode: "Auto Rickshaw", price: "₹50 - ₹200 (Demand meter/use apps)" },
      { mode: "Ola/Uber", price: "₹150 - ₹500" }
    ],
    itineraries: [
      {
        name: "Madras Heritage in 2 Days",
        days: [
          { day: 1, description: "Morning in Mylapore: Kapaleeshwarar Temple, Santhome Basilica, Filter Coffee. Afternoon at Fort St. George. Evening at Marina Beach." },
          { day: 2, description: "Drive down ECR. Visit DakshinaChitra. Afternoon exploring Mahabalipuram temples. Seafood dinner by the beach." }
        ]
      }
    ]
  }
];

const basePath = path.join('/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations/India');

// 1. Write individual JSON files
DESTINATIONS.forEach(dest => {
  const dirPath = path.join(basePath, dest.state);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, dest.slug + '.json');
  fs.writeFileSync(filePath, JSON.stringify(dest, null, 2));
  console.log('Wrote file:', filePath);
});

// 2. Update index
const indexPath = path.join('/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations/index.json');
let indexData = [];
if (fs.existsSync(indexPath)) {
  const raw = fs.readFileSync(indexPath, 'utf-8');
  try {
    indexData = JSON.parse(raw);
  } catch(e) {}
}

DESTINATIONS.forEach(dest => {
  const summary = {
    id: dest.id,
    slug: dest.slug,
    name: dest.name,
    state: dest.state,
    country: dest.country,
    category: dest.category,
    budget: dest.budget,
    rating: dest.rating,
    coverImage: dest.coverImage
  };
  
  const existingIdx = indexData.findIndex(item => item.id === dest.id || item.slug === dest.slug);
  if (existingIdx >= 0) {
    indexData[existingIdx] = summary;
  } else {
    indexData.push(summary);
  }
});

fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
console.log('Updated index:', indexPath);
