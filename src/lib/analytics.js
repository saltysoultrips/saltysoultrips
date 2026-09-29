const ID = "G-0PCZ01VTG4";
export const CONSENT_KEY = "saltysoultrips_cookie_consent";
let loaded = false;
export function analyticsAllowed() {
  try {
    return (
      JSON.parse(localStorage.getItem(CONSENT_KEY) || "{}").analytics === true
    );
  } catch {
    return false;
  }
}
export function applyAnalyticsConsent(allowed) {
  window[`ga-disable-${ID}`] = !allowed;
  if (!allowed || window.__PRERENDER__) return;
  if (!loaded) {
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    // Explicit SPA page views below, with query parameters omitted.
    window.gtag("config", ID, { send_page_view: false });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.append(script);
  }
  trackPageView();
}
export function trackEvent(name, params = {}) {
  if (analyticsAllowed() && !window.__PRERENDER__)
    window.gtag?.("event", name, params);
}
export function trackPageView() {
  trackEvent("page_view", {
    page_location: location.origin + location.pathname,
  });
}
