import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.eduardoparra.es",
  redirects: {
    "/utilidades": "https://link.eduardoparra.es",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
