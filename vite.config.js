import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "https://capstone-backend-sdbp.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // Log the environment variables during build
    define: {
      'process.env': env
    }
  };
});