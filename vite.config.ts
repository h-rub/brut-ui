import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Importante: base `/brut-ui/` para que los assets carguen desde el subpath
// cuando se sirve desde heverrubiomarin.com/brut-ui/
export default defineConfig({
  plugins: [react()],
  base: "/brut-ui/",
});
