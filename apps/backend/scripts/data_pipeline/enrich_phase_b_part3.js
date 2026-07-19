const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = '/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations';

const DESTINATIONS = [
  {
    id: 'udaipur-01', slug: 'udaipur', name: 'Udaipur', state: 'Rajasthan', country: 'India',
    category: 'Culture', budget: 'Mid-range', rating: 4.7, reviewCount: 58000,
    coordinates: { lat: 24.5854, lng: 73.7125 }, altitude: 598,
    coverImage: 'https://images.unsplash.com/photo-1588416499018-d8c621e7d2c2?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1590339843069-8d59a78d0f47?w=800&q=80','https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80'],
    description: 'Udaipur — the City of Lakes — is Rajasthan\'s most romantic city, built around a series of shimmering artificial lakes and dominated by the colossal City Palace on Lake Pichola. Founded in 1558 by Maharana Udai Singh II of the Sisodia Rajput clan after the fall of Chittorgarh, Udaipur is a city of white marble palaces, ornate temples, narrow bazaars, and hilltop forts reflected in still waters. It is consistently voted one of Asia\'s most romantic cities.',
    history: 'Udaipur was founded in 1558 when Maharana Udai Singh II shifted his capital from Chittorgarh after its sack by Akbar. The Mewar dynasty (Sisodia Rajputs) never surrendered to the Mughals — making Udaipur a symbol of Rajput pride and resistance. The City Palace was built over 400 years by successive Maharanas. The Lake Palace hotel (1746) was built as a monsoon palace by Maharana Jagat Singh II.',
    bestSeason: 'October to March. Festival of Colors (Gangaur, March–April). Avoid May–June (42°C+).',
    idealDuration: '3–4 days',
    temperature: '5°C (winter nights) to 42°C (summer)',
    nearestAirport: 'Maharana Pratap Airport, Dabok (UDR) — 24 km from city',
    nearestRailwayStation: 'Udaipur City Railway Station — trains from Delhi (Chetak Express, 12 hrs), Jaipur (5 hrs)',
    nearestBusStand: 'Udaipur Bus Stand (Suraj Pol area)',
    tags: ['Lakes', 'Palace', 'Romance', 'Rajasthan', 'Heritage', 'Boat Ride'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 3, luxuryScore: 9, budgetScore: 6,
    topAttractions: [
      { name: 'City Palace Complex', description: 'The largest palace complex in Rajasthan, built over 400 years by 22 Maharanas. A labyrinthine collection of courtyards, terraces, towers, and museums. The Crystal Gallery (₹850) has the world\'s largest private crystal collection ordered by Queen Victoria. Entry: ₹300 (museum). Open 9:30 AM–5:30 PM.', location: 'East bank of Lake Pichola' },
      { name: 'Lake Palace Hotel (Jag Niwas)', description: 'Arguably India\'s most romantic hotel — an 18th-century white marble palace rising from the middle of Lake Pichola. Built in 1746 as a summer palace, now a Taj hotel. Non-guests can visit for a meal (lunch from ₹3,000) or by taking the hotel ferry from Bansi Ghat.', location: 'Center of Lake Pichola' },
      { name: 'Jag Mandir Island Palace', description: 'A 17th-century island palace on Lake Pichola where the Mughal prince Shah Jahan (later Emperor) took refuge. The Gul Mahal structure is said to have inspired the Taj Mahal. Accessible by boat from City Palace jetty (₹425 round trip). Beautiful sunset views.', location: 'Lake Pichola (island)' },
      { name: 'Saheliyon ki Bari (Garden of Maidens)', description: 'An exquisite 18th-century garden built for royal ladies-in-waiting by Maharana Sangram Singh. Features 8 marble-pillared kiosks, four lotus ponds, and 100 fountains. Fountains run on natural water pressure alone — no pump needed. Entry: ₹30. Open 9 AM–5:30 PM.', location: 'North Udaipur, near Fateh Sagar' },
      { name: 'Fateh Sagar Lake & Nehru Garden', description: 'A beautiful artificial lake north of the city with three small islands. Nehru Garden island has a restaurant and children\'s play area. Boat ride (₹120–200). The lake promenade (Fateh Sagar Pal) is perfect for evening walks.', location: 'North Udaipur' },
      { name: 'Kumbhalgarh Fort (Day Trip)', description: 'A UNESCO World Heritage Site 84 km from Udaipur. The second longest wall in the world (36 km, second only to Great Wall of China) surrounds this 15th-century fort built by Maharana Kumbha. The fort\'s inner citadel and Badal Mahal (Cloud Palace) are spectacular. Combined day trip with Ranakpur Temple possible.', location: '84 km from Udaipur' },
      { name: 'Bagore Ki Haveli (Haveli Museum + Dance Show)', description: 'An 18th-century mansion built on the banks of Lake Pichola by the Prime Minister of Mewar. Now a museum with 100+ rooms displaying Rajasthani folk costumes, royal artifacts, and the world\'s largest turban. The evening Dharohar cultural show (7 PM, ₹90–180) has excellent Rajasthani folk dances.', location: 'Gangaur Ghat, old city' }
    ],
    activities: ['Boat ride on Lake Pichola at sunset (₹425–700)', 'Cable car to Karni Mata Temple on Machhla Magra hill (₹70)', 'Day trip to Kumbhalgarh Fort + Ranakpur Jain Temple (₹2,500 cab)', 'Rajasthani cooking class at a haveli (₹1,500–2,500)', 'Heritage walk through old bazaars (₹400 guided)', 'Puppet show and folk dance at Dharohar (₹90)', 'Miniature painting workshop (₹500–1,000)', 'Bike rental and ride around Fateh Sagar Lake (₹100/hr)'],
    localFood: ['Dal Baati Churma (Rajasthani staple — best at rooftop restaurants around Lake Pichola)', 'Laal Maas (spicy lamb curry — authentic Mewar version at Natraj Restaurant)', 'Haldi ki Sabzi (turmeric root vegetable dish unique to Udaipur)', 'Ker Sangri (dried Rajasthani wild beans cooked with dried berries)', 'Ghevar and Malpua (Rajasthani sweets)', 'Kadhi Pakora (yogurt-based curry with fried gram flour dumplings)', 'Lakkarwala ki Kachori (famous local snack)'],
    shopping: ['Silver and terracotta jewelry at Hathi Pol Bazaar', 'Miniature Mughal-style paintings at Shilpgram craft village', 'Bandhani (tie-dye) sarees and fabric at Bada Bazaar', 'Mojris (leather shoes) at Clock Tower market', 'Wooden toys and lacquerware at Mochiwada', 'Fixed-price Rajasthan emporium near Chetak Circle'],
    culture: 'Udaipur embodies the Mewar Rajput pride that never bowed to Mughal dominance. The city\'s culture is rich in miniature painting (Mewar School), classical music, folk arts (ghoomar dance, fire dance), and festivals. The Gangaur festival (March–April) is one of Rajasthan\'s most colorful, with women carrying the idol of Goddess Parvati through the streets.',
    festivals: ['Gangaur Festival (March/April — 18-day women\'s festival, folk dances, boat procession on Lake Pichola)', 'Mewar Festival (coincides with Gangaur — cultural events)', 'Shilpgram Craft Fair (December — crafts festival with 400+ artisans)', 'Udaipur World Music Festival (February)'],
    hotels: ['Taj Lake Palace (5-star, ₹30,000–80,000 — on-lake island, India\'s most romantic hotel)', 'Oberoi Udaivilas (5-star, ₹35,000–1,00,000 — voted best hotel in Asia multiple times)', 'Trident Udaipur (5-star, ₹12,000–22,000, lakeside)', 'Amet Haveli (Heritage, ₹4,000–8,000, Lake Pichola view)', 'Jagat Niwas Palace Hotel (Heritage, ₹3,000–6,000, old city)', 'Zostel Udaipur (Hostel, ₹400–700)'],
    restaurants: ['Upré at Lake Pichola Hotel (Fine dining, lake view, ₹2,000–4,000)', 'Ambrai Restaurant (Best Lake Pichola view dining, ₹600–1,500)', 'Savage Garden (Rooftop, Continental + Indian, ₹500–1,200)', 'Natraj Restaurant (Classic Rajasthani thali, ₹400–700)', 'Cafe Edelweiss (German-Indian bakery, breakfast, ₹200–600)', 'Jasmin Restaurant (Rooftop lake view, budget-friendly, ₹200–500)'],
    travelTips: ['Sunrise at Lake Pichola from the City Palace ghats is magical — worth the early wake-up.', 'The boat ride at sunset is essential — book at City Palace jetty (not from touts).', 'Rickshaws are unmetered — negotiate before boarding (₹50–150 for most city routes).', 'Visit Kumbhalgarh fort on the way to/from Jodhpur — saves backtracking.', 'Carry cash — many old city shops don\'t accept cards.'],
    packingTips: ['Light cotton (summer)', 'Warm layers (winter evenings)', 'Walking shoes (cobbled old city)', 'Scarf for temple visits', 'Camera (irresistible photography everywhere)'],
    weather: 'Winter (Oct–Mar): 8–27°C, ideal. Summer (Apr–Jun): 30–42°C. Monsoon (Jul–Sep): 25–35°C, rain fills the lakes beautifully — romantic.',
    transport: 'By Air: Maharana Pratap Airport (24 km). By Rail: Udaipur City Station. By Road: Bus from Jaipur (6 hrs), Jodhpur (5 hrs), Delhi (14 hrs). Taxis from Jaipur ₹3,000–4,500. Within city: Ola/Uber, autos (₹50–150), e-rickshaws.',
    itineraries: [
      { type: '3 Day', durationDays: 3, estimatedCost: 9000, days: [
        { day: 1, activities: [
          { time: '09:00 AM', activity: 'City Palace Museum', description: 'Start with the grand palace complex. Allow 2–3 hours. Hire a guide (₹300).', costEstimate: 600 },
          { time: '12:30 PM', activity: 'Jag Mandir Island boat trip', description: 'Take the boat from City Palace jetty to Jag Mandir island palace. Stunning lake views.', costEstimate: 425 },
          { time: '02:00 PM', activity: 'Lunch at Ambrai Restaurant', description: 'Rajasthani thali with direct Lake Pichola view. Right on the waterfront.', costEstimate: 700 },
          { time: '04:00 PM', activity: 'Bagore ki Haveli Museum', description: 'Explore the haveli and see the world\'s largest turban display.', costEstimate: 100 },
          { time: '07:00 PM', activity: 'Dharohar Folk Dance Show', description: 'Ghoomar, fire dance, and Rajasthani folk performances. Book in advance.', costEstimate: 180 },
          { time: '09:00 PM', activity: 'Dinner at Savage Garden', description: 'Rooftop with old city and lake views. International and Rajasthani fusion.', costEstimate: 900 }
        ]},
        { day: 2, activities: [
          { time: '06:30 AM', activity: 'Sunrise boat ride on Lake Pichola', description: 'Hire a sunrise boat — the mist over the lake with palace silhouettes is unforgettable.', costEstimate: 500 },
          { time: '09:00 AM', activity: 'Saheliyon ki Bari', description: 'Serene 18th-century garden with fountains and lotus ponds.', costEstimate: 30 },
          { time: '10:30 AM', activity: 'Fateh Sagar Lake promenade', description: 'Walk or take a paddle boat. Nehru Garden island for a break.', costEstimate: 200 },
          { time: '01:00 PM', activity: 'Lunch at Natraj Restaurant', description: 'Best dal baati churma in the city. Classic Mewar thali.', costEstimate: 500 },
          { time: '03:00 PM', activity: 'Miniature Painting Workshop', description: 'Learn the centuries-old Mewar miniature painting tradition.', costEstimate: 800 },
          { time: '06:00 PM', activity: 'Cable car to Karni Mata Temple', description: 'Sunset views over Udaipur and all its lakes from the hilltop.', costEstimate: 70 }
        ]},
        { day: 3, activities: [
          { time: '08:00 AM', activity: 'Day trip to Kumbhalgarh Fort', description: '84 km. World\'s second longest wall (36 km). Hire a car (₹2,500). Combine with Ranakpur.', costEstimate: 3000 },
          { time: '12:00 PM', activity: 'Ranakpur Jain Temple', description: '15th-century temple with 1,444 intricately carved marble pillars. A masterpiece.', costEstimate: 200 },
          { time: '04:00 PM', activity: 'Return + Bazaar shopping', description: 'Hathi Pol Bazaar for silver jewelry and bandhani fabric.', costEstimate: 1500 }
        ]}
      ]}
    ]
  },
  {
    id: 'srinagar-01', slug: 'srinagar', name: 'Srinagar', state: 'Jammu & Kashmir', country: 'India',
    category: 'Nature', budget: 'Mid-range', rating: 4.7, reviewCount: 44000,
    coordinates: { lat: 34.0837, lng: 74.7973 }, altitude: 1585,
    coverImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1598127236413-e51e8756d06c?w=800&q=80','https://images.unsplash.com/photo-1592457711765-5beff9e5dc34?w=800&q=80'],
    description: 'Srinagar, the summer capital of Jammu & Kashmir, is one of India\'s most scenically beautiful cities — set in the Vale of Kashmir, surrounded by snow-capped Himalayas and centered on the shimmering Dal Lake. Famous for its ornate houseboats, floating gardens, Mughal garden terraces, saffron fields, hand-knotted carpets, and the stunning Shankaracharya Temple. Often called "Paradise on Earth" (Jannatu\'l-Firdaus), it is the gateway to Gulmarg, Pahalgam, Sonamarg, and the Amarnath pilgrimage.',
    history: 'Srinagar has a recorded history spanning over 2,000 years. Founded by Emperor Ashoka in the 3rd century BCE, it became the jewel of the Mughal Empire — Mughal emperors Jahangir, Shah Jahan, and Akbar built their famous gardens (Shalimar, Nishat, Chashme Shahi) here. The Dal Lake houseboats originated in the British era when the Dogra ruler forbade British residents from owning land in Kashmir, so they built elaborate houseboats instead.',
    bestSeason: 'March to October. Tulip season (March–April), summer (May–June), autumn (September–October). Winter (Dec–Feb) brings snowfall.',
    idealDuration: '4–5 days',
    temperature: '−7°C (winter) to 35°C (summer)',
    nearestAirport: 'Sheikh ul-Alam International Airport, Srinagar (SXR) — 14 km from city',
    nearestRailwayStation: 'Banihal Railway Station (118 km — the Kashmir Rail project is under construction; Jammu Tawi is the major station at 290 km)',
    nearestBusStand: 'Tourist Reception Center (TRC), Srinagar',
    tags: ['Dal Lake', 'Houseboats', 'Mughal Gardens', 'Mountains', 'Shikara', 'Kashmir'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 5, luxuryScore: 7, budgetScore: 6,
    topAttractions: [
      { name: 'Dal Lake & Shikara Ride', description: 'The iconic 18 sq km lake in the heart of Srinagar, home to floating gardens (rad), vegetable markets, lotus gardens, and 1,000+ houseboats. A shikara (wooden gondola) ride at sunrise (₹400–600/hr) is one of India\'s most beautiful experiences. The floating market starts at 5 AM.', location: 'Central Srinagar' },
      { name: 'Mughal Gardens (Shalimar, Nishat, Chashme Shahi)', description: 'Three terraced Mughal gardens along the eastern shores of Dal Lake. Shalimar Bagh (1619, Jahangir\'s "Abode of Love") has 4 terraces and century-old Chinar trees. Nishat Bagh (1633) has 12 terraces symbolizing the zodiac signs. Chashme Shahi (1632) has a natural spring. Entry: ₹24 each. Open sunrise to sunset.', location: 'Dal Lake eastern shore' },
      { name: 'Shankaracharya Temple', description: 'A Shiva temple at 1,100 ft on Shankaracharya Hill, reachable by 246 steps or car up to halfway. The temple was visited by Adi Shankaracharya in the 9th century. Spectacular 360-degree panorama of Dal Lake, the city, and Himalayan peaks. Entry: Free. Open 7 AM–7 PM (winter 5 PM).', location: 'Shankaracharya Hill, Srinagar' },
      { name: 'Hazratbal Mosque', description: 'Srinagar\'s most revered Islamic shrine, believed to house a hair of Prophet Muhammad (Moi-e-Muqqadas). The white marble mosque on the western shore of Dal Lake is particularly beautiful at sunset with its reflection in the water. Modest dress required.', location: 'Western Dal Lake shore' },
      { name: 'Old City (Nowhatta & Jamia Masjid Area)', description: 'Srinagar\'s ancient old city with medieval lanes, traditional Kashmiri timber-framed buildings (dhajji dewari architecture), traditional bazaars selling spices, dried fruits, copper utensils, and the magnificent 14th-century Jamia Masjid (Friday Mosque) with 378 wooden pillars.', location: 'Old Srinagar, downtown' },
      { name: 'Tulip Garden (Indira Gandhi Memorial)', description: 'Asia\'s largest tulip garden (30 hectares, 1.5 million tulips) blooms spectacularly for 3–4 weeks in March–April with the Zabarwan Mountains as backdrop. Over 60 varieties of tulips. Entry: ₹75. Only open during tulip season.', location: 'Zabarwan foothills, near Nishat' }
    ],
    activities: ['Shikara ride at sunrise (₹400–600/hr, book at Boulevard)', 'Overnight houseboat stay on Dal Lake (₹3,000–15,000)', 'Day trip to Gulmarg (skiing/gondola, 56 km, ₹3,500 cab)', 'Day trip to Pahalgam (Aru Valley, 96 km)', 'Day trip to Sonamarg (meadow of gold, 80 km)', 'Saffron field visit at Pampore (October/November harvest)', 'Traditional carpet weaving workshop', 'Wular Lake boat trip (55 km)'],
    localFood: ['Wazwan feast (30+ course traditional Kashmiri royal meal — try at Mughal Darbar or Adhoos)', 'Rogan Josh (slow-cooked lamb in Kashmiri spices — the most famous Kashmiri dish)', 'Yakhni (lamb in yogurt gravy)', 'Gushtaba (minced lamb koftas in yogurt sauce — Wazwan finale dish)', 'Kashmiri Kahwa (green tea with saffron, cardamom, cinnamon, almonds — essential)', 'Dum Aloo (baby potatoes in Kashmiri gravy)', 'Harissa (slow-cooked wheat and meat porridge — winter morning dish)'],
    shopping: ['Kashmiri Pashmina shawls (₹3,000–50,000 — buy from certified J&K Emporium or reputed shops to avoid acrylic fakes)', 'Hand-knotted Kashmiri carpets (₹5,000–2,00,000+)', 'Papier-mâché items and boxes (₹200–5,000)', 'Kashmiri saffron from Pampore (₹300–500/gram — world\'s finest)', 'Walnut wood furniture and carvings', 'Sozni-embroidered shawls and sarees'],
    culture: 'Srinagar is the cultural capital of Kashmiriyat — the syncretic culture unique to the Kashmir Valley that blends Shaivite Hinduism, Sufi Islam, Buddhism, and Central Asian traditions. Kashmiri artisanal crafts — carpet weaving, papier-mâché, pashmina, wood carving, sozni embroidery — are centuries-old traditions threatened by modernization.',
    festivals: ['Tulip Festival (March/April — Asia\'s largest tulip garden bloom)', 'Shikara Festival (October — houseboat and shikara competitions on Dal Lake)', 'Eid celebrations (mosque illuminations, special Wazwan feasts)', 'Herath/Shivratri (Kashmiri Pandit community celebrations in February)'],
    hotels: ['The Lalit Grand Palace Srinagar (5-star, ₹15,000–35,000 — former Maharaja\'s palace)', 'Vivanta Dal View (Taj Hotels, ₹10,000–22,000)', 'Houseboat New Bombay (Heritage houseboat, ₹3,000–8,000 — authentic Dal Lake stay)', 'Grand Mumtaz Hotels (3-star, ₹3,000–6,000, Dal Lake view)', 'DK Guest House (Budget, ₹1,000–2,500, near Dal Lake Boulevard)'],
    restaurants: ['Mughal Darbar (Best Wazwan and Kashmiri cuisine, ₹400–1,200, Residency Road)', 'Adhoos Restaurant (Oldest restaurant in Srinagar, 1947, ₹300–800)', 'Ahdoos Restaurant (Famous for mutton dishes, ₹400–900)', 'Stream Restaurant (Dal Lake view, ₹500–1,200)', 'Chai Jaai (Traditional Kashmiri breakfast, Kahwa, ₹100–300)'],
    travelTips: ['Check J&K Tourism advisories before travel — situation can change.', 'BSNL works best in rural areas; Airtel and Jio in Srinagar city.', 'Pashmina authentication: rub between palms — genuine pashmina generates warmth and is extremely soft.', 'Bargain firmly at carpet and shawl shops — starting prices are often 3–5x real price.', 'Don\'t exchange money from unauthorized dealers — use SBI or government exchange.', 'Houseboat owners will offer many paid activities — negotiate package prices.'],
    packingTips: ['Heavy jacket (spring/autumn)', 'Thermal inners (winter/early spring)', 'Waterproof shoes', 'Scarf for mosque visits', 'Cash in Indian Rupees (many shops cash-only)'],
    weather: 'Spring (Mar–Apr): 5–20°C — tulips bloom, beautiful. Summer (May–Jun): 15–30°C — peak season. Autumn (Sep–Oct): 10–25°C — autumn foliage of Chinar trees, stunning. Winter (Nov–Feb): −7 to 8°C, snowfall, some roads blocked but beautiful Dal Lake fog.',
    transport: 'By Air: Sheikh ul-Alam Airport — daily flights from Delhi (1.5 hrs), Mumbai, Chandigarh. By Bus/Car: Jammu–Srinagar Highway (300 km, 7 hrs via Jawahar Tunnel). Within Srinagar: Autos (₹50–200), app-based taxis, hired cars for day trips (₹2,500–4,000).',
    itineraries: [
      { type: '4 Day', durationDays: 4, estimatedCost: 16000, days: [
        { day: 1, activities: [
          { time: '10:00 AM', activity: 'Arrive & check into houseboat', description: 'Take a shikara to your Dal Lake houseboat. Explore the floating garden in a shikara.', costEstimate: 600 },
          { time: '03:00 PM', activity: 'Mughal Gardens: Shalimar & Nishat Bagh', description: 'Walk through the Mughal-era terraced gardens with Himalayan backdrop.', costEstimate: 48 },
          { time: '06:00 PM', activity: 'Sunset Shikara ride on Dal Lake', description: 'Paddle through the lotus gardens and floating markets at golden hour.', costEstimate: 500 },
          { time: '08:00 PM', activity: 'Wazwan dinner at Mughal Darbar', description: 'Traditional Kashmiri royal feast — rogan josh, yakhni, gushtaba, haaq.', costEstimate: 900 }
        ]},
        { day: 2, activities: [
          { time: '05:00 AM', activity: 'Floating vegetable market on Dal Lake', description: 'Pre-dawn shikara trip to the floating market where farmers sell produce from boats.', costEstimate: 400 },
          { time: '09:00 AM', activity: 'Shankaracharya Temple', description: '246 steps to the hilltop Shiva temple. 360° panorama of the entire Vale of Kashmir.', costEstimate: 100 },
          { time: '12:00 PM', activity: 'Old City walk & Jamia Masjid', description: 'Explore medieval lanes, copper bazaar, and the grand Friday mosque.', costEstimate: 200 },
          { time: '04:00 PM', activity: 'Carpet weaving workshop visit', description: 'See master weavers tie individual knots for Kashmiri carpets.', costEstimate: 0 },
          { time: '07:00 PM', activity: 'Dinner on houseboat', description: 'Traditional Kashmiri dinner prepared by houseboat cook. Kahwa tea after.', costEstimate: 0 }
        ]},
        { day: 3, activities: [
          { time: '07:00 AM', activity: 'Day trip to Gulmarg', description: 'World\'s highest gondola (Phase 2: 3,980 m). Skiing in winter, meadows in summer. 56 km, 1.5 hr.', costEstimate: 5000 },
          { time: '04:00 PM', activity: 'Return to Srinagar', description: 'Back via Tangmarg. Stop at local market.', costEstimate: 0 }
        ]},
        { day: 4, activities: [
          { time: '09:00 AM', activity: 'Tulip Garden / Hazratbal Mosque', description: 'Season-dependent: Tulip Garden (March–April) or Hazratbal mosque visit.', costEstimate: 75 },
          { time: '11:30 AM', activity: 'Shopping: Pashmina & Saffron', description: 'Buy certified Kashmiri pashmina at J&K Government Emporium. Saffron from Pampore dealer.', costEstimate: 3000 },
          { time: '02:00 PM', activity: 'Last Kahwa & departure', description: 'Traditional Kahwa tea farewell, then airport transfer.', costEstimate: 100 }
        ]}
      ]}
    ]
  },
  {
    id: 'agra-01', slug: 'agra', name: 'Agra', state: 'Uttar Pradesh', country: 'India',
    category: 'Culture', budget: 'Mid-range', rating: 4.5, reviewCount: 85000,
    coordinates: { lat: 27.1767, lng: 78.0081 }, altitude: 170,
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1563638407-6b7c353ca9f9?w=800&q=80','https://images.unsplash.com/photo-1585136917228-dd58d8e2e0c5?w=800&q=80'],
    description: 'Agra is home to one of the Seven Wonders of the World — the Taj Mahal, built by Mughal Emperor Shah Jahan (1632–1653) as a monument to his deceased wife Mumtaz Mahal. Beyond the Taj, Agra has two more UNESCO World Heritage Sites — Agra Fort and Fatehpur Sikri — making it the single city with the highest concentration of UNESCO monuments in India. Agra was the capital of the Mughal Empire at its zenith under Akbar, Jahangir, and Shah Jahan.',
    history: 'Agra first rose to prominence when Sikandar Lodi made it his capital in 1504. It became the Mughal capital under Akbar, who built the magnificent Agra Fort. Under Shah Jahan (1628–1658), it reached its artistic peak — the Taj Mahal, Jama Masjid, and the Pearl Mosque (Moti Masjid) were built. Aurangzeb overthrew his father and moved the capital to Delhi and later Aurangabad, beginning Agra\'s decline.',
    bestSeason: 'October to March. Avoid April–June (45°C). Taj Mahal at sunrise is transcendent.',
    idealDuration: '1–2 days (combine with Delhi and Jaipur for Golden Triangle)',
    temperature: '3°C (winter nights) to 48°C (summer)',
    nearestAirport: 'Agra Airport (Kheria) — limited flights. Better: Delhi IGI Airport (205 km, 3.5 hrs)',
    nearestRailwayStation: 'Agra Cantonment (AGC) — Shatabdi from Delhi (2 hrs), Taj Express',
    nearestBusStand: 'ISBT Agra',
    tags: ['Taj Mahal', 'Mughal', 'UNESCO', 'Heritage', 'Love', 'Seven Wonders'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 2, luxuryScore: 6, budgetScore: 6,
    topAttractions: [
      { name: 'Taj Mahal (UNESCO World Heritage)', description: 'The world\'s greatest monument to love — a white marble mausoleum built by Shah Jahan for his wife Mumtaz Mahal (died 1631). Completed in 1653, it uses 28 types of precious and semi-precious stones and took 22 years and 20,000 workers to complete. Entry: ₹50 (Indian), ₹1,100 (foreign). Open Sat–Thu, 30 min before sunrise to 30 min before sunset. Closed Fridays. Sunrise visit strongly recommended.', location: 'Taj Ganj, south bank of Yamuna' },
      { name: 'Agra Fort (UNESCO World Heritage)', description: 'A massive 16th-century red sandstone fort — more a walled city than a fort — built by Akbar in 1565. Contains the Diwan-i-Am, Diwan-i-Khas, the marble Khas Mahal, and Musamman Burj (the tower where Shah Jahan spent his last years imprisoned by his son Aurangzeb, with a view of the Taj Mahal). Entry: ₹50 (Indian), ₹650 (foreign). Open sunrise to sunset.', location: '2.5 km from Taj Mahal' },
      { name: 'Fatehpur Sikri (UNESCO World Heritage)', description: 'A ghost city 40 km from Agra — Akbar\'s purpose-built capital (1571–1585), abandoned after just 14 years (possibly due to water shortage). Perfectly preserved red sandstone palaces, the Buland Darwaza (54 m high gateway — one of India\'s tallest), Jama Masjid, and Salim Chishti\'s Dargah. Entry: ₹35 (Indian), ₹550 (foreign).', location: '40 km from Agra' },
      { name: 'Itmad-ud-Daulah (Baby Taj)', description: 'The first Mughal building entirely constructed of marble (1628). Built by Nur Jahan for her father Mirza Ghiyas Beg. Considered a transitional monument between early Mughal and later Shah Jahani style. The intricate pietra dura inlay work here directly inspired the Taj Mahal. Entry: ₹35 (Indian), ₹310 (foreign).', location: 'North bank of Yamuna, 3 km from Taj Mahal' },
      { name: 'Mehtab Bagh (Moonlight Garden)', description: 'A 16th-century garden on the north bank of the Yamuna, directly opposite the Taj Mahal. Provides the best sunset view of the Taj — from outside the main complex, with the Yamuna in between. Shah Jahan reportedly planned a black marble Taj here for himself (never built). Entry: ₹25 (Indian).', location: 'Opposite Taj Mahal, north bank of Yamuna' }
    ],
    activities: ['Sunrise at Taj Mahal (most magical)', 'Moonrise viewing of Taj (on full moon nights, ticketed separately)', 'Fatehpur Sikri full day trip', 'Agra\'s leather goods shopping at Sadar Bazaar', 'Marble inlay craft workshop (pietra dura)', 'Yamuna River walk near Taj Mahal', 'Craft village tour (Kinnari Bazaar for textiles)'],
    localFood: ['Petha (translucent white sweet made from ash gourd — Agra\'s most famous product; buy at Panchhi Petha, Sadar Bazaar)', 'Dalmoth (spiced lentil snack mix unique to Agra)', 'Agra ka Paratha (crispy parathas with diverse fillings at Deviram\'s)', 'Mughlai cuisine: seekh kabab, biryani, nihari', 'Bedai with Jalebi (deep-fried bread with spiced lentil soup + jalebi — classic breakfast)'],
    shopping: ['Marble inlay tabletops and decoratives (₹500–50,000) from Sadar Bazaar', 'Petha sweets from Panchhi Petha (the original shop, established 1860)', 'Leather goods: bags, shoes, belts from Sadar Bazaar', 'Carpet and rugs from authorized showrooms', 'Carved soapstone boxes and figures'],
    culture: 'Agra was the seat of the Mughal Empire\'s greatest artistic achievement. Its culture blends Mughal grandeur with Braj Bhasha (a dialect of Hindi/Urdu) folk traditions, including Brij Holi (a 40-day Holi celebration in the surrounding Braj region).',
    festivals: ['Taj Mahotsav (February — 10-day cultural festival near Shilpgram)', 'Brij Mahotsav (March — Holi celebrations in the Braj region)', 'Dussehra (October)', 'Full Moon viewing at Taj Mahal (ticketed, monthly)'],
    hotels: ['ITC Mughal (5-star, ₹15,000–30,000 — Taj Mahal view from pool)', 'Taj Hotel & Convention Center (5-star, ₹12,000–25,000)', 'Oberoi Amarvilas (Ultra-luxury, ₹45,000–1,00,000 — all rooms face Taj Mahal directly)', 'Crystal Sarovar Premiere (4-star, ₹5,000–8,000)', 'Hotel Kamal (Budget, ₹1,200–2,500, near Taj South Gate)'],
    restaurants: ['Pind Balluchi (Punjabi and Mughlai, ₹400–900, Fatehabad Road)', 'Esphahan at Oberoi Amarvilas (Fine dining, ₹3,000–7,000, Taj Mahal view)', 'Dasaprakash (South Indian vegetarian, ₹300–600)', 'Only Restaurant (Multi-cuisine, rooftop, ₹400–900, near Taj East Gate)', 'Sheroes Hangout (Café run by acid attack survivors — social enterprise, ₹100–400)'],
    travelTips: ['Buy Taj Mahal tickets online (asi.payumoney.com) to skip the queue.', 'The Taj is closed on Fridays for prayers.', 'Phones and cameras are allowed but tripods are not inside the Taj complex.', 'Sunrise (6 AM entry) gives the best light and fewest crowds — the Taj glows pink.', 'No food, alcohol, or tobacco inside Taj complex. Small lockers available outside the gates.', 'Taxis overcharge heavily near the Taj — use Ola/Uber or pre-negotiated hotel car.'],
    packingTips: ['Comfortable walking shoes', 'White or light clothes (symbolically appropriate for Taj)', 'Sunscreen + hat (summer)', 'Camera with wide-angle lens'],
    weather: 'Winter (Oct–Feb): 5–25°C, best. Spring (Mar–Apr): 25–40°C. Summer (May–Jun): 40–48°C — unbearable. Monsoon (Jul–Sep): 30–38°C, rain, humidity.',
    transport: 'By Rail: Agra Cantonment — Shatabdi Express from Delhi (2 hrs, ₹700–1,000), Taj Express. By Road: Yamuna Expressway from Delhi (3–3.5 hrs). Within city: Ola/Uber, autorickshaws (₹50–200), horse-drawn tongas near Taj.',
    itineraries: [
      { type: '2 Day', durationDays: 2, estimatedCost: 7000, days: [
        { day: 1, activities: [
          { time: '06:00 AM', activity: 'Taj Mahal at Sunrise', description: 'Arrive at East Gate at 5:45 AM for the queue. Watch the Taj change from pink to white gold in the morning light. 2–3 hours inside.', costEstimate: 1100 },
          { time: '10:00 AM', activity: 'Agra Fort', description: 'Explore the Mughal palace-fort complex including Shah Jahan\'s imprisonment tower with Taj view.', costEstimate: 50 },
          { time: '01:00 PM', activity: 'Lunch at Pind Balluchi', description: 'Excellent Mughlai biryani and tandoor items.', costEstimate: 700 },
          { time: '03:00 PM', activity: 'Itmad-ud-Daulah (Baby Taj)', description: 'The marble precursor to the Taj. Beautiful pietra dura work.', costEstimate: 35 },
          { time: '05:00 PM', activity: 'Mehtab Bagh sunset', description: 'Best sunset view of the Taj from across the Yamuna.', costEstimate: 25 },
          { time: '07:30 PM', activity: 'Petha shopping + Dinner', description: 'Panchhi Petha shop for fresh sweets. Dinner at Dasaprakash.', costEstimate: 700 }
        ]},
        { day: 2, activities: [
          { time: '08:00 AM', activity: 'Fatehpur Sikri (40 km)', description: 'Drive to Akbar\'s ghost capital. Buland Darwaza, Panch Mahal, Salim Chishti Dargah. Half day.', costEstimate: 2000 },
          { time: '01:00 PM', activity: 'Marble craft workshop', description: 'See pietra dura inlay craftsmen at work. Buy direct from artisans.', costEstimate: 500 },
          { time: '03:00 PM', activity: 'Sheroes Hangout + departure', description: 'Support the survivor café, then depart for Delhi by train.', costEstimate: 200 }
        ]}
      ]}
    ]
  },
  {
    id: 'amritsar-01', slug: 'amritsar', name: 'Amritsar', state: 'Punjab', country: 'India',
    category: 'Pilgrimage', budget: 'Budget', rating: 4.7, reviewCount: 68000,
    coordinates: { lat: 31.6340, lng: 74.8723 }, altitude: 234,
    coverImage: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1607529937521-d95f80de30de?w=800&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
    description: 'Amritsar is the spiritual and cultural capital of the Sikh religion, home to the Harmandir Sahib — the Golden Temple — which draws over 100,000 pilgrims daily, more visitors than the Taj Mahal. Founded in 1577 by the fourth Sikh Guru (Ram Dass Ji), the city\'s name derives from "Amrit Sarovar" (Pool of Nectar). Amritsar is also home to the Jallianwala Bagh massacre site (1919) and lies 30 km from the Wagah Border with Pakistan — the site of the famous military ceremony held daily at sunset.',
    history: 'Amritsar was founded in 1577 by Guru Ram Dass Ji on land granted by Emperor Akbar. The fifth Guru, Arjan Dev Ji, completed the Harmandir Sahib (Golden Temple) in 1604, also completing the compilation of the Adi Granth (Sikh scripture). The temple was destroyed and rebuilt multiple times, most notably by Ahmad Shah Durrani in 1762 and rebuilt by Maharaja Ranjit Singh, who plated the upper floors with gold in the early 19th century. The 1919 Jallianwala Bagh massacre — where British troops fired on unarmed civilians — became a defining moment of India\'s independence movement.',
    bestSeason: 'October to March. October–November for Diwali at the Golden Temple (most spectacular, the entire temple illuminated). Avoid May–June (42°C+).',
    idealDuration: '2–3 days',
    temperature: '2°C (winter) to 42°C (summer)',
    nearestAirport: 'Sri Guru Ram Dass Jee International Airport (ATQ) — 11 km from Golden Temple',
    nearestRailwayStation: 'Amritsar Junction (ASR) — well-connected to Delhi (5.5 hrs Shatabdi)',
    nearestBusStand: 'Amritsar Inter-State Bus Terminus (ISBT)',
    tags: ['Golden Temple', 'Sikh', 'Wagah Border', 'Langar', 'History', 'Punjab'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 2, luxuryScore: 4, budgetScore: 9,
    topAttractions: [
      { name: 'Harmandir Sahib (Golden Temple)', description: 'The holiest shrine in Sikhism — a stunning gold-plated gurdwara in the center of the Amrit Sarovar (sacred pool), connected by a causeway. Open 24 hours, 365 days. Free entry for all, regardless of religion. The free langar (community kitchen) serves 100,000 meals daily. Evening Palki Sahib ceremony (when the Guru Granth Sahib is carried to rest for the night) is deeply moving.', location: 'Golden Temple Road, Amritsar center' },
      { name: 'Jallianwala Bagh', description: 'The garden where British Brigadier General Dyer ordered troops to open fire on a peaceful gathering of 20,000 unarmed civilians on April 13, 1919 (Baisakhi day), killing 379–1,000+ people. The bullet marks are preserved on the walls. The narrow entrance (deliberately blocked by troops) and the well where people jumped are preserved. Entry: Free. Open 6:30 AM–9 PM. A must-visit for understanding Indian history.', location: 'Adjacent to Golden Temple complex' },
      { name: 'Wagah Border Ceremony', description: 'The famous evening beating-the-retreat ceremony at the India-Pakistan border post, 30 km from Amritsar. At sunset, BSF (India) and Pakistan Rangers soldiers perform an elaborate flag lowering ceremony with high kicks and synchronized marching, accompanied by patriotic music and enormous crowds on both sides. Free entry. Reach by 4 PM for seating. Run by BSF.', location: 'Attari-Wagah border post, 30 km from Amritsar' },
      { name: 'Partition Museum', description: 'A powerful and moving museum (opened 2017) in Town Hall documenting the 1947 Partition of British India — one of history\'s largest forced migrations (15 million people). Personal testimonies, photographs, and artifacts from families separated by the partition. Entry: ₹200. Open 10 AM–6 PM, closed Mondays.', location: 'Town Hall Building, Hall Bazaar' },
      { name: 'Akal Takht', description: 'The seat of the Sikh temporal authority (one of five Takhts), adjacent to the Golden Temple. Where the Jathedar (highest Sikh religious authority) issues edicts. The building was damaged in 1984 Operation Blue Star and rebuilt. Entry: Free with head covered.', location: 'Within Golden Temple complex' }
    ],
    activities: ['Partake in langar (free community meal) at Golden Temple (any time, 24 hours)', 'Amritsar Heritage Walk through old city bazaars (₹200 guided)', 'Wagah Border ceremony (free, evening)', 'Punjabi cooking class (making amritsari kulcha, ₹1,000–2,000)', 'Jallianwala Bagh and Partition Museum visit (half day)', 'Shop for Amritsari juttis (shoes) and phulkari embroidery', 'Cycle tour of old city (₹200/bike)', 'Photography tour in old bazaars'],
    localFood: ['Amritsari Kulcha with Chole (tandoor-baked stuffed bread with chickpea curry — try at Bharawan Da Dhaba or Kulcha Land)', 'Dal Makhani (slow-cooked black lentils in butter — a Punjabi staple, best in the world here)', 'Amritsari Fish (battered, deep-fried freshwater fish — the best fish fry in India)', 'Pindi Chole (spiced chickpea dish)', 'Lassi (thick, creamy yogurt drink — served in large clay pots at Gurdas Ram Lassi, Hall Bazaar)', 'Langar prasad (free simple vegetarian meal at Golden Temple — simple but deeply meaningful)', 'Pinni and Patisa (traditional Punjabi sweets)'],
    shopping: ['Phulkari embroidery (traditional Punjabi needlework — dupattas, salwar suits, ₹500–5,000)', 'Amritsari juttis (handmade leather shoes, ₹300–1,500, Hall Bazaar)', 'Khadi garments from Cottage Industries', 'Golden Temple prasad (halwa wrapped in cloth)', 'Dry fruits and pickles at Hall Bazaar', 'Punjabi folk art: painted pottery, woodwork'],
    culture: 'Amritsar is the heart of Sikh civilization — where the faith\'s most sacred scripture was completed, its most holy shrine built, and its greatest historical trials endured. The langar tradition (community kitchen open to all, regardless of religion) is perhaps the world\'s largest ongoing charitable meal service.',
    festivals: ['Baisakhi (April 13 — Sikh New Year and harvest festival; Golden Temple celebrations, processions)', 'Diwali at the Golden Temple (October/November — entire temple complex illuminated with 200,000 lights, fireworks)', 'Gurpurab (Guru Nanak Jayanti, November — candlelit procession from Golden Temple)'],
    hotels: ['Hyatt Amritsar (5-star, ₹6,000–12,000)', 'Ramada Amritsar (4-star, ₹4,000–8,000)', 'Le Golden Hotel (Heritage, ₹3,000–6,000, near Golden Temple)', 'Hotel Honest (Budget, ₹1,200–2,500)', 'Golden Temple Free Accommodation (Free — SGPC provides basic accommodation to pilgrims at Guru Nanak Niwas, 3-day max)'],
    restaurants: ['Bharawan Da Dhaba (Best kulcha in Amritsar since 1912, ₹150–300)', 'Crystal Restaurant (Amritsari fish fry, ₹400–800, Queen\'s Road)', 'Brothers Dhaba (Pure vegetarian, ₹150–300)', 'Kesar Da Dhaba (Heritage restaurant since 1916, dal makhani famous, ₹200–450)', 'Gurdas Ram Lassi (Best lassi in India, ₹50–100, Hall Bazaar)'],
    travelTips: ['Cover your head with a kerchief before entering the Golden Temple (provided free at the entrance).', 'Remove shoes and wash feet in the pool before entering the temple complex.', 'Photography is allowed but be respectful — no selfie sticks inside the main sanctum.', 'Langar is free for all — absolutely participate; it is a unique experience.', 'For Wagah Border: reach by 4 PM (summer) or 3 PM (winter) for good seating. Taxis ₹1,500 return.', 'The 3 AM Palki Sahib ceremony (scripture taken to rest) and 4 AM (scripture brought out) are serene — worth the early wake.'],
    packingTips: ['Head covering (dupatta/kerchief — provided free at temple)', 'Comfortable walking shoes (you will walk a lot)', 'Warm layers for winter', 'Small backpack for Wagah trip'],
    weather: 'Winter (Nov–Feb): 2–15°C, foggy mornings. Spring (Mar–Apr): 20–35°C, pleasant. Summer (May–Jun): 35–42°C, hot and humid. Monsoon (Jul–Sep): 28–38°C with rain.',
    transport: 'By Air: Sri Guru Ram Dass Jee Airport (11 km from Golden Temple). By Rail: Amritsar Junction — Shatabdi from Delhi (5.5 hrs, ₹700–1,200). By Bus: PEPSU/HRTC from Delhi (8 hrs), Chandigarh (4 hrs). Within city: Autos (₹30–150), cycle rickshaws, Ola/Uber.',
    itineraries: [
      { type: '2 Day', durationDays: 2, estimatedCost: 4000, days: [
        { day: 1, activities: [
          { time: '04:00 AM', activity: 'Golden Temple at dawn (optional but transcendent)', description: 'The temple is magical in predawn hours with minimal crowds. Participate in early morning kirtan (devotional music).', costEstimate: 0 },
          { time: '08:00 AM', activity: 'Langar breakfast at Golden Temple', description: 'Join the free community kitchen — simple roti, dal, and kheer served with dignity.', costEstimate: 0 },
          { time: '10:00 AM', activity: 'Jallianwala Bagh', description: '1 hour at the historic massacre site. The bullet marks in the walls are chilling.', costEstimate: 0 },
          { time: '12:00 PM', activity: 'Amritsari Kulcha lunch at Bharawan Da Dhaba', description: 'Best kulcha-chole in India. Queue from 11 AM to avoid wait.', costEstimate: 200 },
          { time: '02:00 PM', activity: 'Partition Museum', description: 'Deeply affecting museum of the 1947 partition. Allow 2 hours.', costEstimate: 200 },
          { time: '05:00 PM', activity: 'Golden Temple evening — Palki Sahib ceremony', description: 'Watch the Guru Granth Sahib carried to rest in a procession of devotees, drums, and kirtan. One of the most moving ceremonies in India.', costEstimate: 0 },
          { time: '08:00 PM', activity: 'Dinner at Kesar Da Dhaba', description: 'Heritage restaurant since 1916. Dal makhani and tandoori roti.', costEstimate: 350 }
        ]},
        { day: 2, activities: [
          { time: '09:00 AM', activity: 'Heritage walk through bazaars', description: 'Hall Bazaar, Katra Jaimal Singh Bazaar — old city with colonial-era architecture.', costEstimate: 200 },
          { time: '11:00 AM', activity: 'Phulkari and shopping', description: 'Amritsari phulkari embroidery, juttis, dry fruits.', costEstimate: 1500 },
          { time: '01:00 PM', activity: 'Amritsari Fish lunch at Crystal', description: 'The fish fry here is legendary — battered, crispy freshwater fish.', costEstimate: 600 },
          { time: '03:30 PM', activity: 'Depart for Wagah Border', description: 'Shared auto or taxi to Wagah (₹50–200 shared). Arrive by 4 PM.', costEstimate: 200 },
          { time: '05:30 PM', activity: 'Wagah Border Retreat Ceremony', description: 'Electrifying flag-lowering ceremony. High kicks, drums, patriotic energy.', costEstimate: 0 },
          { time: '07:30 PM', activity: 'Lassi at Gurdas Ram, Hall Bazaar', description: 'Huge clay pot of creamy Punjabi lassi — the best in India.', costEstimate: 80 }
        ]}
      ]}
    ]
  },
  {
    id: 'darjeeling-01', slug: 'darjeeling', name: 'Darjeeling', state: 'West Bengal', country: 'India',
    category: 'Nature', budget: 'Mid-range', rating: 4.6, reviewCount: 38000,
    coordinates: { lat: 27.0360, lng: 88.2627 }, altitude: 2042,
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80','https://images.unsplash.com/photo-1580889240878-9e8196ffc82a?w=800&q=80'],
    description: 'Darjeeling is the "Queen of the Hills" in the Himalayan foothills of West Bengal, famous worldwide for its single-estate Darjeeling tea (a UNESCO Geographical Indication), the UNESCO-listed Darjeeling Himalayan Railway (the "Toy Train"), and the breathtaking sunrise view of Kanchenjunga (8,586 m — world\'s third highest peak) from Tiger Hill. The town\'s layered colonial heritage, Tibetan Buddhist monasteries, and multicultural population of Nepali, Tibetan, Lepcha, and Bengali communities make it one of India\'s most unique destinations.',
    history: 'Darjeeling was a forested tract belonging to the Kingdom of Sikkim until 1835 when it was leased to the British East India Company. The British developed it as a sanatorium and hill retreat, establishing tea plantations in the 1840s. The Darjeeling Himalayan Railway (1881) — a 2-foot narrow gauge railway — was the engineering marvel of its age, climbing 78 km from Siliguri to Darjeeling at grades up to 1:24.',
    bestSeason: 'March to May (spring rhododendrons) and September to November (clear mountain views). Monsoon (June–September): misty and cloudy but green.',
    idealDuration: '3–4 days',
    temperature: '2°C (winter) to 22°C (summer)',
    nearestAirport: 'Bagdogra Airport (IXB) — 90 km from Darjeeling (3 hrs by road)',
    nearestRailwayStation: 'New Jalpaiguri (NJP) — 88 km from Darjeeling. Darjeeling Himalayan Railway (Toy Train) from NJP to Darjeeling (8 hrs) or Joy Ride from Darjeeling to Ghum.',
    nearestBusStand: 'Darjeeling Bus Stand (near Chowk Bazaar)',
    tags: ['Tea', 'Hills', 'Toy Train', 'Himalaya', 'Kanchenjunga', 'Tigers Hill'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 5, luxuryScore: 6, budgetScore: 6,
    topAttractions: [
      { name: 'Tiger Hill Sunrise View', description: 'At 2,590 m, the most famous viewpoint in Darjeeling — 11 km from town. On clear days (best Oct–Nov, Mar–Apr), you can see Kanchenjunga (8,586 m), Makalu, Lhotse, and even Mt. Everest. The dawn sky turns orange and pink behind the glacier giants. Leave at 4 AM. Entry: ₹40. Telescope available.', location: '11 km from Darjeeling' },
      { name: 'Darjeeling Himalayan Railway (UNESCO Toy Train)', description: 'A UNESCO World Heritage Site — the 2-foot narrow gauge "Toy Train" built in 1881 that still runs on steam. The Joy Ride (2 hours, ₹1,400) from Darjeeling to Ghum and back is the most popular experience. The full journey from New Jalpaiguri (8 hrs, ₹450–1,400) is an engineering marvel through tea gardens and Himalayan scenery.', location: 'Darjeeling Railway Station' },
      { name: 'Happy Valley Tea Estate', description: 'One of Darjeeling\'s oldest tea estates (1854), offering guided tours of the tea garden and factory. Watch the full process — withering, rolling, oxidizing, firing — and sample single-estate first flush and second flush teas directly from the factory. Tours: 8 AM–4 PM (closed Mondays). Entry: ₹100.', location: '3 km from Darjeeling town' },
      { name: 'Batasia Loop & War Memorial', description: 'A spectacular spiral loop of the Toy Train railway where the track spirals on itself to gain altitude (the only way to navigate the steep gradient). The war memorial at the loop commemorates Gorkha soldiers. Beautiful backdrop of Kanchenjunga on clear mornings. The toy train passes through here — photography hotspot.', location: '5 km from Darjeeling on NJP road' },
      { name: 'Ghoom Monastery (Yiga Choling)', description: 'West Bengal\'s oldest and most revered Tibetan Buddhist monastery (1875, Gelugpa order). Houses a 5-metre statue of Maitreya (future Buddha) and rare thangkas and manuscripts. Adjacent Samten Choling and Sakya Choling monasteries. The monks\' chanting at morning prayers (5–6 AM) is deeply atmospheric.', location: 'Ghoom, 8 km from Darjeeling' },
      { name: 'Padmaja Naidu Himalayan Zoological Park', description: 'India\'s highest altitude zoo and one of the most successful snow leopard and red panda breeding programs in the world. Also houses Himalayan wolves, Tibetan wolves, and red panda. Entry: ₹60 (Indian), ₹200 (foreign). Open 8:30 AM–4:30 PM, closed Thursdays.', location: '2 km from Darjeeling center' }
    ],
    activities: ['Toy Train Joy Ride to Ghoom (₹1,400, 2 hours)', 'Tea tasting and factory tour at Happy Valley (₹100)', 'Tiger Hill sunrise drive (4 AM start, ₹300–500 jeep share)', 'Trekking: Sandakphu-Phalut Trek (4–5 days, best rhododendron trail in India)', 'Rock Garden and Ganga Maya Park visit (4 km)', 'Himalayan Mountaineering Institute (founded by Tenzing Norgay)', 'Cable car (ropeway) to Singla Tea Garden (₹60 return)', 'Photography walk through Chowrasta and Mall Road'],
    localFood: ['Darjeeling Tea (buy at Nathmull\'s on Laden La Road — the best tea shop in town, established 1931)', 'Momos (Nepali-Tibetan steamed dumplings — veg, pork, chicken — ubiquitous and excellent)', 'Thukpa (noodle soup with vegetables or meat)', 'Sel Roti (crispy rice-flour ring donuts — a Nepali specialty, eaten at festivals)', 'Tongba (fermented millet beer served in a bamboo mug with hot water — a Sikkim-Nepali drink)', 'Chowmein (Darjeeling street-style stir-fried noodles)', 'Aaloo Dum (potato curry in the local style)'],
    shopping: ['Darjeeling tea — First Flush (March–April, most prized, floral), Second Flush (May–June, muscatel), Autumnal (October, earthy) at Nathmull\'s or Harrisons Agents', 'Tibetan handicrafts: prayer flags, thangkas, singing bowls at Chowk Bazaar', 'Woolen items: Nepali sweaters, caps, gloves', 'Khukri knives (traditional Gurkha knife — ₹300–2,000)', 'Silver jewelry in Nepali designs'],
    culture: 'Darjeeling\'s culture is a fascinating mix of Nepali, Tibetan, Lepcha, and Bengali traditions. The Gorkha community (dominant ethnicity) celebrates festivals like Dashain, Tihar, and the unique Gorkha solidarity events. The 1986 Gorkhaland movement shaped the region\'s modern political identity. Monasteries and temples dot every hilltop.',
    festivals: ['Autumn Fair / Darjeeling Carnival (October — cultural events at Chowrasta)', 'Dashain and Tihar (October/November — Nepali Hindu festivals, the city is decorated with lights)', 'Losar (Tibetan New Year, February — monastic celebrations at Ghoom)', 'Buddha Jayanti (April/May — celebrations at Ghoom and Mahabodhi monasteries)'],
    hotels: ['Glenburn Tea Estate (Luxury, ₹25,000–40,000, all-inclusive — tea estate bungalow)', 'The Elgin Darjeeling (Heritage, ₹8,000–15,000 — colonial-era property, Nehru stayed here)', 'Cedar Inn (Heritage, ₹5,000–9,000, great Kanchenjunga view)', 'Hotel Sinclair\'s Darjeeling (3-star, ₹4,000–8,000)', 'Hotel Revolver (Budget, ₹1,500–3,000, near Mall Road)', 'Zostel Darjeeling (Hostel, ₹400–600)'],
    restaurants: ['Glenary\'s (Bakery, restaurant, bar — a Darjeeling institution since 1935, ₹300–800)', 'Kunga Restaurant (Tibetan food, momos, thukpa, ₹150–350)', 'Sonam\'s Kitchen (Local food, small and authentic, ₹150–300)', 'Frank Ross Café (Colonial, ₹200–500)', 'Penang Restaurant (Chinese-Tibetan, ₹200–500)', 'Joey\'s Pub (Best drinks and music, ₹200–600)'],
    travelTips: ['Pre-book the Toy Train Joy Ride online (irctc.co.in) — it sells out quickly in season.', 'Tiger Hill: pre-book a shared jeep the evening before from your hotel. Clear days are Oct–Nov and Mar–Apr.', 'Buy tea at Nathmull\'s only — most other shops sell inferior or blended teas at premium prices.', 'Carry warm layers even in summer — evenings at 2,042 m can be cold.', 'Beware of car-booking touts — use government-recommended taxi stands.'],
    packingTips: ['Heavy jacket (cold year-round)', 'Comfortable walking shoes (steep hill town)', 'Warm gloves and hat', 'Rain poncho (monsoon)', 'Small daypack'],
    weather: 'Spring (Mar–May): 8–20°C — rhododendrons bloom, best tea flush, moderate crowds. Monsoon (Jun–Sep): 15–20°C, heavy rain, misty views. Autumn (Oct–Nov): 8–18°C, crystal clear, Kanchenjunga visible daily — best time. Winter (Dec–Feb): 2–12°C, frost possible, sometimes snow.',
    transport: 'By Air: Bagdogra Airport (90 km, 3 hrs). By Rail: New Jalpaiguri (88 km, 3 hrs by shared jeep); Toy Train from NJP (8 hrs). By Road: Shared jeep from NJP (₹250, 3.5 hrs), from Siliguri (₹150, 2.5 hrs). Within Darjeeling: Walking (town is compact), shared jeeps (₹20–100).',
    itineraries: [
      { type: '3 Day', durationDays: 3, estimatedCost: 9000, days: [
        { day: 1, activities: [
          { time: '11:00 AM', activity: 'Arrive & settle in', description: 'Check into hotel. Short walk to Chowrasta (main promenade). Views of Kanchenjunga on clear days.', costEstimate: 0 },
          { time: '02:00 PM', activity: 'Happy Valley Tea Estate', description: 'Tour the estate and factory. Tea tasting of three grades.', costEstimate: 100 },
          { time: '04:30 PM', activity: 'Nathmull\'s Tea Shop', description: 'Buy premium Darjeeling first flush and second flush tea.', costEstimate: 500 },
          { time: '07:00 PM', activity: 'Dinner at Glenary\'s', description: 'Warm restaurant with great food and hot Darjeeling tea. Try the mushroom on toast.', costEstimate: 500 }
        ]},
        { day: 2, activities: [
          { time: '04:00 AM', activity: 'Tiger Hill Sunrise (pre-book jeep)', description: 'Drive 11 km in the dark. Arrive for the sunrise — Kanchenjunga lit gold is unforgettable.', costEstimate: 400 },
          { time: '07:30 AM', activity: 'Batasia Loop', description: 'On the way back, stop at the spiral railway loop with a war memorial.', costEstimate: 50 },
          { time: '09:00 AM', activity: 'Ghoom Monastery (Yiga Choling)', description: 'Tibet-style monastery with 5m Maitreya statue. Morning prayers if available.', costEstimate: 50 },
          { time: '11:00 AM', activity: 'Toy Train Joy Ride to Ghoom', description: 'Board the steam Toy Train at Darjeeling station. Ride to Ghoom and back through tea gardens.', costEstimate: 1400 },
          { time: '02:00 PM', activity: 'Himalayan Mountaineering Institute', description: 'Museum dedicated to Tenzing Norgay and Everest. Oldest climbing school in India.', costEstimate: 200 },
          { time: '05:00 PM', activity: 'Chowrasta Promenade', description: 'Evening walk on the main promenade. Horse riding, pony rides (₹150/circuit).', costEstimate: 150 }
        ]},
        { day: 3, activities: [
          { time: '09:00 AM', activity: 'Padmaja Naidu Zoo', description: 'See snow leopards, red pandas, Himalayan wolves.', costEstimate: 60 },
          { time: '12:00 PM', activity: 'Momo and thukpa lunch', description: 'Kunga Restaurant — best Tibetan food in town.', costEstimate: 200 },
          { time: '02:00 PM', activity: 'Shopping: Tibetan crafts and tea', description: 'Prayer flags, singing bowls, woolen caps, final tea purchases.', costEstimate: 1000 },
          { time: '04:00 PM', activity: 'Depart for NJP', description: 'Shared jeep to New Jalpaiguri for train to Kolkata or elsewhere.', costEstimate: 250 }
        ]}
      ]}
    ]
  },
  {
    id: 'hampi-01', slug: 'hampi', name: 'Hampi', state: 'Karnataka', country: 'India',
    category: 'Culture', budget: 'Budget', rating: 4.7, reviewCount: 35000,
    coordinates: { lat: 15.3350, lng: 76.4600 }, altitude: 467,
    coverImage: 'https://images.unsplash.com/photo-1590322246756-37d7ae12b736?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1606987482048-c6826204b417?w=800&q=80','https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&q=80'],
    description: 'Hampi is an extraordinary UNESCO World Heritage Site on the banks of the Tungabhadra River in Karnataka — the ruins of Vijayanagara, the capital of the greatest Hindu empire of medieval India (14th–16th century). The landscape is lunar and surreal: 26 sq km of massive granite boulders, palm groves, banana plantations, and over 1,600 architectural remains including temples, market streets, elephant stables, and royal pavilions. Once the world\'s second largest medieval city (after Peking), Hampi was sacked by a confederacy of Deccan Sultanates in 1565 and never rebuilt.',
    history: 'Vijayanagara Empire was founded in 1336 by Harihara I and Bukka Raya I. At its peak under Krishnadevaraya (1509–1529), Vijayanagara was one of the wealthiest and most powerful empires in the world, with a population of 500,000 in the capital. Portuguese explorer Fernão Nunes described it as "as large as Rome." In 1565, the Battle of Talikota ended the empire — the Deccan Sultanates sacked the city for 6 months, dismantling what couldn\'t be carried. The ruins were inscribed as a UNESCO World Heritage Site in 1986.',
    bestSeason: 'October to February. Avoid March–May (very hot, 38°C+). Monsoon (June–September) makes some areas inaccessible.',
    idealDuration: '2–3 days',
    temperature: '15°C (winter nights) to 40°C (summer)',
    nearestAirport: 'Hubli Airport (HBX) — 150 km from Hampi. Bengaluru Kempegowda Airport — 350 km.',
    nearestRailwayStation: 'Hospet Junction (13 km from Hampi) — trains from Bengaluru (Hampi Express, overnight 10 hrs)',
    nearestBusStand: 'Hospet Bus Stand (13 km); local buses and autos to Hampi Bazaar',
    tags: ['Vijayanagara', 'Ruins', 'UNESCO', 'Boulders', 'Heritage', 'Medieval India'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 5, luxuryScore: 3, budgetScore: 9,
    topAttractions: [
      { name: 'Virupaksha Temple', description: 'A functioning 7th-century Hindu temple dedicated to Lord Virupaksha (Shiva) — continuously worshipped for over 1,300 years despite the fall of the empire. The 52-metre gopuram (tower) is Hampi\'s most recognizable landmark. The temple elephant Lakshmi blesses devotees. Entry: ₹50 (foreign). Open 6 AM–1 PM, 5 PM–9 PM.', location: 'Hampi Bazaar (center of ruins)' },
      { name: 'Vittala Temple Complex', description: 'The architectural masterpiece of Vijayanagara — built in the 16th century for Lord Vittala (Vishnu). Famous for the Stone Chariot (an immovable granite chariot with wheels that turn) and the musical pillars that produce musical notes when tapped. The temple\'s corbelled ceilings and ornate pillars are extraordinarily detailed. Entry included in ruins ticket: ₹40 (Indian), ₹600 (foreign). 1 km from Hampi Bazaar (electric bus ₹20).', location: '3 km east of Hampi Bazaar' },
      { name: 'The Royal Enclosure & Lotus Mahal', description: 'The royal quarter of Vijayanagara — a walled compound with the Mahanavami Dibba (a massive ceremonial platform), Hazara Rama Temple (with narrative reliefs of the Ramayana), and the elegant Lotus Mahal (a pavilion of intersecting arches that was possibly a palace for royal women). Also houses the Elephant Stables — 11 chambers for the royal war elephants.', location: '2 km from Hampi Bazaar' },
      { name: 'Hemakuta Hill Temples', description: 'A cluster of pre-Vijayanagara temples (9th–13th century) on a rocky hill with a panoramic view of Hampi and the Virupaksha Temple. The best sunset viewpoint in Hampi — the temples glow golden and the boulders turn crimson. Excellent for photography.', location: 'Adjacent to Hampi Bazaar' },
      { name: 'Tungabhadra River & Coracle Ride', description: 'The sacred river that flows through Hampi, separating the historic ruins (south bank) from the laid-back hippie village of Virupapur Gaddi/Hippie Island (north bank). Traditional round coracles (circular wicker and tar boats, ₹30–50 per crossing) ferry travelers across. Evening sunsets on the river among the boulders are magical.', location: 'Throughout Hampi ruins' },
      { name: 'Achyutaraya Temple', description: 'A partially intact 16th-century temple complex with impressive stone pillars, carved elephant friezes, and a massive market street (bazaar) lined by columns where merchants once sold goods during the empire. Less crowded than Vittala, equally impressive.', location: '1 km from Hampi Bazaar' }
    ],
    activities: ['Cycling through ruins (rent bicycle ₹100/day — best way to explore)', 'Coracle crossing to Hippie Island on Tungabhadra', 'Sunrise/sunset at Hemakuta Hill (free)', 'Bouldering (Hampi is a world-class bouldering destination — hundreds of routes)', 'Swimming in natural pools at Sanapur Lake and Hippie Island', 'Cliff jumping at Sanapur Lake (₹50)', 'Hot spring visit at Shiva Temple area', 'Photography walk through the bazaar ruins'],
    localFood: ['Karnataka thali (rice, sambar, rasam, dry vegetables, curd, papad — served on banana leaf)', 'Bisi Bele Bath (rice and lentil dish with spices)', 'Davangere Benne Dose (butter dosa — crispy dosa with lots of butter)', 'Jolada Rotti with Ennegayi (sorghum flatbread with stuffed eggplant)', 'Fresh sugarcane juice and coconut water (abundant in Hampi bazaar)', 'Banana fritters and sweet snacks at bazaar stalls'],
    shopping: ['Stone carvings and sculptures by local artisans (₹500–10,000)', 'Handicrafts from Hampi Bazaar stalls', 'Kasuti embroidery (Karnataka traditional needlework)', 'Lambani tribal jewelry and accessories', 'Postcards and Hampi photography books'],
    culture: 'Hampi\'s culture today is that of a living sacred site — the Virupaksha Temple has been worshipped continuously for over 1,000 years. The surrounding Kannada-speaking community maintains its agricultural traditions, the river crossing remains by coracle, and the bazaar still functions for local trade even as it did in the empire\'s day.',
    festivals: ['Hampi Utsav / Vijaya Utsava (November — 3-day cultural festival, music, dance, puppet shows, illuminated ruins)', 'Virupaksha Temple Chariot Festival (February/March — massive wooden chariot procession)', 'Shivaratri (February/March — night festival at Virupaksha)'],
    hotels: ['Evolve Back Hampi (Luxury, ₹25,000–50,000, island resort in the river — most unique hotel in Hampi)', 'Hyatt Place Hampi (5-star, ₹8,000–15,000, 3 km from ruins)', 'The Hampi Heritage Hotel (Budget, ₹1,200–2,500, near ruins)', 'Mowgli Guest House (Hippie Island, ₹400–800, bamboo huts)', 'Shanthi Guest House (Budget, ₹600–1,500, Hampi Bazaar area)'],
    restaurants: ['Laughing Buddha Restaurant (Multi-cuisine, riverside, ₹200–500, Virupapur Gaddi)', 'The Mango Tree Restaurant (Open-air, Hampi Bazaar, ₹200–500)', 'Gopi Restaurant (South Indian thali, ₹100–250)', 'Ravi Rose Restaurant (Budget, good banana pancake, ₹150–350)', 'Shanthi Restaurant (Clean vegetarian, ₹150–300, Hampi Bazaar)'],
    travelTips: ['Buy the composite ruins ticket (₹600 foreign) at Vittala or Hampi Bazaar — covers all ASI monuments.', 'Start early (before 8 AM) — ruins get very hot by midday. Carry 2+ litres of water.', 'A bicycle (₹100/day) is the best way to explore — the ruins are spread over 26 sq km.', 'Hippie Island (north bank) is more relaxed but requires a coracle crossing (₹30).', 'Bouldering: bring your own shoes or rent at local guesthouses. No formal operators needed.', 'Most guesthouses close during the monsoon (June–September).'],
    packingTips: ['Light cotton clothes', 'Sturdy walking shoes (uneven rocky terrain)', 'Sun hat (essential — direct sun on ruins)', 'Water bottle (2+ litres minimum)', 'Sunscreen SPF 50+', 'Torch/flashlight for exploring temples in low light'],
    weather: 'Winter (Oct–Feb): 15–28°C — ideal. Spring (Mar–Apr): 25–38°C. Summer (May–Jun): 35–42°C — very hot. Monsoon (Jul–Sep): 25–35°C, rain, but lush greenery around the ruins.',
    transport: 'By Rail: Hampi Express (overnight) from Bengaluru to Hospet (10 hrs, ₹250–700). By Bus: KSRTC from Bengaluru to Hospet (9 hrs, ₹300–500). From Hospet to Hampi: Local bus (₹15), auto (₹150–200). Within Hampi: Bicycle (₹100/day), autos (₹100–400 for ruin tours), electric buggies (₹20/km within Vittala area).',
    itineraries: [
      { type: '2 Day', durationDays: 2, estimatedCost: 5000, days: [
        { day: 1, activities: [
          { time: '06:30 AM', activity: 'Hemakuta Hill Sunrise', description: 'Walk up before sunrise. Watch the ruins and boulders glow gold in the early light.', costEstimate: 0 },
          { time: '08:00 AM', activity: 'Virupaksha Temple', description: 'Visit the functioning temple. Watch the elephant Lakshmi being bathed.', costEstimate: 50 },
          { time: '09:30 AM', activity: 'Vittala Temple Complex (electric buggy)', description: 'The architectural crown jewel. Musical pillars, stone chariot. Allow 2 hours.', costEstimate: 640 },
          { time: '12:00 PM', activity: 'Shade lunch at Mango Tree', description: 'Open-air restaurant under a giant mango tree by the river. Karnataka thali.', costEstimate: 250 },
          { time: '02:00 PM', activity: 'Achyutaraya Temple & bazaar', description: 'Explore the column-lined bazaar street and the ornate temple complex.', costEstimate: 0 },
          { time: '05:00 PM', activity: 'Hemakuta Hill Sunset', description: 'Best sunset view in Hampi. Golden hour on ancient boulders.', costEstimate: 0 },
          { time: '07:30 PM', activity: 'Dinner and stay at Hippie Island', description: 'Cross by coracle for dinner at Laughing Buddha. Consider staying on the island.', costEstimate: 400 }
        ]},
        { day: 2, activities: [
          { time: '08:00 AM', activity: 'Royal Enclosure by bicycle', description: 'Cycle to the royal quarter — Lotus Mahal, Elephant Stables, Mahanavami Dibba.', costEstimate: 100 },
          { time: '10:30 AM', activity: 'Hazara Rama Temple', description: 'Narrative frieze carvings of the Ramayana on the outer walls — extraordinary detail.', costEstimate: 0 },
          { time: '12:00 PM', activity: 'Sanapur Lake', description: 'Swim in the natural lake, cliff jumping (₹50). Hippie vibe, relaxed morning.', costEstimate: 50 },
          { time: '03:00 PM', activity: 'Bouldering session', description: 'Hampi\'s granite boulders are world-class. Try V1–V3 routes with friends.', costEstimate: 0 },
          { time: '06:00 PM', activity: 'Depart for Hospet', description: 'Auto to Hospet for overnight train to Bengaluru.', costEstimate: 200 }
        ]}
      ]}
    ]
  },
  {
    id: 'jaisalmer-01', slug: 'jaisalmer', name: 'Jaisalmer', state: 'Rajasthan', country: 'India',
    category: 'Adventure', budget: 'Mid-range', rating: 4.7, reviewCount: 42000,
    coordinates: { lat: 26.9157, lng: 70.9083 }, altitude: 225,
    coverImage: 'https://images.unsplash.com/photo-1519832979-6fa011b87667?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1612551037001-8aadce265e72?w=800&q=80','https://images.unsplash.com/photo-1563638407-6b7c353ca9f9?w=800&q=80'],
    description: 'Jaisalmer — the "Golden City" — rises from the heart of the Thar Desert in western Rajasthan like a golden mirage. Built entirely of honey-yellow sandstone, the 12th-century fort (a living fort with 3,000 residents inside), the intricate havelis with lace-like jharokha windows, and the rolling golden sand dunes of Sam and Khuri create an otherworldly Arabian Nights atmosphere. It was a prosperous trading post on the ancient Silk Road, which explains the extraordinary wealth displayed in its carved merchant mansions.',
    history: 'Founded in 1156 by Rawal Jaisal of the Bhati Rajput clan on Trikuta Hill, Jaisalmer became a key caravansary on the Silk Road between India and Central Asia. The city\'s golden age was the 12th–17th centuries when merchant families like the Patwas amassed extraordinary wealth trading in opium, textiles, and camels. The city\'s fortunes declined after Bombay\'s port replaced the overland Silk Road trade routes.',
    bestSeason: 'November to February. Desert Safari: October–March. Avoid May–July (50°C). Desert Festival: February.',
    idealDuration: '3–4 days',
    temperature: '5°C (winter nights) to 50°C (summer)',
    nearestAirport: 'Jaisalmer Airport (JSA) — 15 km from city (limited flights from Delhi and Jaipur)',
    nearestRailwayStation: 'Jaisalmer Railway Station — daily trains from Delhi (11–12 hrs overnight)',
    nearestBusStand: 'Jaisalmer Bus Stand (near Old City)',
    tags: ['Desert', 'Sand Dunes', 'Camel Safari', 'Fort', 'Havelis', 'Silk Road'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 7, luxuryScore: 6, budgetScore: 6,
    topAttractions: [
      { name: 'Jaisalmer Fort (Sonar Quila)', description: 'One of the world\'s largest living forts — a UNESCO tentative heritage site. Built in 1156, its 99 bastions rise 76 m from the desert plain. About 3,000 people still live inside the fort walls. Contains four royal palaces, multiple Jain temples (12th–16th century), and a maze of lanes with hotels, guesthouses, and shops. Entry: ₹50 (Indian), ₹250 (foreign). Open 9 AM–5 PM (fort museum).', location: 'Trikuta Hill, city center' },
      { name: 'Sam Sand Dunes & Camel Safari', description: 'The most dramatic dunes in the Thar Desert — 40 km from Jaisalmer. Star-shaped dunes up to 30 m high, especially beautiful at sunset when the shadows shift and the dunes glow orange. Camel safari (₹300–800/1 hour) followed by folk music and dance at sunset, overnight camp under Milky Way stars (₹2,500–8,000 with dinner). Best experience in Rajasthan.', location: 'Sam village, 40 km west of Jaisalmer' },
      { name: 'Patwon Ki Haveli', description: 'The largest and most elaborate haveli in Jaisalmer — a cluster of 5 interconnected mansions built by merchant Guman Chand Patwa and his sons (1800–1860). The intricate jharokha windows and carved facades are astonishing — over 60 individual windows, each different. Entry: ₹100. Open 9 AM–5 PM.', location: 'Old City, Patwa Gali' },
      { name: 'Khuri Sand Dunes', description: 'An alternative to Sam, Khuri offers quieter, more accessible small dunes 48 km from Jaisalmer in an authentic desert village. Less crowded, more authentic camel safari experience. Folk performances in village settings. No large tourist camps — more intimate.', location: '48 km southwest of Jaisalmer' },
      { name: 'Gadisar Lake', description: 'A historic 14th-century man-made reservoir that once supplied the entire city\'s water. Beautiful ghats, temples, chattris (cenotaphs), and a gateway. Migratory birds in winter. Boating available (₹100). Particularly photogenic at sunrise and sunset when the sandstone reflects in the water.', location: '1.5 km from city center' }
    ],
    activities: ['Overnight camel safari in Sam/Khuri dunes (₹2,500–8,000)', 'Sunset camel ride at Sam dunes (₹300–800)', 'Jeep safari in Thar Desert to ghost village of Kuldhara (₹800–1,500)', 'Hot air ballooning over desert (₹8,000–12,000, Nov–Feb)', 'Sand dune sandboarding (₹200 at Sam dunes)', 'Desert camping under Milky Way stars', 'Photography walk through old fort lanes at dawn', 'Haveli architectural tour with guide (₹300)'],
    localFood: ['Dal Baati Churma (Rajasthani staple — especially good in Jaisalmer dhabas near fort)', 'Ker Sangri (wild desert berries cooked with dried beans — unique to Thar desert)', 'Mutton Laal Maas (fiery Marwari lamb curry)', 'Rabri (thickened sweetened milk)', 'Bajre ki Roti with Lahsun Chutney (pearl millet flatbread with garlic chutney — desert staple)', 'Ghotua Laddoo (wheat flour sweet)', 'Desert herbs tea and camel milk at dunes camps'],
    shopping: ['Bandhani and Leheriya fabric (₹500–5,000)', 'Embroidered camel leather goods: bags, shoes, wallets', 'Rajasthani Meenakari silver jewelry', 'Spices from the old city bazaars', 'Wooden puppets (Kathputli)', 'Antique stone carvings from fort areas (though export of antiques is regulated)'],
    culture: 'Jaisalmer is the heartland of Marwari trading culture — its havelis represent the display of merchant wealth accumulated through the Silk Road trade. The Bhati Rajput heritage is preserved in the fort. The local Langa and Manganiyar communities are hereditary Muslim musicians who have preserved the desert folk music tradition for centuries.',
    festivals: ['Desert Festival (February — 3-day festival at Sam dunes: camel races, turban tying, gair dance, Mr. Desert competition)', 'Diwali at the Golden Fort (November — the fort is spectacularly lit)', 'Gangaur (March/April — women\'s festival)'],
    hotels: ['Suryagarh (5-star, ₹15,000–40,000, best in Jaisalmer with desert setting)', 'Hotel Garh Jaisal (Boutique fort hotel inside the fort, ₹4,000–8,000)', 'Nachana Haveli (Heritage, ₹3,000–6,000)', 'Hotel Fifu (Budget, ₹600–1,200, near fort)', 'Sam Dunes Desert Camp (Deluxe tents, ₹3,500–8,000 with meals and camel safari)'],
    restaurants: ['Saffron Restaurant (Best rooftop fort view, excellent dal baati churma, ₹400–900)', '8 July Restaurant (Rooftop, ₹300–700, near Patwon Ki Haveli)', 'Trio Restaurant (Reliable, multi-cuisine, ₹300–700, Gandhi Chowk)', 'Jaisal Italy (Pizza and pasta near fort, ₹300–600)', 'Bhang Shop (Governent-certified bhang lassi and thandai, ₹50–150 — cultural experience)'],
    travelTips: ['Book your desert camp 24–48 hrs in advance in peak season (Dec–Jan).', 'Sam dunes get crowded at sunset — Khuri dunes are quieter and more authentic.', 'Negotiate camel safari prices firmly — starting price is usually 2x.', 'Fort walls are crumbling — the UNESCO-cited heritage drainage problem means some sections are restricted.', 'Carry cash — very limited ATM access at Sam or Khuri dunes.', 'The Jain temples inside the fort are not to be missed — some of the finest carved stone in Rajasthan.'],
    packingTips: ['Full-sleeve light cotton (sun protection in desert)', 'Sunglasses and sun hat (mandatory)', 'Scarf (for dust/sand)', 'Warm layers (desert nights are cold Oct–Feb)', 'Comfortable sandals and closed shoes for fort walks'],
    weather: 'Winter (Oct–Feb): 5–25°C days, 0–8°C nights — ideal for desert camping. Spring (Mar–Apr): 25–40°C. Summer (May–Jun): 40–50°C — avoid. Monsoon (Jul–Sep): 30–40°C, rare brief rains.',
    transport: 'By Rail: Jaisalmer Station — Delhi Sarai Rohilla to Jaisalmer (11 hrs, ₹400–1,400). By Air: Jaisalmer Airport (Delhi 2 hrs, limited flights). By Bus: From Jodhpur (6 hrs), Jaipur (8 hrs). Within city: Cycle rickshaws, autos, jeep rentals for dune trips.',
    itineraries: [
      { type: '3 Day', durationDays: 3, estimatedCost: 10000, days: [
        { day: 1, activities: [
          { time: '09:00 AM', activity: 'Jaisalmer Fort exploration', description: 'Walk the fort\'s lanes, visit Raj Mahal museum and Jain temples. Allow 2–3 hours.', costEstimate: 250 },
          { time: '12:30 PM', activity: 'Patwon Ki Haveli', description: 'The most ornate merchant mansion in Rajasthan.', costEstimate: 100 },
          { time: '02:30 PM', activity: 'Gadisar Lake', description: 'Serene reservoir with temples and cenotaphs. Boat ride.', costEstimate: 100 },
          { time: '04:00 PM', activity: 'Desert Heritage Museum', description: 'Good introduction to Jaisalmer history and Thar Desert ecology.', costEstimate: 100 },
          { time: '07:00 PM', activity: 'Dinner at Saffron Restaurant', description: 'Rooftop with fort view. Dal baati churma and laal maas.', costEstimate: 700 }
        ]},
        { day: 2, activities: [
          { time: '04:00 PM', activity: 'Depart for Sam Sand Dunes', description: 'Jeep to Sam (40 km). Arrive for pre-sunset golden hour.', costEstimate: 1500 },
          { time: '05:30 PM', activity: 'Camel Safari at sunset', description: 'Ride a camel through the dunes at sunset. The golden light is extraordinary.', costEstimate: 800 },
          { time: '07:00 PM', activity: 'Folk music and campfire', description: 'Langas and Manganiyars perform traditional desert music. Dinner at camp.', costEstimate: 3500 },
          { time: '10:00 PM', activity: 'Stargazing in the Thar Desert', description: 'Zero light pollution — the Milky Way is clearly visible. One of India\'s best stargazing spots.', costEstimate: 0 }
        ]},
        { day: 3, activities: [
          { time: '06:00 AM', activity: 'Sunrise on the dunes', description: 'Desert dawn — the dunes turn amber pink. Most magical time of day.', costEstimate: 0 },
          { time: '09:00 AM', activity: 'Return to Jaisalmer + Kuldhara ghost village', description: 'Jeep stop at the abandoned 1300s village, cursed to be uninhabited.', costEstimate: 500 },
          { time: '12:00 PM', activity: 'Shopping in bazaars', description: 'Bandhani fabric, embroidered camel leather goods, spices.', costEstimate: 1500 },
          { time: '04:00 PM', activity: 'Departure', description: 'Evening train or bus to Jodhpur or Jaipur.', costEstimate: 0 }
        ]}
      ]}
    ]
  }
];

function writeDestination(dest) {
  const stateDir = path.join(OUTPUT_DIR, 'India', dest.state.replace(/[^a-zA-Z]/g, ''));
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(path.join(stateDir, `${dest.slug}.json`), JSON.stringify(dest, null, 2));
  console.log(`  ✅ ${dest.name}`);
}

console.log('📍 Writing Part 3 destinations...');
for (const dest of DESTINATIONS) writeDestination(dest);

const indexPath = path.join(OUTPUT_DIR, 'destinations-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const lookup = new Map(DESTINATIONS.map(d => [d.slug, d]));
const updated = index.map(e => {
  const d = lookup.get(e.slug);
  if (!d) return e;
  return { id: d.id, slug: d.slug, name: d.name, state: d.state, country: d.country, category: d.category, description: d.description.slice(0,250), rating: d.rating, reviewCount: d.reviewCount, idealDuration: d.idealDuration, bestSeason: d.bestSeason, budget: d.budget, coverImage: d.coverImage, tags: d.tags, familyFriendly: d.familyFriendly, coupleFriendly: d.coupleFriendly, soloFriendly: d.soloFriendly, adventureScore: d.adventureScore, hiddenGem: d.hiddenGem, coordinates: d.coordinates };
});
fs.writeFileSync(indexPath, JSON.stringify(updated, null, 2));
console.log(`\n✅ Part 3 complete: ${DESTINATIONS.length} destinations written.`);
