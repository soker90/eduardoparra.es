import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

// Vite expands this glob at build time. New static .astro pages are included
// automatically; dynamic routes are represented by their own data source below.
const pageModules = import.meta.glob("./**/*.astro");
const staticPaths = Object.keys(pageModules)
  .filter((path) => !path.includes("["))
  .map((path) => {
    const route = path
      .replace(/^\.\//, "")
      .replace(/\.astro$/, "")
      .replace(/\/index$/, "");
    return route === "index" ? "/" : `/${route}`;
  })
  .toSorted();

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Astro site URL must be configured to generate the sitemap.");
  }

  const entries = (await getCollection("notes", ({ data }) => !data.draft))
    .toSorted((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const staticUrls = staticPaths.map((path) => {
    const url = new URL(path, site).href;
    return `<url><loc>${escapeXml(url)}</loc></url>`;
  });

  const articleUrls = entries.map((entry) => {
    const url = new URL(`/notas/${entry.id.replace(/\.md$/, "")}`, site).href;
    const lastmod = (entry.data.updatedDate ?? entry.data.pubDate).toISOString();
    return `<url><loc>${escapeXml(url)}</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...staticUrls, ...articleUrls].join("")}</urlset>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};
