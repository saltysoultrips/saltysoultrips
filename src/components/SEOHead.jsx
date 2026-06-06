import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/**
 * Componente para manejar meta tags dinámicos usando react-helmet-async
 * Compatible con React 19 y multilenguaje (SEO internacional)
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "https://www.saltysoultrips.com/resto/logoGoogle.png",
  ogImageWidth = "1200",
  ogImageHeight = "630",
  ogType = "website",
  schemaData = null,
  esUrl,
  enUrl,
  noIndex = false,
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "es";
  const locale = lang === "en" ? "en_US" : "es_ES";

  return (
    <Helmet>
      {/* HTML Language Attribute */}
      <html lang={lang} />

      {/* Title */}
      <title>{title}</title>

      {/* Robots — noindex for 404 and other non-indexable pages */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Standard Meta Tags */}
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang Tags for International SEO */}
      <link rel="alternate" hreflang="es" href={esUrl || canonicalUrl} />
      <link rel="alternate" hreflang="en" href={enUrl || canonicalUrl} />
      {/* x-default is recommended by Google to point to the default language */}
      <link rel="alternate" hreflang="x-default" href={esUrl || canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={locale} />
      {lang === "es" && <meta property="og:locale:alternate" content="en_US" />}
      {lang === "en" && <meta property="og:locale:alternate" content="es_ES" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@saltysoultrips" />
      <meta name="twitter:creator" content="@saltysoultrips" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      )}
    </Helmet>
  );
}
