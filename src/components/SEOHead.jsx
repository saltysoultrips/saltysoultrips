import { Helmet } from "react-helmet-async";

/**
 * Componente para manejar meta tags dinámicos usando react-helmet-async
 * Compatible con React 19
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "https://www.saltysoultrips.com/resto/logoGoogle.png",
  schemaData = null,
}) {
  return (
    <Helmet>
      {/* Title */}
      <title>{title}</title>

      {/* Standard Meta Tags */}
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
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
