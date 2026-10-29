const BOOKS_API_URL = "https://soker90.github.io/libros/api.json";
const BOOKS_REPOSITORY_URL = "https://github.com/soker90/libros";

export type ReadingState = "reading" | "completed" | "want-to-read";

export type Book = {
  title: string;
  authors: string[];
  image: string;
  description: string;
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
    image: book.image?.replace(/^http:\/\//i, "https://") ?? "",
    description: book.description ?? "",
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

export const bookIssueUrl = (book: Book) =>
  book.issueNumber ? `${BOOKS_REPOSITORY_URL}/issues/${book.issueNumber}` : BOOKS_REPOSITORY_URL;

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
