export type ProjectLink = {
  label: string;
  href: string;
  type?: "web" | "github" | "marketplace" | "repo";
};

export type Project = {
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  links: ProjectLink[];
  category?: "proyecto" | "utilidad";
};

export const mainProjects: Project[] = [
  {
    name: "Finper",
    description:
      "Aplicación de finanzas personales para gestionar cuentas bancarias, presupuestos mensuales, gastos recurrentes y analítica financiera.",
    image: "/images/projects/finper.webp",
    imageAlt: "Vista previa de la interfaz de Finper con estadísticas y movimientos",
    tags: ["React", "TypeScript", "Tailwind CSS", "Finanzas"],
    category: "proyecto",
    links: [
      { label: "Ver web", href: "https://finper.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/finper", type: "github" },
    ],
  },
  {
    name: "AUR Maintainer",
    description:
      "GitHub Action para automatizar el ciclo de vida y actualización de paquetes de Arch Linux en el repositorio AUR.",
    image: "/images/projects/aur-maintainer.webp",
    imageAlt: "Terminal y configuración de AUR Maintainer para Arch Linux",
    tags: ["GitHub Actions", "AUR", "Arch Linux", "CI/CD"],
    category: "proyecto",
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
      "Blog de cocina casera con buscador, filtrado por categorías, tiempos de preparación y fichas completas de recetas.",
    image: "/images/projects/cocinando-con-edu.webp",
    imageAlt: "Plato casero de Cocinando con Edu",
    tags: ["Astro", "Tailwind CSS", "Recetas", "Cocina"],
    category: "proyecto",
    links: [
      { label: "Ver web", href: "https://recetas.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/cooking-blog", type: "github" },
    ],
  },
  {
    name: "Cacotas",
    description:
      "PWA offline-first diseñada para el control de inventario de pañales, registro de consumo diario y previsión de compras familiares.",
    image: "/images/projects/cacotas.webp",
    imageAlt: "Captura de la aplicación móvil PWA Cacotas",
    tags: ["PWA", "TypeScript", "Productividad", "Familia"],
    category: "proyecto",
    links: [
      { label: "Ver web", href: "https://cacotas.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/cacotas", type: "github" },
    ],
  },
  {
    name: "Arroyo ERP",
    image: "/images/projects/arroyo-erp.svg",
    imageAlt: "Ilustración de panel de gestión empresarial de Arroyo ERP",
    description:
      "Suite y backoffice modular para la gestión integral de pymes: clientes, facturación, proveedores y catálogo comercial.",
    tags: ["React", "Node.js", "GraphQL", "ERP"],
    category: "proyecto",
    links: [
      { label: "Documentación", href: "https://arroyo.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/arroyo-erp-project", type: "github" },
    ],
  },
  {
    name: "Alameda de Cervera",
    image: "/images/projects/alameda-cervera.svg",
    imageAlt: "Ilustración de paisaje manchego para el sitio de Alameda de Cervera",
    description:
      "Sitio web informativo dedicado a la historia, eventos, noticias y patrimonio de Alameda de Cervera.",
    tags: ["Astro", "Tailwind CSS", "Comunidad"],
    category: "proyecto",
    links: [
      { label: "Ver web", href: "https://alamedadecervera.com", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/alamedadecervera", type: "github" },
    ],
  },
];

export const utilityProjects: Project[] = [
  {
    name: "Tarifas de la luz",
    image: "/images/projects/tarifas-luz.svg",
    imageAlt: "Gráfico de evolución de precios de la energía",
    description:
      "Script y generador automático de JSON que monitoriza y compara los precios de las tarifas eléctricas para optimizar el ahorro.",
    tags: ["TypeScript", "Automatización", "JSON API"],
    category: "utilidad",
    links: [
      {
        label: "Ver JSON",
        href: "https://soker90.github.io/tarifas-luz/tarifas.json",
        type: "web",
      },
      { label: "GitHub", href: "https://github.com/soker90/tarifas-luz", type: "github" },
    ],
  },
  {
    name: "Alerta Alimentos Bot",
    image: "/images/projects/alerta-alimentos.svg",
    imageAlt: "Ilustración de aviso de seguridad alimentaria",
    description:
      "Scraper y bot de Telegram que difunde alertas oficiales de seguridad alimentaria emitidas por la AESAN y Consumo.",
    tags: ["Node.js", "Telegram Bot", "Scraping"],
    category: "utilidad",
    links: [
      { label: "Canal Telegram", href: "https://t.me/alertas_aesan", type: "web" },
      {
        label: "GitHub",
        href: "https://github.com/soker90/alerta-alimentos-bot",
        type: "github",
      },
    ],
  },
  {
    name: "Precio de la gasolina",
    image: "/images/projects/precio-gasolina.svg",
    imageAlt: "Ilustración de surtidor y evolución del precio del combustible",
    description:
      "Bot notificador de Telegram que alerta cada vez que cambian los precios en estaciones de servicio seleccionadas.",
    tags: ["HTML", "JavaScript", "Telegram Bot"],
    category: "utilidad",
    links: [
      { label: "Web", href: "https://soker90.github.io/precio-gasolina/", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/precio-gasolina", type: "github" },
    ],
  },
  {
    name: "Issue Link",
    image: "/images/projects/issue-link.svg",
    imageAlt: "Ilustración de notas técnicas organizadas en un documento",
    description:
      "Herramienta web ágil para enlazar issues y notas técnicas organizadas directamente en archivos Markdown.",
    tags: ["Astro", "Markdown", "Productividad"],
    category: "utilidad",
    links: [
      { label: "Ver web", href: "https://link.eduardoparra.es", type: "web" },
      { label: "GitHub", href: "https://github.com/soker90/issue-link", type: "github" },
    ],
  },
  {
    name: "Modelo 130",
    image: "/images/projects/modelo-130.svg",
    imageAlt: "Ilustración de calculadora para pagos fraccionados de autónomos",
    description:
      "Calculadora y asistente ágil para estimar pagos fraccionados trimestrales del IRPF para autónomos.",
    tags: ["TypeScript", "Finanzas", "Calculadora"],
    category: "utilidad",
    links: [{ label: "GitHub", href: "https://github.com/soker90/modelo-130", type: "github" }],
  },
  {
    name: "Medicamentos Peligrosos NIOSH",
    image: "/images/projects/medicamentos-niosh.svg",
    imageAlt: "Ilustración de buscador de seguridad de medicamentos",
    description:
      "Buscador rápido para consultar la lista de medicamentos peligrosos según la clasificación técnica del NIOSH.",
    tags: ["JavaScript", "Buscador", "Salud"],
    category: "utilidad",
    links: [
      {
        label: "Buscador",
        href: "https://soker90.github.io/medicamentos-peligrosos-niosh/",
        type: "web",
      },
      {
        label: "GitHub",
        href: "https://github.com/soker90/medicamentos-peligrosos-niosh",
        type: "github",
      },
    ],
  },
];

// Proyectos destacados de la portada; el catálogo completo conserva el resto.
const featuredProjectNames = new Set([
  "Finper",
  "AUR Maintainer",
  "Cocinando con Edu",
  "Arroyo ERP",
]);

export const projects: Project[] = mainProjects.filter(({ name }) => featuredProjectNames.has(name));
