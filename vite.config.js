import { defineConfig } from "vite";
import path from "path";
import url from "url";

import react from "@vitejs/plugin-react-swc";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // preview: {
  //   port: 3000,
  //   strictPort: true,
  // },
  // server: {
  //   port: 3000,
  //   strictPort: true,
  //   host: true,
  //   origin: "http://0.0.0.0:8080",
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
});
