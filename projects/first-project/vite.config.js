import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as crypto from "crypto-browserify";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {
      crypto: crypto,
    },
  },
});
