import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Astro site URL must be configured to generate the RSS feed.");
  }

  const entries = (await getCollection("notes", ({ data }) => !data.draft))
    .toSorted((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const feedUrl = new URL("/rss.xml", site).href;
  const latestUpdate = entries.reduce<Date | undefined>((latest, entry) => {
    const updated = entry.data.updatedDate ?? entry.data.pubDate;
    return !latest || updated > latest ? updated : latest;
  }, undefined);

  const items = entries.map((entry) => {
    const url = new URL(`/notas/${entry.id.replace(/\.md$/, "")}`, site).href;
    const updated = entry.data.updatedDate ?? entry.data.pubDate;
    return `<item><title>${escapeXml(entry.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(entry.data.description)}</description><pubDate>${entry.data.pubDate.toUTCString()}</pubDate><atom:updated>${updated.toISOString()}</atom:updated>${entry.data.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}</item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Notas de Eduardo Parra</title><link>${escapeXml(site.href)}</link><atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/><description>Notas personales sobre tecnología, proyectos y aprendizaje.</description><language>es-es</language>${latestUpdate ? `<lastBuildDate>${latestUpdate.toUTCString()}</lastBuildDate>` : ""}${items}</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};
