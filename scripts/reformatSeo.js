import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'wzn5s2a9',
  dataset: 'production',
  useCdn: false,
  token: 'sk0DJx28w2VdeVr8ftPNpgTIDV6TVctu5EbmdqOVHCL5KuW4TJiMiCsk9cILqzKq2h6fXLwpZ3D63WkSnljCV9Pa1913cXkK4rCWYLY8HBOXqnOD86VbTdXRrQFTaAXkJtXyvSRuOn7P0oOUutxrGQ8uOqfi5tVNuD1zIDip1xjvbYLlmnyD',
  apiVersion: '2024-02-18'
});

function generateSeoDescription(pkg) {
  let text = pkg.longDescription || '';
  
  // Extract duration (e.g. "16 noches", "15 Noches", "5 Días")
  let duration = "";
  let durationMatch = text.match(/(\d+\s*noches?)/i);
  if (durationMatch) {
    duration = durationMatch[1].toLowerCase();
  } else {
    let daysMatch = text.match(/(\d+\s*días?)/i);
    if (daysMatch) duration = daysMatch[1].toLowerCase();
  }
  if (!duration) duration = "varios días";
  
  // Extract includes
  let includes = [];
  let includeLines = text.split('\n').filter(l => l.trim().startsWith('-'));
  
  // Also check longDescription body text if no bullet points
  if (includeLines.length === 0) {
    includeLines = text.split(/[,.]/).filter(l => l.toLowerCase().includes('incluye'));
  }

  const rawIncludesText = text.toLowerCase();
  
  if (rawIncludesText.includes('vuelo')) includes.push('vuelos');
  if (rawIncludesText.includes('hotel') || rawIncludesText.includes('alojamient')) includes.push('hoteles');
  if (rawIncludesText.includes('coche') || rawIncludesText.includes('traslado')) includes.push('traslados/coche');
  if (rawIncludesText.includes('seguro')) includes.push('seguro');
  if (rawIncludesText.includes('esta') || rawIncludesText.includes('visado')) includes.push('visados/ESTA');
  if (rawIncludesText.includes('esim') || rawIncludesText.includes('datos')) includes.push('eSIM');
  if (rawIncludesText.includes('entrada') || rawIncludesText.includes('excursión') || rawIncludesText.includes('safari') || rawIncludesText.includes('tour')) includes.push('actividades');

  // Deduplicate
  includes = [...new Set(includes)];
  if (includes.length === 0) includes = ['vuelos', 'hoteles', 'seguro de viaje'];
  
  // Format includes string: "a, b y c"
  let includesStr = includes.join(', ');
  if (includes.length > 1) {
    let lastComma = includesStr.lastIndexOf(',');
    includesStr = includesStr.substring(0, lastComma) + ' y' + includesStr.substring(lastComma + 1);
  }
  
  // Extract price
  let price = pkg.priceInfo || '';
  let priceMatch = price.match(/(\d+[.,]?\d*\s*€)/);
  if (priceMatch) {
    price = priceMatch[1];
  } else {
    price = price.replace(/desde /i, '').replace(/\/.*/i, '').trim();
  }
  
  let result = `Recorre ${pkg.title} durante ${duration} con ${includesStr} desde ${price} por persona.`;
  // Clean up colon from title if any
  result = result.replace('Ruta 66: de', 'la Ruta 66 de');
  
  if (result.length > 160) {
    result = result.substring(0, 157) + '...';
  }
  return result;
}

function generateSeoDescriptionEn(pkg) {
  let text = pkg.longDescription_en || pkg.longDescription || '';
  
  let duration = "";
  let durationMatch = text.match(/(\d+\s*nights?)/i);
  if (durationMatch) {
    duration = durationMatch[1].toLowerCase();
  } else {
    let daysMatch = text.match(/(\d+\s*days?)/i);
    if (daysMatch) duration = daysMatch[1].toLowerCase();
    else duration = "several days";
  }
  
  let includes = [];
  const rawText = text.toLowerCase();
  if (rawText.includes('flight') || rawText.includes('vuelo')) includes.push('flights');
  if (rawText.includes('hotel') || rawText.includes('accommodation')) includes.push('hotels');
  if (rawText.includes('car') || rawText.includes('transfer')) includes.push('transfers/car');
  if (rawText.includes('insurance') || rawText.includes('seguro')) includes.push('insurance');
  if (rawText.includes('esim') || rawText.includes('data')) includes.push('eSIM');
  
  includes = [...new Set(includes)];
  if (includes.length === 0) includes = ['flights', 'hotels', 'travel insurance'];
  
  let includesStr = includes.join(', ');
  if (includes.length > 1) {
    let lastComma = includesStr.lastIndexOf(',');
    includesStr = includesStr.substring(0, lastComma) + ' and' + includesStr.substring(lastComma + 1);
  }
  
  let price = pkg.priceInfo_en || pkg.priceInfo || '';
  let priceMatch = price.match(/(\d+[.,]?\d*\s*€)/);
  if (priceMatch) price = priceMatch[1];
  else price = price.replace(/from /i, '').replace(/\/.*/i, '').trim();
  
  let result = `Explore ${pkg.title_en || pkg.title} for ${duration} with ${includesStr} from ${price} per person.`;
  if (result.length > 160) result = result.substring(0, 157) + '...';
  return result;
}

async function run() {
  const packages = JSON.parse(fs.readFileSync('packages-full.json', 'utf-8'));
  
  for (const pkg of packages) {
    // Exact format requested
    let seoTitle = `${pkg.title.replace(':', '')} | SaltySoulTrips`;
    let seoTitle_en = `${(pkg.title_en || pkg.title).replace(':', '')} | SaltySoulTrips`;
    
    let seoDescription = generateSeoDescription(pkg);
    let seoDescription_en = generateSeoDescriptionEn(pkg);

    console.log(`[${pkg.slug.current}]`);
    console.log(`Title: ${seoTitle}`);
    console.log(`Desc:  ${seoDescription}\n`);

    const patch = client.patch(pkg._id)
      .set({ seoTitle, seoTitle_en, seoDescription, seoDescription_en });

    try {
      await patch.commit();
    } catch (e) {
      console.error(`❌ Failed to update package: ${pkg.title}`, e.message);
    }
  }

  console.log('🎉 All SEO data successfully reformatted!');
}

run();
