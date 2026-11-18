# eduardoparra.es

Web personal de Eduardo Parra: proyectos, recetas, utilidades, blog y lecturas.

## Stack

- Astro 7
- TypeScript
- Tailwind CSS 4 con Vite
- Contenido editorial en Markdown mediante Astro Content Collections

## Desarrollo local

Requisitos: Node.js en la versión indicada en `.nvmrc` y pnpm 12.7.0.

```sh
pnpm install
pnpm dev
```

Antes de integrar cambios, valida el proyecto con:

```sh
pnpm check
pnpm build
pnpm format:check
```

## Escribir artículos del blog

Los artículos propios se guardan en `src/content/notes/` como archivos Markdown (`.md`). Puedes duplicar `primera-nota.md` como plantilla y editar sus metadatos:

```yaml
---
title: "Título del artículo"
description: "Resumen breve para listados y buscadores."
pubDate: 2026-10-14
updatedDate: 2026-10-15
tags:
  - Astro
  - Desarrollo web
image: /images/notes/mi-imagen.webp
draft: true
---
```

- `title`, `description` y `pubDate` son obligatorios.
- `updatedDate`, `tags` e `image` son opcionales.
- Mantén `draft: true` mientras escribes. Cambia a `draft: false` para publicar.
- Las imágenes propias pueden guardarse en `public/images/notes/` y enlazarse con una ruta que empiece por `/`.
- El identificador del archivo Markdown determina la URL del artículo; usa nombres de archivo claros y estables, por ejemplo `astro-content-collections.md`.

Los artículos publicados aparecen en `/blog`, tienen una página individual en `/blog/<nombre-del-archivo>` y se incluyen en el feed `/rss.xml`. Los borradores se excluyen de las tres superficies públicas. Los recursos externos de la sección se mantienen separados de los artículos propios.

## Principios

- Contenido y componentes accesibles, responsive y ligeros.
- Diseño editorial con base crema, blanco y verde oscuro.
- Los proyectos privados no se publican ni se enlazan desde la web.
- La sección de lecturas es una selección personal, no un catálogo exhaustivo.
