import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { packagesData } from '../src/data/packagesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.VITE_SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImage(imagePath) {
  if (!imagePath) return null;
  const fullPath = path.join(__dirname, '..', 'public', imagePath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    console.warn(`[WARNING] Image not found: ${fullPath}`);
    return null;
  }
  
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
      filename: path.basename(fullPath),
    });
    return asset._id;
  } catch (error) {
    console.error(`[ERROR] Failed to upload image ${imagePath}:`, error.message);
    return null;
  }
}

async function migrate() {
  console.log('Starting migration to Sanity...');
  
  for (const pkg of packagesData) {
    console.log(`Migrating package: ${pkg.id}`);
    
    let heroAssetId = null;
    let flyerAssetId = null;
    
    if (pkg.image) {
      console.log(`  Uploading hero image...`);
      heroAssetId = await uploadImage(pkg.image);
    }
    
    if (pkg.flyerImage) {
      console.log(`  Uploading flyer image...`);
      flyerAssetId = await uploadImage(pkg.flyerImage);
    }
    
    const doc = {
      _type: 'package',
      _id: `package-${pkg.id}`, // Custom IDs
      title: pkg.title?.es || '',
      title_en: pkg.title?.en || '',
      slug: {
        _type: 'slug',
        current: pkg.id,
      },
      continent: pkg.continent || '',
      type: Array.isArray(pkg.type) ? pkg.type : (pkg.type ? [pkg.type] : []),
      shortDescription: pkg.shortDescription?.es || '',
      shortDescription_en: pkg.shortDescription?.en || '',
      longDescription: pkg.longDescription?.es || '',
      longDescription_en: pkg.longDescription?.en || '',
      priceInfo: pkg.priceInfo?.es || '',
      priceInfo_en: pkg.priceInfo?.en || '',
    };

    if (heroAssetId) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: heroAssetId,
        },
      };
    }

    if (flyerAssetId) {
      doc.flyerImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: flyerAssetId,
        },
      };
    }

    try {
      await client.createOrReplace(doc);
      console.log(`  ✅ Successfully created/updated document for ${pkg.id}`);
    } catch (error) {
      console.error(`  ❌ Failed to create document for ${pkg.id}:`, error.message);
    }
  }
  
  console.log('Migration complete!');
}

migrate().catch(console.error);
