import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
<<<<<<< HEAD
	base: "/cinema-diplom",
=======
	base: "cinema-diplom",
>>>>>>> 02991e99e67bdfba6beecaea9771a6f4305a1d5d
});
