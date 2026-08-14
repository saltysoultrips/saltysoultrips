import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'wzn5s2a9',
  dataset: 'production',
  useCdn: false,
  token: 'sk0DJx28w2VdeVr8ftPNpgTIDV6TVctu5EbmdqOVHCL5KuW4TJiMiCsk9cILqzKq2h6fXLwpZ3D63WkSnljCV9Pa1913cXkK4rCWYLY8HBOXqnOD86VbTdXRrQFTaAXkJtXyvSRuOn7P0oOUutxrGQ8uOqfi5tVNuD1zIDip1xjvbYLlmnyD',
  apiVersion: '2024-02-18'
});

async function run() {
  const data = JSON.parse(fs.readFileSync('sanity-data-dump.json', 'utf-8'));
  
  console.log(`Processing ${data.packages.length} packages...`);
  for (const pkg of data.packages) {
    const seoTitle = `Viaje a ${pkg.title || ''} a medida | SaltySoulTrips`;
    const seoTitle_en = `Custom Trip to ${pkg.title_en || pkg.title || ''} | SaltySoulTrips`;
    
    // Create a 150-160 char description from shortDescription
    let seoDescription = pkg.shortDescription || '';
    if (seoDescription.length > 150) seoDescription = seoDescription.substring(0, 147) + '...';
    if (!seoDescription.toLowerCase().includes('medida')) seoDescription = `Viaje 100% a medida. ${seoDescription}`;
    if (seoDescription.length > 160) seoDescription = seoDescription.substring(0, 157) + '...';

    let seoDescription_en = pkg.shortDescription_en || '';
    if (seoDescription_en.length > 150) seoDescription_en = seoDescription_en.substring(0, 147) + '...';

    const patch = client.patch(pkg._id)
      .setIfMissing({ seoTitle, seoTitle_en, seoDescription, seoDescription_en });

    // Update image ALTs if they don't have one
    if (pkg.image && !pkg.image.alt) {
      patch.set({ 'image.alt': `Increíble viaje a ${pkg.title} con SaltySoulTrips` });
    }
    if (pkg.flyerImage && !pkg.flyerImage.alt) {
      patch.set({ 'flyerImage.alt': `Flyer del viaje a ${pkg.title}` });
    }

    try {
      await patch.commit();
      console.log(`✅ Updated package: ${pkg.title}`);
    } catch (e) {
      console.error(`❌ Failed to update package: ${pkg.title}`, e.message);
    }
  }

  console.log(`\nProcessing ${data.posts.length} blog posts...`);
  for (const post of data.posts) {
    const seoTitle = `${post.title || ''} | Blog SaltySoulTrips`;
    const seoTitle_en = `${post.title_en || post.title || ''} | Blog SaltySoulTrips`;
    
    let seoDescription = post.excerpt || `${post.title}. Descubre más en el blog de SaltySoulTrips.`;
    if (seoDescription.length > 160) seoDescription = seoDescription.substring(0, 157) + '...';

    let seoDescription_en = post.excerpt_en || `${post.title_en || post.title}. Read more on the SaltySoulTrips blog.`;
    if (seoDescription_en.length > 160) seoDescription_en = seoDescription_en.substring(0, 157) + '...';

    const patch = client.patch(post._id)
      .setIfMissing({ seoTitle, seoTitle_en, seoDescription, seoDescription_en });

    if (post.coverImage && !post.coverImage.alt) {
      patch.set({ 'coverImage.alt': `Portada del artículo: ${post.title}` });
    }

    try {
      await patch.commit();
      console.log(`✅ Updated post: ${post.title}`);
    } catch (e) {
      console.error(`❌ Failed to update post: ${post.title}`, e.message);
    }
  }

  console.log('\n🎉 All SEO data successfully populated!');
}

run();
