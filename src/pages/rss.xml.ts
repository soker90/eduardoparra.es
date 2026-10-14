import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const entries = (await getCollection("notes", ({ data }) => !data.draft))
    .toSorted((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const items = entries.map((entry) => {
    const url = new URL(`/notas/${entry.id.replace(/\.md$/, "")}`, site);
    return `<item><title>${escapeXml(entry.data.title)}</title><link>${url.href}</link><guid isPermaLink="true">${url.href}</guid><description>${escapeXml(entry.data.description)}</description><pubDate>${entry.data.pubDate.toUTCString()}</pubDate>${entry.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}</item>`;
  }).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Notas de Eduardo Parra</title><link>${site}</link><description>Notas personales sobre tecnología, proyectos y aprendizaje.</description><language>es-es</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" } });
};
