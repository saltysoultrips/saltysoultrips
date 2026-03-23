import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import SEOHead from "../../components/SEOHead";
import { client, urlFor } from "../../lib/sanity";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left";

const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10 flex flex-col items-center">
          <img
            src={urlFor(value).width(1000).height(562).fit("crop").auto("format").url()}
            alt={value.alt || "Imagen del blog"}
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
      <ul className="list-disc pl-6 mb-8 space-y-2 text-stone-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-8 space-y-2 text-stone-700">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
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
  const { slug } = useParams();
  const [post, setPost] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Cargando artículo...</div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Schema.org Article data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.coverImage ? urlFor(post.coverImage).url() : ""],
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        "@type": "Person",
        name: "SaltySoulTrips",
        url: "https://www.saltysoultrips.com/about",
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
    description: post.title,
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog SaltySoulTrips`}
        description={post.title}
        canonicalUrl={`https://www.saltysoultrips.com/blog/${post.slug.current}`}
        ogImage={post.coverImage ? urlFor(post.coverImage).url() : ""}
        schemaData={articleSchema}
      />

      <article className="pt-24 pb-16 min-h-screen bg-stone-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-stone-500 hover:text-brand-sage transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Blog
          </Link>

          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8">
            <img
              src={post.coverImage ? urlFor(post.coverImage).url() : ""}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm -mt-20 relative z-10 mx-4 md:mx-0">
            <div className="flex flex-wrap gap-4 items-center text-sm text-stone-500 mb-6 border-b border-stone-100 pb-6">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-sage mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="prose-custom font-serif text-lg">
              <PortableText value={post.content} components={components} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
