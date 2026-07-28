import json

cities_data = [
    {
        "name": "Paris", "country": "France", "state": "Île-de-France", "lat": 48.8566, "lng": 2.3522,
        "desc": "The City of Light, world-renowned for art, fashion, and romance.", "budget": "high", "season": "Spring",
        "places": [
            ("Eiffel Tower", 48.8584, 2.2945, "Iconic iron lattice tower.", "Landmark", "$30"),
            ("Louvre Museum", 48.8606, 2.3376, "World's largest art museum.", "Museum", "$20"),
            ("Notre-Dame Cathedral", 48.8529, 2.3499, "Historic Catholic cathedral.", "Religious Site", "Free"),
            ("Arc de Triomphe", 48.8738, 2.2950, "Monument honoring those who fought for France.", "Monument", "$15"),
            ("Sacré-Cœur", 48.8867, 2.3431, "Roman Catholic church dedicated to the Sacred Heart.", "Religious Site", "Free")
        ]
    },
    {
        "name": "Rome", "country": "Italy", "state": "Lazio", "lat": 41.9028, "lng": 12.4964,
        "desc": "The Eternal City, featuring 3,000 years of globally influential art and architecture.", "budget": "medium", "season": "Autumn",
        "places": [
            ("Colosseum", 41.8902, 12.4922, "Ancient gladiatorial arena.", "Historical Site", "$20"),
            ("Trevi Fountain", 41.9009, 12.4833, "Elaborate 18th-century fountain.", "Landmark", "Free"),
            ("Pantheon", 41.8986, 12.4769, "Former Roman temple, now a church.", "Historical Site", "$5"),
            ("Roman Forum", 41.8925, 12.4853, "Ruins of ancient government buildings.", "Historical Site", "$18"),
            ("Vatican Museums", 41.9065, 12.4536, "Extensive collections of art in Vatican City.", "Museum", "$25")
        ]
    },
    {
        "name": "London", "country": "United Kingdom", "state": "England", "lat": 51.5074, "lng": -0.1278,
        "desc": "A vibrant 21st-century city with a history stretching back to Roman times.", "budget": "high", "season": "Summer",
        "places": [
            ("Big Ben", 51.5007, -0.1246, "Massive iconic clock tower.", "Landmark", "Free"),
            ("Tower of London", 51.5081, -0.0759, "Historic castle and prison.", "Historical Site", "$35"),
            ("British Museum", 51.5194, -0.1270, "Vast collection of world art and artifacts.", "Museum", "Free"),
            ("London Eye", 51.5033, -0.1195, "Enormous observation wheel on the Thames.", "Attraction", "$40"),
            ("Buckingham Palace", 51.5014, -0.1419, "The London residence of the monarch.", "Historical Site", "$40")
        ]
    },
    {
        "name": "Barcelona", "country": "Spain", "state": "Catalonia", "lat": 41.3851, "lng": 2.1734,
        "desc": "A cosmopolitan capital famous for Antoni Gaudí's modernist architecture.", "budget": "medium", "season": "Spring",
        "places": [
            ("Sagrada Familia", 41.4036, 2.1744, "Gaudí's unfinished basilica.", "Religious Site", "$30"),
            ("Park Güell", 41.4145, 2.1527, "Mosaic-filled public park designed by Gaudí.", "Park", "$15"),
            ("Casa Batlló", 41.3916, 2.1649, "Modernist building by Antoni Gaudí.", "Museum", "$35"),
            ("Gothic Quarter", 41.3827, 2.1770, "Historic center with narrow medieval streets.", "Neighborhood", "Free"),
            ("La Rambla", 41.3810, 2.1734, "Famous tree-lined pedestrian street.", "Landmark", "Free")
        ]
    },
    {
        "name": "Berlin", "country": "Germany", "state": "Berlin", "lat": 52.5200, "lng": 13.4050,
        "desc": "Germany's capital known for its art scene, modern landmarks, and history.", "budget": "medium", "season": "Summer",
        "places": [
            ("Brandenburg Gate", 52.5163, 13.3777, "18th-century neoclassical monument.", "Monument", "Free"),
            ("Reichstag Building", 52.5186, 13.3763, "Historic parliament building with a glass dome.", "Historical Site", "Free"),
            ("Berlin Wall Memorial", 52.5350, 13.3900, "Memorial site of the divided city.", "Historical Site", "Free"),
            ("Museum Island", 52.5169, 13.4010, "Island complex housing five major museums.", "Museum", "$25"),
            ("Berlin TV Tower", 52.5208, 13.4094, "Iconic tower with observation deck.", "Landmark", "$28")
        ]
    },
    {
        "name": "Amsterdam", "country": "Netherlands", "state": "North Holland", "lat": 52.3676, "lng": 4.9041,
        "desc": "Capital known for its artistic heritage, elaborate canal system, and narrow houses.", "budget": "high", "season": "Spring",
        "places": [
            ("Rijksmuseum", 52.3600, 4.8852, "Dutch national museum of arts and history.", "Museum", "$25"),
            ("Van Gogh Museum", 52.3581, 4.8812, "Museum dedicated to Vincent van Gogh.", "Museum", "$22"),
            ("Anne Frank House", 52.3752, 4.8839, "Biographical museum of Anne Frank.", "Historical Site", "$18"),
            ("Vondelpark", 52.3580, 4.8686, "Famous public urban park.", "Park", "Free"),
            ("Dam Square", 52.3729, 4.8930, "City square lined with notable buildings.", "Landmark", "Free")
        ]
    },
    {
        "name": "Prague", "country": "Czech Republic", "state": "Prague", "lat": 50.0755, "lng": 14.4378,
        "desc": "The City of a Hundred Spires, known for its Old Town Square and baroque buildings.", "budget": "medium", "season": "Autumn",
        "places": [
            ("Charles Bridge", 50.0865, 14.4114, "Historic bridge crossing the Vltava river.", "Landmark", "Free"),
            ("Prague Castle", 50.0903, 14.3996, "Vast castle complex with various architectural styles.", "Historical Site", "$20"),
            ("Old Town Square", 50.0875, 14.4213, "Historic square in the Old Town quarter.", "Landmark", "Free"),
            ("Prague Astronomical Clock", 50.0870, 14.4207, "Medieval astronomical clock.", "Historical Site", "$12"),
            ("Wenceslas Square", 50.0811, 14.4267, "Main city square and center of business.", "Landmark", "Free")
        ]
    },
    {
        "name": "Vienna", "country": "Austria", "state": "Vienna", "lat": 48.2082, "lng": 16.3738,
        "desc": "Austria’s capital lies in the country’s east on the Danube River, known for Imperial palaces.", "budget": "high", "season": "Spring",
        "places": [
            ("Schönbrunn Palace", 48.1849, 16.3122, "Former imperial summer residence.", "Historical Site", "$28"),
            ("Hofburg", 48.2065, 16.3653, "Former principal imperial palace.", "Historical Site", "$22"),
            ("Belvedere Palace", 48.1915, 16.3807, "Historic building complex in Vienna.", "Museum", "$20"),
            ("St. Stephen's Cathedral", 48.2085, 16.3731, "Mother church of the Roman Catholic Archdiocese.", "Religious Site", "$10"),
            ("Vienna State Opera", 48.2030, 16.3691, "One of the world's leading opera houses.", "Theatre", "$30")
        ]
    },
    {
        "name": "Florence", "country": "Italy", "state": "Tuscany", "lat": 43.7695, "lng": 11.2558,
        "desc": "Capital of Italy’s Tuscany region, home to many masterpieces of Renaissance art.", "budget": "medium", "season": "Spring",
        "places": [
            ("Duomo di Firenze", 43.7731, 11.2560, "Iconic cathedral with a terracotta-tiled dome.", "Religious Site", "$25"),
            ("Uffizi Gallery", 43.7677, 11.2553, "Prominent art museum.", "Museum", "$30"),
            ("Ponte Vecchio", 43.7680, 11.2531, "Medieval stone closed-spandrel segmental arch bridge.", "Landmark", "Free"),
            ("Galleria dell'Accademia", 43.7769, 11.2587, "Home to Michelangelo's sculpture David.", "Museum", "$20"),
            ("Palazzo Vecchio", 43.7693, 11.2561, "Town hall of Florence.", "Historical Site", "$18")
        ]
    },
    {
        "name": "Venice", "country": "Italy", "state": "Veneto", "lat": 45.4408, "lng": 12.3155,
        "desc": "Built on more than 100 small islands in a lagoon in the Adriatic Sea.", "budget": "luxury", "season": "Autumn",
        "places": [
            ("St. Mark's Basilica", 45.4346, 12.3396, "Cathedral church of the Roman Catholic Patriarchate.", "Religious Site", "$10"),
            ("Doge's Palace", 45.4337, 12.3404, "Palace built in Venetian Gothic style.", "Historical Site", "$35"),
            ("Rialto Bridge", 45.4380, 12.3359, "Oldest of the four bridges spanning the Grand Canal.", "Landmark", "Free"),
            ("Grand Canal", 45.4384, 12.3323, "Major water-traffic corridor in the city.", "Landmark", "Free"),
            ("Bridge of Sighs", 45.4340, 12.3408, "Enclosed bridge made of white limestone.", "Landmark", "Free")
        ]
    },
    {
        "name": "Madrid", "country": "Spain", "state": "Community of Madrid", "lat": 40.4168, "lng": -3.7038,
        "desc": "Central capital known for elegant boulevards and expansive, manicured parks.", "budget": "medium", "season": "Spring",
        "places": [
            ("Prado Museum", 40.4138, -3.6921, "Main Spanish national art museum.", "Museum", "$18"),
            ("Royal Palace of Madrid", 40.4180, -3.7143, "Official residence of the Spanish royal family.", "Historical Site", "$20"),
            ("Retiro Park", 40.4153, -3.6845, "One of the largest parks in the city.", "Park", "Free"),
            ("Plaza Mayor", 40.4155, -3.7074, "Major public space in the heart of Madrid.", "Landmark", "Free"),
            ("Puerta del Sol", 40.4169, -3.7036, "Public square and one of the best known and busiest places in Madrid.", "Landmark", "Free")
        ]
    },
    {
        "name": "Munich", "country": "Germany", "state": "Bavaria", "lat": 48.1351, "lng": 11.5820,
        "desc": "Bavarian capital known for its annual Oktoberfest celebration and beer halls.", "budget": "medium", "season": "Autumn",
        "places": [
            ("Marienplatz", 48.1371, 11.5754, "Central square in the city centre.", "Landmark", "Free"),
            ("Nymphenburg Palace", 48.1581, 11.5034, "Baroque palace in the western part of Munich.", "Historical Site", "$18"),
            ("English Garden", 48.1527, 11.5966, "Large public park in the centre of Munich.", "Park", "Free"),
            ("Deutsches Museum", 48.1301, 11.5833, "World's largest museum of science and technology.", "Museum", "$18"),
            ("Hofbräuhaus", 48.1376, 11.5800, "Famous beer hall in Munich.", "Restaurant", "Varies")
        ]
    },
    {
        "name": "Budapest", "country": "Hungary", "state": "Central Hungary", "lat": 47.4979, "lng": 19.0402,
        "desc": "Hungary’s capital, bisected by the River Danube, known for thermal baths.", "budget": "low", "season": "Summer",
        "places": [
            ("Hungarian Parliament Building", 47.5071, 19.0456, "Seat of the National Assembly of Hungary.", "Historical Site", "$25"),
            ("Buda Castle", 47.4962, 19.0396, "Historical castle and palace complex.", "Historical Site", "$15"),
            ("Fisherman's Bastion", 47.5022, 19.0347, "Monument with panoramic views of the city.", "Landmark", "$5"),
            ("Széchenyi Thermal Bath", 47.5186, 19.0823, "Largest medicinal bath in Europe.", "Attraction", "$30"),
            ("St. Stephen's Basilica", 47.5009, 19.0539, "Roman Catholic basilica.", "Religious Site", "$10")
        ]
    },
    {
        "name": "Lisbon", "country": "Portugal", "state": "Lisbon", "lat": 38.7223, "lng": -9.1393,
        "desc": "Hilly, coastal capital city known for its cafe culture and fado music.", "budget": "medium", "season": "Spring",
        "places": [
            ("Belém Tower", 38.6916, -9.2159, "16th-century fortification.", "Historical Site", "$10"),
            ("Jerónimos Monastery", 38.6979, -9.2067, "Former monastery of the Order of Saint Jerome.", "Historical Site", "$12"),
            ("Castelo de S. Jorge", 38.7139, -9.1334, "Historic castle overlooking the city.", "Historical Site", "$15"),
            ("Praça do Comércio", 38.7075, -9.1364, "Large harbor-facing plaza.", "Landmark", "Free"),
            ("Alfama", 38.7126, -9.1306, "Oldest district of Lisbon.", "Neighborhood", "Free")
        ]
    },
    {
        "name": "Dublin", "country": "Ireland", "state": "Leinster", "lat": 53.3498, "lng": -6.2603,
        "desc": "Capital of the Republic of Ireland, situated at the mouth of the River Liffey.", "budget": "high", "season": "Summer",
        "places": [
            ("Guinness Storehouse", 53.3419, -6.2867, "Brewery experience telling the tale of Ireland's famous beer.", "Attraction", "$30"),
            ("Trinity College Library", 53.3438, -6.2546, "Historic library housing the Book of Kells.", "Historical Site", "$20"),
            ("St Patrick's Cathedral", 53.3395, -6.2714, "National cathedral of the Church of Ireland.", "Religious Site", "$10"),
            ("Kilmainham Gaol", 53.3418, -6.3098, "Former prison, now a museum.", "Museum", "$10"),
            ("Temple Bar", 53.3454, -6.2642, "Busy riverside neighbourhood known for pubs.", "Neighborhood", "Free")
        ]
    },
    {
        "name": "Edinburgh", "country": "United Kingdom", "state": "Scotland", "lat": 55.9533, "lng": -3.1883,
        "desc": "Scotland's compact, hilly capital with a medieval Old Town and elegant Georgian New Town.", "budget": "high", "season": "Summer",
        "places": [
            ("Edinburgh Castle", 55.9486, -3.2008, "Historic fortress dominating the skyline.", "Historical Site", "$25"),
            ("Royal Mile", 55.9495, -3.1909, "Succession of streets forming the main thoroughfare.", "Landmark", "Free"),
            ("Palace of Holyroodhouse", 55.9527, -3.1722, "Official residence of the British monarch in Scotland.", "Historical Site", "$22"),
            ("Arthur's Seat", 55.9441, -3.1618, "Ancient volcano and main peak of the group of hills in Edinburgh.", "Park", "Free"),
            ("National Museum of Scotland", 55.9472, -3.1899, "Museum exploring natural world, cultures, and Scottish history.", "Museum", "Free")
        ]
    },
    {
        "name": "Athens", "country": "Greece", "state": "Attica", "lat": 37.9838, "lng": 23.7275,
        "desc": "Historical capital of Europe with iconic ruins from ancient Greece.", "budget": "medium", "season": "Spring",
        "places": [
            ("Acropolis of Athens", 37.9715, 23.7262, "Ancient citadel containing remains of significant buildings.", "Historical Site", "$25"),
            ("Parthenon", 37.9715, 23.7267, "Former temple dedicated to the goddess Athena.", "Historical Site", "Included in Acropolis"),
            ("Acropolis Museum", 37.9685, 23.7285, "Archaeological museum focused on the Acropolis findings.", "Museum", "$15"),
            ("Ancient Agora", 37.9750, 23.7225, "Best-known example of an ancient Greek agora.", "Historical Site", "$12"),
            ("Temple of Olympian Zeus", 37.9693, 23.7331, "Former colossal temple at the center of the city.", "Historical Site", "$10")
        ]
    },
    {
        "name": "Istanbul", "country": "Turkey", "state": "Istanbul", "lat": 41.0082, "lng": 28.9784,
        "desc": "A major city straddling Europe and Asia across the Bosphorus Strait.", "budget": "low", "season": "Autumn",
        "places": [
            ("Hagia Sophia", 41.0086, 28.9802, "Late antique place of worship in Istanbul.", "Historical Site", "Free"),
            ("Blue Mosque", 41.0054, 28.9768, "Historic mosque known for its blue tiles.", "Religious Site", "Free"),
            ("Topkapi Palace", 41.0115, 28.9833, "Vast museum and former residence of Ottoman sultans.", "Historical Site", "$25"),
            ("Grand Bazaar", 41.0108, 28.9680, "One of the largest and oldest covered markets.", "Attraction", "Free"),
            ("Basilica Cistern", 41.0084, 28.9779, "Largest of several hundred ancient cisterns.", "Historical Site", "$15")
        ]
    },
    {
        "name": "Copenhagen", "country": "Denmark", "state": "Capital Region", "lat": 55.6761, "lng": 12.5683,
        "desc": "Denmark's capital sitting on the coastal islands of Zealand and Amager.", "budget": "high", "season": "Summer",
        "places": [
            ("Tivoli Gardens", 55.6737, 12.5681, "Historic amusement park and pleasure garden.", "Park", "$22"),
            ("The Little Mermaid", 55.6929, 12.5993, "Bronze statue by Edvard Eriksen.", "Landmark", "Free"),
            ("Nyhavn", 55.6800, 12.5900, "17th-century waterfront, canal and entertainment district.", "Landmark", "Free"),
            ("Amalienborg", 55.6841, 12.5933, "Home of the Danish royal family.", "Historical Site", "$18"),
            ("Rosenborg Castle", 55.6848, 12.5765, "Renaissance castle housing crown jewels.", "Museum", "$18")
        ]
    },
    {
        "name": "Stockholm", "country": "Sweden", "state": "Stockholm County", "lat": 59.3293, "lng": 18.0686,
        "desc": "Capital of Sweden, encompassing 14 islands and more than 50 bridges.", "budget": "high", "season": "Summer",
        "places": [
            ("Vasa Museum", 59.3280, 18.0914, "Maritime museum displaying a 17th-century ship.", "Museum", "$20"),
            ("Skansen", 59.3270, 18.1037, "Oldest open-air museum and zoo in Sweden.", "Museum", "$22"),
            ("Stockholm Palace", 59.3268, 18.0717, "Official residence of the Swedish monarch.", "Historical Site", "$20"),
            ("Gamla Stan", 59.3256, 18.0719, "The old town of Stockholm.", "Neighborhood", "Free"),
            ("ABBA The Museum", 59.3248, 18.0965, "Interactive exhibition about the pop band ABBA.", "Museum", "$30")
        ]
    },
    {
        "name": "Oslo", "country": "Norway", "state": "Oslo", "lat": 59.9139, "lng": 10.7522,
        "desc": "Capital city of Norway, known for its green spaces and museums.", "budget": "luxury", "season": "Summer",
        "places": [
            ("Viking Ship Museum", 59.9049, 10.6844, "Museum housing preserved Viking ships.", "Museum", "$15"),
            ("Vigeland Sculpture Park", 59.9270, 10.7000, "Park containing sculptures by Gustav Vigeland.", "Park", "Free"),
            ("Oslo Opera House", 59.9075, 10.7531, "Home of the Norwegian National Opera.", "Theatre", "Free"),
            ("Akershus Fortress", 59.9076, 10.7371, "Medieval castle built to protect Oslo.", "Historical Site", "Free"),
            ("Fram Museum", 59.9030, 10.6996, "Museum telling the story of Norwegian polar exploration.", "Museum", "$18")
        ]
    },
    {
        "name": "Helsinki", "country": "Finland", "state": "Uusimaa", "lat": 60.1695, "lng": 24.9354,
        "desc": "Finland's southern capital, known for sea-facing landscape and diverse architecture.", "budget": "high", "season": "Summer",
        "places": [
            ("Suomenlinna", 60.1454, 24.9866, "18th-century sea fortress and nature area.", "Historical Site", "Free"),
            ("Helsinki Cathedral", 60.1702, 24.9522, "Evangelical Lutheran cathedral.", "Religious Site", "Free"),
            ("Temppeliaukio Church", 60.1730, 24.9252, "Lutheran church built directly into solid rock.", "Religious Site", "$5"),
            ("Uspenski Cathedral", 60.1683, 24.9610, "Eastern Orthodox cathedral in Helsinki.", "Religious Site", "Free"),
            ("Market Square", 60.1675, 24.9537, "Central square known for food and souvenirs.", "Landmark", "Free")
        ]
    },
    {
        "name": "Warsaw", "country": "Poland", "state": "Masovian Voivodeship", "lat": 52.2297, "lng": 21.0122,
        "desc": "Poland's capital offering a blend of modern architecture and restored historical buildings.", "budget": "low", "season": "Spring",
        "places": [
            ("Warsaw Old Town", 52.2497, 21.0122, "Historic center rebuilt after WWII.", "Neighborhood", "Free"),
            ("Royal Castle", 52.2480, 21.0150, "State rooms and art exhibits in a reconstructed castle.", "Historical Site", "$15"),
            ("Lazienki Park", 52.2150, 21.0333, "The largest park in Warsaw.", "Park", "Free"),
            ("Palace of Culture and Science", 52.2319, 21.0067, "High-rise building known for its distinctive architecture.", "Landmark", "$8"),
            ("Warsaw Uprising Museum", 52.2323, 20.9810, "Museum dedicated to the Warsaw Uprising of 1944.", "Museum", "$10")
        ]
    },
    {
        "name": "Krakow", "country": "Poland", "state": "Lesser Poland", "lat": 50.0647, "lng": 19.9450,
        "desc": "A southern Poland city known for its well-preserved medieval core.", "budget": "low", "season": "Autumn",
        "places": [
            ("Wawel Royal Castle", 50.0541, 19.9354, "Castle residency on Wawel Hill.", "Historical Site", "$12"),
            ("Main Square", 50.0614, 19.9372, "Vast medieval market square.", "Landmark", "Free"),
            ("St. Mary's Basilica", 50.0616, 19.9393, "Brick Gothic church adjacent to the Main Square.", "Religious Site", "$5"),
            ("Kraków Cloth Hall", 50.0615, 19.9373, "Renaissance market building in the Main Square.", "Historical Site", "Free"),
            ("Oskar Schindler's Enamel Factory", 50.0474, 19.9616, "Museum about the Nazi occupation of Kraków.", "Museum", "$10")
        ]
    },
    {
        "name": "Milan", "country": "Italy", "state": "Lombardy", "lat": 45.4642, "lng": 9.1900,
        "desc": "A global capital of fashion and design in northern Italy.", "budget": "luxury", "season": "Spring",
        "places": [
            ("Milan Cathedral (Duomo)", 45.4641, 9.1919, "Magnificent Gothic cathedral.", "Religious Site", "$25"),
            ("Galleria Vittorio Emanuele II", 45.4659, 9.1899, "Italy's oldest active shopping mall.", "Landmark", "Free"),
            ("Sforzesco Castle", 45.4705, 9.1793, "15th-century castle housing art collections.", "Historical Site", "$10"),
            ("Santa Maria delle Grazie", 45.4659, 9.1709, "Church housing Da Vinci's The Last Supper.", "Religious Site", "$20"),
            ("Teatro alla Scala", 45.4674, 9.1895, "Historic and prestigious opera house.", "Theatre", "$30")
        ]
    },
    {
        "name": "Naples", "country": "Italy", "state": "Campania", "lat": 40.8518, "lng": 14.2681,
        "desc": "A major city in southern Italy known for its art, architecture, and food.", "budget": "medium", "season": "Summer",
        "places": [
            ("Pompeii Archaeological Park", 40.7490, 14.4862, "Ruins of the ancient Roman city.", "Historical Site", "$22"),
            ("Mount Vesuvius", 40.8224, 14.4289, "Somma-stratovolcano overlooking the Bay of Naples.", "Park", "$15"),
            ("Naples National Archaeological Museum", 40.8534, 14.2505, "Museum housing Roman artifacts.", "Museum", "$20"),
            ("Castel dell'Ovo", 40.8282, 14.2483, "Seaside castle on a former island.", "Historical Site", "Free"),
            ("Royal Palace of Naples", 40.8364, 14.2496, "Palace built for the Bourbon Kings.", "Historical Site", "$12")
        ]
    },
    {
        "name": "Seville", "country": "Spain", "state": "Andalusia", "lat": 37.3891, "lng": -5.9845,
        "desc": "Capital of the Andalusia region, famous for flamenco dancing and architectural design.", "budget": "medium", "season": "Spring",
        "places": [
            ("Plaza de España", 37.3772, -5.9869, "Landmark square featuring beautiful tiles and canals.", "Landmark", "Free"),
            ("Royal Alcázar of Seville", 37.3831, -5.9902, "Moorish renaissance royal palace.", "Historical Site", "$20"),
            ("Seville Cathedral", 37.3861, -5.9926, "Massive Gothic cathedral and Columbus's tomb.", "Religious Site", "$15"),
            ("Giralda", 37.3862, -5.9925, "The bell tower of Seville Cathedral.", "Landmark", "Included in Cathedral"),
            ("Torre del Oro", 37.3824, -5.9963, "Dodecagonal military watchtower.", "Historical Site", "$5")
        ]
    },
    {
        "name": "Porto", "country": "Portugal", "state": "Porto District", "lat": 41.1579, "lng": -8.6291,
        "desc": "Coastal city in northwest Portugal known for its stately bridges and port wine.", "budget": "medium", "season": "Autumn",
        "places": [
            ("Dom Luís I Bridge", 41.1400, -8.6095, "Double-deck metal arch bridge.", "Landmark", "Free"),
            ("Livraria Lello", 41.1468, -8.6147, "Historic, ornate bookstore.", "Attraction", "$8"),
            ("Clérigos Church", 41.1458, -8.6146, "Baroque church with a tall bell tower.", "Religious Site", "$8"),
            ("Palácio da Bolsa", 41.1415, -8.6156, "Historical neoclassical building.", "Historical Site", "$12"),
            ("Ribeira Square", 41.1402, -8.6133, "Historical square by the Douro river.", "Landmark", "Free")
        ]
    },
    {
        "name": "Zurich", "country": "Switzerland", "state": "Zurich", "lat": 47.3769, "lng": 8.5417,
        "desc": "Global center for banking and finance, set at the north end of Lake Zurich.", "budget": "luxury", "season": "Summer",
        "places": [
            ("Lake Zurich", 47.2519, 8.6830, "Large scenic lake offering boat rides.", "Park", "Free"),
            ("Grossmünster", 47.3701, 8.5441, "Romanesque-style Protestant church.", "Religious Site", "Free"),
            ("Fraumünster", 47.3698, 8.5422, "Church known for Marc Chagall's stained glass windows.", "Religious Site", "$5"),
            ("Bahnhofstrasse", 47.3725, 8.5385, "Exclusive shopping avenue.", "Landmark", "Free"),
            ("Kunsthaus Zurich", 47.3703, 8.5484, "Major art museum in Switzerland.", "Museum", "$25")
        ]
    },
    {
        "name": "Geneva", "country": "Switzerland", "state": "Geneva", "lat": 46.2044, "lng": 6.1432,
        "desc": "A global city, financial center, and worldwide center for diplomacy.", "budget": "luxury", "season": "Summer",
        "places": [
            ("Jet d'Eau", 46.2074, 6.1559, "Large fountain in Lake Geneva.", "Landmark", "Free"),
            ("Palace of Nations", 46.2266, 6.1396, "Home of the United Nations Office at Geneva.", "Historical Site", "$20"),
            ("St Pierre Cathedral", 46.2012, 6.1485, "Historic cathedral known for its Protestant history.", "Religious Site", "Free"),
            ("Lake Geneva", 46.4312, 6.5298, "Deep lake on the north side of the Alps.", "Park", "Free"),
            ("Patek Philippe Museum", 46.1994, 6.1352, "Museum of Swiss watchmaking.", "Museum", "$15")
        ]
    }
]

out = []
out.append("import { Destination } from '../../types';\n")
out.append("const europeDestinations: any[] = [")

for c in cities_data:
    out.append("  {")
    out.append(f'    name: "{c["name"]}",')
    out.append(f'    country: "{c["country"]}",')
    out.append(f'    state: "{c["state"]}",')
    out.append(f'    latitude: {c["lat"]},')
    out.append(f'    longitude: {c["lng"]},')
    out.append(f'    description: "{c["desc"]}",')
    out.append(f'    categories: ["Culture", "History", "Sightseeing"],')
    out.append(f'    tags: ["Iconic", "Historic", "Must-See"],')
    out.append(f'    bestSeason: "{c["season"]}",')
    out.append(f'    averageBudget: "{c["budget"]}",')
    out.append(f'    travelDaysRecommended: 5,')
    out.append(f'    planningScore: 90,')
    out.append(f'    heroImageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",')
    out.append("    places: [")
    for p in c["places"]:
        out.append("      {")
        out.append(f'        name: "{p[0]}",')
        out.append(f'        type: "ATTRACTION",')
        out.append(f'        latitude: {p[1]},')
        out.append(f'        longitude: {p[2]},')
        out.append(f'        description: "{p[3]}",')
        out.append(f'        activityCategories: ["{p[4]}"],')
        out.append(f'        estimatedVisitDuration: "2 hours",')
        out.append(f'        ticketPrice: "{p[5]}",')
        out.append(f'        imageUrl: "https://images.unsplash.com/photo-1543305619-3c35f793e50f"')
        out.append("      },")
    out.append("    ]")
    out.append("  },")
out.append("];\n")
out.append("export default europeDestinations;\n")

with open("/home/nithish/.gemini/antigravity/scratch/Voyage-AI-v2/packages/db/src/seed/raw_data/europe.ts", "w") as f:
    f.write("\n".join(out))
