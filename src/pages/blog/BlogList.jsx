import { Link } from "react-router-dom";
import SEOHead from "../../components/SEOHead";
import { blogPosts } from "../../data/blogData";
import Calendar from "lucide-react/dist/esm/icons/calendar";
import User from "lucide-react/dist/esm/icons/user";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

export default function BlogList() {
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
              Diario de Viaje
            </h1>
            <p className="text-xl text-stone-600">
              Inspiración, historias y secretos para tu próxima gran aventura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block relative overflow-hidden h-48"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-sage uppercase tracking-wider">
                    {post.category}
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block mb-3">
                    <h2 className="text-xl font-display font-bold text-brand-sage leading-tight group-hover:text-brand-ochre transition-colors">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-stone-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.excerpt}
                  </p>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-brand-sage font-medium text-sm hover:text-brand-ochre transition-colors mt-auto"
                  >
                    Leer artículo <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
