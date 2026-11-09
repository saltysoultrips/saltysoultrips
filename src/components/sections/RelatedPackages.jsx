import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client, urlFor } from "../../lib/sanity";
import { getPackageCountries } from "../../data/countryMap";
import { postPath, hasEnglishPost } from "../../lib/routes";

const asArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);
const norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/**
 * Internal links from a package page: other packages from the same
 * country/continent and blog posts that mention the package's countries.
 */
export default function RelatedPackages({ pkg, isEn }) {
  const [related, setRelated] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;
    const slug = pkg.slug?.current;
    client
      .fetch(
        `{
          "packages": *[_type == "package" && defined(slug.current) && slug.current != $slug]{
            _id, "id": slug.current, title, title_en, continent, country, country_en,
            countries, countries_en, priceInfo, priceInfo_en, image
          },
          "posts": *[_type == "post" && defined(slug.current)] | order(date desc){
            _id, slug, slug_en, title, title_en, content_en
          }
        }`,
        { slug },
      )
      .then(({ packages, posts: allPosts }) => {
        if (!active) return;
        const myCountries = getPackageCountries(pkg, false).map(norm);
        const myContinents = asArray(pkg.continent);
        const score = (p) => {
          const countries = getPackageCountries(p, false).map(norm);
          if (countries.some((c) => myCountries.includes(c))) return 2;
          if (asArray(p.continent).some((c) => myContinents.includes(c))) return 1;
          return 0;
        };
        const ranked = packages
          .map((p) => ({ p, s: score(p) }))
          .filter(({ s }) => s > 0)
          .sort((a, b) => b.s - a.s)
          .slice(0, 3)
          .map(({ p }) => p);
        setRelated(ranked);
        const lang = isEn ? "en" : "es";
        setPosts(
          allPosts
            .filter((post) => (isEn ? hasEnglishPost(post) : true))
            .filter((post) =>
              myCountries.some((c) => c.length > 3 && norm(post.title).includes(c)),
            )
            .slice(0, 3)
            .map((post) => ({
              id: post._id,
              title: isEn && post.title_en ? post.title_en : post.title,
              path: postPath(post, lang),
            })),
        );
      })
      .catch(() => active && setRelated([]));
    return () => {
      active = false;
    };
  }, [pkg, isEn]);

  if (related === null) return <div data-loading="true" />;
  if (!related.length && !posts.length) return null;

  const text = (p, field) => (isEn && p[`${field}_en`] ? p[`${field}_en`] : p[field]);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-32 md:pb-20 -mt-12 md:-mt-4">
      {related.length > 0 && (
        <>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-dark mb-6">
            {isEn ? "Similar trips" : "Viajes similares"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p._id}
                to={`/${isEn ? "packages" : "paquetes"}/${p.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-sand-200 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] bg-sand-200 overflow-hidden">
                  {p.image?.asset && (
                    <img
                      src={urlFor(p.image).width(640).height(400).quality(75).auto("format").url()}
                      alt={text(p, "title")}
                      loading="lazy"
                      width="640"
                      height="400"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-serif text-brand-dark group-hover:text-sand-700 transition-colors">
                    {text(p, "title")}
                  </h3>
                  {text(p, "priceInfo") && (
                    <p className="text-sm text-brand-dark/70 mt-1">{text(p, "priceInfo")}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      {posts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-dark mb-4">
            {isEn ? "Read before you go" : "Lee antes de viajar"}
          </h2>
          <ul className="space-y-2 list-disc pl-6">
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={post.path} className="underline underline-offset-4 hover:text-sand-700">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
