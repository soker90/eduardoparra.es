const RECIPES_FEED_URL = "https://recetas.eduardoparra.es/rss.xml";
const RECIPE_SITE_URL = "https://recetas.eduardoparra.es";

const fallbackRecipes = [
  {
    title: "Tarta de queso en taza",
    category: "Postres",
    image: "/images/recipes/tarta-queso-taza.webp",
    href: `${RECIPE_SITE_URL}/blog/tarta-de-queso-en-taza`,
    description: "Un postre rápido para preparar en el microondas.",
    date: "",
  },
  {
    title: "Pudins de dátiles y toffee",
    category: "Postres",
    image: "/images/recipes/pudins-datiles-toffee.webp",
    href: `${RECIPE_SITE_URL}/blog/pudins-datiles-toffee`,
    description: "Un dulce casero con dátiles y salsa de toffee.",
    date: "",
  },
  {
    title: "Tarta de queso de dinosaurios",
    category: "Postres",
    image: "/images/recipes/cheesecake-dinosaurios-thumb.webp",
    href: `${RECIPE_SITE_URL}/blog/cheesecake-de-dinosaurios`,
    description: "Una tarta divertida para compartir.",
    date: "",
  },
] as const;

type Recipe = {
  title: string;
  category: string;
  image: string;
  href: string;
  description: string;
  date: string;
};

const decodeXml = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();

const getTag = (item: string, tag: string) => {
  const match = item.match(new RegExp(`<(?:[\\w-]+:)?${tag}\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w-]+:)?${tag}>`, "i"));
  return match ? decodeXml(match[1]) : "";
};

const getImageUrl = (item: string) => {
  const media = item.match(/<(?:media:content|enclosure)\b([^>]+)>?/i);
  const url = media?.[1].match(/\burl=["']([^"']+)["']/i)?.[1];
  if (!url) return "";
  try {
    return new URL(decodeXml(url), RECIPE_SITE_URL).href;
  } catch {
    return "";
  }
};

const parseRecipes = (xml: string): Recipe[] =>
  [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)]
    .map(([, item]) => {
      const title = getTag(item, "title");
      const href = getTag(item, "link");
      if (!title || !href) return null;

      const categories = [...item.matchAll(/<(?:[\w-]+:)?category\b[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?category>/gi)]
        .map(([, category]) => decodeXml(category));
      const image = getImageUrl(item);
      const date = getTag(item, "pubDate");

      return {
        title,
        href,
        category: categories[0] ?? "Recetas",
        image,
        description: getTag(item, "description"),
        date: date ? new Date(date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "",
      };
    })
    .filter((recipe): recipe is Recipe => recipe !== null)
    .slice(0, 6);

async function loadRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(RECIPES_FEED_URL, {
      headers: { accept: "application/rss+xml, application/xml, text/xml" },
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) throw new Error(`Recipe RSS returned HTTP ${response.status}`);

    const recipesFromFeed = parseRecipes(await response.text());
    return recipesFromFeed.length > 0 ? recipesFromFeed : [...fallbackRecipes];
  } catch (error) {
    console.warn("[recipes] Could not load the recipe RSS feed; using fallback data.", error);
    return [...fallbackRecipes];
  }
}

export const recipes = await loadRecipes();
