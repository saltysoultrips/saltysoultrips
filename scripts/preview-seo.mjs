import { createServer } from "node:http";
import fs from "node:fs";
import path from "node:path";
export async function previewServer() {
  const root = path.resolve("dist");
  const { routes } = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  const mime = {
    ".js": "application/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
    ".xml": "application/xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".webmanifest": "application/manifest+json",
  };
  const server = createServer((req, res) => {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    let file = path.resolve(root, "." + pathname),
      status = 200;
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      return res.end();
    }
    const explicit = routes.find(
      (r) => r.src && r.src !== "/.*" && new RegExp(r.src).test(pathname),
    );
    if (explicit?.headers?.Location) {
      res.writeHead(explicit.status, explicit.headers);
      return res.end();
    }
    if (explicit) {
      file = path.join(root, explicit.dest);
      status = explicit.status;
      for (const [k, v] of Object.entries(explicit.headers || {}))
        res.setHeader(k, v);
    } else if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      file = path.join(root, "404.html");
      status = 404;
      res.setHeader("X-Robots-Tag", "noindex");
    }
    res.writeHead(status, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
    });
    res.end(fs.readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}
