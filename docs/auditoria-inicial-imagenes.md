# Auditoría inicial de imágenes

## Objetivo

Mejorar las imágenes de la web personal y de sus contenidos relacionados priorizando fotografías reales, capturas auténticas y fuentes oficiales. No se deben sustituir imágenes por recursos genéricos o generados cuando exista una fuente primaria adecuada.

Esta primera auditoría combina el análisis de referencias del código con el inventario de archivos presentes en `public/images/`. Se han localizado 25 archivos en las carpetas revisadas: 2 en la raíz, 12 de proyectos, 5 de libros y 6 de recetas. No se ha podido verificar visualmente el contenido de los archivos raster; por tanto, las observaciones sobre ellos se basan en nombres, descripciones del código y uso, no en una inspección de píxeles.

## Inventario inicial

| Área | Imagen o fuente actual | Observación | Propuesta |
| --- | --- | --- | --- |
| Portada | `/images/hero-desktop.webp` | Composición personalizada con equipo, libros y gastronomía manchega. También se utiliza como imagen Open Graph por defecto. | Mantenerla provisionalmente. Revisar calidad, recorte y coherencia; no sustituir una imagen personal por una fotografía de stock. |
| Finper | `/images/projects/finper.webp` | Imagen existente descrita como vista previa de la interfaz. | Comprobar que representa la versión actual y sustituirla por una captura reciente si está desactualizada. |
| AUR Maintainer | `/images/projects/aur-maintainer.webp` | Imagen existente descrita como terminal y configuración. | Verificar que sea una captura real y legible del proyecto; actualizarla desde el repositorio o una ejecución real si procede. |
| Cocinando con Edu | `/images/projects/cocinando-con-edu.webp` | Imagen existente descrita como plato casero. | Priorizar fotografías propias de recetas y comprobar que corresponde al contenido actual. |
| Cacotas | `/images/projects/cacotas.webp` | Imagen existente descrita como captura de la PWA. | Actualizar con una captura real de la aplicación en móvil, sin datos personales. |
| Arroyo ERP | `/images/projects/arroyo-erp.svg` | Ilustración genérica de un panel de gestión. | Sustituir por una captura real de la interfaz si hay pantallas representativas disponibles. |
| Alameda de Cervera | `/images/projects/alameda-cervera.svg` | Ilustración de paisaje manchego. | Buscar fotografías propias o de fuentes institucionales/oficiales del municipio y su entorno, verificando autoría y condiciones de uso. |
| Tarifas de la luz | `/images/projects/tarifas-luz.svg` | Gráfico ilustrativo. | Valorar una captura real de la herramienta o una visualización generada con datos reales. |
| Alerta Alimentos Bot | `/images/projects/alerta-alimentos.svg` | Ilustración de aviso alimentario. | Valorar una captura real del canal/bot o de una alerta pública de AESAN, comprobando los derechos de reutilización. |
| Precio de la gasolina | `/images/projects/precio-gasolina.svg` | Ilustración de surtidor y evolución de precios. | Sustituir por una captura real de la web o una visualización basada en datos actuales. |
| Issue Link | `/images/projects/issue-link.svg` | Ilustración de notas técnicas. | Sustituir por una captura real de la herramienta en uso. |
| Modelo 130 | `/images/projects/modelo-130.svg` | Ilustración de calculadora. | Sustituir por una captura real de la calculadora, si la interfaz está disponible. |
| Medicamentos Peligrosos NIOSH | `/images/projects/medicamentos-niosh.svg` | Ilustración de buscador. | Sustituir por una captura real del buscador, sin datos sensibles ni contenido que pueda inducir a error. |
| Libros | API de `soker90/libros`; fallback a Open Library por ISBN | Las portadas dependen de datos externos y pueden faltar o corresponder a otra edición. | Corregir cada registro en el repositorio de libros usando la portada de la edición exacta, preferentemente desde editorial o distribuidor oficial. |
| Recetas recientes | RSS de `recetas.eduardoparra.es`; fallback local en `/images/recipes/` | La portada depende de la imagen publicada en el feed. | Mantener fotografía propia de cada plato y comprobar que RSS y ficha de receta muestran la misma imagen. |
| Artículos | Campo opcional `image` en las notas | Los artículos pueden no tener imagen y algunos listados usan una imagen por defecto. | Añadir imagen solo cuando aporte contexto; preferir fotografía propia, captura del tema o fuente oficial pertinente. |

## Inventario físico de archivos

### Raíz de `public/images/`

- `ahora-mismo-desk.webp`
- `hero-desktop.webp`

### Proyectos: `public/images/projects/`

- WebP existentes: `aur-maintainer.webp`, `cacotas.webp`, `cocinando-con-edu.webp`, `finper.webp`.
- SVG ilustrativos: `alameda-cervera.svg`, `alerta-alimentos.svg`, `arroyo-erp.svg`, `issue-link.svg`, `medicamentos-niosh.svg`, `modelo-130.svg`, `precio-gasolina.svg`, `tarifas-luz.svg`.

Los ocho SVG son composiciones editoriales dibujadas para representar cada proyecto; sus propios metadatos los describen como ilustraciones vectoriales. No son capturas de las aplicaciones ni fotografías. `issue-link.svg` y `precio-gasolina.svg` también se reutilizan en el bloque de recursos recientes, por lo que una sustitución coherente en el catálogo mejoraría ambas ubicaciones.

### Libros: `public/images/books/`

- `1984.webp`
- `habitos-atomicos.webp`
- `jardines-luna.webp`
- `quote-books-leaves.webp`
- `words-of-radiance.webp`

Conviene diferenciar las cuatro imágenes que parecen portadas de libro de `quote-books-leaves.webp`, que por su nombre parece un recurso decorativo/editorial. Hay que comprobar en qué páginas se usan antes de decidir cambios.

### Recetas: `public/images/recipes/`

- `arroz-setas.webp`
- `bizcocho.webp`
- `cheesecake-dinosaurios-thumb.webp`
- `pollo-horno.webp`
- `pudins-datiles-toffee.webp`
- `tarta-queso-taza.webp`

Estas seis imágenes son candidatas a conservar si son fotografías propias y corresponden a las recetas publicadas. No se recomienda sustituirlas por imágenes de terceros.

## Hallazgos adicionales

- El componente `ProjectCard.astro` ya permite mostrar imágenes reales sin cambiar el diseño: basta con actualizar el recurso asociado al proyecto.
- La lista `recent-resources.ts` reutiliza dos de los SVG del catálogo, de modo que se debe comprobar el resultado en ambas superficies.
- El feed RSS de recetas puede aportar imágenes remotas que no aparecen en este inventario local.
- `pnpm check:images` comprueba referencias locales literales en el código, pero no puede validar imágenes remotas procedentes del RSS o de la API de libros. Tampoco determina si una imagen externa es la edición correcta o si su licencia permite reutilizarla.

## Criterios para elegir las imágenes

1. **Autenticidad:** capturas reales para software y fotografías reales para lugares, comida y objetos.
2. **Fuente primaria:** fabricante, editorial, institución, parroquia, hermandad, administración pública o autor de la fotografía, según el caso.
3. **Correspondencia:** la imagen debe representar exactamente el proyecto, lugar, receta, producto o edición del libro enlazado.
4. **Derechos:** registrar autoría, fuente y licencia o permiso de uso. Que una imagen esté publicada en una web oficial no implica automáticamente que pueda copiarse.
5. **Calidad:** resolución suficiente para el tamaño de presentación, encuadre adecuado y buena legibilidad en móvil y escritorio.
6. **Rendimiento:** conservar formatos modernos y dimensiones razonables; evitar descargar imágenes remotas de terceros en cada visita cuando exista permiso para alojar una copia optimizada.
7. **Accesibilidad:** texto alternativo descriptivo cuando la imagen aporte información; `alt=""` cuando sea puramente decorativa.

## Orden propuesto

1. Proyectos de la portada: revisar Finper, AUR Maintainer, Cocinando con Edu y Arroyo ERP.
2. Resto del catálogo de proyectos y utilidades: retirar progresivamente las ilustraciones genéricas cuando haya capturas reales.
3. Libros: corregir portadas ausentes o de edición incorrecta en el repositorio que alimenta la API.
4. Recetas y artículos: comprobar consistencia, calidad y ausencia de imágenes rotas.
5. Portada: decidir si se conserva la composición actual o se prepara una nueva fotografía propia.

## Comprobaciones antes de dar la auditoría por cerrada

- [ ] Revisar visualmente todos los archivos de `public/images/`.
- [ ] Comprobar referencias rotas y archivos no utilizados con `pnpm check:images`.
- [ ] Verificar fuente, autoría y condiciones de uso de cada nueva imagen.
- [ ] Revisar recortes y resolución en móvil y escritorio.
- [ ] Comprobar textos alternativos.
- [ ] Ejecutar `pnpm check`, `pnpm build` y `pnpm format:check`.

## Alcance de esta PR

Esta PR añade únicamente el inventario inicial y los criterios de trabajo. No reemplaza imágenes ni modifica componentes. La auditoría visual completa y la selección de fuentes concretas se harán al revisar esta propuesta.
