import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'wzn5s2a9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-18'
});

async function run() {
  const packages = await client.fetch('*[_type == "package"]{_id, slug, title, title_en, shortDescription, shortDescription_en, image, flyerImage}');
  const posts = await client.fetch('*[_type == "post"]{_id, slug, slug_en, title, title_en, excerpt, excerpt_en, coverImage}');
  fs.writeFileSync('sanity-data-dump.json', JSON.stringify({packages, posts}, null, 2));
  console.log(`Dumped ${packages.length} packages and ${posts.length} posts.`);
}
run();
