import React from "react";
import { useParams, useLocation, Navigate, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import SEOHead from "../../components/SEOHead";
import { client, urlFor } from "../../lib/sanity";
import { postPath, hasEnglishPost, englishPostSlug } from "../../lib/routes";
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
  const displayExcerpt =
    pick("excerpt") || `${displayTitle} - Blog de viajes de SaltySoulTrips.`;

  // SEO Fields
  const seoTitle = pick("seoTitle") || `${displayTitle} | Blog SaltySoulTrips`;
  const seoDesc = pick("seoDescription") || displayExcerpt;
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
    author: [
      {
        "@type": "Person",
        name: "Angela - SaltySoulTrips",
        url: "https://www.saltysoultrips.com/",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "SaltySoulTrips",
      logo: {
        "@type": "ImageObject",
        url: "https://www.saltysoultrips.com/resto/logoGoogle.png",
      },
    },
    description: displayExcerpt,
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={`https://www.saltysoultrips.com${postPath(post, lang)}`}
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
        schemaData={articleSchema}
      />

      <article className="pt-24 pb-16 min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to={lang === "en" ? "/en/blog" : "/blog"}
            className="inline-flex items-center text-stone-500 hover:text-brand-sage transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {lang === "en" ? "Back to Blog" : "Volver al Blog"}
          </Link>

          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8">
            <img
              src={
                post.coverImage
                  ? urlFor(post.coverImage).width(1200).auto("format").url()
                  : ""
              }
              alt={coverAlt}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm -mt-20 relative z-10 mx-4 md:mx-0">
            <div className="flex flex-wrap gap-4 items-center text-sm text-stone-500 mb-6 border-b border-stone-100 pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
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
