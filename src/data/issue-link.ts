import type { Project } from "./projects";

const FEED_URL = "https://link.eduardoparra.es/rss.xml";

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim();
}

function readTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

export async function getIssueLinkUtilities(limit = 100): Promise<Project[]> {
  try {
    const response = await fetch(FEED_URL, {
      headers: { accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!response.ok) throw new Error(`Issue Link RSS returned ${response.status}`);

    const xml = await response.text();
    return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)]
      .map(([, item]): Project | null => {
        const name = readTag(item, "title");
        const href = readTag(item, "link");
        const description = readTag(item, "description") || "Recurso guardado en Issue Link.";
        const pubDate = readTag(item, "pubDate");
        if (!name || !href) return null;
        return {
          name,
          description: description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
          tags: pubDate ? [new Date(pubDate).toLocaleDateString("es-ES")] : ["Issue Link"],
          links: [{ label: "Abrir recurso", href, type: "web" as const }],
        } satisfies Project;
      })
      .filter((item): item is Project => item !== null)
      .slice(0, Math.max(0, limit));
  } catch (error) {
    console.error("No se pudieron cargar las utilidades de Issue Link:", error);
    return [];
  }
}
