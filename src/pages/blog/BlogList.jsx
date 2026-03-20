import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import { client, urlFor } from "../../lib/sanity";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

export default function BlogList() {
  const [blogPosts, setBlogPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `*[_type == "post"] | order(date desc)`;
        const data = await client.fetch(query);
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-stone-50 min-h-screen flex items-center justify-center">
        <div className="text-stone-400">Cargando blog...</div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog de Viajes | Consejos y Guías | SaltySoulTrips"
        description="Descubre nuestros mejores consejos, guías de destinos y trucos para viajar por el mundo de forma auténtica y a tu medida."
        canonicalUrl="https://www.saltysoultrips.com/blog"
      />

      <div className="pt-24 pb-16 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-sage mb-6">
              Blog de Viajes: <br className="hidden md:block" /> Inspiración y
              Guías
            </h1>
            <p className="text-xl text-stone-600">
              Inspiración, historias y secretos para tu próxima gran aventura.
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-20 text-stone-500">
              No hay artículos publicados todavía.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
                >
                  <Link
                    to={`/blog/${post.slug.current}`}
                    className="block relative overflow-hidden h-48"
                  >
                    <img
                      src={post.coverImage ? urlFor(post.coverImage).url() : ""}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug.current}`} className="block mb-3">
                      <h2 className="text-xl font-display font-bold text-brand-sage leading-tight group-hover:text-brand-ochre transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    <Link
                      to={`/blog/${post.slug.current}`}
                      className="inline-flex items-center text-brand-sage font-medium text-sm hover:text-brand-ochre transition-colors mt-auto"
                    >
                      Leer artículo <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
