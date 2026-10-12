export type Book = {
  title: string;
  author: string;
  status: "Leyendo" | "Favorito" | "Terminado" | "Pendiente";
  cover: string;
  coverAlt?: string;
};

export const books: Book[] = [
  {
    title: "El Señor de los Anillos",
    author: "J. R. R. Tolkien",
    status: "Leyendo",
    cover: "/images/books/senor-anillos.webp",
    coverAlt: "Portada de El Señor de los Anillos de J.R.R. Tolkien",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    status: "Favorito",
    cover: "/images/books/dune.webp",
    coverAlt: "Portada de Dune de Frank Herbert",
  },
  {
    title: "Mero cristianismo",
    author: "C. S. Lewis",
    status: "Terminado",
    cover: "/images/books/mero-cristianismo.webp",
    coverAlt: "Portada de Mero cristianismo de C.S. Lewis",
  },
  {
    title: "Fundación",
    author: "Isaac Asimov",
    status: "Pendiente",
    cover: "/images/books/fundacion.webp",
    coverAlt: "Portada de Fundación de Isaac Asimov",
  },
];
