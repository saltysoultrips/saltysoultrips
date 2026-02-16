import { useParams, Navigate, Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import { blogPosts } from "../../data/blogData";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Schema.org Article data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.coverImage],
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        "@type": "Person",
        name: post.author,
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
    description: post.excerpt,
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Blog SaltySoulTrips`}
        description={post.excerpt}
        canonicalUrl={`https://www.saltysoultrips.com/blog/${post.slug}`}
        ogImage={post.coverImage}
        schemaData={articleSchema}
      />

      <article className="pt-24 pb-16 min-h-screen bg-stone-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/blog"
            className="inline-flex items-center text-stone-500 hover:text-brand-sage transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Blog
          </Link>

          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm -mt-20 relative z-10 mx-4 md:mx-0">
            <div className="flex flex-wrap gap-4 items-center text-sm text-stone-500 mb-6 border-b border-stone-100 pb-6">
              <span className="bg-brand-sage/10 text-brand-sage px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-brand-sage mb-8 leading-tight">
              {post.title}
            </h1>

            <div
              className="prose prose-stone prose-lg max-w-none text-stone-700 font-serif leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </>
  );
}
