import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Enables access via local network
    port: 8080, // Server runs on port 8080
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for the "src" directory
    },
  },
  base: mode === "production" ? "/Todo/" : "/", 
}));
