import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Pozwala na dostęp do serwera z zewnątrz kontenera
    port: 5173, // Standardowy port Vite
    watch: {
      usePolling: true, // Wymagane, aby Docker na Windows/Mac widział zmiany w plikach
    },
  },
});
