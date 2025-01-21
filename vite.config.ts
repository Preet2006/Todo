import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Enables IPv6 and IPv4 connections
    port: 8080, // Sets the development server to run on port 8080
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(), // Enables the componentTagger plugin only in development mode
  ].filter(Boolean), // Removes falsey values from the plugins array

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Creates an alias for the "src" directory
    },
  },

  // Set base path conditionally for development and production
  base: mode === "production" ? "/Todo/" : "/", // In development, use the root path '/'
}));
