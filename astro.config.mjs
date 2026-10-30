import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.eduardoparra.es",
  redirects: {
    "/utilidades": "https://link.eduardoparra.es",
    "/notas": "/blog",
    "/notas/bloquear-el-acceso-por-regiones-en-nas-synology": "/blog/bloquear-acceso-por-regiones-en-nas-synology",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
