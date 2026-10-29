const BOOKS_API_URL = "https://soker90.github.io/libros/api.json";
export type ReadingState = "reading" | "completed" | "want-to-read";

export type Book = {
  title: string;
  authors: string[];
  image: string;
  description: string;
  longDescription?: string;
  externalReviews?: ExternalReview[];
  collections?: string[];
  series?: string;
  state: ReadingState;
  publisher?: string;
  publishedDate?: string;
  language?: string;
  /** Personal rating recorded in the book issue, on a 0–5 scale. */
  personalRating?: number;
  /** Rating imported from Goodreads, on a 0–5 scale. */
  goodreadsRating?: number;
  categories?: string[];
  pageCount?: number;
  isbn10?: string;
  isbn13?: string;
  progressPercent?: number;
  startedAt?: string;
  completedAt?: string;
  issueNumber?: number;
  timeToCompleteFormatted?: string;
  googleBooks?: { preview?: string; info?: string; canonical?: string };
};

export type ExternalReview = { source: string; title?: string; url: string; description?: string };

type ApiBook = Partial<Book> & {
  title?: string;
  authors?: string[];
  image?: string;
  state?: string;
};

const fallbackBooks: Book[] = [
  {
    title: "Ciclo Pendragon nº 02/06 Merlín",
    authors: ["Stephen R. Lawhead"],
    image: "https://www.planetadelibros.com/usuaris/libros/fotos/405/original/portada_ciclo-pendragon-n-0206-merlin_stephen-r-lawhead_202505280841.jpg",
    description: "Merlín deberá hacer realidad el Reino del Verano.",
    state: "reading",
    publisher: "Minotauro",
    publishedDate: "2025-07-02",
    categories: ["Fantasía"],
    pageCount: 480,
    isbn13: "9788445018910",
    issueNumber: 54,
    progressPercent: 0,
    startedAt: "2026-10-27T15:33:06.000Z",
  },
];

function normalizeBook(book: ApiBook): Book | null {
  if (!book.title || !Array.isArray(book.authors) || !book.state) return null;
  if (!["reading", "completed", "want-to-read"].includes(book.state)) return null;

  return {
    ...book,
    title: book.title,
    authors: book.authors,
    image: book.image && !/placehold\\.co|no[ -]?cover/i.test(book.image) ? book.image.replace(/^http:\\/\\//i, "https://") : (book.isbn13 || book.isbn10) ? `https://covers.openlibrary.org/b/isbn/${book.isbn13 || book.isbn10}-L.jpg?default=false` : "",
    description: book.description ?? "",
    longDescription: book.longDescription ?? "",
    externalReviews: Array.isArray(book.externalReviews) ? book.externalReviews.filter((review) => review && typeof review.url === "string" && /^https?:\/\//i.test(review.url)) : [],
    collections: Array.isArray(book.collections) ? book.collections : [],
    series: book.series,
    state: book.state as ReadingState,
    issueNumber: typeof book.issueNumber === "number" ? book.issueNumber : undefined,
  };
}

async function loadBooks(): Promise<Book[]> {
  try {
    const response = await fetch(BOOKS_API_URL, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) throw new Error(`Books API returned HTTP ${response.status}`);

    const payload: unknown = await response.json();
    if (!Array.isArray(payload)) throw new Error("Books API did not return an array");

    const loadedBooks = payload.map((book) => normalizeBook(book as ApiBook)).filter((book): book is Book => book !== null);
    return loadedBooks.length > 0 ? loadedBooks : fallbackBooks;
  } catch (error) {
    console.warn("[books] Could not load the reading API; using fallback data.", error);
    return fallbackBooks;
  }
}

const byNewest = (left?: string, right?: string) =>
  new Date(right ?? 0).getTime() - new Date(left ?? 0).getTime();

export const books = await loadBooks();
export const currentlyReading = books
  .filter((book) => book.state === "reading")
  .toSorted((a, b) => byNewest(a.startedAt, b.startedAt));
export const recentReads = books
  .filter((book) => book.state === "completed" && book.completedAt)
  .toSorted((a, b) => byNewest(a.completedAt, b.completedAt));
export const recommendations = books
  .filter((book) => book.state === "want-to-read")
  .toSorted((a, b) => byNewest(a.startedAt, b.startedAt));

export const bookDetailUrl = (book: Book) =>
  `/libros/${book.issueNumber ?? slugifyBookTitle(book.title)}`;

export const slugifyBookTitle = (title: string) =>
  title.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const formatBookDate = (date?: string) =>
  date
    ? new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Europe/Madrid",
      }).format(new Date(date))
    : "";

export const formatPublishedYear = (date?: string) => {
  if (!date) return "";
  const match = date.match(/^\d{4}/);
  return match?.[0] ?? "";
};
