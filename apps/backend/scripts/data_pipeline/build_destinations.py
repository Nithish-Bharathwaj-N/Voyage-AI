"""
VoyageAI Destination Knowledge Base Builder
Fetches Kaggle Indian tourism dataset, enriches each city using Gemini AI,
and outputs structured JSON files for the frontend.
"""
import os
import json
import time
import re
import uuid
import pandas as pd
import kagglehub
import google.generativeai as genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)

OUTPUT_DIR = "../../voyageai-frontend/public/data/destinations"

UNSPLASH_IMAGES = {
    "Manali": "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=80",
    "Leh Ladakh": "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=1200&q=80",
    "Coorg": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    "Andaman": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    "Lakshadweep": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    "Goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    "Udaipur": "https://images.unsplash.com/photo-1588416499018-d8c621e7d2c2?w=1200&q=80",
    "Srinagar": "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&q=80",
    "Gangtok": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    "Munnar": "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80",
    "Jaipur": "https://images.unsplash.com/photo-1603603285957-3a4e10bcef3b?w=1200&q=80",
    "Varanasi": "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=1200&q=80",
    "Rishikesh": "https://images.unsplash.com/photo-1544635808-c2ef6a8bdc35?w=1200&q=80",
    "Mysore": "https://images.unsplash.com/photo-1604608672516-5e6e5e5e5e5e?w=1200&q=80",
    "Ooty": "https://images.unsplash.com/photo-1609947017136-9dab02d4d6e4?w=1200&q=80",
    "Alleppey": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    "Agra": "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80",
    "Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    "Mumbai": "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1200&q=80",
    "Kolkata": "https://images.unsplash.com/photo-1563507604613-2d66f04c3bff?w=1200&q=80",
    "Darjeeling": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    "Shimla": "https://images.unsplash.com/photo-1626714816894-af17fe32fc95?w=1200&q=80",
    "Nainital": "https://images.unsplash.com/photo-1639489723099-a218b5e8c56c?w=1200&q=80",
    "Hampi": "https://images.unsplash.com/photo-1590322246756-37d7ae12b736?w=1200&q=80",
    "Pondicherry": "https://images.unsplash.com/photo-1569144157591-c60f3f82f137?w=1200&q=80",
    "Varkala": "https://images.unsplash.com/photo-1598127236413-e51e8756d06c?w=1200&q=80",
    "Spiti Valley": "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&q=80",
    "Rann of Kutch": "https://images.unsplash.com/photo-1548694726-7c7a6d7a3a35?w=1200&q=80",
    "Kaziranga": "https://images.unsplash.com/photo-1592477480509-1e63b7a8bbdb?w=1200&q=80",
    "Khajuraho": "https://images.unsplash.com/photo-1606987482048-c6826204b417?w=1200&q=80",
    "default": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80"
}


def slugify(name: str) -> str:
    return re.sub(r'[^a-z0-9-]', '', name.lower().replace(' ', '-'))


def get_cover_image(city_name: str) -> str:
    return UNSPLASH_IMAGES.get(city_name, UNSPLASH_IMAGES["default"])


def enrich_destination(model, city_name: str, rating: str, duration: str, best_time: str, desc: str, places: list) -> dict:
    places_str = ", ".join([str(p) for p in places[:8]])
    
    prompt = f"""You are an expert travel data curator for VoyageAI, a premium Indian travel platform.

Generate a comprehensive JSON object for the Indian destination: **{city_name}**

Use this base data:
- Rating: {rating}
- Ideal duration: {duration}
- Best time to visit: {best_time}
- Description: {desc[:800]}
- Known attractions: {places_str}

Return ONLY valid JSON with exactly this structure:
{{
  "id": "{slugify(city_name)}-01",
  "slug": "{slugify(city_name)}",
  "name": "{city_name}",
  "state": "<Indian state name>",
  "country": "India",
  "category": "<one of: Culture, Beach, Adventure, Nature, Foodie, Hill Station, Pilgrimage, Wildlife>",
  "description": "<2-3 vivid sentences about the destination>",
  "history": "<2 sentences about the historical significance>",
  "bestSeason": "<months, e.g. October to March>",
  "idealDuration": "{duration}",
  "budget": "<one of: Budget, Mid-range, Luxury>",
  "coordinates": {{"lat": <float>, "lng": <float>}},
  "altitude": <integer in meters>,
  "temperature": "<e.g. 15–25°C>",
  "nearestAirport": "<airport name and distance>",
  "nearestRailwayStation": "<station name and distance>",
  "nearestBusStand": "<bus stand name>",
  "rating": {rating if rating and rating != 'nan' else 4.5},
  "reviewCount": <integer between 1000 and 50000>,
  "topAttractions": [
    {{"name": "<attraction>", "description": "<1 sentence>", "location": "<area>"}},
    {{"name": "<attraction>", "description": "<1 sentence>", "location": "<area>"}},
    {{"name": "<attraction>", "description": "<1 sentence>", "location": "<area>"}},
    {{"name": "<attraction>", "description": "<1 sentence>", "location": "<area>"}}
  ],
  "activities": ["<activity 1>", "<activity 2>", "<activity 3>", "<activity 4>", "<activity 5>"],
  "localFood": ["<dish 1>", "<dish 2>", "<dish 3>", "<dish 4>"],
  "shopping": ["<item 1>", "<item 2>", "<item 3>"],
  "culture": "<1-2 sentences about cultural highlights>",
  "festivals": ["<festival 1>", "<festival 2>", "<festival 3>"],
  "hotels": ["<hotel name 1>", "<hotel name 2>", "<hotel name 3>"],
  "restaurants": ["<restaurant or cuisine style 1>", "<restaurant or cuisine style 2>", "<restaurant or cuisine style 3>"],
  "travelTips": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "packingTips": ["<item 1>", "<item 2>", "<item 3>"],
  "weather": "<brief seasonal weather summary>",
  "transport": "<how to reach and get around>",
  "familyFriendly": <true or false>,
  "coupleFriendly": <true or false>,
  "soloFriendly": <true or false>,
  "adventureScore": <integer 1-10>,
  "luxuryScore": <integer 1-10>,
  "budgetScore": <integer 1-10>,
  "hiddenGem": <true or false>,
  "tags": ["<tag1>", "<tag2>", "<tag3>", "<tag4>"],
  "itineraries": [
    {{
      "type": "3 Day",
      "durationDays": 3,
      "estimatedCost": <integer in INR>,
      "days": [
        {{
          "day": 1,
          "activities": [
            {{"time": "Morning", "activity": "<activity name>", "description": "<1 sentence>", "costEstimate": <INR>}},
            {{"time": "Afternoon", "activity": "<activity name>", "description": "<1 sentence>", "costEstimate": <INR>}},
            {{"time": "Evening", "activity": "<activity name>", "description": "<1 sentence>", "costEstimate": <INR>}}
          ]
        }},
        {{"day": 2, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 3, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}}
      ]
    }},
    {{
      "type": "5 Day",
      "durationDays": 5,
      "estimatedCost": <integer in INR>,
      "days": [
        {{"day": 1, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 2, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 3, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 4, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 5, "activities": [{{"time": "Morning", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<activity>", "description": "<desc>", "costEstimate": <INR>}}]}}
      ]
    }},
    {{
      "type": "Family",
      "durationDays": 4,
      "estimatedCost": <integer in INR>,
      "days": [
        {{"day": 1, "activities": [{{"time": "Morning", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 2, "activities": [{{"time": "Morning", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 3, "activities": [{{"time": "Morning", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}]}},
        {{"day": 4, "activities": [{{"time": "Morning", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Afternoon", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}, {{"time": "Evening", "activity": "<family activity>", "description": "<desc>", "costEstimate": <INR>}}]}}
      ]
    }}
  ]
}}"""

    response = model.generate_content(
        prompt,
        generation_config=genai.GenerationConfig(
            response_mime_type="application/json",
            temperature=0.5
        )
    )
    
    text = response.text.strip()
    # Strip markdown code fences if present
    text = re.sub(r'^```json\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    
    data = json.loads(text)
    return data


def main():
    print("📦 Downloading Kaggle dataset...")
    path = kagglehub.dataset_download("naqibahmedkadri/famous-indian-tourist-places")
    
    cities_df = pd.read_csv(os.path.join(path, "City.csv"))
    places_df = pd.read_csv(os.path.join(path, "Places.csv"))
    
    print(f"✅ Loaded {len(cities_df)} cities and {len(places_df)} attractions")
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    destinations_index = []
    
    # Process ALL 100 cities
    total = len(cities_df)
    
    for idx, row in cities_df.iterrows():
        city_name = str(row['City']).strip()
        rating = str(row.get('Ratings', '4.5')).strip()
        duration = str(row.get('Ideal_duration', '2-3 days')).strip()
        best_time = str(row.get('Best_time_to_visit', 'October to March')).strip()
        desc = str(row.get('City_desc', '')).strip()
        
        city_places = places_df[places_df['City'] == city_name]['Place'].dropna().tolist()
        
        print(f"[{idx+1}/{total}] 🏙️  Processing {city_name}...")
        
        try:
            data = enrich_destination(model, city_name, rating, duration, best_time, desc, city_places)
            
            # Override cover image with our curated Unsplash image
            data['coverImage'] = get_cover_image(city_name)
            data['galleryImages'] = [
                get_cover_image(city_name),
                UNSPLASH_IMAGES.get(city_name, UNSPLASH_IMAGES["default"])
            ]
            
            # Save per-state file
            state = re.sub(r'[^a-zA-Z ]', '', data.get("state", "India")).strip().replace(" ", "")
            if not state:
                state = "India"
            state_dir = os.path.join(OUTPUT_DIR, "India", state)
            os.makedirs(state_dir, exist_ok=True)
            
            slug = data.get("slug", slugify(city_name))
            file_path = os.path.join(state_dir, f"{slug}.json")
            
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            # Add lightweight entry to index
            destinations_index.append({
                "id": data.get("id", f"{slug}-01"),
                "slug": slug,
                "name": data.get("name", city_name),
                "state": data.get("state", "India"),
                "country": "India",
                "category": data.get("category", "Culture"),
                "description": data.get("description", "")[:200],
                "rating": float(str(data.get("rating", 4.5)).split('/')[0]),
                "reviewCount": data.get("reviewCount", 5000),
                "idealDuration": data.get("idealDuration", duration),
                "bestSeason": data.get("bestSeason", best_time),
                "budget": data.get("budget", "Mid-range"),
                "coverImage": data['coverImage'],
                "tags": data.get("tags", []),
                "familyFriendly": data.get("familyFriendly", True),
                "coupleFriendly": data.get("coupleFriendly", True),
                "soloFriendly": data.get("soloFriendly", True),
                "adventureScore": data.get("adventureScore", 5),
                "hiddenGem": data.get("hiddenGem", False),
                "coordinates": data.get("coordinates", {"lat": 20.0, "lng": 78.0})
            })
            
            print(f"   ✅ Saved → {file_path}")
            
        except Exception as e:
            print(f"   ❌ Error: {e}")
        
        # Save index incrementally after each destination
        index_path = os.path.join(OUTPUT_DIR, "destinations-index.json")
        with open(index_path, "w", encoding="utf-8") as f:
            json.dump(destinations_index, f, indent=2, ensure_ascii=False)
        
        time.sleep(1.5)  # Gentle rate limiting
    
    print(f"\n🎉 Pipeline complete! Processed {len(destinations_index)}/{total} destinations")
    print(f"📁 Index saved to: {index_path}")


if __name__ == "__main__":
    main()
