export type Book = {
  title: string;
  author: string;
  status: "Leyendo" | "Favorito" | "Terminado" | "Pendiente";
  cover?: string;
  coverAlt?: string;
};

// Selección inicial de ejemplo. Sustituir por libros y portadas confirmados antes de publicar.
export const books: Book[] = [
  { title: "Un libro que estoy leyendo", author: "Añade el título real", status: "Leyendo" },
  { title: "Un libro favorito", author: "Añade el título real", status: "Favorito" },
  { title: "Una lectura terminada", author: "Añade el título real", status: "Terminado" },
  { title: "Un libro pendiente", author: "Añade el título real", status: "Pendiente" },
];
