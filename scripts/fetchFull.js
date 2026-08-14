import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'wzn5s2a9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-18'
});

async function run() {
  const packages = await client.fetch('*[_type == "package"]{_id, slug, title, title_en, shortDescription, longDescription, priceInfo, priceInfo_en}');
  fs.writeFileSync('packages-full.json', JSON.stringify(packages, null, 2));
  console.log(`Dumped ${packages.length} packages`);
}
run();
