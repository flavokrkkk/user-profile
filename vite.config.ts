import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  envDir: path.resolve(__dirname, "./env"),
  resolve: {
    alias: {
      "@": "/src",
      "@api": path.resolve(__dirname, "src/api/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@locales": path.resolve(__dirname, "src/locales/"),
      "@mocks": path.resolve(__dirname, "src/mocks/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@models": path.resolve(__dirname, "src/models/"),
      "@redux": path.resolve(__dirname, "src/redux/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@tools": path.resolve(__dirname, "src/tools/"),
      "@helpers": path.resolve(__dirname, "src/helpers/"),
      "@public": path.resolve(__dirname, "/public/"),
      "@views": path.resolve(__dirname, "src/views/"),
      "@src": path.resolve(__dirname, "src/"),
    },
  },
});
