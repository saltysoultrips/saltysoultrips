import React from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import SEOHead from "../../components/SEOHead";
import { client, urlFor } from "../../lib/sanity";
import {
  postPath,
  hasEnglishPost,
  englishPostSlug,
  destinationPath,
  hasEnglishDestination,
} from "../../lib/routes";
import { findDestinationsFor } from "../../lib/destinations";
import { clampText } from "../../lib/packageSeo";
import { getPackageCountries } from "../../data/countryMap";
import {
  Breadcrumbs,
  breadcrumbSchema,
  homeCrumb,
  AUTHOR,
  ORG_ID,
  SITE,
} from "../../lib/schema";

const stripEmoji = (text) =>
  String(text || "")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
const norm = (s) =>
  String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
const plainText = (blocks) =>
  (blocks || [])
    .filter((b) => b._type === "block" && (!b.style || b.style === "normal"))
    .map((b) => (b.children || []).map((c) => c.text).join(""))
    .join(" ");
const formatDate = (iso, lang) => {
  if (!iso) return "";
  const d = new Date(`${String(iso).slice(0, 10)}T12:00:00Z`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(lang === "en" ? "en-GB" : "es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
};
import Calendar from "lucide-react/dist/esm/icons/calendar";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10 flex flex-col items-center">
          <img
            src={urlFor(value)
              .width(1000)
              .height(562)
              .fit("crop")
              .auto("format")
              .url()}
            alt={value.alt || "Imagen del blog"}
            loading="lazy"
            className="rounded-2xl w-full max-w-3xl aspect-video object-cover shadow-sm"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-stone-500 mt-3 font-sans text-balance">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-sage mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-display font-bold text-brand-sage mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-display font-bold text-brand-sage mt-6 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 leading-relaxed text-stone-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-sage pl-6 my-8 italic text-stone-600 bg-stone-50 py-4 rounded-r-lg text-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-8 space-y-2 text-stone-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-8 space-y-2 text-stone-700">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-brand-sage underline decoration-brand-sage/30 underline-offset-4 hover:decoration-brand-sage transition-all"
        >
          {children}
        </a>
      );
    },
  },
};

export default function BlogPost() {
  const { slug, lang: routeLang } = useParams();
  const location = useLocation();
  const lang = routeLang === "en" ? "en" : "es";

  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedTrips, setRelatedTrips] = React.useState(null);
  const [guides, setGuides] = React.useState(null);

  React.useEffect(() => {
    if (!post) return;
    let active = true;
    findDestinationsFor(`${post.title} ${post.title_en || ""}`).then((list) => {
      if (active)
        setGuides(
          list
            .filter((d) => (lang === "en" ? hasEnglishDestination(d) : true))
            .slice(0, 2),
        );
    });
    return () => {
      active = false;
    };
  }, [post, lang]);

  // Packages whose country appears in the post title (contextual internal links)
  React.useEffect(() => {
    if (!post) return;
    let active = true;
    client
      .fetch(
        '*[_type == "package" && defined(slug.current)]{"id": slug.current, title, title_en, country, country_en, countries, countries_en}',
      )
      .then((packages) => {
        if (!active) return;
        const words = (s) => ` ${norm(s).replace(/[^a-z0-9]+/g, " ").trim()} `;
        const title = words(`${post.title} ${post.title_en || ""}`);
        // Match by country or by the place names in the package title
        // ("Nueva York en Navidad" → "nueva york"), longest names first.
        const places = (p) => [
          ...getPackageCountries(p, false),
          ...String(p.title || "").split(/\s(?:en|de|y)\s|[&+,:]|\d/i),
        ]
          .map((x) => words(x))
          .filter((x) => x.trim().length >= 4);
        const hits = (p) => places(p).filter((c) => title.includes(c)).length;
        setRelatedTrips(
          packages
            .map((p) => ({ p, n: hits(p) }))
            .filter(({ n }) => n > 0)
            .sort((a, b) => b.n - a.n)
            .slice(0, 3)
            .map(({ p }) => p),
        );
      })
      .catch(() => active && setRelatedTrips([]));
    return () => {
      active = false;
    };
  }, [post]);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && (slug.current == $slug || slug_en.current == $slug)][0]`;
        let data = await client.fetch(query, { slug });
        if (!data && routeLang === "en") {
          const posts = await client.fetch('*[_type == "post" && defined(slug.current)]');
          data = posts.find((item) => hasEnglishPost(item) && englishPostSlug(item) === slug);
        }
        if (active) setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPost();
    return () => { active = false; };
  }, [slug, routeLang]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="text-stone-400">
          {lang === "en" ? "Loading article..." : "Cargando artículo..."}
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  if (lang === "en" && !hasEnglishPost(post))
    return <Navigate to={postPath(post, "es")} replace />;
  // Pick the right language field with ES fallback
  if (location.pathname !== postPath(post, lang))
    return <Navigate to={postPath(post, lang)} replace />;
  const pick = (field) =>
    post[`${field}_en`] && lang === "en" ? post[`${field}_en`] : post[field];

  const displayTitle = pick("title");
  const displayContent = pick("content");
  // Use excerpt as meta description — fallback to first 160 chars of title if no excerpt
  const displayExcerpt = clampText(
    pick("excerpt") || plainText(displayContent) || displayTitle,
    158,
  );

  // SEO Fields — keep titles under ~65 chars so Google does not cut them
  const cleanTitle = stripEmoji(displayTitle);
  const brandedTitle = `${cleanTitle} | SaltySoulTrips`;
  const cmsTitle = stripEmoji(pick("seoTitle"));
  const seoTitle =
    cmsTitle && cmsTitle.length <= 65
      ? cmsTitle
      : brandedTitle.length <= 65
        ? brandedTitle
        : clampText(cleanTitle, 65);
  // Ignore auto-generated CMS descriptions ("… Descubre más en el blog …")
  const cmsDesc = stripEmoji(pick("seoDescription"));
  const seoDesc =
    cmsDesc && cmsDesc.length >= 70 && !/descubre m[aá]s en el blog|discover more on the/i.test(cmsDesc)
      ? clampText(cmsDesc, 158)
      : displayExcerpt;
  const pageUrl = `${SITE}${postPath(post, lang)}`;
  const crumbs = [
    homeCrumb(lang),
    { name: "Blog", path: lang === "en" ? "/en/blog" : "/blog" },
    { name: cleanTitle, path: postPath(post, lang) },
  ];
  const coverAlt = post.coverImage?.alt || displayTitle;

  // Schema.org Article data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: displayTitle,
    image: [
      post.coverImage
        ? urlFor(post.coverImage).width(1200).auto("format").url()
        : "",
    ],
    datePublished: post.date,
    dateModified: post._updatedAt || post.date,
    inLanguage: lang,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: [AUTHOR],
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "SaltySoulTrips",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/resto/logo.png`,
      },
    },
    description: seoDesc,
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={pageUrl}
        esUrl={`https://www.saltysoultrips.com/blog/${post.slug.current}`}
        enUrl={
          hasEnglishPost(post)
            ? `https://www.saltysoultrips.com${postPath(post, "en")}`
            : undefined
        }
        ogImage={
          post.coverImage
            ? urlFor(post.coverImage).width(1200).auto("format").url()
            : ""
        }
        ogType="article"
        schemaData={[articleSchema, breadcrumbSchema(crumbs)]}
      />

      <article className="pt-24 pb-16 min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 mb-8 text-stone-500">
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <Breadcrumbs items={crumbs} className="!text-stone-500" />
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8">
            {post.coverImage && (
              <img
                src={urlFor(post.coverImage).width(1200).quality(80).auto("format").url()}
                srcSet={[640, 960, 1200, 1800]
                  .map(
                    (w) =>
                      `${urlFor(post.coverImage).width(w).quality(80).auto("format").url()} ${w}w`,
                  )
                  .join(", ")}
                sizes="(min-width: 896px) 864px, 100vw"
                fetchPriority="high"
                alt={coverAlt}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm -mt-20 relative z-10 mx-4 md:mx-0">
            <div className="flex flex-wrap gap-4 items-center text-sm text-stone-500 mb-6 border-b border-stone-100 pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />{" "}
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              </span>
              {/* Show language notice if English content not available */}
              {lang === "en" && !post.title_en && (
                <span className="text-xs bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full">
                  This article is only available in Spanish
                </span>
              )}
            </div>

            <p className="text-sm text-stone-500 mb-4">
              {lang === "en"
                ? "By Ángela · SaltySoulTrips"
                : "Por Ángela · SaltySoulTrips"}
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-sage mb-8 leading-tight">
              {displayTitle}
            </h1>

            <div className="prose-custom font-serif text-lg">
              <PortableText value={displayContent} components={components} />
            </div>
            <aside className="mt-10 border-t border-sand-200 pt-8">
              <h2 className="text-2xl font-serif mb-3">
                {lang === "en"
                  ? "Shall we plan your trip?"
                  : "¿Organizamos tu viaje?"}
              </h2>
              <p className="mb-4">
                {lang === "en"
                  ? "Tell us your dates and budget. We will prepare a proposal and manage the agreed bookings."
                  : "Cuéntanos tus fechas y presupuesto. Preparamos una propuesta y gestionamos las reservas acordadas."}
              </p>
              {(relatedTrips === null || guides === null) && <div data-loading="true" />}
              {guides?.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-3">
                  {guides.map((d) => (
                    <Link
                      key={d._id}
                      to={destinationPath(d, lang)}
                      className="inline-flex items-center gap-2 border border-sand-200 rounded-full px-4 py-2 font-medium hover:bg-sand-100"
                    >
                      🧭{" "}
                      {lang === "en"
                        ? `Travel guide: ${d.name_en || d.name}`
                        : `Guía de viaje: ${d.name}`}{" "}
                      →
                    </Link>
                  ))}
                </div>
              )}
              {relatedTrips?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-serif mb-2">
                    {lang === "en" ? "Related trips" : "Viajes relacionados"}
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    {relatedTrips.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/${lang === "en" ? "packages" : "paquetes"}/${p.id}`}
                          className="underline underline-offset-4 hover:text-brand-sage"
                        >
                          {lang === "en" && p.title_en ? p.title_en : p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-6 underline">
                <Link to={lang === "en" ? "/packages" : "/paquetes"}>
                  {lang === "en" ? "Explore our trips" : "Ver nuestros viajes"}
                </Link>
                <Link to={lang === "en" ? "/contact" : "/contacto"}>
                  {lang === "en"
                    ? "Request a proposal"
                    : "Solicitar una propuesta"}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
