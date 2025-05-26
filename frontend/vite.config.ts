import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true, // <= key line
      interval: 100, //   100 ms between polls (tweak if you like)
    },
    open: true, //   auto-opens http://localhost:5173
    // hmr: { host: 'localhost' }   // uncomment when tunnelling / Docker
  },
});
