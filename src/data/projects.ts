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
    image: "/images/project-finper.svg",
    imageAlt: "Panel de resumen financiero con balance, gráfica y porcentaje de ahorro",
    tags: ["React", "TypeScript", "Finanzas"],
    links: [
      { label: "Ver proyecto", href: "https://github.com/soker90/finper" },
    ],
  },
  {
    name: "AUR Maintainer",
    description: "Una GitHub Action para mantener paquetes de Arch Linux AUR al día.",
    image: "/images/project-aur.svg",
    imageAlt: "Terminal con comandos de mantenimiento de paquetes y estado actualizado",
    tags: ["GitHub Actions", "AUR", "Arch Linux"],
    links: [
      { label: "Ver repositorio", href: "https://github.com/soker90/aur-maintainer" },
      { label: "Marketplace", href: "https://github.com/marketplace/actions/aur-maintainer" },
    ],
  },
  {
    name: "Cocinando con Edu",
    description: "Recetas caseras, sencillas y sabrosas para cocinar cada día.",
    image: "/images/project-recetas.svg",
    imageAlt: "Ficha editorial de una receta casera con plato ilustrado",
    tags: ["Astro", "Recetas", "Cocina"],
    links: [
      { label: "Ver recetas", href: "https://recetas.eduardoparra.es" },
    ],
  },
  {
    name: "Cacotas",
    description: "Una pequeña PWA para llevar un inventario y prever cuándo reponer.",
    image: "/images/project-cacotas.svg",
    imageAlt: "Panel de inventario de pañales con unidades disponibles y próxima reposición",
    tags: ["PWA", "React", "TypeScript"],
    links: [
      { label: "Ver proyecto", href: "https://github.com/soker90/cacotas" },
    ],
  },
];
