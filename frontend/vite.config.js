import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load local .env (optional, mostly for local dev)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target:
            mode === 'production'
              ? process.env.VITE_API_URL // Use Netlify env variable in production
              : 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist', // Make sure Netlify publish directory matches this
    },
  };
});
