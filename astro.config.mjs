import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.eduardoparra.es",
  vite: {
    plugins: [tailwindcss()],
  },
});
