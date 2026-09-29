import { createClient } from "@sanity/client";
import fs from "fs";
import { packageSeo } from "../src/lib/packageSeo.js";

const client = createClient({
  projectId: "wzn5s2a9",
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-02-18",
});

async function run() {
  if (!process.env.SANITY_API_TOKEN)
    throw new Error("SANITY_API_TOKEN is required");
  const packages = await client.fetch('*[_type == "package"]');

  for (const pkg of packages) {
    // Exact format requested
    let seoTitle = `${pkg.title.replace(":", "")} | SaltySoulTrips`;
    let seoTitle_en = `${(pkg.title_en || pkg.title).replace(":", "")} | SaltySoulTrips`;

    let seoDescription = packageSeo(pkg, "es").description;
    let seoDescription_en = packageSeo(pkg, "en").description;

    console.log(`[${pkg.slug.current}]`);
    console.log(`Title: ${seoTitle}`);
    console.log(`Desc:  ${seoDescription}\n`);

    const patch = client
      .patch(pkg._id)
      .set({ seoTitle, seoTitle_en, seoDescription, seoDescription_en });

    try {
      await patch.commit();
    } catch (e) {
      console.error(`❌ Failed to update package: ${pkg.title}`, e.message);
    }
  }

  console.log("🎉 All SEO data successfully reformatted!");
}

run();
