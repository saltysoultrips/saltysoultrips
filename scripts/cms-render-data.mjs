// The build reads public CMS data server-side. Local browser origins are not
// production CORS origins, so pass the public query response to the renderer.
const cache = new Map();
export async function publicCmsResponse(url) {
  const target = new URL(url);
  if (
    target.hostname !== "wzn5s2a9.apicdn.sanity.io" &&
    target.hostname !== "wzn5s2a9.api.sanity.io"
  )
    return null;
  if (!target.pathname.includes("/data/query/production")) return null;
  target.hostname = "wzn5s2a9.api.sanity.io";
  const key = target.href;
  if (!cache.has(key))
    cache.set(
      key,
      (async () => {
        const r = await fetch(key, { signal: AbortSignal.timeout(20000) });
        if (!r.ok) throw new Error(`Public CMS query failed (${r.status})`);
        const body = await r.text();
        const data = JSON.parse(body);
        if (data.error) throw new Error("Public CMS query returned an error");
        return {
          status: 200,
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": "*" },
          body,
        };
      })(),
    );
  return cache.get(key);
}
