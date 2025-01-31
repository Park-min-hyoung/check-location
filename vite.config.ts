import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const server = {
  port: 8080,
  host: "localhost"
};

// https://vitejs.dev/config/
export default defineConfig({
  server,
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
