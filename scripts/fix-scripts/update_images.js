const fs = require('fs');
const path = require('path');

const PUBLIC_DATA_DIR = path.join(__dirname, 'apps/web/public/data/destinations');
const INDEX_FILE = path.join(PUBLIC_DATA_DIR, 'destinations-index.json');
const INDIA_DIR = path.join(PUBLIC_DATA_DIR, 'India');

async function fetchWikiImage(name, state) {
  const headers = {
    'User-Agent': 'VoyageAI/2.0 (contact: bot@voyageai.com) Node.js/20'
  };

  try {
    const query = encodeURIComponent(`${name} ${state} India`);
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query}&gsrlimit=1&prop=pageimages&pithumbsize=1200&format=json`;
    const res = await fetch(url, { headers });
    
    if (res.ok) {
      const data = await res.json();
      if (data.query && data.query.pages) {
        const pages = Object.values(data.query.pages);
        if (pages.length > 0 && pages[0].thumbnail && pages[0].thumbnail.source) {
          return pages[0].thumbnail.source;
        }
      }
    }
  } catch (e) {
    // Ignore
  }
  
  // Try without state if first fails
  try {
    const query2 = encodeURIComponent(`${name} India tourism`);
    const url2 = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${query2}&gsrlimit=1&prop=pageimages&pithumbsize=1200&format=json`;
    const res2 = await fetch(url2, { headers });
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.query && data2.query.pages) {
        const pages2 = Object.values(data2.query.pages);
        if (pages2.length > 0 && pages2[0].thumbnail && pages2[0].thumbnail.source) {
          return pages2[0].thumbnail.source;
        }
      }
    }
  } catch (e) {}

  return null;
}

const FALLBACKS = {
  'Adventure': [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80',
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1200&q=80',
    'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80'
  ],
  'Beach': [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80',
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80'
  ],
  'Nature': [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80'
  ],
  'Culture': [
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80',
    'https://images.unsplash.com/photo-1532664189809-02133fee698d?w=1200&q=80',
    'https://images.unsplash.com/photo-1515091943-9d5c0ad74baf?w=1200&q=80'
  ],
  'Pilgrimage': [
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80',
    'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1200&q=80',
    'https://images.unsplash.com/photo-1588665790691-34f71a942ea7?w=1200&q=80'
  ],
  'Wildlife': [
    'https://images.unsplash.com/photo-1547471080-7cb2cb9a46cb?w=1200&q=80',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
    'https://images.unsplash.com/photo-1550257007-0c156f7e8a93?w=1200&q=80'
  ],
};

function getFallback(category, index) {
  const arr = FALLBACKS[category] || FALLBACKS['Nature'];
  return arr[index % arr.length];
}

async function main() {
  const indexData = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
  console.log(`Processing ${indexData.length} destinations with User-Agent & Delay...`);

  let updatedCount = 0;
  let wikiFoundCount = 0;

  for (let i = 0; i < indexData.length; i++) {
    const dest = indexData[i];
    const wikiImage = await fetchWikiImage(dest.name, dest.state);
    
    if (wikiImage) {
      wikiFoundCount++;
    }
    
    const finalImage = wikiImage || getFallback(dest.category, i);
    
    // Update Index
    dest.coverImage = finalImage;
    
    // Update individual state file
    const stateDirName = dest.state.replace(/[^a-zA-Z]/g, '');
    const detailFilePath = path.join(INDIA_DIR, stateDirName, `${dest.slug}.json`);
    
    if (fs.existsSync(detailFilePath)) {
      const detailData = JSON.parse(fs.readFileSync(detailFilePath, 'utf8'));
      detailData.coverImage = finalImage;
      if (!detailData.galleryImages || detailData.galleryImages.length === 0 || detailData.galleryImages[0].includes('unsplash')) {
        detailData.galleryImages = [finalImage, getFallback(dest.category, i+1)];
      }
      fs.writeFileSync(detailFilePath, JSON.stringify(detailData, null, 2));
    }
    
    updatedCount++;
    // Sleep to avoid rate limits! (800ms)
    await new Promise(r => setTimeout(r, 800));
  }

  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
  console.log(`Successfully updated ${updatedCount} destinations! Found Wiki images for ${wikiFoundCount}.`);
}

main().catch(console.error);
