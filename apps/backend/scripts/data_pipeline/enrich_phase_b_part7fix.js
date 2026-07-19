const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = '/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations';

// Fix and complete destinations that have short descriptions or missing itineraries
const DESTINATIONS = [
  {
    id:'delhi-01', slug:'delhi', name:'Delhi', state:'Delhi', country:'India',
    category:'Culture', budget:'Mid-range', rating:4.4, reviewCount:120000,
    coordinates:{lat:28.6139,lng:77.2090}, altitude:216,
    coverImage:'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800&q=80','https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80','https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80'],
    description:'Delhi — India\'s sprawling capital — is a city of extraordinary contrasts where 3,000 years of history coexist with modern infrastructure. As the seat of three UNESCO World Heritage Sites (Red Fort, Qutub Minar, Humayun\'s Tomb), dozens of Mughal monuments, colonial-era landmarks, ancient stepwells, and a Metro system spanning 400 km, Delhi is the essential starting point for India\'s Golden Triangle and the lens through which the country\'s complex history becomes tangible. Old Delhi (Shahjahanabad, built 1639) and New Delhi (planned capital, 1911-1931) represent two completely different worlds separated by a century of history.',
    history:'Delhi has been the capital of at least 8 historical empires and was the seat of the Mughal Empire at its height. The city\'s recorded history spans over 2,500 years — from Indraprastha (Mahabharata era) to the Tomara and Chauhan Rajput kingdoms, the Delhi Sultanate (1206-1526), the Mughal Empire (1526-1858), and British India (1911-1947). The Red Fort (Lal Qila) was built by Shah Jahan as his palace-fort in 1648 and served as the seat of Mughal power until 1857 when the last Mughal emperor, Bahadur Shah Zafar, was exiled after the 1857 uprising.',
    bestSeason:'October to March. October-November is best — clear skies, comfortable temperatures.',
    idealDuration:'3-4 days', temperature:'2°C (winter) to 45°C (summer)',
    nearestAirport:'Indira Gandhi International Airport (DEL) T3 — 20km from Connaught Place',
    nearestRailwayStation:'New Delhi Station (NDLS) and Hazrat Nizamuddin (NZM) — two major terminus stations',
    nearestBusStand:'ISBT Kashmere Gate (major interstate bus terminal)',
    tags:['UNESCO','Mughal','Metros','History','Street Food','Markets'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:3, luxuryScore:8, budgetScore:8,
    topAttractions:[
      {name:'Lal Qila / Red Fort (UNESCO)',description:'The colossal 17th-century red sandstone fort-palace built by Mughal Emperor Shah Jahan in 1638-1648 as the centerpiece of his capital Shahjahanabad. The Lahori Gate, Diwan-i-Am, Diwan-i-Khas, and Rang Mahal are highlights. India\'s Prime Minister hoists the national flag here every Independence Day (August 15). Entry: ₹35 (Indian), ₹500 (foreign). Open Tue-Sun.',location:'Netaji Subhas Marg, Old Delhi'},
      {name:'Qutub Minar Complex (UNESCO)',description:'A UNESCO World Heritage Site — the 72.5 metre Qutub Minar (1193-1220 CE) is the world\'s tallest brick minaret and the finest example of early Indo-Islamic architecture. Built by Qutb ud-Din Aibak and completed by Iltutmish. The Iron Pillar (4th century CE, rust-resistant — a metallurgical mystery) stands in the courtyard. Entry: ₹30 (Indian), ₹600 (foreign).',location:'Mehrauli, South Delhi'},
      {name:'Humayun\'s Tomb (UNESCO)',description:'A 1572 CE Mughal garden-tomb that directly inspired the Taj Mahal — commissioned by Hamida Banu Begum for her husband Emperor Humayun. The first garden-tomb in India, set in a geometrical char-bagh layout. UNESCO-restored to pristine condition. Entry: ₹35 (Indian), ₹550 (foreign). Open sunrise to sunset.',location:'Mathura Road, Nizamuddin'},
      {name:'India Gate & Kartavya Path (Rajpath)',description:'India Gate — a 42-metre sandstone arch war memorial (1931) commemorating 82,000 Indian soldiers who died in WWI. The Eternal Flame (Amar Jawan Jyoti) burns since 1971. Kartavya Path (the ceremonial boulevard) connects India Gate to the Parliament and Rashtrapati Bhavan — impressive colonial urban planning by Edwin Lutyens.',location:'Central Delhi, Rajpath'},
      {name:'Chandni Chowk & Old Delhi',description:'The oldest and busiest street market in Delhi, built in 1650 by Shah Jahan. A sensory overload of spice markets (Khari Baoli — Asia\'s largest), wedding bazaars, silver jewelry, sari shops, Jain temples, Sikh gurdwaras, and the best street food in India — all in narrow lanes. Shared cycle-rickshaw (₹50-150) is the best way to navigate.',location:'Old Delhi, adjacent to Red Fort'},
      {name:'Akshardham Temple',description:'An extraordinary modern Hindu temple complex (2005) — one of the world\'s largest (encompassing 8,000 sq m of carved pink sandstone, 234 pillars, 20,000 sculptures). The boat ride through 10,000 years of India\'s cultural heritage and the water fountain show in the evening are highlights. Entry: Free (show tickets ₹170). Open 10AM-6:30PM, closed Mondays.',location:'Noida Mor, East Delhi'},
      {name:'Lodhi Garden',description:'A 90-acre heritage park containing 15th-century tombs of the Sayyid and Lodhi dynasty rulers — Muhammad Shah\'s Tomb, Bara Gumbad, Sheesh Gumbad — set in beautifully maintained gardens. The best place for morning walks, birding, and encountering Delhi\'s monumental history without crowds.',location:'Lodhi Road, Central Delhi'}
    ],
    activities:['Heritage walk in Old Delhi with local guide (₹500-1000)','Cycle rickshaw through Chandni Chowk (₹100-200)','Delhi Metro day pass (₹100)','Day trip to Agra by Shatabdi (2 hrs, ₹700-1000)','Street food tour (₹500-1500 guided)','Qutub Minar sunset (best visited 4-5 PM)','Craft museum at National Crafts Museum (Bharat Bhavan, free)','Night market at Dilli Haat (₹30 entry, crafts from all states)'],
    localFood:['Chole Bhature at Sita Ram Diwan Chand (Paharganj, since 1947, ₹80-120 — legendary)','Paratha Wali Gali (150-year-old lane in Old Delhi with 20+ stuffed paratha variants, ₹80-180)','Jalebi at Old Famous Jalebi Wala (Chandni Chowk, ₹30/100g, hot and crispy since 1884)','Butter Chicken (invented at Moti Mahal restaurant, Daryaganj, 1948)','Kebabs at Al Jawahar (since 1947, Old Delhi, ₹150-400)','Nihari (slow-cooked lamb stew, Sunday morning Old Delhi breakfast, ₹150-300)','Delhi Chaat: Papdi Chaat, Dahi Bhalla, Gol Gappa at Bengali Market (₹30-80)'],
    shopping:['Chandni Chowk (wholesale textiles, jewelry, electronics, spices — best for bargains)','Dilli Haat (INA and Pitampura — craft emporium from all Indian states, ₹30 entry)','Khan Market (premium boutiques, imported products, best bookshops in Delhi)','Sarojini Nagar Market (exported branded clothing at dirt-cheap prices)','Janpath Lane (tourist market — bags, clothing, jewels at bargain prices)','Connaught Place flagship stores of Indian brands'],
    culture:'Delhi\'s culture is the most complex in India — it simultaneously represents Mughal grandeur, British colonial formalism, Punjabi post-Partition energy, and the cosmopolitan melting pot of independent India. The old city (Shahjahanabad) maintains its Mughal-era street structure, mosque culture, and artisan traditions of kabab-making, perfume distillation, and silver-wire embroidery (Zardozi).',
    festivals:['Republic Day Parade (January 26 — grandest military parade in India on Kartavya Path; tickets ₹100-500, book months ahead)','Dilli Haat Craft Fair (October-November)','Qutub Festival (November — classical music and dance at Qutub Minar, spectacular setting)','Independence Day (August 15 — PM speaks from Red Fort battlements)','Dussehra at Ramlila Maidan (October — giant Ravana effigy burning)'],
    hotels:['The Imperial (Heritage 5-star, ₹18000-40000, Janpath — built 1936, New Delhi\'s most storied hotel)','The Leela Palace (5-star, ₹15000-35000, Chanakyapuri)','ITC Maurya (5-star, ₹12000-28000, Chanakyapuri — Bukhara restaurant)','Hotel Broadway (Budget heritage, ₹2500-5000, near Mandi House)','Zostel Delhi (Hostel, ₹400-700, Paharganj)','Hotel Blue (Mid-range, ₹2000-4000, Paharganj)'],
    restaurants:['Bukhara at ITC Maurya (Legendary NWFP cuisine, ₹3000-8000 — voted best Indian restaurant globally)','Moti Mahal Delux (Birthplace of Butter Chicken, ₹400-1200, Daryaganj)','Karim\'s (Old Delhi, legendary Mughlai since 1913, ₹200-600)','Indian Accent (Fine dining New Indian, ₹3000-7000, The Lodhi)','Al Jawahar (Old Delhi, opposite Jama Masjid, ₹150-400)','Paranthe Wali Gali (Street, ₹80-180, old Delhi)'],
    travelTips:['Delhi Metro is the fastest and cheapest way around — download the DMRC app for route planning.','Avoid May-June (45°C+) — October-November is ideal.','Old Delhi is best explored on foot or by cycle rickshaw — cars cannot navigate the lanes.','Bargain at all markets except fixed-price government emporiums.','Stay near Connaught Place (New Delhi) or Khan Market for easy access to key sights.','Pre-book the Red Fort Son et Lumière show (evening, ₹80-600, atmospheric)'],
    packingTips:['Comfortable walking shoes','Sun hat + sunscreen (summer/spring)','Scarf for mosques and temples','Small backpack','Delhi stomach medicine — street food is delicious but sanitation varies'],
    weather:'Winter (Nov-Feb): 5-20°C, fog, pleasant. Spring (Mar-Apr): 22-35°C. Summer (May-Jun): 35-45°C — avoid. Monsoon (Jul-Sep): 28-40°C with heavy rain. Autumn (Oct): 20-30°C — best.',
    transport:'By Air: IGI Airport (20km, Metro connects Airport to center in 25 min, ₹60). By Rail: New Delhi Station and Hazrat Nizamuddin. Metro: 400km network, ₹10-60 per trip. Autos: ₹50-300 using Ola/Uber or meter. Taxis: ₹100-500.',
    itineraries:[
      {type:'3 Day',durationDays:3,estimatedCost:7000,days:[
        {day:1,activities:[
          {time:'07:00 AM',activity:'Jama Masjid + Old Delhi walk',description:'Start at India\'s largest mosque, then cycle rickshaw through Chandni Chowk.',costEstimate:200},
          {time:'09:00 AM',activity:'Karim\'s breakfast',description:'Nahari and parathas at the legendary 1913 restaurant.',costEstimate:300},
          {time:'10:30 AM',activity:'Red Fort',description:'Mughal palace-fort. Allow 2 hours.',costEstimate:500},
          {time:'01:00 PM',activity:'Paratha Wali Gali lunch',description:'150-year-old paratha street. Stuffed with everything imaginable.',costEstimate:200},
          {time:'03:00 PM',activity:'Humayun\'s Tomb',description:'The Taj prototype. Beautiful UNESCO site.',costEstimate:550},
          {time:'06:00 PM',activity:'Lodhi Garden',description:'Evening walk among Sayyid-era tombs.',costEstimate:0},
          {time:'08:00 PM',activity:'Dinner at Indian Accent',description:'New-age Indian fine dining.',costEstimate:3000}
        ]},
        {day:2,activities:[
          {time:'08:00 AM',activity:'Qutub Minar',description:'World\'s tallest brick minaret. Iron pillar, Indo-Islamic carvings.',costEstimate:600},
          {time:'11:00 AM',activity:'Dilli Haat INA',description:'Crafts from all 28 states. Excellent shopping and food stalls.',costEstimate:300},
          {time:'01:00 PM',activity:'Khan Market lunch',description:'Multiple restaurants, great café culture.',costEstimate:600},
          {time:'03:00 PM',activity:'India Gate + Rajpath',description:'Walk the ceremonial axis. Photo with India Gate.',costEstimate:0},
          {time:'05:00 PM',activity:'Akshardham Temple',description:'Hindu culture show in the boat, evening fountain display.',costEstimate:170},
          {time:'08:30 PM',activity:'Chole Bhature at Sita Ram',description:'Legendary Paharganj dinner.',costEstimate:200}
        ]},
        {day:3,activities:[
          {time:'09:00 AM',activity:'National Museum of India',description:'Best museum in India — Harappan, Buddhist, Mughal collections.',costEstimate:20},
          {time:'12:00 PM',activity:'Sarojini Nagar Market',description:'Budget shopping for clothes and accessories.',costEstimate:1000},
          {time:'02:00 PM',activity:'Connaught Place lunch',description:'Central colonial arcade for lunch.',costEstimate:500},
          {time:'04:00 PM',activity:'Depart or day trip to Agra',description:'Book the Taj Express (₹500) for a quick Agra day trip if time allows.',costEstimate:500}
        ]}
      ]}
    ]
  },
  {
    id:'mumbai-01', slug:'mumbai', name:'Mumbai', state:'Maharashtra', country:'India',
    category:'Culture', budget:'Mid-range', rating:4.4, reviewCount:105000,
    coordinates:{lat:19.0760,lng:72.8777}, altitude:14,
    coverImage:'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80','https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80','https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80'],
    description:'Mumbai — India\'s Maximum City — is the financial capital, the entertainment capital (Bollywood), and the most diverse urban experience in the country. Built on 7 former islands joined by land reclamation over 150 years, this city of 20 million never sleeps. The Gateway of India, the Taj Mahal Palace Hotel, Chhatrapati Shivaji Maharaj Terminus (UNESCO), Marine Drive\'s Queen\'s Necklace, the UNESCO-listed Elephanta Caves, the chaos of Dharavi, and the glamour of Bandra coexist in a single city. Mumbai simultaneously represents every stratum of India: incredible wealth and intense poverty, ancient traditions and cutting-edge modernity.',
    history:'Mumbai (formerly Bombay) was a cluster of 7 fishing islands under Koli tribal communities. The Portuguese occupied it from 1534. In 1661 it was given to England as part of the dowry of Catherine of Braganza. The British East India Company developed it into their premier west-coast port, and it became the British India presidency capital. The city grew rapidly with the cotton industry, then as a financial center, and became the center of the Indian independence movement — Gandhi organized many campaigns from here.',
    bestSeason:'November to February. Monsoon (June-September) — dramatic but flooding.',
    idealDuration:'3-4 days', temperature:'17°C (winter) to 35°C (summer)',
    nearestAirport:'Chhatrapati Shivaji Maharaj International Airport (BOM) T2 — 28km from Gateway of India',
    nearestRailwayStation:'Chhatrapati Shivaji Maharaj Terminus (CSMT) and Mumbai Central — major inter-city stations',
    nearestBusStand:'Mumbai Central Bus Depot (MSRTC)',
    tags:['Bollywood','Gateway of India','Elephanta Caves','Dharavi','Marine Drive','UNESCO'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:4, luxuryScore:9, budgetScore:7,
    topAttractions:[
      {name:'Gateway of India',description:'A 26-metre basalt arch monument (1924) on the Apollo Bunder waterfront, built to commemorate the 1911 visit of King George V and Queen Mary. The last British troops left India through this gateway in 1948. Overlooking the Arabian Sea, with the Taj Mahal Palace Hotel behind — one of India\'s most iconic images. Ferry point for Elephanta Caves.',location:'Apollo Bunder, Colaba'},
      {name:'Elephanta Caves (UNESCO)',description:'A UNESCO World Heritage Site — a cluster of 5th-8th century CE rock-cut cave temples on Elephanta Island, 9km from the Gateway. Accessible by ferry (₹200 return, 1 hour). The main cave houses a 6-metre trimurti (three-headed Shiva) — one of the finest sculptures in Indian art. Entry: ₹40 (Indian), ₹600 (foreign). Ferries run 9AM-2:30PM.',location:'Elephanta Island, 9km offshore'},
      {name:'CST / Chhatrapati Shivaji Maharaj Terminus (UNESCO)',description:'A UNESCO World Heritage Site — the Victoria Terminus (completed 1888) is a Gothic Revival masterpiece blending Victorian Gothic and Indian styles. Still a fully functioning railway station (3 million passengers daily), its turrets, stone carvings, and stained glass are extraordinary. Best photographed at night when illuminated.',location:'Fort, South Mumbai'},
      {name:'Marine Drive (Queen\'s Necklace)',description:'A 3.6km C-shaped promenade along the Arabian Sea from Nariman Point to Girgaum Chowpatty. At night, the arc of street lights seen from Malabar Hill resembles a necklace — the origin of the Queen\'s Necklace nickname. The best free sunset experience in Mumbai. Also home to the Mumbai skyline photo.',location:'South Mumbai seafront'},
      {name:'Dharavi',description:'Asia\'s largest slum (popularly, though not technically — Orangi Town in Karachi is larger) — 1 million people in 2.1 square km. A massive informal economy producing leather goods, recycled plastics, pottery, and textiles worth over ₹5,000 crore annually. Several social enterprises run sensitively-guided tours (₹750-1500, Reality Tours) that challenge the poverty-tourism criticism.',location:'Dharavi, Central Mumbai'},
      {name:'Juhu Beach & Versova',description:'The most popular beach in Mumbai — 6km of seafront in the Western suburbs with Bollywood celebrity residences behind it. Famous for Juhu Chowpatty\'s street food (pav bhaji, bhel puri, gola ice). Celebrity spotting is common. Sunsets are golden.',location:'Juhu, Western Suburbs'}
    ],
    activities:['Elephanta Caves ferry trip (₹200 return, half day)','CST night photography (best at 9-11PM when lit)','Dabbawalas visit (contact Mumbai Dabbawala Association, ₹500 for observation)','Dharavi guided tour (Reality Tours, ₹750-1500)','Bollywood studio tour (Film City, Goregaon, ₹500-1500)','Marine Drive early morning walk (free, 6 AM)','Local train commute during off-peak (quintessential Mumbai experience, ₹5-40)','Crawford Market food trail (₹500-1000)'],
    localFood:['Vada Pav (Mumbai\'s soul food — deep-fried potato dumpling in bread roll with chutneys, ₹15-30 from any stall)','Pav Bhaji at Juhu Beach or Sardar Restaurant (₹80-200)','Bombay Duck Fry (a fish, fried crispy — eat at coastal restaurants in Dadar or Versova)','Prawn Koliwada (crispy fried prawns at the original Koliwada fishing village style)','Mumbai Biryani (distinct style using potatoes and dried plums)','Frankie from Tibbs Frankie (Mumbai\'s original wrap, ₹60-120)','Bhel Puri and Sev Puri at Chowpatty Beach (₹30-80)'],
    shopping:['Colaba Causeway (tourist market — bags, silver, clothing, ₹200-3000)','Crawford Market (wholesale fresh produce and pets)','Chor Bazaar (literally Thieves Bazaar — antiques, curiosities, vintage items)','Linking Road, Bandra (street fashion, export surplus)','High Street Phoenix, Lower Parel (premium malls)','Zaveri Bazaar (gold and diamond jewelry wholesale)'],
    culture:'Mumbai is India\'s melting pot — Marathi culture, Gujarati merchant tradition, Parsi (Zoroastrian) heritage, Bollywood glamour, and the working-class energy of the local train system all coexist. The Koli fishing community (original inhabitants) still operates from Sassoon Docks. The Ganesh Chaturthi festival transforms the entire city.',
    festivals:['Ganesh Chaturthi (August/September — 11-day festival, million-strong processions to immerse Ganesh in the sea on the last day)','Mumbai Film Festival (October)','Kala Ghoda Arts Festival (February)','Bandra Fair (September — Catholic fishing community fair)'],
    hotels:['Taj Mahal Palace Hotel (Iconic 5-star, ₹25000-80000, Gateway of India — India\'s most celebrated hotel, opened 1903)','The Oberoi Mumbai (5-star, ₹18000-40000, Marine Drive)','ITC Grand Central (5-star, ₹10000-20000, Parel)','Abode Boutique Hotel (Boutique, ₹5000-9000, Colaba)','Hotel Harbour View (Budget, ₹2000-4500, Colaba)','Hotel City Palace (Budget, ₹1200-2500, Nariman Point area)'],
    restaurants:['Trishna (Best seafood in Mumbai, ₹1500-4000, Fort)','Indigo Deli (Brunch and all-day dining, ₹500-1200, Colaba/Bandra)','Leopold Café (Heritage traveler institution since 1871, ₹300-800, Colaba)','Sardar Restaurant (Pav Bhaji legend since 1960s, ₹80-200, Tardeo)','Britannia & Co (Parsi restaurant, berry pulao, dhansak, ₹400-900, Ballard Estate)','Khyber (North Indian, ₹800-2000, Fort)'],
    travelTips:['Use the local train (Western, Central, Harbour lines) during off-peak hours — essential Mumbai experience.','Pre-book Elephanta Cave ferry from the official booth (not touts) at Gateway of India.','Dharavi tours should be booked with Reality Tours or similar ethical operators — not touts.','Mumbai taxis and autos legally must use meters — insist on meter use or use Ola/Uber.','Monsoon (June-September): Mumbai floods badly during heavy rain — check weather and plan.','Do NOT carry valuables on local trains during peak hours (7-10AM, 5-9PM).'],
    packingTips:['Light summer clothes','Rain poncho (monsoon essential)','Small backpack','Comfortable walking shoes','Sunscreen for beach visits'],
    weather:'Winter (Nov-Feb): 17-30°C, pleasant. Spring (Mar-May): 28-38°C, humid. Monsoon (Jun-Sep): 24-32°C, extreme rain (2500mm in 4 months). Autumn (Oct): 26-32°C, post-monsoon perfect.',
    transport:'By Air: BOM T2 (28km, Airport Metro Line T1 operational, taxi ₹400-700). By Rail: CSMT and Dadar for most South India trains. Mumbai Local Train (best for intra-city). Metro Lines 1,2,7 operational. By Bus: BEST buses (₹5-25). Taxis: ₹30 flag fall + meter.',
    itineraries:[
      {type:'3 Day',durationDays:3,estimatedCost:8000,days:[
        {day:1,activities:[
          {time:'07:00 AM',activity:'Marine Drive sunrise walk',description:'Walk the Queen\'s Necklace at dawn — fishermen, joggers, peace.',costEstimate:0},
          {time:'09:00 AM',activity:'Gateway of India',description:'The iconic arch, boats in the harbour.',costEstimate:0},
          {time:'10:00 AM',activity:'Elephanta Caves ferry',description:'1-hour ferry to UNESCO island temples. 3-4 hours total.',costEstimate:440},
          {time:'02:00 PM',activity:'Lunch at Leopold Café',description:'Heritage café since 1871. Perfect Colaba base.',costEstimate:500},
          {time:'03:30 PM',activity:'Colaba Causeway shopping',description:'Browse the market street for bags, silver, export fashion.',costEstimate:1000},
          {time:'06:00 PM',activity:'Juhu Beach sunset',description:'Drive to Western suburbs for sunset and street food.',costEstimate:200},
          {time:'08:00 PM',activity:'Pav Bhaji at Sardar\'s',description:'Mumbai\'s most famous pav bhaji restaurant.',costEstimate:200}
        ]},
        {day:2,activities:[
          {time:'08:00 AM',activity:'CST morning photography',description:'The UNESCO station at peak commute — extraordinary energy.',costEstimate:0},
          {time:'10:00 AM',activity:'Crawford Market + Dharavi tour',description:'Crawford Market for produce/spice. Dharavi Reality Tour (pre-booked).',costEstimate:1500},
          {time:'01:30 PM',activity:'Britannia & Co lunch',description:'Legendary Parsi restaurant, Berry Pulao and Dhansak.',costEstimate:700},
          {time:'03:00 PM',activity:'Dhobi Ghat',description:'The world\'s largest open-air laundry — 5,000+ washermen.',costEstimate:0},
          {time:'05:30 PM',activity:'Bandra Fort and Bandstand',description:'Sea-facing 17th-century fort ruins, Bollywood star bungalows.',costEstimate:0},
          {time:'08:00 PM',activity:'Dinner at Trishna',description:'Best seafood in Mumbai — Butter Garlic Crab.',costEstimate:2000}
        ]},
        {day:3,activities:[
          {time:'09:00 AM',activity:'Film City Bollywood Tour',description:'Goregaon. See film sets, shoot environments, Bollywood magic.',costEstimate:1000},
          {time:'01:00 PM',activity:'Lunch in Andheri',description:'Excellent North Indian and coastal cuisine in the Western suburbs.',costEstimate:500},
          {time:'03:00 PM',activity:'Linking Road shopping',description:'Best budget street fashion in Mumbai.',costEstimate:1000},
          {time:'06:00 PM',activity:'Departure',description:'Airport transfer.',costEstimate:700}
        ]}
      ]}
    ]
  },
  {
    id:'kolkata-01', slug:'kolkata', name:'Kolkata', state:'West Bengal', country:'India',
    category:'Culture', budget:'Budget', rating:4.4, reviewCount:78000,
    coordinates:{lat:22.5726,lng:88.3639}, altitude:9,
    coverImage:'https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80','https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80'],
    description:'Kolkata — the City of Joy — is India\'s cultural and intellectual capital, the former capital of British India (1772-1911), and the birthplace of the Bengal Renaissance that transformed Indian thought, literature, and spirituality in the 19th century. Victoria Memorial (1921), Howrah Bridge (1943), Mother Teresa\'s Missionaries of Charity, Rabindranath Tagore\'s Jorasanko Thakur Bari, the Dakshineswar Kali Temple, and the colonial grandeur of BBD Bagh define a city of extraordinary depth. Its vibrant Durga Puja celebration — the world\'s largest street art festival — draws millions.',
    history:'Kolkata was founded by Job Charnock of the British East India Company in 1690 as a trading post, though the area had earlier settlements. It became the capital of British India in 1772 and remained so until 1911 when the capital shifted to Delhi. The Bengal Presidency was a center of Indian nationalist activity — the 1905 Partition of Bengal ignited the Swadeshi movement. The Bengal Famine of 1943 killed 2-3 million. Mother Teresa worked here from 1948 until her death in 1997.',
    bestSeason:'October to March. Durga Puja (October) is the most spectacular. Avoid April-June (42°C, humid).',
    idealDuration:'3-4 days', temperature:'10°C (winter) to 42°C (summer)',
    nearestAirport:'Netaji Subhas Chandra Bose International Airport (CCU) — 17km from city center',
    nearestRailwayStation:'Howrah Junction (HWH) and Sealdah (SDAH) — two major termini',
    nearestBusStand:'Esplanade Bus Terminus (central Kolkata)',
    tags:['Bengal Renaissance','Durga Puja','Howrah Bridge','Colonial','Intellectuals','Rabindranath Tagore'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:3, luxuryScore:6, budgetScore:9,
    topAttractions:[
      {name:'Victoria Memorial',description:'A magnificent white marble edifice (1906-1921) built by Lord Curzon in memory of Queen Victoria, blending Venetian, Mughal, and Egyptian architectural styles. The 25-acre gardens contain statues of colonial-era figures. The museum inside has 25,000+ artifacts, paintings, and manuscripts of the British India era. Entry: ₹30 (Indian), ₹500 (foreign). Open 10AM-5PM, closed Mondays.',location:'Queens Way, Central Kolkata'},
      {name:'Howrah Bridge (Rabindra Setu)',description:'An iconic cantilever suspension bridge (1943) across the Hooghly River — 705m long, carrying 150,000 vehicles and millions of pedestrians daily, with NO nuts or bolts (riveted). One of the world\'s busiest bridges. Photographed from a boat on the Hooghly (₹40-100) for the best views.',location:'Spanning Hooghly River between Howrah and Kolkata'},
      {name:'Dakshineswar Kali Temple',description:'A 1855 temple of Goddess Kali on the east bank of the Hooghly, where Sri Ramakrishna Paramahamsa had his spiritual visions (1855-1886). One of the most visited temples in India. The pink-towered 9-spired structure with the Nahabatkhana (music room) and 12 Shiva temples is sacred to millions. Entry: Free.',location:'Dakshineswar, North Kolkata'},
      {name:'College Street & Boi Para (Book Market)',description:'The world\'s largest second-hand book market — College Street has been the intellectual heart of Kolkata since the 19th century. Thousands of book stalls sell new and second-hand books in Bengali, English, and other languages. The Indian Coffee House here (since 1942) is where Satyajit Ray, Amartya Sen, and generations of Bengali intellectuals met.',location:'College Street, North Kolkata'},
      {name:'Park Street (Mother Teresa Connection)',description:'Kolkata\'s most famous promenade — lined with restaurants, music venues, and the Missionaries of Charity (54A Lower Circular Road, 3km from Park Street) where Mother Teresa\'s tomb is. Also: South Park Street Cemetery (oldest European cemetery in India, 1767), the jazz bars, and the finest restaurants in the city.',location:'Park Street, Central Kolkata'},
      {name:'Kumartuli (Potter\'s Colony)',description:'The neighborhood where thousands of artisans craft elaborate clay idols year-round for Durga Puja, Saraswati Puja, and other festivals. The skill and artistry is extraordinary. Watching the idol-makers work (especially from August-October) is one of Kolkata\'s most unique cultural experiences.',location:'Kumartuli, North Kolkata'}
    ],
    activities:['Sunrise on Howrah Bridge (5 AM, extraordinary light)','Boat ride on Hooghly River (₹40-100)','Tram ride through the city (heritage tram network, ₹7, Central to Esplanade)','Durga Puja pandal hopping (October — thousands of elaborate installations)','Marble Palace mansion visit (1835, family palace, free with guide ₹200)','Rabindranath Tagore\'s Jorasanko Thakur Bari (family home-museum, ₹10)','Day trip to Sundarbans (mangrove tiger reserve, 100km, ₹3000-5000)','Missionaries of Charity visit (voluntary work available)'],
    localFood:['Rosogolla (Kolkata claims to have invented it — KC Das is the most famous shop, ₹20 each)','Kathi Roll (Nizam\'s Restaurant in New Market, since 1932 — the original kathi roll)','Puchka/Pani Puri (Kolkata style is tangier and crispier than any other city — ubiquitous, ₹20-40)','Kosha Mangsho (slow-cooked spiced mutton — a Bengali Sunday specialty)','Hilsa Fish / Ilish (most revered fish in Bengali cuisine — seasonal, expensive, extraordinary)','Mishti Doi (sweetened set yogurt in earthen cups — the best dessert in Bengal)','Jhal Muri (puffed rice with mustard oil, tamarind, chili, vegetables — perfect street snack)'],
    shopping:['New Market (largest colonial-era market in Kolkata, 1874 — clothing, food, crafts)','Hatibagan Bazaar (wholesale fabric and saris)','Dakshinapan (state government emporium for crafts of all Eastern Indian states)','Kumartuli (buy clay Durga idols directly from artisans)','College Street (books — second-hand and new)','Oxford Bookstore, Park Street (best bookshop in Kolkata)'],
    culture:'Kolkata is the cultural capital of India — birthplace of the Bengal Renaissance, home of Rabindranath Tagore (Asia\'s first Nobel Laureate), Satyajit Ray (cinema), Amartya Sen (economics Nobel), and Mother Teresa. The city has an extraordinary literary, artistic, and intellectual tradition. Durga Puja here is not just a festival but a city-wide art installation — winning pandals are visited by millions.',
    festivals:['Durga Puja (October — world-famous, UNESCO-recognised; entire city is the venue)','Kolkata Book Fair (January/February — largest book fair in Asia)','Dover Lane Music Conference (January — India\'s most prestigious classical music event)','Rabindra Jayanti (May — Tagore\'s birthday, cultural programs citywide)'],
    hotels:['The Oberoi Grand (Heritage 5-star, ₹12000-28000, Jawaharlal Nehru Road)','ITC Royal Bengal (5-star, ₹8000-18000, Rajarhat New Town)','Hotel Hindustan International (4-star, ₹4000-8000, Park Street)','The Lytton Hotel (Heritage, ₹3000-6000, near Park Street)','Hotel Galaxy (Budget, ₹1200-2500, near Howrah)','Broadway Hotel (Budget heritage, ₹1500-3000, near Esplanade)'],
    restaurants:['Oh! Calcutta (Bengali fine dining, ₹600-1500, Elgin Road)','Mocambo (Continental, a Park Street institution since 1956, ₹400-1000)','Peter Cat (Chelo Kebab legend since 1975, ₹400-900)','Kewpie\'s (Home-style Bengali cuisine, ₹400-900, Elgin)','Nizam\'s (Original Kathi Roll birthplace, ₹80-200, New Market)','Flury\'s (Swiss-style café and patisserie since 1927, ₹200-600, Park Street)'],
    travelTips:['Kolkata trams are the last functioning tram network in India — ride them.','Yellow Ambassador taxis are metered — insist on meter.','Durga Puja: book hotels 6+ months in advance. The city transforms completely.','The Kolkata Metro (oldest in India, since 1984) is the easiest way around.','Bengali culture values intellectual discourse — asking locals for recommendations gets enthusiastic responses.'],
    packingTips:['Light cotton clothes','Umbrella (year-round rain possible)','Modest clothes for temples','Comfortable walking shoes'],
    weather:'Winter (Nov-Feb): 10-22°C, pleasant. Spring (Mar-Apr): 28-38°C. Summer (May-Jun): 35-42°C, very humid and hot. Monsoon (Jun-Sep): 28-35°C, heavy rain. Autumn (Oct): 22-30°C — Durga Puja season.',
    transport:'By Air: CCU Airport (17km, Metro from New Garia to Airport). By Rail: Howrah Junction and Sealdah. Metro: 5 lines operational. By Bus: WBTC buses (₹5-25). Taxis: ₹30 flag fall (Yellow Ambassador) + Ola/Uber.',
    itineraries:[
      {type:'3 Day',durationDays:3,estimatedCost:5500,days:[
        {day:1,activities:[
          {time:'07:00 AM',activity:'Howrah Bridge sunrise',description:'Walk across the bridge at dawn. Flower market below the bridge is active.',costEstimate:0},
          {time:'09:00 AM',activity:'Victoria Memorial',description:'White marble masterpiece. Museum inside. Allow 2 hours.',costEstimate:30},
          {time:'12:00 PM',activity:'Lunch at Flury\'s',description:'Heritage Swiss café on Park Street since 1927.',costEstimate:600},
          {time:'02:00 PM',activity:'Mother Teresa Missionaries of Charity',description:'Visit her tomb. Volunteer opportunities.',costEstimate:0},
          {time:'04:00 PM',activity:'Park Street walk',description:'Bookshops, jazz cafes, architecture.',costEstimate:200},
          {time:'08:00 PM',activity:'Dinner at Mocambo',description:'Continental institution. Iconic restaurant.',costEstimate:800}
        ]},
        {day:2,activities:[
          {time:'08:00 AM',activity:'College Street + Indian Coffee House',description:'Browse the book market and sit in the historic coffee house.',costEstimate:100},
          {time:'10:00 AM',activity:'Kumartuli potter\'s colony',description:'Watch idol-makers at work. Extraordinary craft.',costEstimate:0},
          {time:'12:00 PM',activity:'Hooghly River boat ride',description:'30-minute boat from Princep Ghat. View of Howrah Bridge.',costEstimate:100},
          {time:'02:00 PM',activity:'Dakshineswar Kali Temple',description:'Major temple of Sri Ramakrishna, sacred to millions.',costEstimate:0},
          {time:'05:00 PM',activity:'Belur Math',description:'Ramakrishna Math HQ, beautiful building combining Hindu/Islamic/Christian architecture.',costEstimate:0},
          {time:'08:00 PM',activity:'Kathi Roll at Nizam\'s',description:'Original 1932 kathi roll birthplace.',costEstimate:200}
        ]},
        {day:3,activities:[
          {time:'09:00 AM',activity:'Marble Palace',description:'1835 neoclassical mansion with Rubens paintings, Venetian glass, and peacocks.',costEstimate:200},
          {time:'11:00 AM',activity:'Jorasanko Thakur Bari',description:'Tagore\'s ancestral home and museum.',costEstimate:10},
          {time:'01:00 PM',activity:'Puchka and Jhal Muri lunch',description:'Street food walk near Hatibagan market.',costEstimate:150},
          {time:'03:00 PM',activity:'New Market shopping',description:'Largest colonial market — fabric, food, crafts.',costEstimate:800},
          {time:'07:00 PM',activity:'Oh! Calcutta farewell dinner',description:'Finest Bengali cuisine. Hilsa fish in mustard sauce.',costEstimate:1000}
        ]}
      ]}
    ]
  },
  {
    id:'jodhpur-01', slug:'jodhpur', name:'Jodhpur', state:'Rajasthan', country:'India',
    category:'Culture', budget:'Mid-range', rating:4.6, reviewCount:55000,
    coordinates:{lat:26.2389,lng:73.0243}, altitude:231,
    coverImage:'https://images.unsplash.com/photo-1524781289445-ddf8d5695861?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1586791138989-9a6e6e95c0cf?w=800&q=80','https://images.unsplash.com/photo-1586791138989-9a6e6e95c0cf?w=800&q=80'],
    description:'Jodhpur — the Blue City — is Rajasthan\'s second largest city, famed for the vast indigo-painted houses of the Brahmin quarter below the colossal Mehrangarh Fort, the world\'s most spectacular fort perched 122m above the city on a volcanic rock. Jodhpur is the gateway to the Thar Desert, the center of Marwari merchant culture, and home to the Umaid Bhawan Palace — one of the world\'s largest private residences, still home to the Jodhpur royal family. The city radiates an electric energy: spice markets, blue lanes, camel caravans, and a sky that seems bluer than anywhere else.',
    history:'Jodhpur was founded in 1459 by Rao Jodha of the Rathore Rajput clan. He chose Chittar Hill (122m) for his fortress and built Mehrangarh. The city has never been conquered despite multiple sieges. The Rathore Rajputs allied with the Mughals under Akbar, providing military commanders and administrators. The blue color of Brahmin houses spread throughout the old city, now painting the entire old quarter in shades of indigo and azure.',
    bestSeason:'October to March. Avoid May-June (42°C+). Desert Festival: February.',
    idealDuration:'2-3 days', temperature:'5°C (winter nights) to 42°C (summer)',
    nearestAirport:'Jodhpur Airport (JDH) 5km from Mehrangarh Fort',
    nearestRailwayStation:'Jodhpur Junction (JU) — trains from Delhi (8 hrs overnight)',
    nearestBusStand:'Jodhpur Central Bus Stand (near clock tower)',
    tags:['Blue City','Mehrangarh Fort','Marwari','Thar Desert','Royal','Rajasthan'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:4, luxuryScore:8, budgetScore:6,
    topAttractions:[
      {name:'Mehrangarh Fort',description:'Widely considered India\'s finest fort — built from 1459 on a 122m rock above the Blue City. The 36m-high walls and seven imposing gates (Jai Pol, Fateh Pol, Loha Pol with cannonball impact marks) lead to opulent palaces: Moti Mahal, Phool Mahal, Sheesh Mahal — all displaying extraordinary craftsmanship. The Zenana Deori (women\'s quarter) views over the Blue City are breathtaking. Entry: ₹100 (Indian), ₹600 (foreign). Audio guide ₹100. Open 9AM-5PM.',location:'Mehrangarh Hill, Jodhpur city'},
      {name:'Umaid Bhawan Palace',description:'One of the world\'s largest private residences (347 rooms) built 1929-1943 of warm-golden Chittar limestone by Maharaja Umaid Singh to provide employment during a famine (3,000 workers for 15 years). Now divided between the royal family\'s residence, the Taj Hotels luxury section, and a museum. Entry: ₹30 (museum). The Taj hotel section open to hotel guests.',location:'Circuit House Road, Jodhpur'},
      {name:'Jaswant Thada',description:'A delicate white marble cenotaph (1899) built for Maharaja Jaswant Singh II — called the Taj Mahal of Marwar. The thin marble sheets are so fine the light passes through them. Surrounding gardens with portraits of Jodhpur rulers and peacocks. Spectacular views of the Blue City with Mehrangarh as backdrop. Entry: ₹30. Open 9AM-5PM.',location:'Adjacent to Mehrangarh Fort, below'},
      {name:'Clock Tower & Sardar Market',description:'The 1880 clock tower is the focal point of old Jodhpur\'s bazaar. Sardar Market surrounds it — 5 distinct bazaars selling spices (the most fragrant market in Rajasthan), textiles, handicrafts, antiques, and Jodhpur\'s famous jodhpurs (equestrian trousers). The spice section is overwhelming — mountains of turmeric, chili, dried rose petals.',location:'Sardar Market, Old City center'},
      {name:'Rao Jodha Desert Rock Park',description:'A 72-hectare park of volcanic rock at the base of Mehrangarh, recently restored to its natural landscape of desert flora — dry rivers, rocky outcrops, native trees and shrubs. The best sunset photography spot for Mehrangarh Fort above and Blue City below.',location:'Base of Mehrangarh Fort hill'},
      {name:'Toorji Ka Jhalra (Step Well)',description:'A beautifully restored 18th-century step well surrounded by blue-painted houses — Jodhpur\'s most photogenic spot beyond the fort. The 200-year-old stepwell was restored by the same family that founded RAAS Hotel. Best photographed in morning light.',location:'Old City, near Clock Tower, 10-min walk'}
    ],
    activities:['Mehrangarh Fort with ziplining (₹100 entry + ₹1500 Flying Fox zipline)','Blue City heritage walk with guide (₹500-800)','Umaid Bhawan Palace Museum + lunch (museum ₹30, lunch ₹2000-5000 Taj)','Desert camping near Rohet Garh (40km, ₹3000-6000)','Day trip to Osian (65km, cluster of 8th century temples + desert)','Sunset photography at Rao Jodha Rock Park (free)','Makhaniya Lassi tasting trail (visit 5 famous lassi shops)','Puppet show and folk dance in a haveli (₹500-1000)'],
    localFood:['Makhaniya Lassi (thick, creamy, saffron-tinged sweet lassi — Jodhpur\'s most famous drink, ₹60-120, at Mishrilal Hotel on Station Road)','Mirchi Bada (large green chili fritter stuffed with spiced potato — a uniquely Jodhpur street snack, ₹20-30)','Mawa Kachori (rich fried pastry stuffed with sweetened mawa, ₹30-50)','Rajasthani Thali (Jodhpur style with ker sangri, gatte, dal baati, churma)','Dal Baati Churma (best in Rajasthan at rooftop restaurants)','Pyaaz ki Kachori (onion-filled puff pastry breakfast)','Lassi at Om Sweet Corner (₹60-80, original location)'],
    shopping:['Antiques at Mochi Bazar and surrounding lanes (genuine antiques, furniture, brassware)','Jodhpurs (equestrian trousers, the clothing that bears the city\'s name — custom-tailored in the clock tower bazaar)','Mojri (leather shoes, ₹300-1500) in Sardar Market','Handicrafts: wrought iron lamps, mirror work, lacquerware','Textiles: bandhani, leheriya, block-printed fabrics at Kapda Bazaar','Rajasthani silver and gemstone jewelry'],
    culture:'Jodhpur is the heartland of Marwari merchant culture — one of India\'s most entrepreneurially dynamic communities, known for global trading from Calcutta and Singapore to New York. The city\'s blue houses were historically painted to denote Brahmin households, though the color later spread throughout the old city. Marwari folk music and dance — especially the Ghoomar and Kalbelia — are spectacular.',
    festivals:['Marwar Festival (October — 2-day festival of music and dance at Umaid Bhawan)','Desert Festival (February, at Osian 65km — camel races, folk music, cultural events)','RIFF (Rajasthan International Folk Festival, October — world music festival at Mehrangarh)','Nag Panchami (July/August)'],
    hotels:['RAAS Jodhpur (Boutique luxury, ₹18000-40000 — best hotel in Jodhpur, built into old city havelis with Mehrangarh view)','Umaid Bhawan Palace Taj (5-star, ₹25000-60000 — stay in the Maharaja\'s palace)','Indra Vilas (Heritage boutique, ₹8000-15000)','Singhvi Haveli (Heritage, ₹3000-6000, authentic old city haveli)','Blue House (Budget, ₹800-2000, old city with fort view from rooftop)'],
    restaurants:['Indique (Rooftop, best Mehrangarh view, ₹500-1200, Pal Haveli)','Darikhana at RAAS (Rajasthani fine dining, ₹1500-3500, lovely courtyard)','Janta Sweet Home (Local Rajasthani, ₹150-350, near clock tower)','Mishrilal Hotel (Makhaniya Lassi and Mawa Kachori, ₹50-150)','On the Rocks (Garden restaurant, ₹400-900, near Circuit House)'],
    travelTips:['Mehrangarh is best at opening (9 AM) or 2-3 hours before sunset.','The Blue City is best explored on foot — hire a local guide from the fort entrance.','Flying Fox zipline at Mehrangarh is incredible (₹1500, 6 lines over the old city).','Combine with Jaisalmer (5 hrs west) and Udaipur (5 hrs south) for a Rajasthan circuit.','In Clock Tower market: buy spices in sealed original packaging for best quality.'],
    packingTips:['Light cotton (daytime desert heat)','Warm layers (winter nights)','Sun hat','Comfortable walking shoes (old city is cobbled)','Sunscreen'],
    weather:'Winter (Oct-Feb): 5-28°C, ideal. Summer (Mar-May): 30-42°C. Monsoon (Jul-Sep): 28-35°C, light rain — the fort looks dramatic in the rain.',
    transport:'By Air: Jodhpur Airport (5km, flights from Delhi). By Rail: Jodhpur Junction — overnight trains from Delhi (8 hrs). By Bus: RSRTC from Jaisalmer (5 hrs), Jaipur (6 hrs), Udaipur (5 hrs). Within city: Autos (₹50-200), Ola/Uber.',
    itineraries:[
      {type:'2 Day',durationDays:2,estimatedCost:7000,days:[
        {day:1,activities:[
          {time:'09:00 AM',activity:'Mehrangarh Fort',description:'India\'s finest fort. Audio guide and 2-3 hours in the palace museums.',costEstimate:700},
          {time:'12:00 PM',activity:'Jaswant Thada',description:'Marble cenotaph. Beautiful views of the Blue City.',costEstimate:30},
          {time:'01:30 PM',activity:'Makhaniya Lassi at Mishrilal',description:'The most famous lassi in Rajasthan.',costEstimate:120},
          {time:'03:00 PM',activity:'Clock Tower & Sardar Market',description:'Spice bazaar, antiques, jodhpurs, handicrafts.',costEstimate:1500},
          {time:'05:30 PM',activity:'Rao Jodha Rock Park sunset',description:'Volcanic rock park with fort views in golden hour.',costEstimate:0},
          {time:'08:00 PM',activity:'Dinner at Indique',description:'Rooftop restaurant with fort view and Rajasthani cuisine.',costEstimate:1000}
        ]},
        {day:2,activities:[
          {time:'09:00 AM',activity:'Blue City old lanes walk',description:'Explore the indigo lanes with a local guide.',costEstimate:600},
          {time:'11:00 AM',activity:'Toorji Ka Jhalra stepwell',description:'The most photogenic stepwell in Rajasthan.',costEstimate:0},
          {time:'12:30 PM',activity:'Mirchi Bada + Mawa Kachori',description:'Uniquely Jodhpur street snacks near clock tower.',costEstimate:100},
          {time:'02:00 PM',activity:'Umaid Bhawan Palace',description:'Museum of Jodhpur royalty. 347-room palace.',costEstimate:30},
          {time:'04:00 PM',activity:'Depart for Jaisalmer or Udaipur',description:'5-hour road journey.',costEstimate:1500}
        ]}
      ]}
    ]
  },
  {
    id:'haridwar-01', slug:'haridwar', name:'Haridwar', state:'Uttarakhand', country:'India',
    category:'Pilgrimage', budget:'Budget', rating:4.6, reviewCount:48000,
    coordinates:{lat:29.9457,lng:78.1642}, altitude:314,
    coverImage:'https://images.unsplash.com/photo-1544535830-9df3f56fff6a?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1626714816894-af17fe32fc95?w=800&q=80'],
    description:'Haridwar — "Gateway to God" (Hari = Vishnu, Dwar = door) — is one of the seven sacred cities of Hinduism, standing where the Ganges exits the Himalayan foothills and flows onto the plains. It is the starting point of the Char Dham pilgrimage (Kedarnath, Badrinath, Gangotri, Yamunotri) and one of four cities that host the Kumbh Mela — the world\'s largest human gathering. The evening Ganga Aarti at Har Ki Pauri ghat, where the river is believed to touch the earth, draws thousands nightly and is one of India\'s most moving spiritual experiences.',
    history:'Haridwar has been a pilgrimage site since ancient times — mentioned in the Mahabharata and Puranas as Kapilsthan and Gangadwar. The Har Ki Pauri ghat is believed to have been built by King Vikramaditya in the 1st century BCE in memory of his brother Bhartrihari. Kumbh Mela has been held here for over 1,000 years — Emperor Akbar visited in 1598 CE. The 2021 Kumbh Mela attracted 9 million devotees in a single day.',
    bestSeason:'October to April. Avoid May-June (very hot). Kumbh Mela: every 12 years (2033 next at Haridwar).',
    idealDuration:'1-2 days', temperature:'5°C (winter) to 42°C (summer)',
    nearestAirport:'Jolly Grant Airport, Dehradun (DED) 35km',
    nearestRailwayStation:'Haridwar Junction (HW) — daily trains from Delhi (4.5 hrs Shatabdi), Mumbai',
    nearestBusStand:'Haridwar Bus Stand (UPSRTC/GMOU near railway station)',
    tags:['Ganges','Pilgrimage','Aarti','Kumbh Mela','Char Dham','Holy City'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:2, luxuryScore:4, budgetScore:9,
    topAttractions:[
      {name:'Har Ki Pauri (Ghat of God)',description:'The most sacred ghat in Haridwar — a series of stone steps leading into the swift-flowing Ganges where a footprint of Lord Vishnu is believed to be embedded in the stone. The Ganga Aarti here (6:30-7:30 PM in winter, 7-8 PM in summer) — performed by dozens of priests with large oil lamps — is deeply moving. The floating diyas (oil lamps on leaf boats) released by pilgrims create a magical scene.',location:'Har Ki Pauri, central Haridwar'},
      {name:'Mansa Devi Temple',description:'A hilltop temple of Goddess Mansa Devi accessible by cable car (₹165 return, 3 min) or a 1km steep walk up Bilwa Parvat hill. One of the most important temples in the region. Tie a sacred thread (mauli) on the tree here — your wish is believed to come true. Views of the Ganges and Himalayan foothills.',location:'Bilwa Parvat Hill, Haridwar'},
      {name:'Chandi Devi Temple',description:'A 9th-century temple dedicated to Goddess Chandi on Neel Parvat, reachable by ropeway (₹142 return) or 3km trek. The temple was built by Adi Shankaracharya in 8th century CE and the main idol was installed by Kashmiri King Suchat Singh in 1929. Excellent Himalayan views.',location:'Neel Parvat Hill, Haridwar'},
      {name:'Shantikunj & Gayatri Shakti Peeth',description:'The international headquarters of All World Gayatri Pariwar — a spiritual research center established by Pandit Shriram Sharma Acharya in 1971. Free retreat courses in meditation, yoga, and Vedic studies are offered. The campus is beautiful and the energy is remarkably peaceful.',location:'3km from Haridwar railway station'},
      {name:'Rajaji Tiger Reserve (Chilla Range)',description:'A Project Tiger reserve 15km from Haridwar, home to tigers, leopards, Asian elephants, crocodiles, and over 330 bird species. The Chilla range jeep safari (₹2500-4000) is the most accessible wildlife experience near Haridwar. Open November to June.',location:'15km from Haridwar, Chilla'}
    ],
    activities:['Evening Ganga Aarti at Har Ki Pauri (free, 6:30-7:30PM)','Cable car to Mansa Devi Temple (₹165 return)','Holy Ganges dip at Har Ki Pauri (free)','Rajaji Tiger Reserve jeep safari (₹2500-4000)','White-water rafting starting point (head to Rishikesh, 25km)','Yoga and meditation at Shantikunj (free programs)','Ayurvedic massage (many ashrams, ₹500-1500)','Temple circuit: Sapt Rishi Ashram, Daksha Mahadev Temple'],
    localFood:['Haridwar Chaat (especially on the ghats — papdi chaat, aloo tikki, ₹30-80)','Kachori with sabzi (crispy puff pastry with spiced vegetables — ghat-side breakfast)','Lassi and Rabri (thick cream dessert at shops near Har Ki Pauri)','Puri Sabzi (fried bread with potato curry — ghat dhabas, ₹30-60)','Makhan Mishri (butter and sugar — simple temple prasad)','Milk-based sweets at ghat shops (₹20-50)'],
    shopping:['Rudraksha beads and malas (₹50-5000, ghat shops)','Ganga Jal (holy Ganges water in copper vessels ₹50-500)','Religious items: conch shells, camphor, incense, agarbatti','Copper and brass puja items','Herbal Ayurvedic medicines from certified shops'],
    culture:'Haridwar is the living heart of Hindu pilgrimage culture, where the ancient Vedic tradition of daily river bathing, temple worship, and guru-disciple learning continues uninterrupted. The ashram culture (Parmarth Niketan branch is here) draws spiritual seekers from around the world.',
    festivals:['Kumbh Mela (every 12 years — next 2033 at Haridwar. 2021 Kumbh drew 9 million in a single day)','Ardha Kumbh (every 6 years)','Kanwar Yatra (July/August — millions of Shiva devotees carry Ganges water home)','Ganga Dussehra (June — bathing festival)'],
    hotels:['Haveli Hari Ganga (Heritage, ₹5000-10000, on the Ganges — most beautiful property)','Hotel Ganga Lahari (3-star, ₹2000-4500, ghat view)','Rishikul Yogshala Ashram (₹500-1500 including meals — ashram stay)','Hotel Aarti (Budget, ₹800-2000, near railway station)'],
    restaurants:['Chotiwala Restaurant (Vegetarian, ₹150-350, on Main Road — the famous mascot)','Aastha Restaurant (Pure vegetarian, ₹150-350, near Har Ki Pauri)','Mohan Ji Pure Vegetarian (₹100-250, local thali)'],
    travelTips:['Haridwar is vegetarian and alcohol-free — respect this.','For Ganga Aarti: arrive at Har Ki Pauri by 6 PM for a good spot near the ghat.','Lock your valuables — the ghats can be pick-pocketed.','The Ganges current is very strong — only bathe at designated ghats with chains.','Combine with Rishikesh (25km upstream) and Dehradun (55km) for a day trip circuit.'],
    packingTips:['Conservative clothes for ghats','Flip-flops (easy to remove at temple)','Small backpack','Warm layers for winter mornings'],
    weather:'Winter (Nov-Feb): 5-18°C, cold mornings. Spring (Mar-Apr): 18-32°C. Summer (May-Jun): 32-42°C, hot. Monsoon (Jul-Sep): 28-38°C, rain.',
    transport:'By Rail: Haridwar Junction (4.5 hrs from Delhi by Shatabdi, ₹600-1000). By Bus: GMOU from Delhi (6 hrs, ₹350-600). To Rishikesh: shared auto (₹60, 45 min).',
    itineraries:[{type:'1 Day',durationDays:1,estimatedCost:1500,days:[
      {day:1,activities:[
        {time:'06:00 AM',activity:'Holy dip at Har Ki Pauri',description:'Join the pilgrims at dawn for a sacred Ganges dip.',costEstimate:0},
        {time:'08:00 AM',activity:'Temple circuit',description:'Mansa Devi cable car, Chandi Devi.',costEstimate:300},
        {time:'11:00 AM',activity:'Ghat walk and chaat',description:'Walk the ghat front, try chaat and lassi.',costEstimate:200},
        {time:'01:00 PM',activity:'Chotiwala lunch',description:'Vegetarian thali at the classic restaurant.',costEstimate:300},
        {time:'04:00 PM',activity:'Shopping at ghat bazaars',description:'Rudraksha, Ganga Jal, incense.',costEstimate:500},
        {time:'06:30 PM',activity:'Ganga Aarti at Har Ki Pauri',description:'The evening fire ceremony — one of India\'s most moving rituals.',costEstimate:0}
      ]}
    ]}]
  }
];

function writeDestination(dest) {
  const stateDir = path.join(OUTPUT_DIR, 'India', dest.state.replace(/[^a-zA-Z]/g, ''));
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(path.join(stateDir, `${dest.slug}.json`), JSON.stringify(dest, null, 2));
  console.log(`  ✅ ${dest.name} (${dest.state})`);
}

console.log('📍 Writing Part 7-fix destinations...');
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
console.log(`\n✅ Part 7-fix complete: ${DESTINATIONS.length} destinations written.`);
