export type Book = {
  title: string;
  author: string;
  status: "Leyendo" | "Favorito" | "Terminado" | "Pendiente";
  cover: string;
  coverAlt?: string;
};

export const books: Book[] = [
  {
    title: "Palabras Radiantes",
    author: "Brandon Sanderson",
    status: "Favorito",
    cover: "/images/books/words-of-radiance.webp",
    coverAlt: "Portada de Palabras Radiantes (El Archivo de las Tormentas) de Brandon Sanderson",
  },
  {
    title: "Los jardines de la luna",
    author: "Steven Erikson",
    status: "Terminado",
    cover: "/images/books/jardines-luna.webp",
    coverAlt: "Portada de Los jardines de la luna de Steven Erikson",
  },
  {
    title: "1984",
    author: "George Orwell",
    status: "Terminado",
    cover: "/images/books/1984.webp",
    coverAlt: "Portada de 1984 de George Orwell",
  },
  {
    title: "Hábitos atómicos",
    author: "James Clear",
    status: "Pendiente",
    cover: "/images/books/habitos-atomicos.webp",
    coverAlt: "Portada de Hábitos atómicos de James Clear",
  },
];
