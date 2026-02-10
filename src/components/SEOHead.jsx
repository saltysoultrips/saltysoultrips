import { useEffect } from "react";

/**
 * Componente para manejar meta tags dinámicos sin react-helmet
 * Compatible con React 19
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = "https://www.saltysoultrips.com/resto/logoGoogle.png",
  schemaData = null,
}) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (selector, content, attr = "content") => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, content);
      }
    };

    // Helper to update or create link tag
    const updateLink = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (element) {
        element.setAttribute("href", href);
      }
    };

    // Update standard meta tags
    updateMeta('meta[name="description"]', description);

    // Update Open Graph tags
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:image"]', ogImage);

    // Update Twitter tags
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', ogImage);

    // Update canonical URL
    updateLink("canonical", canonicalUrl);

    // Add/update schema.org data if provided
    if (schemaData) {
      let scriptTag = document.querySelector(
        'script[data-schema="destination"]',
      );
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        scriptTag.setAttribute("data-schema", "destination");
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    }

    // Cleanup function to remove destination schema when unmounting
    return () => {
      const scriptTag = document.querySelector(
        'script[data-schema="destination"]',
      );
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage, schemaData]);

  return null; // This component doesn't render anything
}
