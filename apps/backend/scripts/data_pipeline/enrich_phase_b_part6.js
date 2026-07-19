const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = '/home/nithish/.gemini/antigravity/scratch/voyageai-frontend/public/data/destinations';

const DESTINATIONS = [
  {
    id:'shimla-01', slug:'shimla', name:'Shimla', state:'Himachal Pradesh', country:'India',
    category:'Nature', budget:'Mid-range', rating:4.5, reviewCount:52000,
    coordinates:{lat:31.1048,lng:77.1734}, altitude:2206,
    coverImage:'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'],
    description:'Shimla is the capital of Himachal Pradesh and one of India\'s most beloved hill stations, perched at 2,206 m in the Himalayan foothills. Once the summer capital of British India, it retains its colonial charm in the Christ Church (1857), the Gaiety Theatre, and the Tudor-style buildings along The Mall Road. The UNESCO-listed Kalka-Shimla Railway (1903) — a narrow-gauge Heritage Railway — winds through 102 tunnels and 864 bridges to reach this mountain queen.',
    history:'Shimla was a small village before the British discovered it in 1819. From 1864 it served as the summer capital of British India, where the entire colonial administration relocated for 6 months each year. The Kalka-Shimla Railway (1903) connected it to the plains and was inscribed as a UNESCO World Heritage site in 2008 as part of the Mountain Railways of India.',
    bestSeason:'March to June (pleasant, 15-25°C). October-November (post-monsoon clarity). December-February (snowfall, Christmas/New Year crowds).',
    idealDuration:'3-4 days', temperature:'−4°C to 28°C',
    nearestAirport:'Shimla Airport (SLV) 23km (limited flights); Chandigarh Airport (IXC) 116km',
    nearestRailwayStation:'Shimla Railway Station (on Kalka-Shimla Heritage Railway); Kalka Junction 96km on main rail network',
    nearestBusStand:'Shimla ISBT (Tutikandi Bus Stand)',
    tags:['Colonial','Heritage Railway','Snow','Apple Orchards','Trekking','Hill Station'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:5, luxuryScore:6, budgetScore:6,
    topAttractions:[
      {name:'The Mall Road & Ridge',description:'The 1.4 km car-free promenade at the heart of Shimla, lined with colonial-era shops, restaurants, and the Neo-Gothic Christ Church (1857). The Ridge provides sweeping views of the Himalayan ranges. Weekend mornings see thousands strolling here.',location:'Central Shimla'},
      {name:'Jakhu Temple & Jakhu Hill',description:'A revered Hanuman temple at 2455m, reached by a 2 km forest trail or ropeway (₹250). Large resident monkeys (Rhesus macaques) are a constant presence — keep food hidden. The 108-foot Hanuman statue is visible from the entire city.',location:'2 km from Mall Road, Jakhu Hill'},
      {name:'Kufri',description:'A popular tourist spot 14km from Shimla at 2600m, famous for skiing (January-February), snow activities (yak rides, tobogganing), and apple orchards. Himalayan Nature Park here has snow leopard, barking deer, and pheasants.',location:'14 km from Shimla'},
      {name:'Chail',description:'A pristine hill resort 45km from Shimla at 2250m, built by the Maharaja of Patiala after he was banished from Shimla by Lord Kitchener. Houses the world\'s highest cricket ground (2444m). Chail Palace is now a heritage hotel.',location:'45 km from Shimla'},
      {name:'Kalka-Shimla Heritage Railway',description:'A UNESCO World Heritage narrow-gauge railway built in 1903, running 96km through 102 tunnels, 864 bridges, and 18 stations. The toy train journey takes 5-6 hours and is one of India\'s most scenic rail experiences. Shivalik Deluxe Express is the premium service.',location:'Kalka to Shimla'},
      {name:'Naldehra Golf Course',description:'India\'s oldest 9-hole golf course (1905), laid out by Lord Curzon at 2044m. Still beautifully maintained with cedar and oak trees. Day visitor greens fee: ₹700-1200. 26km from Shimla.',location:'26 km from Shimla, Naldehra'}
    ],
    activities:['Heritage Rail ride Kalka to Shimla (₹255-1050, 6 hrs)','Skiing at Kufri (Jan-Feb, ₹500-1500 lessons)','Ropeway to Jakhu Temple (₹250 return)','Apple orchard walk (Sept-Oct harvest season)','Trekking: Shali Tibba (8km round trip)','Camping near Chail (₹1500-3000/night)','Rock climbing at Dhalli (₹500-800)','Horse riding on Mall Road (₹200/30 min)'],
    localFood:['Siddu (steamed wheat bread stuffed with poppy seeds or lentils, served with ghee and dal)','Babru (black gram flour bread, a Shimla breakfast staple)','Chha Gosht (marinated lamb, cooked with yogurt and spices)','Aktori (buckwheat pancakes)','Trout fish (grilled/fried, from mountain streams)','Mittha (sweet rice cooked in ghee for festivals)','Bhey (lotus stem cooked in a local style)'],
    shopping:['Lakkar Bazaar (wooden artifacts, walking sticks, Himachali caps — ₹100-500)','The Mall Road shops (woolen garments, shawls ₹800-5000)','Himachal Emporium (fixed price, certified local crafts)','Ram Bazaar (local produce, spices, dried fruits)','Tibetan Market near ISBT (Tibetan handicrafts)'],
    culture:'Shimla\'s culture is a unique British-Indian hybrid — Victorian-era institutions (Gaiety Theatre dating from 1887 still hosts plays) alongside Himachali folk traditions. The Lavi Fair (November, Rampur, 65km from Shimla) is one of Himachal\'s oldest trade fairs dating to the Mughal era.',
    festivals:['Summer Festival (May-June — cultural programs on Ridge)','Shimla Winter Carnival (January — snow games, cultural events)','Lohri and Makar Sankranti (January — bonfires, folk songs)','Dussehra (October — Ram Leela performances)'],
    hotels:['Wildflower Hall, Oberoi (5-star, ₹25,000-50,000 — former Lord Kitchener residence, 34km from Shimla at Charabra)','Hotel Cecil, Shimla (Heritage, ₹8,000-15,000, on Mall Road — a 1884 institution)','Chapslee (Heritage, ₹6,000-12,000, former Maharaja\'s bungalow)','Hotel Combermere (Budget heritage, ₹2,000-4,000, Mall Road)','The Oberoi Clarke\'s (Heritage, ₹7,000-14,000)','HPTDC Hotel Holiday Home (Budget, ₹1,500-3,000, government-run)'],
    restaurants:['Ashiana & Goofa (multi-level restaurant on Ridge, ₹300-800, best views)','Indian Coffee House (heritage café since 1958, ₹100-300, Mall Road)','Eighteen71 Cookhouse & Bar (modern Indian, ₹500-1200, Oberoi Cecil)','Café Simla Times (continental, ₹300-700)','Wake & Bake Café (breakfast, ₹200-500, Lower Bazaar)'],
    travelTips:['Mall Road is car-free — park at Cart Road and take the lift (₹10).','Book the Kalka-Shimla toy train at least 1 week in advance on irctc.co.in.','Monkeys on Jakhu trail are aggressive — keep food inside bags and don\'t make eye contact.','The Ridge and Christ Church are best at sunrise before crowds arrive.','Carry warm layers even in June — evenings at 2200m cool rapidly.'],
    packingTips:['Heavy jacket (autumn and spring)','Thermals (winter)','Rain poncho (July-September)','Walking shoes for Mall Road','Sunscreen SPF 50+'],
    weather:'Winter (Dec-Feb): −4 to 8°C, snowfall common. Spring (Mar-Apr): 10-20°C. Summer (May-Jun): 18-28°C, pleasant — peak season. Monsoon (Jul-Sep): 15-22°C, heavy rain, landslides possible. Autumn (Oct-Nov): 10-22°C — clear skies, best views.',
    transport:'By Rail: Kalka-Shimla Heritage Railway (5.5 hrs, ₹255-1050) or Shatabdi to Kalka from Delhi (3.5 hrs) then toy train. By Bus: HRTC Volvo from Delhi ISBT (9-10 hrs, ₹700-1200). By Air: Shimla Airport (23km, limited flights from Delhi). Within Shimla: Walk (town is compact), lift at Mall Road (₹10), autos to suburbs.',
    itineraries:[{type:'3 Day',durationDays:3,estimatedCost:7000,days:[
      {day:1,activities:[
        {time:'11:00 AM',activity:'Arrive + Mall Road stroll',description:'Walk from Scandal Point to Christ Church on The Ridge.',costEstimate:0},
        {time:'03:00 PM',activity:'Jakhu Temple ropeway',description:'Cable car to the Hanuman temple. Beware monkeys.',costEstimate:250},
        {time:'06:00 PM',activity:'Sunset on The Ridge',description:'Panoramic Himalayan sunset.',costEstimate:0},
        {time:'08:00 PM',activity:'Dinner at Ashiana',description:'Multi-cuisine with city views.',costEstimate:600}
      ]},
      {day:2,activities:[
        {time:'09:00 AM',activity:'Kufri day trip',description:'Snow activities, Himalayan Nature Park, yak rides.',costEstimate:1500},
        {time:'02:00 PM',activity:'Chail (45 km)',description:'World\'s highest cricket ground. Chail Palace gardens.',costEstimate:1500},
        {time:'07:00 PM',activity:'Return + Lakkar Bazaar shopping',description:'Wooden crafts and Himachali souvenirs.',costEstimate:500}
      ]},
      {day:3,activities:[
        {time:'07:00 AM',activity:'Toy Train ride to Barog (partial)',description:'Board the Heritage Railway for a scenic 1.5 hr ride to Barog and return.',costEstimate:400},
        {time:'10:00 AM',activity:'Scandal Point + Mall Road shopping',description:'Shawls, woolen caps at Mall Road boutiques.',costEstimate:1000},
        {time:'01:00 PM',activity:'Lunch at Indian Coffee House',description:'Heritage café, filter coffee and sandwiches since 1958.',costEstimate:200},
        {time:'03:00 PM',activity:'Depart',description:'Bus to Chandigarh or Kalka for onward journey.',costEstimate:500}
      ]}
    ]}]
  },
  {
    id:'mcleodganj-01', slug:'mcleodganj', name:'Mcleodganj', state:'Himachal Pradesh', country:'India',
    category:'Pilgrimage', budget:'Budget', rating:4.6, reviewCount:38000,
    coordinates:{lat:32.2426,lng:76.3234}, altitude:1457,
    coverImage:'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80','https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&q=80'],
    description:'McLeod Ganj — "Little Lhasa" — is a hill suburb of Dharamshala in Himachal Pradesh, and the seat of the Tibetan government-in-exile and the Dalai Lama since 1960. The town is a fascinating blend of Tibetan Buddhist culture, Himachali mountain life, and a thriving international backpacker scene. The Dalai Lama\'s presence has made this one of the world\'s most important centers of Tibetan Buddhism, drawing pilgrims, students, activists, and travelers seeking spiritual teachings, meditation retreats, and Himalayan trekking.',
    history:'McLeod Ganj was named after Sir Donald Friell McLeod, Lieutenant Governor of Punjab under the British. After the 1959 Tibetan uprising and the Dalai Lama\'s flight from Lhasa, the Indian government granted Dharamshala to the Tibetan government-in-exile. The Fourteenth Dalai Lama (Tenzin Gyatso) has resided here since 1960, transforming it into the capital of the Tibetan diaspora.',
    bestSeason:'March to June. September to November. Avoid July-August monsoon (heavy landslides on mountain roads).',
    idealDuration:'3-4 days',temperature:'4°C to 28°C',
    nearestAirport:'Gaggal Airport (Kangra-Dharamshala, DHM) 18km from McLeodganj',
    nearestRailwayStation:'Pathankot Cantt (85km) on broad gauge; Kangra (19km) on narrow gauge',
    nearestBusStand:'Dharamshala Bus Stand (10km from McLeodganj)',
    tags:['Tibetan','Dalai Lama','Buddhism','Trekking','Meditation','Mountains'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:7, luxuryScore:4, budgetScore:9,
    topAttractions:[
      {name:'Namgyal Monastery & Tsuglagkhang Complex',description:'The Dalai Lama\'s personal monastery and temple complex — the most important Tibetan Buddhist site outside Tibet. The Tsuglagkhang (main temple) houses images of Shakyamuni Buddha, Avalokiteshvara, and Padmasambhava. The Dalai Lama gives public teachings here (announced on dalailama.com). Entry: Free.',location:'Temple Road, McLeodganj'},
      {name:'Triund Trek',description:'The most popular day or overnight trek from McLeodganj — a 9km trail climbing from Dharamkot (1450m) to Triund ridge (2875m) with spectacular views of the Dhauladhar range and the Kangra valley below. Allow 4-5 hours up. Overnight camping at the ridge (₹100 camping fee). Best: March-June, September-November.',location:'9km from McLeodganj (trailhead at Dharamkot)'},
      {name:'Bhagsu Waterfall & Bhagsu Nag Temple',description:'A 2km easy walk from McLeodganj leads to the ancient Bhagsu Nag Shiva temple (named for a demon king) and a 20m waterfall beyond it. The area has become a backpacker hub with cafes and guesthouses. Further trekking continues to Shiva Café (1.5km more, best coffee with Himalayan views).',location:'2km from McLeodganj'},
      {name:'Tibet Museum (Gu-Chu-Sum)',description:'A powerful museum documenting Tibetan culture, history, and the human rights situation in Tibet under Chinese rule. Personal testimonies from political prisoners, photographs, and cultural artifacts. Entry: Free. Open 9AM-5PM.',location:'McLeodganj main road'},
      {name:'Library of Tibetan Works and Archives',description:'The most important repository of Tibetan texts and manuscripts outside Tibet — over 80,000 manuscripts and 200,000+ books. Offers regular teachings on Buddhist philosophy, Tibetan language, and culture. A research center for serious students of Buddhism.',location:'Gangkyi, near Dharamshala'}
    ],
    activities:['Triund Trek (9km, ₹0 entry, rent sleeping bag ₹150)','Vipassana or meditation retreat (Tushita Meditation Centre, 10-day silent courses)','Tibetan cooking class (₹500-800)','Volunteer with Tibetan NGOs (various orgs, 1-week minimum)','Bhagsu Nag to Shiva Café hike (3km, café at 2600m)','Kangra Fort day trip (21km, 1500-year-old fort)','Yoga at Himalayan Yoga Institute (₹200/class)','Rock climbing at Dharamkot (₹600-1000)'],
    localFood:['Thukpa (Tibetan noodle soup — best at Lung Ta Japanese-Tibetan restaurant)','Momos (steamed/fried dumplings, best at Nick\'s Italian Kitchen has veg momos)','Tsampa (roasted barley flour, a Tibetan staple)','Tibetan Butter Tea (salty, an acquired taste — try at monastery)','Tingmo (fluffy steamed Tibetan bread)','Israeli food (falafel, hummus — large Israeli community)','Banana Nutella crepe at Shiva Café (2600m — legendary)'],
    shopping:['Tibetan handicrafts: thangkas, prayer wheels, singing bowls (Main Chowk)','Tibetan herbal medicine and teas','Woolen Tibetan rugs and wall hangings','Tibetan jewelry (silver, turquoise, coral)','Refugee handicraft center (direct from artisans)'],
    culture:'McLeodganj is a living cultural hub of Tibetan civilization in exile. The presence of the Dalai Lama draws Buddhist scholars, monks from around the world, and meditators. The town has a unique cosmopolitan character — Tibetan refugees, Israeli backpackers, Indian tourists, and Western spiritual seekers all coexist.',
    festivals:['Losar (Tibetan New Year, Feb/March — traditional dancing at Tsuglagkhang)','Buddha Purnima (April/May — major celebrations)','Tibetan Uprising Day (March 10 — commemorates 1959 Tibetan resistance)','Dalai Lama\'s teachings (various — check dalailama.com for schedule)'],
    hotels:['Chonor House (Boutique Tibetan guesthouse, ₹4000-8000, near Tsuglagkhang)','Hotel Tibet (3-star, ₹3000-6000, Bhagsu Road)','Zostel McLeodganj (Hostel, ₹400-700)','Pema Thang Guest House (Budget, ₹800-1500, authentic Tibetan family)','Om Hotel (Mid-range, ₹1500-3000, mountain view)'],
    restaurants:['Lung Ta Japanese-Tibetan (Best thukpa and momo, ₹150-400, Jogibara Road)','Nick\'s Italian Kitchen (Italian-Tibetan fusion, ₹300-700)','Illiterati Books & Coffee (Café + bookshop, ₹150-400)','Tibet Kitchen (Authentic Tibetan, ₹150-350)','Shiva Café (2600m viewpoint café — worth the hike, ₹200-500)'],
    travelTips:['Check dalailama.com for public teaching schedules if you want to attend.','Triund overnight: carry sleeping bag (rent at McLeodganj, ₹150) and food. No shops on top.','Dharamkot is a quieter alternative base to McLeodganj for long-term stays.','Respectfully cover shoulders and knees at monastery.','Cannabis is easily offered here — it is illegal in India regardless of quantity.'],
    packingTips:['Warm jacket (cold year-round in evenings)','Trekking boots (Triund trail is rocky)','Waterproof jacket','Respectful clothing for monastery visits','Rain poncho (July-Aug)'],
    weather:'Spring (Mar-May): 12-25°C, best trekking. Monsoon (Jun-Sep): 15-22°C, heavy rain, Triund trail muddy. Autumn (Oct-Nov): 10-22°C, clear and lovely. Winter (Dec-Feb): 4-12°C, cold, some snow on Triund.',
    transport:'By Bus: HRTC Volvo from Delhi (12 hrs, ₹600-1200). By Air: Gaggal Airport (18km, flights from Delhi 1hr). From Pathankot railway station: taxi or bus to Dharamshala (1.5hrs). Within area: Auto-rickshaws, shared taxis to Dharamkot/Bhagsu (₹50-200).',
    itineraries:[{type:'3 Day',durationDays:3,estimatedCost:5000,days:[
      {day:1,activities:[
        {time:'10:00 AM',activity:'Tsuglagkhang Complex',description:'Namgyal Monastery, Tibet Museum, Dalai Lama\'s residence area.',costEstimate:0},
        {time:'01:00 PM',activity:'Lunch at Tibet Kitchen',description:'Momos and thukpa.',costEstimate:250},
        {time:'03:00 PM',activity:'Bhagsu Waterfall & Shiva Café hike',description:'3km hike through forest to viewpoint café.',costEstimate:300},
        {time:'07:00 PM',activity:'Main Chowk dinner and stroll',description:'Explore craft stalls, choose restaurant of your liking.',costEstimate:400}
      ]},
      {day:2,activities:[
        {time:'07:00 AM',activity:'Triund Trek',description:'9km hike from Dharamkot. All-day adventure with Dhauladhar views.',costEstimate:200},
        {time:'05:00 PM',activity:'Overnight on Triund',description:'Camp under stars with full Himalayan panorama.',costEstimate:500}
      ]},
      {day:3,activities:[
        {time:'06:00 AM',activity:'Triund Sunrise',description:'Dawn light on the Dhauladhar peaks from the ridge.',costEstimate:0},
        {time:'09:00 AM',activity:'Descend and explore Dharamkot',description:'The quieter, more bohemian twin village.',costEstimate:0},
        {time:'01:00 PM',activity:'Library of Tibetan Works',description:'World\'s largest collection of Tibetan manuscripts.',costEstimate:0},
        {time:'04:00 PM',activity:'Depart',description:'Bus to Delhi or Pathankot.',costEstimate:600}
      ]}
    ]}]
  },
  {
    id:'nainital-01', slug:'nainital', name:'Nainital', state:'Uttarakhand', country:'India',
    category:'Nature', budget:'Mid-range', rating:4.5, reviewCount:45000,
    coordinates:{lat:29.3919,lng:79.4542}, altitude:2084,
    coverImage:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&q=80'],
    description:'Nainital is a charming hill resort in the Kumaon Himalayas of Uttarakhand, centered around the pear-shaped Naini Lake at 2,084 m. The town sits in a horseshoe-shaped valley with forested hills rising steeply on three sides. Famous for its boating on the lake, the Naina Devi Temple on its northern shore, Snow View Point accessible by cable car, and as the base for Jim Corbett National Park. The Mall Road rings the lake, lined with Victorian-era hotels, shops, and restaurants.',
    history:'Nainital was "discovered" by the British sugar merchant P. Barron in 1841 who was enchanted by the lake. It became a popular summer retreat for the British Indian government and was made the summer capital of the United Provinces. Several prestigious schools established by the British — St. Joseph\'s College, Sherwood College, Birla Vidya Mandir — still stand. The Naina Devi Temple, said to be where the eye (nayana) of Sati fell during Shiva\'s cosmic dance, has existed for thousands of years.',
    bestSeason:'March to June (summer). October to November (post-monsoon clear views). Avoid monsoon (July-September — landslides). Christmas-New Year is very crowded.',
    idealDuration:'2-3 days', temperature:'4°C (winter) to 27°C (summer)',
    nearestAirport:'Pantnagar Airport (PGH) 65km from Nainital',
    nearestRailwayStation:'Kathgodam Railway Station (34km) — trains from Delhi (Shatabdi 5 hrs)',
    nearestBusStand:'Nainital Bus Stand (Tallital)',
    tags:['Lake','Boating','Hill Station','Kumaon','Trekking','Snow View'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:5, luxuryScore:5, budgetScore:6,
    topAttractions:[
      {name:'Naini Lake & Boating',description:'The defining feature of Nainital — a 1.4 km × 0.5 km natural lake surrounded by hills. Rowing and pedal boats available from both Mallital and Tallital boating clubs (₹150-250 for 30 minutes). Early morning rows before 8 AM are magical — mist over the water, birds calling.',location:'Central Nainital'},
      {name:'Snow View Point',description:'At 2270m — the highest easily accessible viewpoint offering spectacular views of the Himalayan ranges including Nanda Devi (7817m), Trisul (7120m), and Panchachuli peaks on clear days. Accessible by ropeway (₹150 return, 3 minutes) or 2.5km trek.',location:'2.5 km from Mall Road via ropeway or trek'},
      {name:'Tiffin Top (Dorothy\'s Seat)',description:'A 2292m summit reached by 4km trek or horse ride (₹400 return) through oak and rhododendron forest. Named after Dorothy Kellett who died here in a plane crash. Offers panoramic views of Nainital lake and the Himalayan panorama.',location:'4 km from Nainital town'},
      {name:'Naina Devi Temple',description:'One of 51 Shakti Peethas — built on the northern shore of Naini Lake where, according to legend, the eye of Goddess Sati fell when Shiva carried her body. The current temple was rebuilt after a massive landslide in 1880. Always busy; most crowded during Navratri.',location:'Mallital, northern shore of Naini Lake'},
      {name:'Bhimtal & Sat Tal (Day Trip)',description:'A cluster of lakes 22km from Nainital. Bhimtal (1370m) has an island in the middle with a restaurant and an aquarium. Sat Tal (Seven Lakes) is a peaceful forest circuit of interconnected lakes — excellent birding, kayaking (₹200/hr), and nature walks.',location:'22-27 km from Nainital'}
    ],
    activities:['Boating on Naini Lake (₹150-250/30 min)','Ropeway to Snow View Point (₹150 return)','Horse ride to Tiffin Top (₹400 return)','Day trip to Bhimtal and Sat Tal (₹800-1200 taxi)','Jim Corbett National Park safari (65km, ₹3000-6000)','Mukteshwar temple and orchard visit (51km, 2200m)','Rock climbing near Nainital (₹500-800 guided)','Photography walk at dawn on Mall Road'],
    localFood:['Bal Mithai (fudge-like chocolate sweet coated with white sugar balls — Uttarakhand\'s signature, buy at Thaguni\'s or Sanjay\'s shop)','Singori (cone of malu leaves filled with khoya sweet)','Aloo Ke Gutke (spiced potatoes cooked Kumaoni style)','Kumaoni Thali (with bhatt ki churkani, jholi, aloo tamatar)','Trout fish from Bhimtal','Momos and Tibetan food (large Tibetan community)'],
    shopping:['Tibetan Market (woolen caps, jackets, jewelry ₹200-2000)','Mall Road shops (candles, woolen items, toys)','Nainital bee honey (from local apiaries ₹300-600/kg)','Handmade candles (Nainital is famous for these)','Books at local secondhand bookshops'],
    culture:'Nainital has a strong colonial legacy visible in its architecture, schools (Sherwood College founded 1869, St. Joseph\'s 1888), and the annual flower show at the Flats (May). The Kumaoni people have their own rich cultural tradition of Jhora folk dances and the Holi of Kumaon is uniquely celebrated with folk songs.',
    festivals:['Nainital Mahotsav (February/March — cultural fair at the Flats)','Sheetla Mata Fair (March-April)','Summer Festival (May-June — flower show)','Uttarayani/Makar Sankranti (January — kite flying)'],
    hotels:['The Naini Retreat (4-star, ₹8000-15000, lake view)','Manu Maharani Hotel (Heritage, ₹5000-10000)','The Pavilion Hotel (Mid-range, ₹3000-6000)','Hotel Evelyn (Budget, ₹1500-3000, near lake)','KMVN Tourist Rest House (Government, ₹1200-2500)'],
    restaurants:['Sakley\'s Restaurant (European + Indian, a Nainital institution since 1936, ₹300-700)','Embassy Restaurant (Multicuisine, ₹300-600, Mall Road)','Café Retreat (Coffee and snacks, ₹150-400)','Momo\'s Café (Tibetan, ₹150-300, Mallital)'],
    travelTips:['Nainital gets extremely crowded in May-June and October-November weekends — book hotels well in advance.','Mall Road is one-way and traffic-heavy. Walk instead.','Monkeys steal food — keep bags closed at Snow View Point.','Avoid Naini Lake boat rides on rainy days — rough water.','Jim Corbett safari should be booked 30-90 days in advance through the official portal.'],
    packingTips:['Warm jacket (evenings are cold)','Comfortable walking shoes','Rain poncho (monsoon)','Sunscreen','Camera'],
    weather:'Winter (Nov-Feb): 4-12°C, some frost. Spring (Mar-Apr): 12-22°C. Summer (May-Jun): 15-27°C — peak season. Monsoon (Jul-Sep): 15-22°C, heavy landslides. Autumn (Oct): 12-22°C, best clarity.',
    transport:'By Rail: Kathgodam (34km) — Shatabdi from Delhi (5 hrs, ₹800-1200), or Ranikhet Express. By Bus: UPSRTC from Delhi Anand Vihar (8 hrs, ₹400-700). By Road: Taxi from Kathgodam to Nainital ₹700-1000. Within Nainital: Walk (1.5km lakefront circuit), e-rickshaws, horse rides.',
    itineraries:[{type:'2 Day',durationDays:2,estimatedCost:5000,days:[
      {day:1,activities:[
        {time:'10:00 AM',activity:'Naini Lake boating',description:'Rent a rowing boat for 30-45 min on the lake.',costEstimate:250},
        {time:'11:30 AM',activity:'Naina Devi Temple',description:'Visit the lakeside temple.',costEstimate:0},
        {time:'01:00 PM',activity:'Lunch at Sakley\'s',description:'Classic Nainital dining experience.',costEstimate:500},
        {time:'03:00 PM',activity:'Ropeway to Snow View Point',description:'Cable car, Himalayan panorama.',costEstimate:150},
        {time:'05:30 PM',activity:'Mall Road stroll',description:'Buy Bal Mithai and woolen souvenirs.',costEstimate:500}
      ]},
      {day:2,activities:[
        {time:'08:00 AM',activity:'Tiffin Top horse ride or trek',description:'4km to Dorothy\'s Seat for panoramic views.',costEstimate:400},
        {time:'11:00 AM',activity:'Bhimtal day trip',description:'Visit the lake with island aquarium.',costEstimate:1000},
        {time:'02:00 PM',activity:'Sat Tal kayaking',description:'2 hours kayaking in peaceful forest lakes.',costEstimate:400},
        {time:'05:00 PM',activity:'Depart',description:'Bus or taxi to Kathgodam railway station.',costEstimate:700}
      ]}
    ]}]
  },
  {
    id:'gangtok-01', slug:'gangtok', name:'Gangtok', state:'Sikkim', country:'India',
    category:'Nature', budget:'Mid-range', rating:4.6, reviewCount:32000,
    coordinates:{lat:27.3389,lng:88.6065}, altitude:1437,
    coverImage:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80'],
    description:'Gangtok is the capital of Sikkim — a compact, vibrant city at 1,437 m in the eastern Himalayas. Clean, well-organized, and surrounded by rhododendron-draped hills, it offers stunning views of Kanchenjunga (8,586 m — world\'s third highest peak) on clear mornings. Gangtok is the gateway to high-altitude lakes like Tsomgo Lake and the Nathu La Pass (Indo-China border), to Rumtek Monastery, and to the North Sikkim circuit. The city has a distinctive Nepali-Tibetan-Lepcha cultural blend.',
    history:'Sikkim was an independent Buddhist kingdom until 1975 when it became India\'s 22nd state through a referendum. Gangtok became prominent as the capital in the 19th century under the Chogyal (king). The Enchey Monastery (1909) and the Namgyal Institute of Tibetology (1958) represent the Buddhist scholarly tradition of the former kingdom.',
    bestSeason:'October to December (clearest Kanchenjunga views). March to May (rhododendrons bloom). Monsoon (June-September) is wet.',
    idealDuration:'3-4 days', temperature:'5°C (winter) to 22°C (summer)',
    nearestAirport:'Pakyong Airport (PYG) 31km (opened 2018, flights from Kolkata/Delhi)',
    nearestRailwayStation:'New Jalpaiguri (NJP) 148km — well connected to Kolkata and Delhi',
    nearestBusStand:'Sikkim Nationalised Transport Bus Stand, Gangtok',
    tags:['Kanchenjunga','Sikkim','Buddhist','Tsomgo Lake','Nathu La','Mountains'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:7, luxuryScore:5, budgetScore:6,
    topAttractions:[
      {name:'Tsomgo Lake (Changu Lake)',description:'A glacial lake at 3753m, 40km from Gangtok on the Nathu La highway. The oval-shaped lake (1km long) is covered in snow from December-May and surrounded by steep mountains. Yak rides on the lakeshore (₹300). Permits required (obtained through tour operators, ₹200 each). Best: Oct-Nov and April-May.',location:'40km from Gangtok on NH10'},
      {name:'Nathu La Pass (4310m)',description:'A high-mountain pass on the ancient Silk Road, now India\'s border with China. Open to Indian tourists (not foreigners) with a permit (₹200, weekdays only except Mon-Tue). The border is manned by Indian and PLA soldiers. Altitude sickness common — acclimatize in Gangtok for 2 days first.',location:'56km from Gangtok'},
      {name:'Rumtek Monastery',description:'The largest monastery in Sikkim and one of the most significant Kagyu Buddhist centers in the world. Built in 1961 as a replica of the original Rumtek in Tibet by the 16th Karmapa. Houses golden Karmapa stupa and rare Buddhist manuscripts. 24km from Gangtok.',location:'24km from Gangtok, Rumtek'},
      {name:'MG Marg (Mahatma Gandhi Marg)',description:'The pedestrianized main street of Gangtok — clean, car-free, lined with shops, restaurants, and cafes. The best place for evening strolls, people-watching, and Sikkimese street food.',location:'Central Gangtok'},
      {name:'Namgyal Institute of Tibetology',description:'An internationally renowned research center (1958) for Tibetan studies and Buddhism. Houses over 200 thangkas, rare manuscripts, and ritual objects. A beautiful building in traditional Sikkimese architecture. Entry: ₹10. Open Mon-Sat 10AM-4PM.',location:'Deorali, 3km from city center'}
    ],
    activities:['Tsomgo Lake + Nathu La day trip (₹3500-5000 shared jeep with permit)','Rumtek Monastery visit (₹300 shared taxi)','Paragliding from Gangtok (₹3000, Oct-Nov)','Trekking: Goecha La base camp (9 days, Yuksom start)','White-water rafting on Teesta River (₹600-1500, Mar-May)','Flower Festival (April/May — see rhododendrons at Temi Tea Garden)','Cabling car to Tashi Viewpoint (₹55 return)','North Sikkim circuit (Yumthang, Zero Point — 3 day permit trip)'],
    localFood:['Momos (steamed/fried dumplings — the Sikkimese version uses different spices)','Thukpa (hearty noodle soup essential in the cold)','Chhurpi (dried yak cheese — hard and chewy, a local snack)','Gundruk (fermented leafy greens soup, unique to Sikkim and Nepal)','Tongba (warm fermented millet beer served in bamboo mug)','Sha Phaley (Tibetan fried bread stuffed with meat)','Sikkimese Thali (at Nimtho Restaurant — multiple local dishes)'],
    shopping:['Tibetan handicrafts at Lal Bazaar (thangkas, prayer wheels ₹200-5000)','Sikkimese cardamom (large black cardamom, ₹300-500/100g — among world\'s finest)','Organic Sikkim tea from Temi Tea Estate (₹200-800)','Traditional Thanka paintings from local artists','Churpi and dried foods from local markets','Handwoven Sikkimese carpets (₹3000-15000)'],
    culture:'Sikkimese culture is a unique blend of Nepali (dominant), Tibetan (Buddhist heritage), and Lepcha (indigenous) traditions. The Losar and Saga Dawa festivals at Rumtek Monastery are spectacular. Sikkim is India\'s only fully organic state (since 2016) — a point of immense local pride.',
    festivals:['Losar (Tibetan New Year, Feb/March — Rumtek Monastery celebrations)','Saga Dawa (May/June — Buddha Purnima, most sacred Buddhist festival, procession from Enchey Monastery)','Sikkim Flower Festival (April/May — rhododendron season)','Tihar (October/November — Nepali Diwali)'],
    hotels:['Elgin Nor-Khill (Heritage, ₹8000-15000, former royal guest house)','Mayfair Spa Resort (5-star, ₹10000-22000)','Norbughang Park Hotel (3-star, ₹3000-6000)','Hotel Sonam Delek (Mid-range, ₹2000-4000)','Zostel Gangtok (Hostel, ₹400-700)'],
    restaurants:['Nimtho Restaurant (Best Sikkimese-Nepali cuisine, ₹300-700, MG Marg)','The Dragon Restaurant (Tibetan-Chinese, ₹200-500)','Baker\'s Café (Breakfast, coffee, ₹200-500, MG Marg)','7 Sisters Restaurant (North-East Indian, ₹300-600)'],
    travelTips:['Book Nathu La and Tsomgo permits through registered tour operator — 24-48 hrs in advance.','Foreigners (non-Indian nationals) require Protected Area Permit for most of Sikkim.','Nathu La is at 4310m — spend 2 nights in Gangtok before attempting it.','Gangtok is clean — littering is fined heavily.','Alcohol is available but regulated; many local shops stock Sikkim\'s own Dansberg beer.'],
    packingTips:['Heavy jacket (cold year-round at altitude)','Altitude medication (for Nathu La)','Comfortable walking shoes','Warm gloves and hat','Rain poncho'],
    weather:'Spring (Mar-May): 10-22°C, rhododendrons bloom, some rain. Monsoon (Jun-Sep): 15-22°C, very heavy rain. Autumn (Oct-Nov): 10-20°C, best clarity for Kanchenjunga. Winter (Dec-Feb): 5-15°C, cool, some frost.',
    transport:'By Air: Pakyong Airport (31km, flights from Kolkata 45 min). By Rail: New Jalpaiguri (148km, shared jeep 4.5 hrs from NJP to Gangtok ₹200-300). By Bus: SNT buses from Siliguri (3.5 hrs, ₹120). Within Gangtok: Walk on MG Marg, shared autos (₹10-30 fixed routes), taxis (₹100-300 for most attractions).',
    itineraries:[{type:'3 Day',durationDays:3,estimatedCost:9000,days:[
      {day:1,activities:[
        {time:'10:00 AM',activity:'MG Marg & city orientation',description:'Walk the pedestrian street, visit local cafes and shops.',costEstimate:0},
        {time:'12:00 PM',activity:'Namgyal Institute of Tibetology',description:'Buddhist research center with rare thangkas.',costEstimate:10},
        {time:'02:00 PM',activity:'Enchey Monastery',description:'200-year-old Tibetan Buddhist monastery with city views.',costEstimate:0},
        {time:'04:00 PM',activity:'Cable car to Tashi Viewpoint',description:'Best viewpoint for Kanchenjunga (on clear days).',costEstimate:55},
        {time:'07:00 PM',activity:'Dinner at Nimtho',description:'Sikkimese thali with gundruk soup, chhurpi, momos.',costEstimate:500}
      ]},
      {day:2,activities:[
        {time:'07:00 AM',activity:'Tsomgo Lake + Nathu La',description:'Full day trip. Glacial lake at 3753m, then border pass at 4310m. Yak ride at Tsomgo.',costEstimate:4000},
        {time:'05:00 PM',activity:'Return to Gangtok',description:'Tired but elated. Dinner and rest.',costEstimate:400}
      ]},
      {day:3,activities:[
        {time:'09:00 AM',activity:'Rumtek Monastery',description:'24km drive. Largest monastery in Sikkim. Peaceful morning prayers.',costEstimate:400},
        {time:'12:00 PM',activity:'Teesta River viewpoint',description:'En route back, stop at Teesta-Rangit confluence.',costEstimate:0},
        {time:'02:00 PM',activity:'Shopping and departure',description:'Cardamom, Temi tea, Tibetan souvenirs.',costEstimate:1000}
      ]}
    ]}]
  },
  {
    id:'coorg-01', slug:'coorg', name:'Coorg', state:'Karnataka', country:'India',
    category:'Nature', budget:'Mid-range', rating:4.7, reviewCount:44000,
    coordinates:{lat:12.3375,lng:75.8069}, altitude:1200,
    coverImage:'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1590322246756-37d7ae12b736?w=800&q=80','https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=800&q=80'],
    description:'Coorg (officially Kodagu) is often called "Scotland of India" — a lush, misty district in the Western Ghats of Karnataka, carpeted with the world\'s finest coffee and pepper plantations, interspersed with orange groves, waterfalls, and some of India\'s most biodiverse forests. The indigenous Kodava people — known as a warrior community with a distinct culture, cuisine, and language — make this one of India\'s most culturally unique destinations. Madikeri is the district headquarters and the most convenient base.',
    history:'Coorg was an independent princely state under the Kodagu Rajas until it was annexed by the British in 1834 following a brief campaign against Raja Chikka Vira Rajendra. The British developed the coffee industry (introduced in the 1830s). Coffee from Coorg still accounts for a significant portion of India\'s coffee exports. The Kodavas are the only people in India with an indigenous right to bear arms without a license.',
    bestSeason:'October to March. Coffee blossom season (February-March — the aroma of blossom fills the valleys). Avoid June-September monsoon (extremely heavy, 2500mm+).',
    idealDuration:'3-4 days', temperature:'10°C (winter nights) to 30°C (summer)',
    nearestAirport:'Mangalore Airport (IXE) 136km; Mysore Airport (MYQ) 117km; Bengaluru (BLR) 248km',
    nearestRailwayStation:'Mysore Railway Station (117km); Hassan (80km)',
    nearestBusStand:'Madikeri KSRTC Bus Stand',
    tags:['Coffee','Western Ghats','Trekking','Wildlife','Waterfalls','Spice Plantations'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:7, luxuryScore:6, budgetScore:6,
    topAttractions:[
      {name:'Abbey Falls',description:'A beautiful 70-foot waterfall 8km from Madikeri, through coffee and spice plantations. A short 1km walk from the road. Best in and just after monsoon (Sep-Nov). Entry: ₹10.',location:'8km from Madikeri'},
      {name:'Namdroling Monastery (Golden Temple, Bylakuppe)',description:'The largest Tibetan settlement outside Tibet, with the magnificent Namdroling Nyingmapa Monastery — three golden temples with 18-foot gold statues of Buddha, Guru Rinpoche, and Amitayus. The golden interiors are breathtaking. Entry: Free. 64km from Madikeri.',location:'Bylakuppe, 64km from Madikeri'},
      {name:'Raja\'s Seat',description:'A beautifully maintained garden on the edge of Madikeri hill, traditionally where the Kodagu rajas would sit and watch the sunset over the valley. Small musical fountain, flowering gardens, and one of the best sunset vantage points in Coorg. Entry: ₹15. Open 5:30AM-7:30PM.',location:'Madikeri town center'},
      {name:'Talakaveri (Source of River Cauvery)',description:'The sacred source of the Cauvery River, one of South India\'s holiest rivers, at 1276m. A small tank (kunda) marks the mythological source. Bhagamandala (7km below, Triveni Sangam) is where three rivers meet. During Cauvery Sankramana (October 17 — Virgo Sankranti), water bubbles from the spring.', location:'48km from Madikeri, Brahmagiri Hills'},
      {name:'Dubare Elephant Camp',description:'A forest department elephant training camp on the banks of the Kaveri River where you can interact with, feed, and bathe the elephants (8-10 AM). Very popular — book in advance through Karnataka Forest Department. Entry: ₹100 + elephant interaction ₹200-400. 34km from Madikeri.',location:'34km from Madikeri, Kushalnagar'},
      {name:'Iruppu Falls (Lakshmana Tirtha Falls)',description:'A dramatic 60-foot waterfall on the Lakshmana Tirtha River (a Cauvery tributary) inside Brahmagiri Wildlife Sanctuary, considered sacred by Hindus. 52km from Madikeri. Best in and after monsoon. Entry: ₹50.',location:'52km from Madikeri, Gonikoppal route'}
    ],
    activities:['Coffee plantation tour with tasting (Coorg Wilderness Resort, ₹300-500)','Camping in coffee estates (multiple operators, ₹2000-4000 with bonfires)','Trekking: Brahmagiri Peak (10km, 1608m, excellent views)','Dubare Elephant Camp morning session (₹200-400)','Iruppu Falls trip and Nagarhole National Park (tiger reserve, ₹1500-3000)','River rafting on Barapole River (₹800-1200)','Coorg to Brahmagiri wildlife trekking (permit required)','Mountain biking on plantation roads (₹400-700/day rental)'],
    localFood:['Pandi Curry (Coorg pork curry marinated in Kachampuli vinegar — the most famous Kodava dish, made only here)','Kadambuttu (round steamed rice dumplings — goes with pandi curry)','Nool Puttu (rice noodle dumplings)','Bamboo Shoot Curry (unique ingredient sourced from forests)','Akki Rotti (rice flatbread, a staple)','Coorgi Pulao (unique rice preparation)','Otti (rice-coconut pancake)'],
    shopping:['Coorg coffee — buy directly from estates for best quality and price (₹200-600 for 250g)','Coorg honey (forest honey, ₹300-600/bottle)','Spices: pepper (₹400-800/kg), cardamom (₹2000-3000/kg), nutmeg, cloves','Coorg wine and liqueur (local specialty at Coorg Cardamom Estate)','Traditional Kodava weapons — Peechekathi (knife) from souvenir shops','Handwoven textiles from tribal cooperatives'],
    culture:'Kodava culture is unique in India — a warrior community with matrilineal elements, their own language (Kodava Takk), distinct food, and customs. The Kailpodh harvest festival and Puthari (new rice harvest festival, November/December) involve traditional gun-firing, folk dances (Bolakaat, Kargattu), and the distinctive Coorgi attire (Kodava Kumpu for women).',
    festivals:['Puthari (November/December — new rice harvest festival, folk dances, gun salutes)','Kailpodh (September — arms-cleaning festival)','Cauvery Sankramana (October 17 — water bubbles at Talakaveri)','Puttari (December — new crop celebration in villages)'],
    hotels:['Orange County Resort (Luxury, ₹15000-35000, all-inclusive plantation resort)','Evolve Back Coorg (5-star, ₹20000-45000, award-winning resort)','Amã Stays & Trails Coorg (Heritage bungalow, ₹6000-12000)','Coorg Cliffs Resort (Mid-range, ₹3000-6000)','Hotel Coorg International (Budget, ₹1500-3000, Madikeri)'],
    restaurants:['Hotel East End (Best Coorgi food, pandi curry must-try, ₹200-500, Madikeri)','Raintree Restaurant (Estate dining, ₹400-900)','Capitol Hotel (Local thali, ₹150-300, Madikeri)','Coffee Day Estate Café (Coffee tasting, ₹100-300)'],
    travelTips:['Rent a self-drive car or hire a local driver with jeep — distances between attractions are 20-60km.','Best time for elephants: October to May. Monsoon (Jun-Sep): Dubare camp may be closed.','Book elephant camp sessions in advance through Karnataka Forest Department website.','Coorg roads are narrow and winding — drive carefully, especially at night.','Coffee blossom (Feb-March): the valley smells like jasmine. Do not miss.'],
    packingTips:['Leech socks (September-November — leeches in forest after monsoon)','Waterproof jacket','Trekking shoes','Insect repellent','Light cotton for days, warm layer for evenings'],
    weather:'Post-monsoon (Oct-Nov): 15-25°C, lush, some rain, waterfalls full — excellent. Winter (Dec-Feb): 10-22°C, coffee blossom in Feb — best overall. Summer (Mar-May): 20-30°C. Monsoon (Jun-Sep): 15-22°C, very heavy rain (2500mm), many roads flooded.',
    transport:'By Bus: KSRTC from Bengaluru (5.5 hrs, ₹300-600). By Car: Drive from Bengaluru (248km, 5.5 hrs on NH275). From Mysore: 1.5 hrs (117km). Within Coorg: Self-drive or hire local driver with jeep (₹2500-3500/day).',
    itineraries:[{type:'3 Day',durationDays:3,estimatedCost:9000,days:[
      {day:1,activities:[
        {time:'11:00 AM',activity:'Check in + coffee plantation walk',description:'Walk through the estate, learn to identify coffee plants, cardamom, and pepper.',costEstimate:0},
        {time:'03:00 PM',activity:'Abbey Falls',description:'8km from Madikeri. 70-foot waterfall in lush greenery.',costEstimate:10},
        {time:'05:30 PM',activity:'Raja\'s Seat Sunset',description:'Watch the valley glow gold from the royal viewpoint.',costEstimate:15},
        {time:'08:00 PM',activity:'Dinner at Hotel East End',description:'Traditional pandi curry and kadambuttu.',costEstimate:500}
      ]},
      {day:2,activities:[
        {time:'08:00 AM',activity:'Dubare Elephant Camp',description:'Morning bathing and feeding of elephants. Book in advance.',costEstimate:500},
        {time:'11:00 AM',activity:'Namdroling Golden Temple (Bylakuppe)',description:'64km to the spectacular Tibetan Buddhist temple complex.',costEstimate:1500},
        {time:'02:00 PM',activity:'Return via Kushalnagar + coffee shopping',description:'Buy direct from Kushalnagar market.',costEstimate:800}
      ]},
      {day:3,activities:[
        {time:'08:00 AM',activity:'Talakaveri (Source of Cauvery)',description:'Sacred spring at 1276m. Bhagamandala temple at the Triveni Sangam.',costEstimate:200},
        {time:'12:00 PM',activity:'Iruppu Falls',description:'Sacred waterfall inside Brahmagiri sanctuary.',costEstimate:100},
        {time:'03:00 PM',activity:'Return + spice shopping',description:'Buy pepper, cardamom, coorg coffee and honey.',costEstimate:1500}
      ]}
    ]}]
  },
  {
    id:'kaziranga-01', slug:'kaziranga', name:'Kaziranga National Park', state:'Assam', country:'India',
    category:'Wildlife', budget:'Mid-range', rating:4.8, reviewCount:28000,
    coordinates:{lat:26.5775,lng:93.1711}, altitude:85,
    coverImage:'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1611002154327-2fff0fc44593?w=800&q=80'],
    description:'Kaziranga National Park in Assam is a UNESCO World Heritage Site and one of the world\'s most successful conservation stories — home to two-thirds of the entire world population of the Indian one-horned rhinoceros (2,613 rhinos as of 2022). The park also has the highest density of tigers of any protected area in the world, plus wild water buffalo, swamp deer (barasingha), and Asian elephants. Spread across the floodplains of the Brahmaputra River, its grasslands, forests, and wetlands create extraordinary biodiversity.',
    history:'Kaziranga was declared a Reserved Forest in 1905, largely on the insistence of Mary Curzon (wife of Lord Curzon) after she was disappointed not to see a single rhinoceros during her 1904 visit. It became a wildlife sanctuary in 1916 and a National Park in 1974. UNESCO inscribed it as a World Heritage Site in 1985. The park floods annually during monsoon (the entire floodplain) and animals migrate to the Karbi Anglong hills — a remarkable natural phenomenon.',
    bestSeason:'November to April. Best wildlife viewing: February-April (dry season, grass low, animals visible). Park is closed May-October (monsoon flooding).',
    idealDuration:'2-3 days', temperature:'8°C (winter) to 35°C (summer)',
    nearestAirport:'Jorhat Airport (JRH) 97km; Guwahati Airport (GAU) 217km',
    nearestRailwayStation:'Furkating Junction (75km); Jakhalabandha (5km from park entrance)',
    nearestBusStand:'Kohora (main park entrance village) on NH37',
    tags:['Rhinos','Wildlife','UNESCO','Tiger Reserve','Elephants','Assam'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:7, luxuryScore:6, budgetScore:5,
    topAttractions:[
      {name:'Jeep Safari (Central Range)',description:'The most popular and rewarding range — highest probability of seeing one-horned rhinos, elephants, and water buffalo in open grasslands near Mihimukh. 3 hour safari. Morning safaris (5:30 AM start) give best light and activity. Book in advance through official site or resort. ₹2500-4500/jeep + entry ₹100 Indian/₹650 foreign.',location:'Kohora, Central Range'},
      {name:'Elephant Safari (Bagori Range)',description:'The only national park in India where elephant-back safaris are routinely conducted by the Forest Department. A 45-minute dawn ride on the elephant at 6 AM through tall elephant grass for very close rhino encounters. Book at Forest Department, Bagori. ₹1000/person.',location:'Bagori Range, Western Kaziranga'},
      {name:'Western Range (Burapahar)',description:'The most scenic range — through deciduous forest rather than open grassland. Higher chance of seeing tigers and wild dogs. Also has the ruins of 13th-century Kareng Ghar (Ahom kingdom palace). ₹2500/jeep.',location:'Burapahar, Western Range'},
      {name:'Eastern Range (Agoratoli)',description:'The least visited but most pristine range. Greater chance of seeing tigers and leopards in the denser forests. Best for birding — over 480 species of birds recorded including the endangered greater adjutant stork.',location:'Agoratoli, Eastern Range'},
      {name:'Observation Towers',description:'Three watchtower machhans — Sohola, Kathpara, and Foliamari — offer elevated views over the grasslands. Best for photography in golden hour. Entry included in park fee. No jeep needed.',location:'Various locations near Kohora'}
    ],
    activities:['Jeep safari (Central, Western, Eastern ranges, ₹2500-4500)','Elephant safari at Bagori (₹1000, dawn only)','Bird watching (480+ species, best at Eastern Range, Nov-Mar)','Village walk in Kohora (free)','Orchid trails at Hoollongapar Gibbon Sanctuary (65km, ₹300)','Assam tea estate tour near Kaziranga','River boat on Brahmaputra near park (₹400)','Photography workshops (several operators, ₹5000-10000/day)'],
    localFood:['Assamese Thali (rice, dal, khar — an alkaline preparation of banana peel ash — unique to Assam, fish curry, aloo pitika, saag)','Pitika (mashed preparations — aloo pitika, baigan pitika)','Duck Meat Curry (hanh mangxo — a unique Assam delicacy)','Pork with bamboo shoot (very popular in Assam)','Masor Tenga (sour fish curry with tomatoes or bilimbi)','Jolpan (traditional breakfast — rice preparations with curd and jaggery)','Assam tea (single-estate CTC and orthodox at resorts — try Halmari Gold)'],
    shopping:['Assam silk — Muga (golden), Pat (white), Eri (moth silk) from Sualkuchi (80km from Guwahati, silk weaving village)','Bamboo and cane handicrafts from Kohora village shops','Assam tea — buy loose-leaf from estate shops near park','Bell metal crafts — unique brass and bell metal utensils from Sarthebari','Traditional Assamese gamosa (handwoven white-red cotton cloth)'],
    culture:'Kaziranga region is dominated by Assamese culture, with significant Bodo tribal communities in surrounding areas. The Bihu festival (April — Rongali Bihu, the Assamese New Year) is the most joyous celebration in Assam, with energetic folk dances and the distinctive bihu songs.',
    festivals:['Rongali Bihu (April — Assamese New Year, folk music and dance)','Kaziranga Elephant Festival (January/February — cultural celebration at park edge)','Ambubachi Mela (June — at Kamakhya Temple, Guwahati, 200km from Kaziranga)'],
    hotels:['Iora the Retreat (Boutique eco-resort, ₹8000-15000, best in area)','Infinity Resort Kaziranga (3-star, ₹4000-8000)','Diphlu River Lodge (Eco-luxury, ₹12000-22000)','ATDC Tourist Lodge (Government, ₹1500-3000, near Kohora)','Wild Grass Resort (Budget eco, ₹2500-4500)'],
    restaurants:['Resorts serve the best meals — request Assamese thali on arrival','Kohora village dhabas (simple Assamese meals, ₹100-250)','Wild Mahseer Restaurant at Infinity Resort (₹400-800, riverside)'],
    travelTips:['Book jeep and elephant safaris at least 2-3 days in advance, especially in Feb-March peak.','Wear muted colors (khaki, olive green) — not white or bright red.','Safaris start at dawn (5:30 AM) — bring warm clothes (it\'s cold in Dec-Feb).','Photography: telephoto lens 200-400mm recommended; rhinos allow approach to 10-15m.','The park closes in heavy monsoon (May-October) — plan strictly for Nov-April.','Never exit the vehicle during safari — rhinos are unpredictable and dangerous.'],
    packingTips:['Khaki/olive green clothing','Binoculars (minimum 8x40)','Telephoto camera lens','Warm jacket for dawn safaris','Insect repellent','Dust mask (jeep tracks are very dusty)'],
    weather:'Winter (Nov-Feb): 8-22°C, perfect for safaris, rhinos in grasslands. Spring (Mar-Apr): 20-32°C, last chance before closure, excellent visibility as vegetation dries. Park closed May-October.',
    transport:'By Air: Guwahati (217km, 5hrs by road) or Jorhat (97km, 2.5hrs). By Rail: To Furkating Junction, then local taxi 45km. By Bus: State buses from Guwahati to Kohora (5 hrs, ₹200). Within Kaziranga: Only jeep safaris permitted inside park.',
    itineraries:[{type:'2 Day',durationDays:2,estimatedCost:8000,days:[
      {day:1,activities:[
        {time:'05:30 AM',activity:'Central Range Jeep Safari (dawn)',description:'Best time — rhinos, elephants at sunrise in the grasslands.',costEstimate:3000},
        {time:'09:00 AM',activity:'Breakfast at resort',description:'Traditional Assamese breakfast with Kaziranga single-estate tea.',costEstimate:0},
        {time:'03:30 PM',activity:'Afternoon Eastern Range Safari',description:'Forest drive — tigers, leopards, birds.',costEstimate:3000},
        {time:'07:00 PM',activity:'Assamese dinner at resort',description:'Try khar, masor tenga, and duck curry.',costEstimate:500}
      ]},
      {day:2,activities:[
        {time:'05:30 AM',activity:'Elephant Safari at Bagori (pre-booked)',description:'45-min elephant-back safari for very close rhino approach.',costEstimate:1000},
        {time:'08:30 AM',activity:'Observation tower bird watching',description:'400+ species, bring binoculars.',costEstimate:0},
        {time:'11:00 AM',activity:'Departure to Guwahati/Jorhat',description:'Stop at Assam tea estate en route for tasting.',costEstimate:500}
      ]}
    ]}]
  },
  {
    id:'pondicherry-01', slug:'pondicherry', name:'Pondicherry', state:'Puducherry', country:'India',
    category:'Culture', budget:'Mid-range', rating:4.5, reviewCount:52000,
    coordinates:{lat:11.9416,lng:79.8083}, altitude:5,
    coverImage:'https://images.unsplash.com/photo-1576401093597-b54e91cfa4c2?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80'],
    description:'Pondicherry (officially Puducherry) is a Union Territory on the Coromandel Coast of Tamil Nadu, preserving a unique French colonial legacy from 300 years of French rule (1674-1954). The White Town (French Quarter) — with its yellow-washed colonial mansions, bougainvillea-draped streets, French-named boulevards, and a beachside promenade — feels extraordinarily like a piece of French Riviera transported to southern India. The Sri Aurobindo Ashram (1926) and the experimental township of Auroville (8km) add a spiritual dimension unique in the world.',
    history:'Pondicherry was France\'s most important colonial possession in India. The French first established a trading post here in 1674. It changed hands between France, Britain, and the Netherlands multiple times, with the French definitively holding it until 1954 when it was handed over to India. The French Quarter retains its grid layout, French-named streets (Rue de la Paix, Rue Suffren), and Indo-French architecture. The Sri Aurobindo Ashram was established in 1926 by Sri Aurobindo and The Mother (Mirra Alfassa, French), who later founded Auroville.',
    bestSeason:'October to March. Cyclone risk: October-December (North-East Monsoon brings heavy rain).',
    idealDuration:'2-3 days', temperature:'20°C to 38°C',
    nearestAirport:'Chennai International (MAA) 162km (2.5 hrs); Pondicherry Airport has some limited connections',
    nearestRailwayStation:'Pondicherry Railway Station (on a branch line from Villupuram, 38km)',
    nearestBusStand:'Pondicherry New Bus Stand',
    tags:['French Quarter','Auroville','Sri Aurobindo','Beaches','French Heritage','Yoga'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:4, luxuryScore:7, budgetScore:7,
    topAttractions:[
      {name:'French Quarter (White Town)',description:'The French colonial area south of the canal — pastel-colored 18th and 19th century mansions with terracotta-tiled roofs, bougainvillea walls, and French-named streets. The best of Pondicherry is found simply by walking: Rue de la Paix, Rue Suffren, Rue Dumas, and the beachside Promenade (Goubert Avenue).',location:'South of Sardar Vallabhbhai Patel Road (canal)'},
      {name:'Sri Aurobindo Ashram',description:'Founded in 1926 by philosopher-yogi Sri Aurobindo Ghose and The Mother (Mirra Alfassa). A living spiritual community with 1,200+ residents. The Samadhi (final resting place of Sri Aurobindo and The Mother) is covered in flowers and visited by thousands daily. The ashram runs schools, workshops, and maintains the entire White Town in immaculate condition. Entry: Free. Open 8AM-12PM, 2PM-6PM.',location:'Rue de la Marine, White Town'},
      {name:'Auroville (City of Dawn)',description:'An experimental international township 8km from Pondicherry, conceived by The Mother in 1968 as a universal city beyond nationality and religion. Home to 3,000+ residents from 60 countries. The Matrimandir — a golden sphere meditation center — is the soul of Auroville. Tours: Book at Auroville Visitors Centre (₹50 for Matrimandir inner chamber viewing, advance booking required).',location:'8km north of Pondicherry'},
      {name:'Promenade & Rock Beach',description:'The 1.5km beachfront promenade (Goubert Avenue) lined with statues, the French War Memorial, and the old lighthouse. The beach is rocky and not ideal for swimming (rocky coastline). Sunrise here is magnificent. The area around Chez Nous and the Old Town cafes fills with morning joggers.',location:'Eastern seafront, White Town'},
      {name:'Paradis Beach (Serenity Beach)',description:'A quieter, more laid-back beach 8km north of Pondicherry near Auroville, accessible by bicycle. Better for swimming than the rocky city beach. Several beach shacks and surf schools (₹1000 for 1-hour lesson). The best beach experience near Pondicherry.',location:'8km north of Pondicherry (Auroville road)'},
      {name:'Basilica of the Sacred Heart of Jesus',description:'A stunning Neo-Gothic church (1908) with beautiful stained glass windows depicting the life of Jesus, designed in a French Gothic style. One of the most beautiful churches in South India.',location:'South Boulevard, White Town'}
    ],
    activities:['Bicycle tour of White Town (rent at ₹100-150/day)','Auroville Matrimandir meditation session (advance booking ₹50)','Scuba diving (Temple Adventures, ₹3500-5000 for 2 dives)','Surfing at Serenity Beach (₹1000/lesson)','Cooking class: Tamil-French fusion (₹1500-2500)','Kayaking in backwaters at Cuddalore','Yoga retreat (multiple ashram options, 1-week programs)','French Quarter photography walk at dawn'],
    localFood:['French-Tamil fusion cuisine at Villa Shanti (₹500-1500)','Pondicherry crepes and galettes at Le Café (on promenade)','Filter coffee at local Brahmin-run mess halls (₹10)','Fish curry with rice at Tamil roadside restaurants (₹50-150)','French bread from Baker Street Bakery (₹30-100)','Auroville handmade chocolates from AV bakery (₹200-500)','Lassi and Tamil sweets at ashram dining hall (simple, ₹50-100)'],
    shopping:['Auroville crafts: handmade paper, incense, organic products, natural cosmetics at Auroville boutiques','Boutique clothing at White Town designer shops (₹500-5000)','Pondicherry pottery from local workshops','Handwoven cotton fabric from Pondy boutiques','Sri Aurobindo Ashram publications and books','French biscuits and jams from Alliance Française shop'],
    culture:'Pondicherry\'s culture is the most unique in India — a living fusion of French and Tamil Dravidian civilization. Tamil is the local language, but French is still taught in schools, used in street names, and spoken at the Consulate. The Alliance Française is very active. The unique Indo-French architecture and the continued ashram communities make Pondicherry feel like no other place in India.',
    festivals:['Bastille Day (July 14 — French national day, celebrated with ceremony at French Consulate)','International Yoga Festival (January)','Sri Aurobindo\'s Birthday (August 15 — Ashram centenary)','Tamil festivals: Pongal (January), Thaipusam (January/February — kavadi processions)'],
    hotels:['The Promenade (4-star, ₹7000-14000, seafront)','Villa Shanti (Boutique, ₹5000-10000, White Town)','Le Duplex (Heritage, ₹4000-8000, French Quarter)','Palais de Mahé (Heritage, ₹3500-7000)','Le Pondy (Budget, ₹1500-3000)','Zostel Pondicherry (Hostel, ₹400-700)'],
    restaurants:['Le Café (On the promenade, French ambience, ₹400-900)','Villa Shanti Restaurant (Best in Pondicherry, Franco-Tamil, ₹600-1500)','Baker Street (French bakery + café, ₹200-600)','Satsanga (Vegetarian, relaxed, ₹300-700)','Le Club (Steak and French food, ₹600-1400)','Surguru (Traditional Tamil meals, ₹80-200)'],
    travelTips:['Bicycles are the perfect way to explore — rent at White Town hotels (₹100-150/day).','Auroville: book Matrimandir inner chamber visit 1 day in advance at the Visitors Centre.','The promenade is best early morning before 8 AM — cars are restricted.','October: northeast monsoon brings cyclone risk — check weather before traveling.','Alcohol is cheaper in Pondicherry than Tamil Nadu (lower excise taxes) — craft beer and wine available at La Villa.'],
    packingTips:['Light cotton (hot and humid)','Cycle helmet','Sunscreen SPF 50+','Modest clothing for ashram','Rain jacket (Oct-Dec)'],
    weather:'Winter (Nov-Feb): 20-28°C, low humidity, best. Spring (Mar-May): 28-38°C, hot. Monsoon (Oct-Dec, North-East Monsoon): 25-32°C, heavy rain. Summer (Jun-Sep): 28-35°C.',
    transport:'By Bus: TNSTC from Chennai (3 hrs, ₹150); from Mahabalipuram (2 hrs). By Rail: Pondicherry Station branch line from Villupuram. Cabs from Chennai ₹2500-3500. Within Pondicherry: Bicycle rental (₹100-150/day) — best way. Autos (₹30-100), scooter rental (₹400/day).',
    itineraries:[{type:'2 Day',durationDays:2,estimatedCost:6000,days:[
      {day:1,activities:[
        {time:'06:30 AM',activity:'Sunrise at Promenade',description:'Walk the seafront at dawn — fishermen, joggers, golden light on colonial buildings.',costEstimate:0},
        {time:'08:00 AM',activity:'French Quarter bicycle tour',description:'Rent a cycle, explore Rue de la Paix, Rue Suffren, Rue Dumas.',costEstimate:150},
        {time:'10:00 AM',activity:'Sri Aurobindo Ashram',description:'Visit the Samadhi and ashram rooms. Quiet and meditative.',costEstimate:0},
        {time:'01:00 PM',activity:'Lunch at Villa Shanti',description:'Franco-Tamil fusion — try the grilled fish and crème brulée.',costEstimate:900},
        {time:'03:00 PM',activity:'Heritage Town Walk',description:'Sacred Heart Church, Immaculate Conception Cathedral, local boutiques.',costEstimate:0},
        {time:'06:00 PM',activity:'Sunset at Promenade',description:'French War Memorial, old lighthouse views.',costEstimate:0},
        {time:'08:00 PM',activity:'Dinner at Le Club',description:'Steak and wine in French colonial setting.',costEstimate:1200}
      ]},
      {day:2,activities:[
        {time:'09:00 AM',activity:'Auroville visit',description:'Take auto to Visitors Centre (₹100 return). Book Matrimandir session. Explore cafes and boutiques.',costEstimate:350},
        {time:'01:00 PM',activity:'Serenity Beach',description:'8km north of Pondicherry. Surfing lesson (₹1000) or simply relax on the sand.',costEstimate:1000},
        {time:'04:00 PM',activity:'Return + shopping',description:'Auroville organic products, handmade paper, boutique clothing.',costEstimate:1000},
        {time:'07:00 PM',activity:'Farewell dinner at Le Café',description:'On the promenade. French-style dinner with sea breeze.',costEstimate:700}
      ]}
    ]}]
  },
  {
    id:'mysore-01', slug:'mysore', name:'Mysore', state:'Karnataka', country:'India',
    category:'Culture', budget:'Mid-range', rating:4.6, reviewCount:65000,
    coordinates:{lat:12.2958,lng:76.6394}, altitude:763,
    coverImage:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&q=80'],
    description:'Mysore (officially Mysuru) is Karnataka\'s cultural capital and India\'s most celebrated royal city, home to the magnificent Mysore Palace — one of the largest palaces in India and the second most visited monument in India after the Taj Mahal. The city is renowned for its silk, sandalwood, incense, ivory, and the spectacular Dasara festival when the palace is illuminated with 97,000 light bulbs. Clean, well-planned, and manageable in size, Mysore offers a perfect combination of royal history, cultural depth, and modern amenities.',
    history:'Mysore was the capital of the Wadiyar dynasty from 1399. In 1761 Hyder Ali overthrew the Wadiyars and his son Tipu Sultan (the Tiger of Mysore) resisted British expansion until his death at the Battle of Seringapatam in 1799. The British restored the Wadiyars to the throne, and they built the current Mysore Palace (1912) after the original was destroyed by fire. The Wadiyars were known as enlightened rulers — they introduced electricity, the University of Mysore (1916), and various institutions.',
    bestSeason:'October to March. Dasara (September/October) is the best time — 10 days of festivities.',
    idealDuration:'2-3 days', temperature:'14°C (winter) to 35°C (summer)',
    nearestAirport:'Mysore Airport (MYQ) 12km (limited flights); Bengaluru Kempegowda (BLR) 145km',
    nearestRailwayStation:'Mysore Junction (MYS) — trains from Bengaluru (2 hrs Shatabdi), Chennai',
    nearestBusStand:'Mysore Central Bus Stand (KSRTC, near town)',
    tags:['Palace','Royalty','Silk','Sandalwood','Dasara','Heritage'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:3, luxuryScore:7, budgetScore:7,
    topAttractions:[
      {name:'Mysore Palace (Amba Vilas)',description:'India\'s second most visited monument — a colossal 14-story Indo-Saracenic palace built in 1912 by Wadiyar ruler Krishna Raja Wadiyar IV. The Durbar Hall, golden throne, and stained-glass ceilings are extraordinary. Illuminated with 97,000 light bulbs every Sunday (7-7:45PM) and during Dasara — a sight of extraordinary beauty. Entry: ₹70 (Indian), ₹500 (foreign). Open 10AM-5:30PM.',location:'Mysore city center'},
      {name:'Chamundi Hill & Temple',description:'A 1062m hill 12km from the city, crowned by the Chamundeshwari Temple (1000-year-old, dedicated to the goddess who killed the buffalo demon Mahishasura, giving Mysore its name). 1,000 stone steps to the top (or drive). Magnificent views of Mysore city and the Deccan plateau. 5m Nandi bull statue midway on the steps.',location:'12km from Mysore city center'},
      {name:'Brindavan Gardens & KRS Dam',description:'India\'s most famous musical fountain garden — 60 acres of terraced Mughal-style gardens at the base of the Krishnaraja Sagara (KRS) Dam, 19km from Mysore. The illuminated musical fountain show (6:30-8PM, ₹20-25) is spectacular — highly recommended.',location:'19km from Mysore, Mandya'},
      {name:'Mysore Zoo (Sri Chamarajendra Zoological Gardens)',description:'One of India\'s oldest (1892) and best-maintained zoos — 157 species on 245 acres, including white tigers, gorillas, and Komodo dragons. Very well-maintained. Entry: ₹80 (Indian). Open 8:30AM-5:30PM, closed Tuesdays.',location:'Adjacent to Mysore Palace'},
      {name:'Devaraja Market',description:'A vibrant 18th-century market selling Mysore\'s iconic products: jasmine garlands, Mysore silk sarees (₹1000-50,000), sandalwood carvings, traditional agarbatti (incense), and fresh produce. One of South India\'s most photogenic markets. Open 8AM-8PM.',location:'Sayaji Rao Road, near Palace'},
      {name:'St. Philomena\'s Church',description:'A towering Neo-Gothic Catholic church (1936) modeled on the Cologne Cathedral, with twin 54m spires. The cathedral\'s interior stained glass and the 100-year-old crypt are stunning. Open daily, free entry.',location:'Ashoka Road, Mysore'}
    ],
    activities:['Mysore Palace night illumination (Sunday 7-7:45PM — free from outside)','Brindavan Gardens musical fountain (₹20-25, evening)','Silk weaving center visit (Cauvery Silk Factory, government-run, Mananthody Road)','Sandalwood products shopping (Government Sandalwood Oil Factory)','Day trip to Srirangapatna (16km, Tipu Sultan\'s capital, ₹1000 auto return)','Mysore cooking class (₹1500-2500, learn Mysore Pak making)','Chamundi Hill trek (1000 steps)','Dasara procession (October — if visiting)'],
    localFood:['Mysore Pak (the dense, ghee-rich sweet created in the Mysore Palace royal kitchen in 1935 — buy at Guru Sweet Mart or Sri Rama Sweet Mart)','Mysore Masala Dosa (a spicier version of the dosa with red chutney inside, different from Udupi dosa)','Idli-Vada-Sambar (South Indian staple at any local darshini restaurant)','Bisi Bele Bath (rice-lentil preparation)','Mysore Pak at palace-area sweet shops (₹30-60 per piece)','Mysore Coffee (famous filter coffee)'],
    shopping:['Mysore Silk (Cauvery Handicrafts Emporium and private showrooms — ₹1000-50,000 for sarees)','Sandalwood products (Government Sandalwood Oil Factory: soaps, oils, carvings — ₹100-5000)','Agarbatti (sandalwood incense, Mysore is India\'s incense capital)','Rosewood and sandalwood carvings','Mysore Pak and local sweets to take home'],
    culture:'Mysore is the cultural capital of Karnataka — the birthplace of Karnataka Sangita (Carnatic classical music), the saree weaving tradition, and Mysore style of painting. The Dasara festival here is one of India\'s grandest royal celebrations — the Maharaja of Mysore still leads the procession on the royal elephant (Arjuna) from the palace to the Bannimantap ground.',
    festivals:['Dasara / Navarathri (September/October — 10 days, palace illuminations, elephant procession, cultural programs — the biggest event in Karnataka)','Vairamudi Festival (at Cheluvanarayana Swamy Temple, Melkote, 52km — March/April)','Mysore Utsav (January — classical music and dance festival at Palace)'],
    hotels:['Lalitha Mahal Palace Hotel (Heritage 5-star, ₹6000-15000 — former Viceroy\'s Guest House on a hilltop)','The Windflower Resort & Spa (4-star, ₹5000-9000)','Hotel Radisson Blu (4-star, ₹4000-8000)','Hotel Indra Bhavan (Budget, ₹1500-3000, near palace)','KSTDC Hotel Mayura Hoysala (Government, ₹1200-2500)'],
    restaurants:['Hotel RRR (Mysore thali and South Indian meals, ₹150-400, Gandhi Square)','Vinayaka Mylari (Best Mysore masala dosa, ₹50-150, Nazarbad)','The Green Hotel Restaurant (Multi-cuisine, sustainable, ₹400-900)','Hotel Dasaprakash (South Indian veg, ₹200-500)','Hotel Hanumanthu Mane (Local darshini, ₹50-200)'],
    travelTips:['Visit the palace Sunday evening for the free illumination (97,000 bulbs) — extraordinary.','Book train from Bengaluru 2-3 days in advance — Shatabdi sells out quickly.','Dasara week (September/October): Mysore fills up completely — book hotels 2-3 months ahead.','Government Cauvery Emporium silk is certified quality — private showrooms often show inferior Bangalore silk as Mysore silk.','Sandalwood Oil Factory visit is free and worthwhile — the factory has operated since 1916.'],
    packingTips:['Light cotton (warm city)','Comfortable walking shoes (palace has lots of walking)','Modest clothing for temple (Chamundi)','Camera (palace photography prohibited inside but allowed outside)'],
    weather:'Winter (Nov-Feb): 14-28°C, pleasant. Spring (Mar-May): 22-35°C. Monsoon (Jun-Sep): 20-28°C, moderate rain. Autumn (Oct): 22-30°C, Dasara season.',
    transport:'By Rail: Mysore Junction — Shatabdi Express from Bengaluru (2 hrs, ₹350-700). By Bus: KSRTC from Bengaluru (3 hrs, ₹150-300). By Air: Mysore Airport (12km, limited). Within Mysore: KSRTC city buses (₹10-20), autos (₹30-200), cycle rickshaws near palace, Ola/Uber.',
    itineraries:[{type:'2 Day',durationDays:2,estimatedCost:5000,days:[
      {day:1,activities:[
        {time:'09:30 AM',activity:'Mysore Palace morning visit',description:'Explore the palace with audio guide. Less crowded in the morning.',costEstimate:70},
        {time:'12:30 PM',activity:'Devaraja Market',description:'Jasmine, silk, sandalwood shopping. Photogenic and fragrant.',costEstimate:500},
        {time:'02:00 PM',activity:'Lunch at Hotel RRR',description:'Full Mysore thali with rasam, sambar, 5 vegetables.',costEstimate:200},
        {time:'04:00 PM',activity:'Mysore Zoo',description:'One of India\'s best zoos. 157 species.',costEstimate:80},
        {time:'07:00 PM',activity:'Palace illumination (Sunday)',description:'5000 watts of brilliance — best viewed from Jayalakshmi Vilas square.',costEstimate:0},
        {time:'08:00 PM',activity:'Dinner at The Green Hotel',description:'In a heritage building with a garden restaurant.',costEstimate:600}
      ]},
      {day:2,activities:[
        {time:'07:00 AM',activity:'Chamundi Hill (1000 steps)',description:'Trek up for the goddess temple and Mysore city views. Sunrise is stunning.',costEstimate:0},
        {time:'10:00 AM',activity:'Sandalwood Oil Factory + Government Silk Weaving',description:'See sandalwood products made, buy incense and oil directly.',costEstimate:500},
        {time:'01:00 PM',activity:'Lunch at Vinayaka Mylari',description:'Best Mysore masala dosa in the world at this tiny, packed eatery.',costEstimate:100},
        {time:'02:30 PM',activity:'Brindavan Gardens (19km)',description:'Drive to KRS Dam gardens for the evening musical fountain show.',costEstimate:300},
        {time:'07:00 PM',activity:'Musical Fountain Show',description:'Illuminated Brindavan Gardens with musical fountains. Book dinner at garden restaurant.',costEstimate:200}
      ]}
    ]}]
  },
  {
    id:'bodh-gaya-01', slug:'bodh-gaya', name:'Bodh Gaya', state:'Bihar', country:'India',
    category:'Pilgrimage', budget:'Budget', rating:4.7, reviewCount:32000,
    coordinates:{lat:24.6961,lng:84.9914}, altitude:112,
    coverImage:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1579380838085-ecc32f3c6f04?w=800&q=80'],
    description:'Bodh Gaya is the most sacred site in Buddhism — the place where Siddhartha Gautama (later the Buddha) attained enlightenment under the Bodhi Tree around 528 BCE. Located on the banks of the Falgu River in Bihar, this UNESCO World Heritage Site draws over 1 million pilgrims and tourists annually from every Buddhist nation in the world. The Mahabodhi Temple (55m, built 3rd century BCE, current structure 5th-7th century CE) and the sacred Bodhi Tree (a direct descendant of the original) are Buddhism\'s most revered monuments.',
    history:'The historical Buddha, Siddhartha Gautama, meditated under a Peepal tree (now known as the Bodhi Tree) here until he attained Nirvana. Emperor Ashoka (3rd century BCE) made the first pilgrimage to Bodh Gaya and built the original Mahabodhi shrine. The Chinese pilgrim Xuanzang visited in 637 CE and left detailed accounts. The site was restored from neglect in the 19th century through the efforts of Anagarika Dharmapala, a Sri Lankan Buddhist reformer. It was inscribed as a UNESCO World Heritage Site in 2002.',
    bestSeason:'October to March. Avoid April-June (extreme heat, 44°C+).',
    idealDuration:'2 days', temperature:'8°C (winter nights) to 44°C (summer)',
    nearestAirport:'Gaya Airport (GAY) 17km from Bodh Gaya — flights from Delhi, Kolkata, and international Buddhist-nation flights (Sri Lanka, Thailand, Bhutan)',
    nearestRailwayStation:'Gaya Junction (GAYA) 16km — trains from Delhi (14 hrs), Kolkata (7 hrs)',
    nearestBusStand:'Bodh Gaya Bus Stand (near Mahabodhi Temple)',
    tags:['Buddhism','Enlightenment','UNESCO','Bodhi Tree','Pilgrimage','Meditation'],
    familyFriendly:true, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:1, luxuryScore:4, budgetScore:9,
    topAttractions:[
      {name:'Mahabodhi Temple Complex (UNESCO)',description:'The pinnacled 55-metre temple marking the site of the Buddha\'s enlightenment. Built in the 5th-7th century CE on the site of Ashoka\'s original shrine, it is surrounded by votive stupas, stone railings (2nd century BCE), and the sacred Bodhi Tree. Entry: ₹50 (Indian), ₹200 (foreign). Open 5AM-9PM. Meditation inside the sanctum sanctorum is permitted.',location:'Bodh Gaya center'},
      {name:'The Sacred Bodhi Tree',description:'A direct descendant of the original Peepal tree under which the Buddha attained enlightenment. The current tree was planted from a cutting sent to Sri Lanka in 288 BCE by Ashoka\'s daughter Sanghamitta. Located in the Mahabodhi compound just behind the temple. Meditating under this tree is a profound experience for Buddhists and non-Buddhists alike.',location:'Within Mahabodhi Temple complex'},
      {name:'Giant Buddha Statue (80 ft)',description:'A 20-metre (65.7 foot) monolithic stone statue of the seated Buddha, unveiled in 1989 by the Dalai Lama. Surrounded by 10 smaller bodhisattva statues. Located in the Great Buddha Park, 1km from the Mahabodhi Temple.',location:'Great Buddha Park, 1km from Mahabodhi Temple'},
      {name:'International Buddhist Monasteries',description:'Bodh Gaya has monasteries from virtually every Buddhist nation — Thai Temple (1957), Japanese Temple (1972), Tibetan Monastery (Tergar Monastery), Bhutanese Monastery, Chinese Buddhist Temple, Sri Lankan Monastery, Korean Temple, Vietnamese Temple. Each is architecturally distinct and represents its nation\'s Buddhist tradition. All are open to visitors.',location:'Various locations around Mahabodhi Temple'},
      {name:'Sujata Temple & Kiosk (Bakraur village)',description:'The site where a young girl named Sujata offered rice porridge to the starving Siddhartha before his enlightenment, ending his period of asceticism. A small stupa marks the spot. 1km across the Falgu River from Bodh Gaya.',location:'Bakraur village, across Falgu River'}
    ],
    activities:['Meditation at Mahabodhi Temple (dawn and dusk are best, free)','Visit all international Buddhist monasteries (free)','Sunrise meditation at the Bodhi Tree (5AM opening)','Attend evening prayer ceremony at the Tibetan monastery','Vipassana meditation retreat (7-day and 10-day courses available)','Visit Rajgir and Nalanda ruins day trip (100km, Buddha taught here)','Attend Mahabodhi Temple lamp offering ceremony'],
    localFood:['Simple vegetarian meals at monastery dining halls (often free for pilgrims)','Tibetan food at cafes near the Tergar Monastery (momos, thukpa, ₹80-200)','Bihar Litti Chokha (roasted wheat balls with mashed spiced vegetables — Bihar\'s definitive dish)','Sattu Paratha (gram flour flatbread — a Bihar staple)','Khichdi (simple rice and lentil porridge — served at ashrams)','Chaat at the bazaar near bus stand'],
    shopping:['Buddhist religious items: prayer beads, singing bowls, thangka paintings from monastery shops','Bodhi Tree leaf mementos (pressed, laminated, sold at temple gate stalls)','Buddhist scriptures and books from monastery bookshops','Tibetan crafts from Tibetan refugee sellers','Bihar Madhubani painting handicrafts'],
    culture:'Bodh Gaya is a microcosm of world Buddhism — every Asian Buddhist tradition (Theravada, Mahayana, Vajrayana) is represented. The daily circumambulation of the Mahabodhi Temple by thousands of monks in saffron, maroon, and grey robes creates an atmosphere of profound peace.',
    festivals:['Buddha Purnima/Vesak (April/May — the Buddha\'s birthday, enlightenment, and death all on this full moon; the most important Buddhist festival; Bodh Gaya becomes overwhelming with pilgrims)','Mahabodhi Society Annual Festival (October/November)','Tibetan New Year Losar (February/March at Tergar Monastery)'],
    hotels:['Tergar Monastery Guest House (3-star, ₹2000-5000, peaceful, run by monastery)','Bodh Gaya Regency (3-star, ₹2500-5000)','Hotel Bodh Gaya Ashok (Government ITDC, ₹2000-4000)','Om Guest House (Budget, ₹600-1500, basic)','Royal Residency (Mid-range, ₹1500-3000)'],
    restaurants:['Sujata Restaurant (Best food in Bodh Gaya, multicuisine, ₹200-500)','Be Happy Café (Vegetarian, ₹150-350, Tibetan)','Pole to Pole (International café, ₹200-500)','Monastery dining halls (free or very cheap for pilgrims)'],
    travelTips:['Arrive before 6AM for the magical atmosphere at the Bodhi Tree with monks beginning morning meditation.','Dress modestly — both temples and the surrounding area require conservative clothing.','Photography inside the main sanctum is not permitted. Outside is allowed.','The area around the temple can be very crowded in December-January with international pilgrims.','Combine with Nalanda University ruins (95km) and Rajgir (80km) for a Buddhist circuit.'],
    packingTips:['Modest conservative clothing','Cushion or meditation mat (for temple meditation)','Mosquito repellent (evenings)','Shawl for cold winter evenings'],
    weather:'Winter (Oct-Feb): 8-22°C, excellent. Spring (Mar-Apr): 25-38°C. Summer (May-Jun): 35-44°C — avoid. Monsoon (Jul-Sep): 28-35°C, hot and humid.',
    transport:'By Air: Gaya Airport (17km) — direct flights from Delhi, Kolkata, and Buddhist countries. By Rail: Gaya Junction (16km) — auto-rickshaw to Bodh Gaya ₹100-150. By Bus: State buses from Gaya (₹20). Within Bodh Gaya: Walk (compact area), cycle rickshaws (₹20-50), autos.',
    itineraries:[{type:'2 Day',durationDays:2,estimatedCost:3500,days:[
      {day:1,activities:[
        {time:'05:00 AM',activity:'Dawn at Mahabodhi Temple',description:'The most peaceful time — monks chanting, oil lamps, the Bodhi Tree in morning mist.',costEstimate:50},
        {time:'07:00 AM',activity:'Circumambulation of the temple',description:'Join the pilgrims circumambulating the temple clockwise, spinning prayer wheels.',costEstimate:0},
        {time:'09:00 AM',activity:'Breakfast at Sujata Restaurant',description:'Simple, good food near the temple.',costEstimate:200},
        {time:'10:00 AM',activity:'International monasteries tour',description:'Thai, Japanese, Tibetan, Bhutanese, Sri Lankan — spend 30 min at each.',costEstimate:0},
        {time:'01:00 PM',activity:'Great Buddha Statue',description:'20m seated Buddha in the park.',costEstimate:0},
        {time:'06:00 PM',activity:'Evening ceremony at Mahabodhi',description:'Priests light oil lamps around the temple. Chanting by monks.',costEstimate:0}
      ]},
      {day:2,activities:[
        {time:'06:00 AM',activity:'Sujata Temple across the river',description:'Sunrise walk across Falgu River to where a girl fed the starving Buddha.',costEstimate:0},
        {time:'09:00 AM',activity:'Meditation at Bodhi Tree',description:'Sit under the sacred tree for as long as you need.',costEstimate:0},
        {time:'12:00 PM',activity:'Depart for Nalanda (95km)',description:'Visit the ruins of the world\'s first university (5th century CE). UNESCO site.',costEstimate:1500}
      ]}
    ]}]
  },
  {
    id:'khajuraho-01', slug:'khajuraho', name:'Khajuraho', state:'Madhya Pradesh', country:'India',
    category:'Culture', budget:'Budget', rating:4.6, reviewCount:28000,
    coordinates:{lat:24.8318,lng:79.9199}, altitude:285,
    nearestAirport:'Khajuraho Airport (HJR) 5km from temples — daily flights from Delhi and Varanasi',
    nearestRailwayStation:'Khajuraho Railway Station (KURJ) — trains from Delhi, Bhopal, Agra',
    nearestBusStand:'Khajuraho Bus Stand (near Western group of temples)',
    coverImage:'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1200&q=80',
    galleryImages:['https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80'],
    description:'Khajuraho is a UNESCO World Heritage Site — a group of Hindu and Jain temples built by the Chandela dynasty between 950 and 1050 CE, famous worldwide for their extraordinary sculptures depicting spiritual, mythological, and erotic themes. Of the original 85 temples, 25 survive. The temples are architectural masterpieces of Nagara-style temple architecture, but it is the 10% of sculptures that depict erotic scenes (karmic themes of human desire on the outer walls) that have made them internationally famous. The temples stand amid lush countryside in Madhya Pradesh.',
    history:'The Chandela Rajput dynasty built these temples during their golden age (950-1050 CE). The most elaborate temple — Kandariya Mahadeva — took an estimated 30 years to build. The temples were abandoned after the decline of the Chandela dynasty in the 12th century and "forgotten" under jungle overgrowth until British engineer T.S. Burt rediscovered them in 1838. The erotic sculptures are believed to represent tantric traditions, the celebration of human life, or apotropaic symbols to ward off lightning.',
    bestSeason:'October to March. Sound and Light Show runs year-round (evening).',
    idealDuration:'2 days', temperature:'8°C (winter) to 44°C (summer)',
    tags:['UNESCO','Temples','Chandela','Erotic Sculptures','Medieval India','Art'],
    familyFriendly:false, coupleFriendly:true, soloFriendly:true, hiddenGem:false,
    adventureScore:2, luxuryScore:4, budgetScore:9,
    topAttractions:[
      {name:'Kandariya Mahadeva Temple (Western Group)',description:'The largest and most elaborately decorated of the Khajuraho temples, dedicated to Shiva. 30.5m high, with 872 sculptures in three horizontal bands on its exterior. The erotic sculptures are on the outer wall while the sanctum is entirely devotional. Open sunrise to sunset. Entry: ₹40 Indian, ₹600 foreign.',location:'Western Group of Temples'},
      {name:'Lakshmana Temple (Western Group)',description:'Dedicated to Vishnu, notable for having the best-preserved erotic friezes and a complete set of subsidiary shrines at the corners. The interior mandapa ceiling has intricately carved medallions. Part of the Western Group ASI compound.',location:'Western Group of Temples'},
      {name:'Eastern Group — Jain Temples',description:'A separate cluster of exquisitely carved Jain temples (Parsvanatha, Adinatha, Shantinatha) built in the same period. The Parsvanatha Temple has some of the finest secular sculptures including women applying makeup, lovers embracing, and daily life scenes. Free entry.',location:'Eastern Group, 2km from Western Group'},
      {name:'Sound and Light Show',description:'A one-hour evening narration projecting lights on the Western Group temples while a recorded commentary explains the history and symbolism of the temples in both English and Hindi. 6:30 PM (English) and 7:30 PM (Hindi). Entry: ₹250-700.',location:'Western Group of Temples'},
      {name:'Archaeological Museum, Khajuraho',description:'Houses sculptures recovered during excavations, including fragments too fragile for outdoor display. A useful context-setting visit before or after the temples. Entry: ₹15. Open Mon-Sun 10AM-5PM, closed Fridays.',location:'Near Western Group'}
    ],
    activities:['Temple exploration (Western Group: 3 hrs minimum)','Sound and Light Show (evening, ₹250-700)','Cycling tour to Eastern and Southern groups (rent cycle ₹100/day)','Village walk to rural Bundelkhand villages around Khajuraho','Panna National Park (32km, tiger reserve, boat on Ken River, ₹2000-3500 jeep safari)','Raneh Falls (22km, canyon with gorge and waterfalls)','Ken Gharial Sanctuary (crocodile viewing)'],
    localFood:['Bundeli Thali (rice, dal, chapati, achar — simple Madhya Pradesh meals)','Dal Bafla (baked wheat cake dipped in ghee, similar to Rajasthani baati)','Poha with Jalebi (Madhya Pradesh breakfast standard)','Shahi Paneer and North Indian curries at tourist restaurants','Mahua liquor (local tribal drink)'],
    shopping:['Chandela-style stone replica carvings from local artisans','Sarees and textiles from Chanderi (100km — famous for Chanderi silk)','Tribal paintings and masks','Panna diamonds (theoretically — Panna is India\'s only diamond mining region)'],
    culture:'Khajuraho was the religious and cultural capital of the Chandela dynasty. The temples represent a rare complete expression of early medieval North Indian temple art. The erotic sculptures were not considered obscene but were part of Tantric traditions exploring the relationship between human desire and spiritual liberation.',
    festivals:['Khajuraho Dance Festival (February/March — 7-day classical dance festival at the Western Group temples; Bharatanatyam, Odissi, Kathak, Manipuri performed against the temple backdrop — one of India\'s finest cultural events)'],
    hotels:['Lalit Temple View (4-star, ₹6000-12000, views of the temples from pool)','Radisson Jass Hotel (4-star, ₹4000-8000)','Hotel Chandela (2-star, ₹2000-4000, near temples)','Hotel Harmony (Budget, ₹800-1500, near bus stand)'],
    restaurants:['Mediterraneo (Italian + Indian, ₹400-900, popular with international tourists)','Raja Café (Rooftop with temple view, ₹300-700)','Blue Sky Restaurant (Budget, ₹200-400)','Olive Café (Budget-friendly multicuisine, ₹200-500)'],
    travelTips:['Hire a guide (₹400-600) at the Western Group entrance — without context the sculptures are just art; with context they are extraordinary.','Visit the temples at sunrise — golden light on the sandstone is stunning.','Combine with Varanasi (4 hrs by road) and Agra for a Central India circuit.','Children: the erotic sculptures are significant but constitute less than 10% of all sculpture — most is religious.','Buy the combined ticket for all Western Group temples.'],
    packingTips:['Comfortable walking shoes','Hat and sunscreen (exposed sites)','Light cotton','Camera (photography permitted throughout)'],
    weather:'Winter (Oct-Feb): 8-25°C, ideal. Spring (Mar-Apr): 25-40°C. Summer (May-Jun): 38-44°C — extremely hot, not recommended. Monsoon (Jul-Sep): 30-35°C, humid.',
    transport:'By Air: Khajuraho Airport (5km, flights from Delhi 1.5 hrs, Varanasi 40 min). By Rail: Khajuraho Station — Mahakoshal Express from Delhi. By Road: Bus from Jhansi (175km, 4 hrs); from Varanasi (280km, 6 hrs). Within Khajuraho: Cycle rental (₹100/day), autos (₹50-200).',
    itineraries:[{type:'2 Day',durationDays:2,estimatedCost:4500,days:[
      {day:1,activities:[
        {time:'06:30 AM',activity:'Western Group at sunrise',description:'Best light on sandstone. The temples glow amber at dawn. Hire guide at gate.',costEstimate:640},
        {time:'10:00 AM',activity:'Archaeological Museum',description:'Context for the sculptures. 45 minutes.',costEstimate:15},
        {time:'12:00 PM',activity:'Lunch at Raja Café',description:'Rooftop with temple views.',costEstimate:400},
        {time:'02:00 PM',activity:'Eastern Group (Jain Temples)',description:'Less crowded, equally beautiful. Parsvanatha Temple is the finest.',costEstimate:0},
        {time:'06:30 PM',activity:'Sound and Light Show',description:'English show. Temples illuminated with dramatic narrative.',costEstimate:500}
      ]},
      {day:2,activities:[
        {time:'08:00 AM',activity:'Panna National Park (32km)',description:'Jeep safari on Ken River. Tigers, gharial crocodiles, vultures.',costEstimate:2500},
        {time:'02:00 PM',activity:'Raneh Falls (22km)',description:'Dramatic canyon of crystalline pink and grey granite.',costEstimate:200},
        {time:'05:00 PM',activity:'Departure',description:'Drive to Jhansi or flight from Khajuraho airport.',costEstimate:0}
      ]}
    ]}]
  }
];

function writeDestination(dest) {
  const stateDir = path.join(OUTPUT_DIR, 'India', dest.state.replace(/[^a-zA-Z]/g, ''));
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(path.join(stateDir, `${dest.slug}.json`), JSON.stringify(dest, null, 2));
  console.log(`  ✅ ${dest.name}`);
}

console.log('📍 Writing Part 6 destinations...');
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
console.log(`\n✅ Part 6 complete: ${DESTINATIONS.length} destinations written.`);
