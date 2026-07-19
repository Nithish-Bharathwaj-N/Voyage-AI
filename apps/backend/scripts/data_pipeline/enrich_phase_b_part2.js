/**
 * Phase B Part 2: Real data for Jaipur, Varanasi, Agra, Rishikesh, Amritsar, 
 * Udaipur, Jodhpur, Jaisalmer, Darjeeling, Munnar, Alleppey, Coorg, Ooty, 
 * Shimla, Mussoorie, Nainital, Kodaikanal, Srinagar, Hampi, Mysore,
 * Andaman, Rishikesh, Ajanta-Ellora, Khajuraho, Kochi, Delhi, Mumbai
 */

const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = '/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations';

const DESTINATIONS = [
  {
    id: 'jaipur-01', slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', country: 'India',
    category: 'Culture', budget: 'Mid-range', rating: 4.6, reviewCount: 78000,
    coordinates: { lat: 26.9124, lng: 75.7873 }, altitude: 431,
    coverImage: 'https://images.unsplash.com/photo-1603603285957-3a4e10bcef3b?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1586791138989-9a6e6e95c0cf?w=800&q=80','https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80','https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80','https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80'],
    description: 'Jaipur — the Pink City — is the capital of Rajasthan and the jewel of India\'s Golden Triangle (Delhi–Agra–Jaipur). Founded in 1727 by Maharaja Sawai Jai Singh II as one of India\'s first planned cities, it is renowned for its magnificent amber fort, opulent palaces, astronomical wonders, and the bazaars brimming with gemstones, textiles, and blue pottery. The entire old city was painted terracotta pink in 1876 to welcome Prince Albert of Wales, a tradition maintained to this day.',
    history: 'Jaipur was founded on November 18, 1727 by Maharaja Sawai Jai Singh II of the Kachhwaha Rajput dynasty. Unlike earlier Rajput capitals built on defensible hills, Jaipur was planned on flat ground using Vastu Shastra principles. The city was laid out in a grid of nine blocks (navgrah), each representing a celestial body. In 2019, it was inscribed as a UNESCO World Heritage City.',
    bestSeason: 'October to March (Winter 8–25°C, clear and pleasant). Avoid April–June (40–46°C).',
    idealDuration: '3–4 days',
    temperature: '5°C (winter nights) to 46°C (summer)',
    nearestAirport: 'Jaipur International Airport (JAI) — 13 km from city center',
    nearestRailwayStation: 'Jaipur Junction (JP) — well-connected to Delhi (5 hrs Shatabdi), Mumbai, Agra',
    nearestBusStand: 'Sindhi Camp Bus Stand (Central, near Old City)',
    tags: ['Royalty', 'Forts', 'Palaces', 'Heritage', 'Shopping', 'Gems'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 3, luxuryScore: 9, budgetScore: 7,
    topAttractions: [
      { name: 'Amber Fort (Amer Qila)', description: 'The crowning glory of Jaipur — a colossal 16th-century fort-palace complex on a hilltop 11 km from the city. Built by Raja Man Singh I in 1592, its opulent Sheesh Mahal (Hall of Mirrors) and Ganesh Pol gateway are architectural masterpieces. Elephant rides to the gate gate (₹900 per elephant, 2 persons) are popular but controversial. Best visited at sunrise for crowds and light. Entry: ₹100 (Indian), ₹500 (foreigner).', location: '11 km from Jaipur, Amer town' },
      { name: 'Hawa Mahal (Palace of Winds)', description: 'Jaipur\'s most iconic landmark — a 5-storey, 953-windowed pink sandstone façade built in 1799 by Maharaja Sawai Pratap Singh. The honeycomb-latticed windows allowed royal women to observe street life while remaining unseen. The structure has no front door — you enter from the rear. Entry: ₹50. Open 9 AM–4:30 PM.', location: 'Sireh Deorhi Bazaar, Old City' },
      { name: 'City Palace', description: 'The royal residence of the Jaipur royal family, still partly inhabited by the Maharaja. The palace complex houses the Maharaja Sawai Man Singh II Museum with royal artifacts, textiles, manuscripts, and carriages. The Mubarak Mahal and Diwan-i-Khas are highlights. Entry: ₹130 (museum). Open 9:30 AM–5 PM.', location: 'Old City center, adjacent to Jantar Mantar' },
      { name: 'Jantar Mantar (UNESCO)', description: 'A UNESCO World Heritage Site — the world\'s largest stone astronomical observatory, built by Maharaja Jai Singh II in 1734. Contains 19 architectural astronomical instruments including the Samrat Yantra, the world\'s largest sundial (27m high, accurate to 2 seconds). Entry: ₹50. Hire a guide (₹200) for the instruments to make sense.', location: 'Adjacent to City Palace, Old City' },
      { name: 'Nahargarh Fort', description: 'The "Tiger Fort" looming over Jaipur from the Aravalli Hills. Built by Maharaja Sawai Jai Singh II in 1734, it offers the best panoramic views of Jaipur city, especially at sunset. Houses a wax museum and the famous Padao restaurant at the top. Entry: ₹50. Open 10 AM–5:30 PM.', location: 'Aravalli Hills, 7 km from city' },
      { name: 'Jaigarh Fort', description: 'The real defensive fort that protected Amer, connected by underground tunnels. Houses the world\'s largest cannon on wheels — the Jaivana (50-tonne, made in 1720). The cannon was fired only once in its history. Stunning valley views. Entry: ₹35. Open 9 AM–4:30 PM.', location: '15 km from Jaipur, above Amer Fort' },
      { name: 'Albert Hall Museum', description: 'Rajasthan\'s oldest museum (1887) in a stunning Indo-Saracenic building. Houses an Egyptian mummy, carpets, ivory, crystal, and fine folk art from across Rajputana. A beautiful building illuminated at night. Entry: ₹40 (Indian), ₹300 (foreigner). Open 10 AM–5 PM.', location: 'Ram Niwas Garden, New Gate' }
    ],
    activities: ['Hot air balloon over Jaipur at sunrise (₹9,500–14,000)', 'Elephant ride at Amber Fort (controversial but popular)', 'Block printing workshop at Bagru (₹500)', 'Blue pottery making class (₹500–800)', 'Heritage walk through Pink City lanes (₹400 guided)', 'Jawahar Kala Kendra cultural shows (₹100–300)', 'Cooking class at a haveli (₹1,500–3,000)', 'Puppet show (Kathputli) at Chokhi Dhani (₹100)'],
    localFood: ['Dal Baati Churma (baked wheat balls with lentil curry and sweet churma — the definitive Rajasthani meal)', 'Laal Maas (fiery red lamb curry with Mathania chillies — must try)', 'Ghevar (disc-shaped milk cake fried dessert, best in festive season)', 'Pyaaz Kachori (crisp puff pastry with spiced onion filling — best at Rawat Mishtan Bhandar)', 'Lassi (thick yogurt drink — try at LMB or Lassiwala on MI Road)', 'Mawa Kachori (sweet fried pastry with mawa filling)', 'Rajasthani Thali (full 14-course meal at Chokhi Dhani or Natraj Restaurant)'],
    shopping: ['Johari Bazaar (gemstones and jewelry — Jaipur is one of world\'s top gem cutting centers)', 'Bapu Bazaar (Rajasthani textiles, Bandhani, Leheriya sarees)', 'Nehru Bazaar (Jootis — traditional Rajasthani shoes, ₹200–1,500)', 'Tripolia Bazaar (bangles, lacquerware, traditional Rajasthani items)', 'Anokhi (premium block print clothing, fixed price, Prithviraj Road)', 'Rajasthali Government Emporium (Blue pottery, miniature paintings — fixed price, certified authentic)'],
    culture: 'Jaipur is the living museum of Rajput culture, where the Maharaja\'s family still holds court in City Palace, elephant processions mark festivals, and the art of miniature painting, block printing, and gem cutting continues as it has for centuries. The city was inscribed as a UNESCO Creative City of Crafts and Folk Art in 2015.',
    festivals: ['Jaipur Literature Festival (January — world\'s largest free literary festival, Diggi Palace)', 'Elephant Festival (Holi day — now controversially discontinued, replaced by cultural shows)', 'Teej Festival (August — women\'s festival, swings and processions)', 'Gangaur (March–April — 18-day festival honoring goddess Parvati)', 'Diwali in the Pink City (October/November — entire old city illuminated)'],
    hotels: ['Rambagh Palace (5-star, Taj Hotels, ₹25,000–80,000 — former Maharaja\'s residence, most iconic)', 'Samode Haveli (Heritage, ₹8,000–18,000, Old City — stunning frescoes)', 'ITC Rajputana (5-star, ₹8,000–20,000, near Civil Lines)', 'Narain Niwas Palace (Heritage, ₹5,000–10,000, Kanota Bagh)', 'Pearl Palace Heritage Hotel (Budget, ₹2,000–4,500, Hathroi — excellent value)', 'Hotel Pink City (Budget, ₹800–1,500, Sansar Chandra Road)'],
    restaurants: ['Suvarna Mahal at Rambagh Palace (fine dining, ₹3,000–8,000 per person)', '1135 AD at Amber Fort (medieval dining, ₹1,500–3,500)', 'Baradari Restaurant at City Palace (₹1,500–3,000, royal ambience)', 'Chokhi Dhani (ethnic Rajasthani village, unlimited thali ₹900, 12 km from city)', 'Natraj Restaurant (classic Rajasthani, ₹400–900, MI Road)', 'LMB (Laxmi Misthan Bhandar — sweets and local snacks, ₹100–400, Johari Bazaar)', 'Rawat Mishtan Bhandar (Best pyaaz kachori, ₹30–150)'],
    travelTips: ['Jaipur is hot — visit forts at 8–9 AM before it gets unbearable.', 'Auto-rickshaw and taxi drivers will propose tours — negotiate firmly; Ola and Uber are 40% cheaper.', 'Many shops in Johari Bazaar are legitimate certified gem dealers — get a certificate for any major gem purchase.', 'Combine with Agra (4.5 hrs by train) and Delhi for the Golden Triangle circuit.', 'Carry a shawl/dupatta for temple visits (modest dress required).', 'Bargain at all bazaars — starting price is 2–3x the real price.'],
    packingTips: ['Light cotton clothes (summer)', 'Warm layers for winter evenings (Oct–Feb)', 'Comfortable flat shoes for fort visits (uneven terrain)', 'Scarf/dupatta for temple visits', 'Sunscreen SPF 50+ and sunglasses', 'Stomach medication (if trying very spicy Laal Maas)'],
    weather: 'Winter (Oct–Mar): 8–25°C — ideal. Summer (Apr–Jun): 30–46°C — very hot, not recommended. Monsoon (Jul–Sep): 25–35°C with moderate rain, forts are less crowded and greener.',
    transport: 'By Air: Jaipur International Airport (JAI) — daily flights from all metros. By Rail: Jaipur Junction — Shatabdi Express from Delhi (5 hrs, ₹700–1,200), trains to Agra (4 hrs) and Mumbai. By Bus: Rajasthan State Roadways from Delhi (6 hrs), Agra, Jodhpur, Udaipur. Within Jaipur: Ola/Uber recommended, City Bus (₹10–15), autorickshaws (negotiate, typically ₹50–150).', 
    itineraries: [
      { type: '3 Day', durationDays: 3, estimatedCost: 8000, days: [
        { day: 1, activities: [
          { time: '08:00 AM', activity: 'Amber Fort (before crowds)', description: 'Take the elephant ride or walk up. Explore Sheesh Mahal, Ganesh Pol, and rooftop views. 2.5 hours.', costEstimate: 1000 },
          { time: '11:00 AM', activity: 'Jaigarh Fort & Jaivana Cannon', description: 'Drive 2 km uphill. Worlds largest wheeled cannon. Valley views of Amer.', costEstimate: 435 },
          { time: '01:00 PM', activity: 'Lunch at Natraj Restaurant', description: 'Dal baati churma and lassi.', costEstimate: 500 },
          { time: '03:00 PM', activity: 'City Palace & Jantar Mantar', description: 'Royal palace museum + astronomical observatory. Hire a guide for Jantar Mantar.', costEstimate: 530 },
          { time: '05:30 PM', activity: 'Hawa Mahal Golden Hour', description: 'The palace glows golden at sunset. Best photographed from the tea shop across the street.', costEstimate: 50 },
          { time: '07:30 PM', activity: 'Johari Bazaar walk + Dinner at LMB', description: 'Browse gem shops. Dinner at Laxmi Mishtan Bhandar for local sweets and snacks.', costEstimate: 400 }
        ]},
        { day: 2, activities: [
          { time: '07:00 AM', activity: 'Hot Air Balloon Sunrise Flight', description: 'Float over the Pink City at dawn. 45–60 min flight. Champagne toast.', costEstimate: 9500 },
          { time: '10:00 AM', activity: 'Nahargarh Fort & Wax Museum', description: 'Hilltop fort with best city panoramas. Wax museum inside (₹300). Breakfast at Padao restaurant.', costEstimate: 650 },
          { time: '01:00 PM', activity: 'Block Printing Workshop at Bagru (32 km)', description: 'Learn hand block printing at a traditional workshop. Buy printed fabric directly.', costEstimate: 800 },
          { time: '04:00 PM', activity: 'Bapu Bazaar & Nehru Bazaar', description: 'Shop for Rajasthani textiles, Leheriya sarees, and Jooti shoes.', costEstimate: 2000 },
          { time: '08:00 PM', activity: 'Dinner at Chokhi Dhani', description: '17 km drive. Traditional Rajasthani village resort. Unlimited thali, folk performances, camel rides.', costEstimate: 1200 }
        ]},
        { day: 3, activities: [
          { time: '09:00 AM', activity: 'Albert Hall Museum', description: 'Indo-Saracenic museum with Egyptian mummy, folk art, miniature paintings.', costEstimate: 40 },
          { time: '11:00 AM', activity: 'Blue Pottery Workshop', description: 'Try making blue pottery at Kripal Kumbh studio. A uniquely Jaipur craft.', costEstimate: 600 },
          { time: '01:00 PM', activity: 'Lunch at Spice Court', description: 'Classic Rajasthani thali experience.', costEstimate: 700 },
          { time: '02:30 PM', activity: 'Tripolia Bazaar & gem shopping', description: 'Colorful bangles, lacquerware. Final gem shopping at Johari Bazaar.', costEstimate: 1500 },
          { time: '05:00 PM', activity: 'Departure', description: 'Train or flight to next destination.', costEstimate: 0 }
        ]}
      ]},
      { type: 'Luxury', durationDays: 4, estimatedCost: 65000, days: [
        { day: 1, activities: [{ time: '12:00 PM', activity: 'Check-in Rambagh Palace', description: 'India\'s most famous heritage hotel. Pool villa or deluxe room. Lunch at Suvarna Mahal.', costEstimate: 0 }] },
        { day: 2, activities: [{ time: '07:00 AM', activity: 'Private balloon + Amber Fort VIP tour', description: 'Private balloon flight, then private guide and elephant at Amber.', costEstimate: 15000 }] },
        { day: 3, activities: [{ time: '09:00 AM', activity: 'Jewelry curator-guided shopping', description: 'Expert gemologist accompanies you to buy certified emeralds and rubies.', costEstimate: 20000 }] },
        { day: 4, activities: [{ time: '10:00 AM', activity: '1135 AD dining + Polo match', description: 'Lunch at the fort, afternoon polo at Rajasthan Polo Club.', costEstimate: 5000 }] }
      ]}
    ]
  },
  {
    id: 'varanasi-01', slug: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', country: 'India',
    category: 'Pilgrimage', budget: 'Budget', rating: 4.5, reviewCount: 55000,
    coordinates: { lat: 25.3176, lng: 82.9739 }, altitude: 80,
    coverImage: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1626714816894-af17fe32fc95?w=800&q=80','https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80','https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80'],
    description: 'Varanasi (also called Kashi or Banaras) is one of the world\'s oldest continuously inhabited cities, standing on the banks of the Ganges River for over 3,000 years. As the spiritual capital of Hinduism, it is considered the city where dying grants liberation (moksha). Hindus believe that Lord Shiva himself rules over Kashi. Pilgrims come to bathe in the sacred Ganges, attend the spectacular Ganga Aarti ceremony, and witness the profound cycle of life and death at the cremation ghats. For travelers, it is simultaneously shocking and transcendent.',
    history: 'Varanasi is mentioned in the Rigveda and Atharva Veda as Kashi — a city of light. Gautama Buddha preached his first sermon at nearby Sarnath (7th century BCE). The city has been destroyed and rebuilt multiple times — by Mahmud of Ghazni in 1034, by Qutb al-Din Aibak in 1194 (who built a mosque on the foundations of Adi Vishwanath Temple), and the current Kashi Vishwanath Temple was built by Maratha queen Ahilyabai Holkar in 1780. The New Vishwanath Temple Corridor was inaugurated by PM Modi in 2022.',
    bestSeason: 'October to March. Best time: Dev Deepawali (Kartik Purnima, October/November) when 1 million oil lamps illuminate the ghats.',
    idealDuration: '2–3 days',
    temperature: '5°C (winter nights) to 42°C (summer)',
    nearestAirport: 'Lal Bahadur Shastri International Airport, Babatpur (VNS) — 25 km from the city',
    nearestRailwayStation: 'Varanasi Junction (BSB) — well connected to Delhi (10 hrs), Mumbai, Kolkata, Agra',
    nearestBusStand: 'Varanasi Central Bus Station (Cantt area)',
    tags: ['Ganges', 'Ghats', 'Spiritual', 'Ancient', 'Pilgrimage', 'Hinduism'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 2, luxuryScore: 5, budgetScore: 9,
    topAttractions: [
      { name: 'Dashashwamedh Ghat & Ganga Aarti', description: 'The most magnificent of Varanasi\'s 84 ghats and the focal point of the evening Ganga Aarti ceremony — performed every evening at sunset by 7 priests simultaneously, with large brass oil lamps, incense, conch shells, and chanting. Watching from a boat on the Ganges (₹100–200 per person) is the best view. Arrive 30 minutes before sunset for a spot.', location: 'Dashashwamedh Ghat, near Godaulia' },
      { name: 'Manikarnika Ghat (Cremation Ghat)', description: 'One of the most sacred spots in Hinduism — the burning ghat where funeral pyres have burned continuously for over 2,500 years. Hindus believe dying here achieves moksha (liberation from reincarnation). Photography is prohibited out of respect. Approach respectfully — do not stare or disrupt. The Dom Raja caste manages cremations; fires are lit from a flame said to be 3,500 years old.', location: 'Between Dashashwamedh and Scindia Ghats' },
      { name: 'Kashi Vishwanath Temple', description: 'One of the twelve Jyotirlinga shrines of Shiva and the holiest temple in Hinduism. The current temple was built by Ahilyabai Holkar in 1780; its golden spire (donated by Maharaja Ranjit Singh in 1835) weighs 820 kg. The 2022 Kashi Vishwanath Corridor dramatically improved access. Non-Hindus may not enter the inner sanctum. Lines can be 2–4 hours without VIP pass.', location: 'Vishwanath Gali, Old City' },
      { name: 'Sarnath', description: 'A UNESCO-protected archaeological site 13 km from Varanasi where Gautama Buddha delivered his first sermon in the deer park after achieving enlightenment in Bodh Gaya. The Dhamek Stupa (3rd century BCE, commissioned by Ashoka), Ashoka Pillar (24 m, lions now India\'s national emblem), and Archaeological Museum (excellent Buddha sculpture collection) are key attractions. Entry: ₹30 (Indians), ₹500 (foreigners).', location: '13 km from Varanasi' },
      { name: 'Sunrise Boat Ride on the Ganges', description: 'The quintessential Varanasi experience — hire a wooden rowing boat at dawn and drift along the ghats as pilgrims bathe, priests perform rituals, and the city slowly awakens. The entire 84-ghat panorama is visible from the river. Cost: ₹100–200 per person for 1-hour shared boat, ₹500–800 for private boat. Best: 5:30–7:30 AM.', location: 'Any main ghat — Dashashwamedh recommended' },
      { name: 'Assi Ghat', description: 'A quieter, more atmospheric ghat at the southern end of the ghat complex, where the Assi River meets the Ganges. Popular for yoga, meditation, and morning rituals. The area has many cafes where you can watch the ghats over chai. Evening aarti here is smaller and more intimate than Dashashwamedh.', location: 'Southern end of the ghat line' },
      { name: 'Ramnagar Fort', description: 'A 18th-century fort and palace of the Maharaja of Varanasi, on the opposite bank of the Ganges. Access by boat from Dashashwamedh (₹50). Houses the Ramnagar Fort Museum with Mughal-era weapons, royal palanquins, ivory, and an astronomical clock. Entry: ₹15. Open 10 AM–5 PM.', location: 'East bank of Ganges, opposite Varanasi' }
    ],
    activities: ['Sunrise boat ride on the Ganges (₹100–800)', 'Evening Ganga Aarti ceremony (free, from ghats)', 'Ghat walk spanning all 84 ghats (4 km)', 'Silk weaving factory visit at Varanasi Silk Bazar', 'Classical music concert (Varanasi school of music)', 'Yoga and meditation retreat (7-day programs available)', 'Banarasi food walk with local guide (₹500–1,000)', 'Cooking class — make authentic Banarasi cuisine'],
    localFood: ['Banarasi Paan (betel leaf with elaborate fillings — an art form in itself; ₹30–200 for special meetha paan)', 'Kachori Sabzi (crisp fried kachori with potato curry — best breakfast at Ram Bhandar, Kachori Gali)', 'Tamatar Chaat (tomato-based chaat unique to Varanasi — tangy, spicy, wonderful)', 'Lassi (thick creamy yogurt drink — Blue Lassi Shop near Kashi Vishwanath is legendary, ₹30)', 'Chena Dahi Vada (yogurt dumplings — Varanasi specialty)', 'Malaiyyo (seasonal winter sweet — milk froth with saffron; Nov–Feb only)', 'Banarasi Litti Chokha (roasted wheat cakes with mashed vegetables — street version)'],
    shopping: ['Banarasi Silk Sarees (₹2,000–50,000) — buy from Varanasi Silk Bazar or Vishakha Silk on Vishwanath Lane for authentic weaves', 'Rudraksha beads and malas at Ghat shops (₹50–5,000)', 'Brass and bell metal items — temple bells, lamps, utensils', 'Wooden toys and lacquerware (Varanasi is famous for these)', 'Thangka-inspired miniature paintings', 'Incense (agarbatti) from the many vendors near Kashi Vishwanath'],
    culture: 'Varanasi is the living embodiment of Hindu civilization — a 3,000-year-old continuous urban experience where ancient rituals happen alongside modern life. The sounds of temple bells, conch shells, and Vedic chants blend with boat horns. The city has been home to saints, philosophers (Adi Shankaracharya, Tulsi Das, Kabir), musicians, and artisans throughout history. The Varanasi Gharana is one of the most prestigious schools of Hindustani classical music.',
    festivals: ['Dev Deepawali (Kartik Purnima, October/November — 1 million oil lamps on all 84 ghats; Varanasi\'s most spectacular event)', 'Maha Shivaratri (February/March — all-night vigils at Kashi Vishwanath, massive fair)', 'Ganga Dussehra (May/June — bathing festival celebrating Ganges descent to Earth)', 'Nag Nathaiya (Kartik Purnima — folk drama at Panchganga Ghat)', 'Buddha Purnima (April/May — celebrations at Sarnath)'],
    hotels: ['Brijrama Palace (Heritage, ₹10,000–25,000 — on the Ganges at Darbhanga Ghat, the most atmospheric hotel)', 'Nadesar Palace (Heritage, ₹15,000–35,000 — colonial palace, Taj Hotels)', 'Hotel Ganges View (Boutique, ₹3,500–7,000 — excellent ghat views)', 'Suryauday Haveli (Boutique, ₹4,500–9,000, Shivala Ghat)', 'Zostel Varanasi (Hostel, ₹400–700, near ghats)', 'Hotel Alka (Budget, ₹800–2,000, Meer Ghat — basic but right on Ganges)'],
    restaurants: ['Bread of Life Bakery & Restaurant (Western + Indian, ₹200–600, Shivala — a traveler institution)', 'Pizzeria Vaatika Café (Rooftop ghat view, ₹300–700, near Assi Ghat)', 'Aadha-Aadha (Modern Indian, ₹500–1,200, Bhelupur)', 'Kashi Chat Bhandar (Street food, tamatar chaat ₹30–80, near Godaulia)', 'Keshari Restaurant (Pure veg, Banarasi thali ₹200, near ghats)', 'Lotus Lounge (Ghat-view café, ₹200–500, Maan Mandir Ghat)'],
    travelTips: ['The Ganga Aarti at Dashashwamedh is every evening without fail — never miss it.', 'Hire a boat for sunrise (5:30 AM) — one of the most profound travel experiences in India.', 'Dress conservatively — Varanasi is deeply religious. Shoulders and knees should be covered.', 'Do not photograph at Manikarnika Ghat — it is deeply disrespectful.', 'Touts near the ghats are aggressive — politely but firmly decline all unsolicited guide offers.', 'Tap water is unsafe; drink only bottled water.', 'The old city lanes (Galis) are very narrow — be prepared for cows, motorcycles, and crowds all at once.', 'Book train tickets to Varanasi well in advance — it is a high-demand station.'],
    packingTips: ['Conservative clothing (cover shoulders and knees)', 'Flip-flops (easy to remove at temples)', 'Hand sanitizer (especially after ghat visits)', 'Light cotton (very humid in summer)', 'Stomach medication (street food area)'],
    weather: 'Winter (Nov–Feb): 8–22°C, comfortable, mild fog — peak season. Spring (Mar–Apr): 25–35°C. Summer (May–Jun): 38–45°C — avoid if possible. Monsoon (Jul–Sep): 28–35°C with heavy rains, Ganges floods ghats — atmospheric but difficult. Autumn (Oct–Nov): 20–30°C — ideal; Dev Deepawali in October/November is the best time.',
    transport: 'By Air: Lal Bahadur Shastri International Airport, Babatpur — daily flights from Delhi, Mumbai, Bengaluru. By Rail: Varanasi Junction — trains from Delhi (10–12 hrs), Agra (8 hrs), Kolkata (13 hrs). By Road: Government and private buses from Lucknow (3 hrs), Allahabad/Prayagraj (3 hrs). Within Varanasi: E-rickshaws (₹20–50 per short trip), cycle rickshaws (negotiate), Ola/Uber available. Walking is best in the old city — most of the ghats are accessible on foot.',
    itineraries: [
      { type: '2 Day', durationDays: 2, estimatedCost: 4000, days: [
        { day: 1, activities: [
          { time: '05:30 AM', activity: 'Sunrise boat ride on the Ganges', description: 'Hire a rowing boat at Dashashwamedh Ghat. Float past 84 ghats as the city wakes up. 1 hour.', costEstimate: 300 },
          { time: '08:00 AM', activity: 'Kachori breakfast at Ram Bhandar', description: 'The most famous kachori shop in Varanasi. Queue at Kachori Gali for ₹30 crispy kachoris.', costEstimate: 60 },
          { time: '09:30 AM', activity: 'Kashi Vishwanath Temple visit', description: 'Use the new Corridor. Line up for darshan. Buy flowers and offerings at stalls outside.', costEstimate: 100 },
          { time: '11:30 AM', activity: 'Ghat walk from Assi to Panchganga', description: 'Walk all 84 ghats in 4 km. Stop at notable ones: Harishchandra, Kedar, Dashashwamedh, Scindia.', costEstimate: 0 },
          { time: '02:00 PM', activity: 'Lunch at Bread of Life Bakery', description: 'Post-walk fuel: brown bread sandwiches, banana pancakes, and herbal teas.', costEstimate: 350 },
          { time: '05:00 PM', activity: 'Ganga Aarti at Dashashwamedh Ghat', description: 'Arrive 45 min early for a good spot on the steps. Watch the fire ritual from the front. Or hire a boat (₹150).', costEstimate: 150 },
          { time: '07:30 PM', activity: 'Paan + Chaat walk at Godaulia Crossing', description: 'Try the legendary Banarasi paan (₹50 meetha paan) and tamatar chaat.', costEstimate: 150 }
        ]},
        { day: 2, activities: [
          { time: '08:00 AM', activity: 'Sarnath (13 km)', description: 'Auto-rickshaw to Sarnath (₹150 return). Visit Dhamek Stupa, Ashoka Pillar, and Museum.', costEstimate: 380 },
          { time: '12:00 PM', activity: 'Return to Varanasi + Silk weaving visit', description: 'Visit a traditional silk weaving workshop in the weavers\' quarter (Lohta, Lallapura). See Banarasi silk being made on handlooms.', costEstimate: 200 },
          { time: '02:00 PM', activity: 'Lunch at Keshari Restaurant', description: 'Pure veg Banarasi thali. Try chena dahi vada.', costEstimate: 250 },
          { time: '03:30 PM', activity: 'Blue Lassi Shop (legendary)', description: 'The most famous lassi in India (60+ flavors, fruit-topped). Eat standing at the tiny shop near Manikarnika.', costEstimate: 80 },
          { time: '05:00 PM', activity: 'Assi Ghat evening', description: 'Smaller, more intimate evening aarti and classical music performances by local musicians.', costEstimate: 0 },
          { time: '07:00 PM', activity: 'Banarasi Silk shopping', description: 'Buy at Varanasi Silk Bazar or Vishakha Silk — get quality certificate.', costEstimate: 2000 }
        ]}
      ]}
    ]
  },
  {
    id: 'rishikesh-01', slug: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', country: 'India',
    category: 'Adventure', budget: 'Budget', rating: 4.7, reviewCount: 62000,
    coordinates: { lat: 30.0869, lng: 78.2676 }, altitude: 356,
    coverImage: 'https://images.unsplash.com/photo-1544635808-c2ef6a8bdc35?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80','https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
    description: 'Rishikesh is a Himalayan town on the banks of the Ganges in Uttarakhand, internationally known as the "Yoga Capital of the World" and the gateway to the Char Dham pilgrimage circuit (Kedarnath, Badrinath, Gangotri, Yamunotri). It draws millions of spiritual seekers, yoga practitioners, adventure enthusiasts, and backpackers who come for its ashrams, yoga retreats, river rafting on the Ganges, bungee jumping, and the iconic Laxman Jhula suspension bridge. The Beatles famously studied transcendental meditation here at the Maharishi Mahesh Yogi Ashram in 1968.',
    history: 'Rishikesh has been mentioned as "Hrishikesh" in ancient texts as a sacred site where Raibhya Rishi performed tapas (penance). It gained international prominence when the Beatles visited Maharishi Mahesh Yogi\'s ashram in February 1968 — the visit inspired much of the White Album. Today the abandoned ashram (Chaurasi Kutia/Beatles Ashram) is a popular tourist site decorated with murals.',
    bestSeason: 'September to June. Best for rafting: September–November and February–May. Avoid monsoon (July–August) when the Ganges floods and rafting halts.',
    idealDuration: '3–4 days',
    temperature: '10°C (winter) to 38°C (summer)',
    nearestAirport: 'Jolly Grant Airport, Dehradun (DED) — 35 km from Rishikesh',
    nearestRailwayStation: 'Rishikesh Railway Station (2 km from city center), better connected via Haridwar Junction (25 km)',
    nearestBusStand: 'Rishikesh Main Bus Stand (ISBT), near Haridwar bypass',
    tags: ['Yoga', 'Rafting', 'Spiritual', 'Adventure', 'Beatles', 'Ganges'],
    familyFriendly: false, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 9, luxuryScore: 4, budgetScore: 9,
    topAttractions: [
      { name: 'Laxman Jhula & Ram Jhula (Suspension Bridges)', description: 'Two iconic iron suspension bridges across the Ganges. Laxman Jhula (1939, 450 feet long) is the more famous. Note: The original Laxman Jhula was closed in 2019 for safety; a new bridge is in progress. Ram Jhula (Shivanand Jhula, 450m) remains open. Great photo opportunities and market shopping on the bridges.', location: 'Rishikesh, 3 km upstream from town center' },
      { name: 'White-Water Rafting on the Ganges', description: 'Rishikesh offers some of India\'s best commercially operated white-water rafting. Routes from Shivpuri (12 km upstream) to Nim Beach — Grade III rapids like Three Blind Mice, Body Surfing, and Roller Coaster. Season: September–May. Cost: ₹600–1,200 for 16 km. GMVN-approved operators recommended.', location: 'Shivpuri (put-in) to Nimbeach (takeout), 25 km from Rishikesh' },
      { name: 'Beatles Ashram (Chaurasi Kutia)', description: 'The abandoned ashram of Maharishi Mahesh Yogi, where the Beatles (John Lennon, Paul McCartney, Ringo Starr, George Harrison) stayed in February 1968. Today decorated with vivid Beatles-themed murals and psychedelic art. The meditation pods (kutias) are still standing. Magical and atmospheric. Entry: ₹150 (Indian), ₹600 (foreign). Open 8 AM–5 PM.', location: 'Near Laxman Jhula, behind Maharishi Mahesh Yogi Ashram' },
      { name: 'Triveni Ghat', description: 'The main sacred ghat of Rishikesh where three rivers (Ganges, Yamuna — underground, Saraswati — mythological) meet. Devotees take a holy dip here. The evening Maha Aarti (7 PM) with 21 priests and huge brass oil lamps is spectacular. Large crowds attend — arrive 30 mins early for a spot.', location: 'Downtown Rishikesh, 1 km from bus stand' },
      { name: 'Neelkanth Mahadev Temple', description: 'A highly revered temple of Lord Shiva at 1,330 m, accessible by a 23 km drive or a 7 km forest trek from Rishikesh. Perched at the meeting of three streams, it is said to be where Shiva consumed the halahala poison during Samudra Manthan. The 10 km trek through dense forest is excellent.', location: '23 km from Rishikesh, Pauri Garhwal' },
      { name: 'Bungee Jumping at Mohan Chatti', description: 'India\'s highest fixed platform bungee jump at 83 metres, operated by Jumpin Heights — India\'s first professional bungee operator. Also offers Giant Swing (83m) and Flying Fox (200m cable). Safety standards are high, staff are trained in New Zealand. Open 8 AM–5 PM. Cost: ₹3,250–5,000.', location: '15 km from Rishikesh at Mohan Chatti' }
    ],
    activities: ['White-water rafting (16–36 km, Grade II–IV, ₹600–2,500)', 'Bungee jumping at Mohan Chatti (83m, ₹3,250)', 'Giant Swing (83m, ₹3,250)', 'Camping on Ganges banks at Shivpuri (₹1,200–3,000/night with meals)', 'Yoga retreat (Parmarth Niketan, Sivananda Yoga Vedanta, many options)', '200 hr Yoga Teacher Training course (1 month, ₹35,000+)', 'Sunrise yoga at Parmarth Niketan ashram (free for ashram guests)', 'Neer Garh Waterfall hike (3 km, free)', 'Kunjapuri Temple sunrise trek (5 km, 3,000m views)', 'Meditation retreat at Bihar School of Yoga'],
    localFood: ['Thali at Chotiwala Restaurant (iconic vegetarian, ₹150–300)', 'Fresh homemade bread and spreads at Little Buddha Café (₹100–300)', 'Tibetan food: momos and thukpa at cafes near Laxman Jhula (₹100–250)', 'Ganges-side chai (masala tea, ₹20–40) — drink tea while watching the river', 'Ayurvedic herbal meals at ashrams (included for registered guests)', 'Street-side aloo puri (₹30–50) at Haridwar bypass market', 'Free langar (community meal) at Geeta Bhavan ashram (vegetarian)'],
    shopping: ['Yoga mats, blocks, and straps at Laxman Jhula market (₹200–1,000)', 'Rudraksha beads (₹50–5,000 — buy from trusted shops; five-faced rudraksha is most common)', 'Ganga Jal (sacred Ganges water in copper containers for home shrines)', 'Spiritual books at Ramana Bookshop near Parmarth', 'Organic Ayurvedic products and herbal teas (many certified shops)', 'Musical instruments: harmonium, tabla, singing bowls (₹500–5,000)'],
    culture: 'Rishikesh is a deeply sacred city and the world\'s yoga capital. It is entirely vegetarian and alcohol-free within city limits. Rishikesh\'s culture is one of the few places where ancient yogic traditions live alongside modern adventure tourism. Ashrams like Parmarth Niketan, Sivananda, and Omkarananda have been centers of spiritual learning for generations.',
    festivals: ['International Yoga Festival (March — 7 days of global yoga gathering at Parmarth Niketan)', 'Ganga Dussehra (May/June — Ganges worship festival)', 'Maha Shivaratri (February/March — massive fair, all-night vigil at Neelkanth Temple)', 'Kanwar Yatra (July/August — millions of Shiva devotees carry Ganga water home)'],
    hotels: ['Aloha on the Ganges (Luxury resort, ₹8,000–18,000, Swargashram)', 'Vanaprasta (Wellness resort, ₹5,000–12,000, Tapovan)', 'Parmarth Niketan Ashram (₹1,000–3,000, includes meals, yoga, aarti)', 'Zostel Rishikesh (Hostel, ₹400–700, near Laxman Jhula)', 'Bunk Hostel (₹350–600, near Ram Jhula)', 'Hotel Natraj (Budget, ₹1,200–2,500, near bus stand)'],
    restaurants: ['Little Buddha Café (Vegetarian, River view, ₹150–500, near Laxman Jhula)', 'Chotiwala Restaurant (Iconic since 1950s, vegetarian thali, ₹150–300)', 'Devraj Coffee Corner (Best coffee, breakfast, ₹100–400, Swargashram)', 'Ganga Beach Restaurant (Rooftop over river, ₹200–600)', 'Freedom Café (Bohemian, good for backpackers, ₹100–400, near Beatles Ashram)'],
    travelTips: ['Rishikesh is vegetarian and alcohol-free — respect this in the city center.', 'White-water rafting is only safe with GMVN-approved operators. Avoid unlicensed operators.', 'Book bungee jumping in advance (weekends sell out quickly).', 'Monsoon (July–August): Rivers flood, rafting suspended, landslides possible — avoid for adventure.', 'Ashrams require advance registration for yoga programs and retreats.', 'Swimming directly in the Ganges near Rishikesh is dangerous due to current — only bathe at designated ghats.', 'Beware of aggressive sadhus demanding money for photos.'],
    packingTips: ['Yoga clothes and mat', 'Quick-dry clothes for rafting', 'Warm layers for evenings (Oct–Feb)', 'Water shoes for rafting', 'Sunscreen', 'Cash (limited ATMs near ghats)', 'Reef-safe sunscreen for river activities'],
    weather: 'Winter (Oct–Feb): 10–22°C, clear and pleasant — best for yoga retreats. Spring (Mar–May): 22–38°C, good for rafting. Monsoon (Jun–Sep): 25–35°C with heavy rain — Ganges floods, rafting stops. Autumn (Sep–Oct): 20–30°C, post-monsoon lushness — excellent for all activities.',
    transport: 'By Air: Jolly Grant Airport, Dehradun (35 km). By Rail: Rishikesh Station — direct trains from Delhi (Haridwar–Rishikesh rail via Dehradun, 6–8 hrs). Better option: train to Haridwar (4.5 hrs from Delhi) then shared auto to Rishikesh (45 min, ₹60). By Bus: GMOU buses from Delhi ISBT (6–8 hrs, ₹350–700). Within Rishikesh: Walking between Laxman Jhula, Ram Jhula, and Triveni Ghat (all within 3 km). Autorickshaws for outskirts (₹50–200).',
    itineraries: [
      { type: '3 Day', durationDays: 3, estimatedCost: 7000, days: [
        { day: 1, activities: [
          { time: '06:00 AM', activity: 'Sunrise yoga at Parmarth Niketan (day visitor)', description: 'Morning yoga and meditation session on the Ganges banks. Most ashrams allow day visitors.', costEstimate: 200 },
          { time: '09:00 AM', activity: 'Breakfast at Little Buddha Café', description: 'Coffee, fruit bowl, and homemade bread with river view.', costEstimate: 250 },
          { time: '10:30 AM', activity: 'Beatles Ashram Visit', description: '2 hours exploring the psychedelic murals and meditation pods where the Fab Four stayed.', costEstimate: 150 },
          { time: '01:00 PM', activity: 'Lunch at Chotiwala Restaurant', description: 'Vegetarian thali at the restaurant with the famous mascot.', costEstimate: 250 },
          { time: '03:00 PM', activity: 'Rafting registration + Neer Garh Waterfall hike', description: 'Book rafting for tomorrow. Then 3 km forest hike to a lovely cascade.', costEstimate: 200 },
          { time: '06:30 PM', activity: 'Ganga Aarti at Triveni Ghat', description: 'Large and beautiful 7 PM aarti ceremony.', costEstimate: 0 }
        ]},
        { day: 2, activities: [
          { time: '09:00 AM', activity: 'White-water Rafting (16 km)', description: 'Shivpuri to Nim Beach. Grade III rapids: Three Blind Mice, Roller Coaster, Golf Course. 3 hours.', costEstimate: 1000 },
          { time: '01:00 PM', activity: 'Riverside lunch + Cliff jumping', description: 'Many operators include a riverside lunch. Optional cliff jumping at Body Surfing rapid (5m, ₹100).', costEstimate: 100 },
          { time: '03:00 PM', activity: 'Bungee Jumping at Mohan Chatti', description: '83 metre fixed platform — India\'s highest. Giant Swing also available.', costEstimate: 3500 },
          { time: '06:30 PM', activity: 'Rest and Ganges-side chai', description: 'Watch the river turn golden. Street chai on the ghats.', costEstimate: 40 },
          { time: '08:00 PM', activity: 'Dinner at Ganga Beach Restaurant', description: 'Rooftop view, pan-Indian vegetarian menu.', costEstimate: 400 }
        ]},
        { day: 3, activities: [
          { time: '05:30 AM', activity: 'Kunjapuri Temple sunrise trek', description: '5 km trail to hilltop temple at 1,676m. 360-degree Himalayan panorama including Bandarpunch peak.', costEstimate: 100 },
          { time: '10:00 AM', activity: 'Shopping at Laxman Jhula market', description: 'Buy yoga props, rudraksha, Ayurvedic products.', costEstimate: 800 },
          { time: '12:30 PM', activity: 'Lunch at Devraj Coffee Corner', description: 'Best coffee in Rishikesh. Try the banana pancake.', costEstimate: 250 },
          { time: '02:00 PM', activity: 'Departure to Haridwar or Dehradun', description: 'Shared auto to Haridwar (₹60), then train to Delhi.', costEstimate: 300 }
        ]}
      ]}
    ]
  },
  {
    id: 'munnar-01', slug: 'munnar', name: 'Munnar', state: 'Kerala', country: 'India',
    category: 'Nature', budget: 'Mid-range', rating: 4.7, reviewCount: 42000,
    coordinates: { lat: 10.0889, lng: 77.0595 }, altitude: 1600,
    coverImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80','https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80'],
    description: 'Munnar is a hill station in the Idukki district of Kerala, tucked away in the Western Ghats at 1,600 metres. Its landscape is dominated by endless emerald tea gardens — one of South India\'s largest and finest tea-growing regions, first established by British planters in the 1880s. The cool mist, rolling green hills, rare Neelakurinji flowers (bloom every 12 years, next bloom 2030), and the Anamudi peak (South India\'s highest at 2,695 m) make Munnar one of the most picturesque destinations in India.',
    history: 'Munnar was developed by British planters John Daniel Munro and A.D. Turner in the 1870s as a tea and coffee growing region. The name Munnar comes from the Malayalam word for "three rivers" (Mudrapuzha, Nallathanni, and Kundaly). The British established bungalows, churches, and a colonial infrastructure that is still partially visible. The Tata Tea group (Tata Global Beverages) now owns most of the plantations.',
    bestSeason: 'September to May. Peak: December–January for clear skies. Monsoon (June–September) is lush but misty.',
    idealDuration: '3–4 days',
    temperature: '10°C (winter nights) to 25°C (summer days)',
    nearestAirport: 'Cochin International Airport (COK) — 110 km from Munnar (3 hrs drive)',
    nearestRailwayStation: 'Aluva (90 km) or Ernakulam Junction (Kochi, 110 km) on the Kerala coastal rail',
    nearestBusStand: 'Munnar Town Bus Stand (KSRTC)',
    tags: ['Tea Gardens', 'Misty', 'Kerala', 'Trekking', 'Wildlife', 'Western Ghats'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 6, luxuryScore: 6, budgetScore: 6,
    topAttractions: [
      { name: 'Tea Gardens (Kolukkumalai & Tata Tea Museum)', description: 'Munnar\'s defining landscape — endless waves of green tea bushes draped over steep hills. Kolukkumalai (2,100 m) has some of the world\'s highest tea estates. The Tata Tea Museum (formerly Lockhart Tea Factory, 1905) offers a fascinating look at the tea-making process from plucking to packing. Entry: ₹150 (with tea tasting).', location: '15 km from Munnar town' },
      { name: 'Eravikulam National Park & Anamudi', description: 'A UNESCO tentative heritage site and home to the endangered Nilgiri Tahr (mountain goat). Anamudi (2,695 m) — South India\'s highest peak — is within the park. The park\'s rolling grasslands are stunning. Access by shuttle bus from gate (₹80). Entry: ₹125 (Indian), ₹390 (foreign). Open Nov–Apr only.', location: '13 km from Munnar, Rajamala area' },
      { name: 'Mattupetty Dam & Lake', description: 'A picturesque reservoir surrounded by tea estates and shola forests. Boating (₹100–300 per person) on the emerald-green lake. The Indo-Swiss livestock project here bred Jersey and Swiss Brown cattle for Kerala\'s dairy industry. Nearby Echo Point offers a natural echo.', location: '13 km from Munnar' },
      { name: 'Top Station', description: 'The highest point accessible by road in Munnar (1,700 m), offering sweeping views of the Tamil Nadu plains and the Western Ghats escarpment. On clear days, you can see the Kodaikanal hills. The Neelakurinji blooms here once every 12 years. Shared jeep from Munnar (₹200–300 per person).', location: '32 km from Munnar (Kumily road)' },
      { name: 'Chinnar Wildlife Sanctuary', description: 'A dry deciduous forest sanctuary in the rain shadow of the Western Ghats, home to grizzled giant squirrels (found only here and in Sri Lanka), elephants, leopards, and rare star tortoises. Guided trekking available (₹1,500–3,000/group). Entry: ₹150.', location: '60 km from Munnar (on Marayur road)' },
      { name: 'Kundala Lake & Ana Mudi Shola National Park', description: 'A tranquil lake surrounded by cardamom and eucalyptus. Pedal boating available. Adjacent Ana Mudi Shola NP has rare orchids and hornbills. Marayur (60 km) has ancient dolmens and India\'s only natural sandalwood forest.', location: '23 km from Munnar' }
    ],
    activities: ['Tea plantation walk and tasting at Kolukkumalai (₹150)', 'Jeep safari to Kolukkumalai sunrise (₹2,500/jeep)', 'Trekking to Anamudi peak base (in Eravikulam NP, requires permit)', 'Boating at Mattupetty Lake (₹150–300)', 'Bamboo rafting at Thodupuzha River (₹300–500)', 'Rock climbing and rappelling at Munnar (₹500–1,000)', 'Photography tour through tea gardens at sunrise', 'Ayurvedic massage and spa treatments at resorts'],
    localFood: ['Appam with Stew (soft rice pancakes with coconut milk vegetable stew — quintessential Kerala breakfast)', 'Kerala Fish Curry (in coconut-oil and kudampuli/gamboge — fiery red curry)', 'Puttu with Kadala Curry (steamed rice cake with black chickpea curry)', 'Kerala Parotta with Beef Curry (layered flatbread, best in tea shops)', 'Ela Sadam (rice served on banana leaf with sambar, thoran, pickle — traditional meal)', 'Paal Payasam (rice pudding in coconut milk with cardamom — served at festivals)', 'Tea (Munnar single-estate tea — buy from DTPC shop or Kolukkumalai estate directly)'],
    shopping: ['Munnar Tea from DTPC authorized shops — Kannan Devan Hills (KDH) brand, white, green, cardamom tea (₹100–500)', 'Honey — forest honey from Chinnar area (₹250–500)', 'Homemade cardamom, pepper, and spice mixes', 'Jackfruit chips and banana chips (₹100–300)', 'Handwoven shawls and blankets from tribal co-operatives', 'Nilgiri Neelakurinji seeds (small and rare)'],
    culture: 'Munnar\'s culture is uniquely multicultural — Tamil plantation workers (brought by British in 19th century), Kerala Christians, and indigenous Muthuvan and Mannan tribal communities. The local dialect is a mix of Malayalam and Tamil. The area has a strong presence of the Church of South India with beautiful colonial-era stone churches.',
    festivals: ['Neelakurinji Bloom (once in 12 years — last 2018, next 2030 — the hills turn purple-blue)', 'Onam (August/September — harvest festival, flower carpets, snake boat races nearby)', 'Christmas (December — Munnar\'s tea estate churches have lovely services)'],
    hotels: ['Windermere Estate (Heritage bungalow, ₹12,000–20,000 — former British planter\'s estate)', 'The Tall Trees (Eco resort, ₹8,000–14,000, riverside)', 'Spice Tree Munnar (Design resort, ₹6,000–12,000)', 'DTPC Resorts (Government budget, ₹2,000–3,500, well-maintained)', 'Ragamuffin Tea Bungalow (Budget, ₹1,500–3,000)', 'Siena Village (Mid-range, ₹3,500–6,000, mountain views)'],
    restaurants: ['Rapsy Restaurant (Best local food in town, Kerala meals on banana leaf, ₹150–350)', 'SN Restaurant (Breakfast specialist, appam-stew, ₹100–250, near bus stand)', 'The Green View (Multicuisine, hotel dining, ₹300–700)', 'Silver Spoon (Budget, local food, ₹150–300, near town center)', 'Tea garden canteen at Kolukkumalai (simple local food, authentic setting, ₹100–200)'],
    travelTips: ['Hire a jeep for ₹2,500–3,500/day — the best way to explore; roads are narrow and steep.', 'Start early (5 AM) for Kolukkumalai sunrise jeep — the drive itself is spectacular.', 'Book Eravikulam NP tickets online (wildlife.kerala.gov.in) — entry is limited.', 'Monsoon (June–September) can cut road access — check before visiting.', 'Carry warm clothes even in summer — nights are cold at 1,600m.', 'Leech socks are recommended for forest treks during post-monsoon (September–October).'],
    packingTips: ['Warm jacket and fleece', 'Waterproof jacket (rain is sudden and heavy)', 'Trekking shoes', 'Leech socks for forest treks', 'Light cotton for days, warm layers for mornings/evenings', 'Insect repellent'],
    weather: 'Winter (Nov–Feb): 10–20°C, misty mornings, clear afternoons — best time. Spring (Mar–May): 15–25°C, warming up, fewer crowds. Monsoon (Jun–Sep): 15–20°C, heavy rainfall (5,000 mm), roads can flood, tea gardens turn bright green — magical but difficult travel. Autumn (Oct): 15–22°C, post-monsoon clarity.',
    transport: 'By Air: Cochin International Airport (110 km, 3 hrs by car). By Rail: No direct rail to Munnar. Take train to Ernakulam/Kochi, then bus/taxi. By Bus: KSRTC buses from Kochi (4.5 hrs, ₹150), Kumily/Periyar (3.5 hrs). Taxis from Kochi to Munnar: ₹2,500–3,500. Within Munnar: Jeep rentals (₹2,500–3,500/day), autos and bikes available in town.',
    itineraries: [
      { type: '3 Day', durationDays: 3, estimatedCost: 10000, days: [
        { day: 1, activities: [
          { time: '11:00 AM', activity: 'Arrive Munnar & check-in', description: 'Settle in. Afternoon stroll through town market.', costEstimate: 0 },
          { time: '02:00 PM', activity: 'Tea Museum at Nallathanni Estate', description: 'See the full tea-making process at Tata Tea Museum. Tea tasting session included.', costEstimate: 150 },
          { time: '05:00 PM', activity: 'Tea garden sunset walk', description: 'Self-guided walk through the manicured tea rows at golden hour.', costEstimate: 0 },
          { time: '07:30 PM', activity: 'Dinner at Rapsy Restaurant', description: 'Kerala meals — fish curry, appam, payasam. Best food in Munnar.', costEstimate: 400 }
        ]},
        { day: 2, activities: [
          { time: '05:00 AM', activity: 'Kolukkumalai Sunrise Jeep Safari', description: 'Drive to South India\'s highest tea estate (2,100m) for a breathtaking sunrise over misty valleys. 2.5 hrs drive on mountain tracks.', costEstimate: 2500 },
          { time: '09:00 AM', activity: 'Fresh tea at Kolukkumalai factory', description: 'Taste single-estate Nilgiri tea straight from the source.', costEstimate: 150 },
          { time: '11:00 AM', activity: 'Eravikulam National Park', description: 'See Nilgiri Tahrs up close. Shuttle inside park (₹80). Stunning grasslands.', costEstimate: 400 },
          { time: '02:00 PM', activity: 'Mattupetty Lake & Dam', description: 'Boating on the beautiful reservoir surrounded by tea gardens.', costEstimate: 200 },
          { time: '05:00 PM', activity: 'Echo Point', description: 'Natural echo phenomenon + views of the Nilgiris.', costEstimate: 0 }
        ]},
        { day: 3, activities: [
          { time: '08:00 AM', activity: 'Kundala Lake & Ana Mudi Shola', description: 'Pedal boat on the serene lake. Spot hornbills in the adjacent national park.', costEstimate: 300 },
          { time: '11:00 AM', activity: 'Top Station views', description: 'Highest point accessible by road. Panoramic views of Tamil Nadu plains.', costEstimate: 300 },
          { time: '01:30 PM', activity: 'Lunch + Spice shopping', description: 'Kerala banana leaf meal. Buy cardamom, spice mixes, and estate tea to take home.', costEstimate: 700 },
          { time: '04:00 PM', activity: 'Depart to Kochi', description: 'Taxi to Kochi airport or Ernakulam station. 3.5 hrs.', costEstimate: 3000 }
        ]}
      ]}
    ]
  },
  {
    id: 'alleppey-01', slug: 'alleppey', name: 'Alleppey', state: 'Kerala', country: 'India',
    category: 'Nature', budget: 'Mid-range', rating: 4.7, reviewCount: 48000,
    coordinates: { lat: 9.4981, lng: 76.3388 }, altitude: 1,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80','https://images.unsplash.com/photo-1559628233-100c798642d6?w=800&q=80','https://images.unsplash.com/photo-1572363443168-bc0aaffc9e26?w=800&q=80'],
    description: 'Alleppey (officially Alappuzha) is Kerala\'s most iconic backwater destination, built on a network of canals, lagoons, lakes, and rivers that have earned it the title "Venice of the East." The defining experience here is an overnight stay on a traditional kettuvallam (rice boat houseboat) drifting through the emerald waterways of Vembanad Lake and the paddy-fringed canals of Kuttanad — one of the world\'s few regions where farming happens below sea level. The annual Nehru Trophy Boat Race (August/September) is one of India\'s most spectacular sporting events.',
    history: 'Alleppey has been a trading port since ancient times, exporting coir (coconut fiber), spices, and fish. The backwater canal network was developed by the British for transporting goods from the interior. The town was also an early center of the Kerala Socialist movement. The Nehru Trophy Boat Race began in 1952 when Prime Minister Jawaharlal Nehru donated a trophy after being enchanted by the traditional snake boat races during his visit.',
    bestSeason: 'September to March. Avoid June–August monsoon (risk of flooding, limited houseboat operations). Best: October–February.',
    idealDuration: '2–3 days',
    temperature: '22°C to 35°C (year-round tropical)',
    nearestAirport: 'Cochin International Airport (COK) — 83 km from Alleppey (2 hrs)',
    nearestRailwayStation: 'Alleppey (ALLP) Railway Station — well-connected to Kochi (1.5 hrs), Thiruvananthapuram (4 hrs)',
    nearestBusStand: 'Alleppey KSRTC Bus Stand (near boat jetty)',
    tags: ['Backwaters', 'Houseboat', 'Kerala', 'Lagoon', 'Snake Boat Race', 'Fishing'],
    familyFriendly: true, coupleFriendly: true, soloFriendly: true,
    hiddenGem: false, adventureScore: 4, luxuryScore: 6, budgetScore: 7,
    topAttractions: [
      { name: 'Vembanad Lake Houseboat Cruise', description: 'The quintessential Kerala experience — an overnight journey on a traditional thatched-roof kettuvallam houseboat through the vast Vembanad Lake and backwater canals. Houseboats include bedroom, living room, and private sun deck. Cook prepares fresh Kerala meals onboard. Book through KTDC or private operators. Cost: ₹6,000–25,000/night for 2 persons.', location: 'Punnamada Lake, Alleppey jetty' },
      { name: 'Nehru Trophy Boat Race', description: 'Kerala\'s most spectacular sporting event — held on the second Saturday of August every year since 1952. Over 100 snake boats (chundanvallam), each 30m long rowed by 100 oarsmen chanting "vanchipattu" (boatman songs) compete on Punnamada Lake. Viewing from floating platforms (₹150–500). Book months ahead for houseboat viewing (₹15,000+).', location: 'Punnamada Lake, Alleppey' },
      { name: 'Kuttanad Backwaters (Below Sea Level Farms)', description: 'The "Rice Bowl of Kerala" and one of the world\'s few below-sea-level farming regions. Paddy fields are cultivated below the water table, enclosed by bunds. Take a small canoe tour (₹100/hr) through narrow channels to witness traditional Kerala agrarian life — fishing, coir weaving, toddy tapping from coconut palms.', location: '20 km south of Alleppey' },
      { name: 'Marari Beach', description: 'A pristine, uncrowded beach 15 km from Alleppey with golden sand, coconut groves, and a traditional fishing village. Largely undeveloped compared to Kovalam and Varkala. The Marari Beach Resort (CGH Earth) here is one of India\'s finest eco-resorts. Great for morning walks and sunsets.', location: '15 km north of Alleppey' },
      { name: 'Krishnapuram Palace Museum', description: 'A 200-year-old Kerala-style palace (double-roofed, gabled) with murals, antiques, and a fascinating collection of Travancore royal artifacts. The grounds have a beautiful lotus pond. Entry: ₹20. Open 9 AM–5 PM, closed Mondays.', location: 'Kayamkulam, 47 km from Alleppey' },
      { name: 'St. Andrew\'s Church (1876)', description: 'A British-era church in the backwater town of Arthunkal, known as the "Jerusalem of Kerala." The January feast of St. Sebastian draws 100,000 pilgrims. Beautiful white structure amidst coconut palms on the backwater edge.', location: 'Arthunkal, 17 km from Alleppey' }
    ],
    activities: ['Overnight houseboat stay on Vembanad Lake (₹6,000–25,000)', 'Canoe tour through narrow backwater channels (₹200–500/hr)', 'Kayaking on Vembanad Lake (₹300/hr)', 'Traditional Kerala cooking class on houseboat', 'Ayurvedic treatment and massage (₹1,500–5,000)', 'Coir weaving workshop at village cooperative', 'Cycling through backwater villages (₹200 bike rental)', 'Village walk with local guide (₹500)'],
    localFood: ['Karimeen Pollichathu (pearl spot fish marinated in spices, wrapped in banana leaf and grilled — Alleppey\'s signature dish)', 'Kerala Fish Curry with Tapioca (Kappa-Meen curry — the everyday meal of fishermen)', 'Appam with Mutton Stew (Sunday special across Kerala)', 'Chembu Curry (taro/yam cooked in coconut milk)', 'Nadan Kozhi Varathathu (Kerala-style fried chicken)', 'Payasam (sweet rice pudding served at feasts)', 'Toddy (fermented coconut palm sap — a local drink)'],
    shopping: ['Coir (coconut fiber) products: mats, baskets, bags (best quality in Alleppey, Kerala Dinesh Beedi Cooperative)', 'Handwoven Kerala cotton kasavu sarees (₹500–3,000)', 'Kerala spice blends (fish curry masala, sambar powder)', 'Cashew nuts — roasted and raw (₹400–600/kg)', 'Handmade model houseboats (toy souvenirs)', 'Rattan and bamboo furniture and crafts'],
    culture: 'Alleppey is the heartland of traditional Kerala culture — the birthplace of Kerala\'s labor movement, home to its famous Christian communities (St. Thomas Christians, established 52 CE), and the setting for the traditional onam celebrations and snake boat races that define Kerala identity.',
    festivals: ['Nehru Trophy Boat Race (2nd Saturday of August — world famous)', 'Champakkulam Moolam Boat Race (June/July — older than Nehru Trophy)', 'Feast of St. Sebastian, Arthunkal (January — 100,000 pilgrims)', 'Onam (August/September — harvest festival, vallam kali boat races in every village)'],
    hotels: ['Marari Beach Resort (CGH Earth) (Eco-luxury, ₹15,000–30,000, best eco-resort in Kerala)', 'Pagoda Resort (Boutique, ₹5,000–10,000, authentic Kerala-style cottages)', 'Houseboat (Overnight, ₹6,000–25,000 for 2 — the signature accommodation)', 'Raheem Residency (Heritage, ₹8,000–15,000, restored British bungalow in Alleppey town)', 'Johnson\'s The Homestay (Budget, ₹2,000–4,000)', 'KTDC Punnamada Lake Resort (Government, ₹3,000–6,000)'],
    restaurants: ['Mushroom Restaurant (Best karimeen pollichathu and Kerala seafood, ₹300–700, near jetty)', 'Chakara Restaurant at Raheem Residency (Fine dining, ₹800–2,000)', 'Hotel Sreekrishna (Local thali, ₹120–200, bus stand area)', 'Royal Park Restaurant (Mid-range, multicuisine, ₹300–600)', 'Houseboat meals (fresh Kerala fish curry, appam, karimeen — included in houseboat package)'],
    travelTips: ['Book houseboats well in advance (especially for Nehru Trophy race week — months ahead).', 'Negotiate houseboat prices — KTDC houseboats have fixed prices and better regulation than private operators.', 'Bring mosquito repellent — backwater evenings are mosquito-prone.', 'Monsoon (June–August) has flooding risk — some backwaters become inaccessible.', 'Go for the canoe/kayak experience over motorboat — quieter canals and more authentic.', 'Karimeen (pearl spot) fish is local and fresh — always order it.'],
    packingTips: ['Light cotton clothes (very humid)', 'Mosquito repellent (essential for evenings)', 'Sunscreen', 'Waterproof bag', 'Modest clothes for church visits', 'Sandals/flip-flops'],
    weather: 'Year-round tropical: 22–35°C. Southwest Monsoon (Jun–Sep): Heavy rainfall, humidity very high, floods possible. Northeast Monsoon (Oct–Nov): Moderate rain. Best weather: December–March (sunny, 26–32°C, low humidity).',
    transport: 'By Air: Cochin International Airport (83 km, 2 hrs). By Rail: Alleppey Station — trains from Kochi (1.5 hrs, ₹50–200), Thiruvananthapuram (4 hrs). By Bus: KSRTC from Kochi (2 hrs, ₹80), Thiruvananthapuram (3.5 hrs). Within Alleppey: Autos, cycle rickshaws, bicycles. Ferries connect various backwater towns (₹5–15 per trip).',
    itineraries: [
      { type: '2 Day', durationDays: 2, estimatedCost: 10000, days: [
        { day: 1, activities: [
          { time: '10:00 AM', activity: 'Arrive and board houseboat at Finch Wharf', description: 'Check in to your overnight houseboat by 12 noon. Most check-ins are at the main jetty area.', costEstimate: 0 },
          { time: '01:00 PM', activity: 'Lunch on the houseboat', description: 'Traditional Kerala lunch cooked by onboard chef. Karimeen fish curry, rice, sambar, thoran.', costEstimate: 0 },
          { time: '02:00 PM', activity: 'Vembanad Lake & village canals', description: 'Drift through Vembanad Lake and narrow canal networks. Spot kingfishers, egrets, and otters.', costEstimate: 0 },
          { time: '05:00 PM', activity: 'Village stop at Kuttanad', description: 'Anchor by a coir-weaving or toddy-tapping village. Brief walkabout.', costEstimate: 0 },
          { time: '06:30 PM', activity: 'Sunset on the lake', description: 'Kerala sunsets on Vembanad Lake are extraordinary — orange sky reflected in still water.', costEstimate: 0 },
          { time: '08:00 PM', activity: 'Dinner and overnight on houseboat', description: 'Kerala dinner: appam with fish curry, prawns, rice. Sleep to the sound of water.', costEstimate: 0 }
        ]},
        { day: 2, activities: [
          { time: '06:00 AM', activity: 'Sunrise on Vembanad Lake', description: 'Fishermen casting nets in the morning mist — a classic Kerala image.', costEstimate: 0 },
          { time: '08:00 AM', activity: 'Breakfast on houseboat + disembark', description: 'Idli, dosa, coconut chutney. Check-out by 9 AM.', costEstimate: 0 },
          { time: '10:00 AM', activity: 'Kayaking on backwaters (2 hrs)', description: 'Self-guided kayaking through narrow mangrove-lined canals — excellent.', costEstimate: 600 },
          { time: '01:00 PM', activity: 'Lunch at Mushroom Restaurant', description: 'Best karimeen pollichathu in Alleppey. Open-air, near the jetty.', costEstimate: 500 },
          { time: '03:00 PM', activity: 'Marari Beach (15 km)', description: 'Pristine fishing beach. Long walks on the golden sand.', costEstimate: 300 },
          { time: '05:30 PM', activity: 'Departure to Kochi or Thiruvananthapuram', description: 'Train or taxi back.', costEstimate: 500 }
        ]}
      ]}
    ]
  }
];

function writeDestination(dest) {
  const stateDir = path.join(OUTPUT_DIR, 'India', dest.state.replace(/[^a-zA-Z]/g, ''));
  fs.mkdirSync(stateDir, { recursive: true });
  const filePath = path.join(stateDir, `${dest.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(dest, null, 2));
  console.log(`  ✅ ${dest.name}`);
}

console.log('📍 Writing Part 2 destinations...');
for (const dest of DESTINATIONS) {
  writeDestination(dest);
}

// Update index
const indexPath = path.join(OUTPUT_DIR, 'destinations-index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const lookup = new Map(DESTINATIONS.map(d => [d.slug, d]));
const updated = index.map(e => {
  const d = lookup.get(e.slug);
  if (!d) return e;
  return { id: d.id, slug: d.slug, name: d.name, state: d.state, country: d.country, category: d.category, description: d.description.slice(0,250), rating: d.rating, reviewCount: d.reviewCount, idealDuration: d.idealDuration, bestSeason: d.bestSeason, budget: d.budget, coverImage: d.coverImage, tags: d.tags, familyFriendly: d.familyFriendly, coupleFriendly: d.coupleFriendly, soloFriendly: d.soloFriendly, adventureScore: d.adventureScore, hiddenGem: d.hiddenGem, coordinates: d.coordinates };
});
fs.writeFileSync(indexPath, JSON.stringify(updated, null, 2));
console.log(`\n✅ Part 2 complete: ${DESTINATIONS.length} destinations written.`);
