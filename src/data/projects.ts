export type ProjectLink = {
  label: string;
  href: string;
  type?: "web" | "github" | "marketplace" | "repo";
};

export type Project = {
  name: string;
  description: string;
  image: string;
  imageAlt?: string;
  tags: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    name: "Finper",
    description:
      "Aplicación de finanzas personales para gestionar cuentas, presupuestos, movimientos y mucho más.",
    image: "/images/projects/finper.webp",
    imageAlt: "Vista previa de la interfaz de Finper con estadísticas y movimientos",
    tags: ["React", "TypeScript", "Finanzas"],
    links: [
      { label: "Ver web", href: "https://finper.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/finper", type: "github" },
    ],
  },
  {
    name: "AUR Maintainer",
    description:
      "GitHub Action para mantener paquetes de Arch Linux AUR automatizando actualizaciones.",
    image: "/images/projects/aur-maintainer.webp",
    imageAlt: "Terminal y configuración de AUR Maintainer para Arch Linux",
    tags: ["GitHub Actions", "AUR", "Arch Linux"],
    links: [
      { label: "Ver repo", href: "https://github.com/soker90/aur-maintainer", type: "repo" },
      {
        label: "Marketplace",
        href: "https://github.com/marketplace/actions/aur-maintainer",
        type: "marketplace",
      },
    ],
  },
  {
    name: "Cocinando con Edu",
    description:
      "Recetas caseras, fáciles y con buen sabor. Blog de cocina con recetas de temporada.",
    image: "/images/projects/cocinando-con-edu.webp",
    imageAlt: "Plato casero de Cocinando con Edu",
    tags: ["Astro", "Recetas", "Cocina"],
    links: [
      { label: "Ver web", href: "https://recetas.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90", type: "github" },
    ],
  },
  {
    name: "Cacotas",
    description: "PWA para inventario de pañales, registro de consumo y previsión de compras.",
    image: "/images/projects/cacotas.webp",
    imageAlt: "Captura de la aplicación móvil PWA Cacotas",
    tags: ["PWA", "Familia", "Productividad"],
    links: [
      { label: "Ver web", href: "https://cacotas.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/cacotas", type: "github" },
    ],
  },
];
