import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
        "/auth": env.VITE_BASE_URL,
        // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
        "/api": {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    resolve: {
      alias: {
        "~": "/src"
      }
    }
  };
});
