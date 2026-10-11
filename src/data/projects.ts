export type Project = {
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    name: "Finper",
    description: "Finanzas personales para organizar cuentas, movimientos, presupuestos y mucho más.",
    tags: ["React", "TypeScript", "Finanzas"],
    links: [
      { label: "Ver proyecto", href: "https://github.com/soker90/finper" },
    ],
  },
  {
    name: "AUR Maintainer",
    description: "Una GitHub Action para mantener paquetes de Arch Linux AUR al día.",
    tags: ["GitHub Actions", "AUR", "Arch Linux"],
    links: [
      { label: "Ver repositorio", href: "https://github.com/soker90/aur-maintainer" },
      { label: "Marketplace", href: "https://github.com/marketplace/actions/aur-maintainer" },
    ],
  },
  {
    name: "Cocinando con Edu",
    description: "Recetas caseras, sencillas y sabrosas para cocinar cada día.",
    tags: ["Astro", "Recetas", "Cocina"],
    links: [
      { label: "Ver recetas", href: "https://recetas.eduardoparra.es" },
    ],
  },
  {
    name: "Cacotas",
    description: "Una pequeña PWA para llevar un inventario y prever cuándo reponer.",
    tags: ["PWA", "React", "TypeScript"],
    links: [
      { label: "Ver proyecto", href: "https://github.com/soker90/cacotas" },
    ],
  },
];
