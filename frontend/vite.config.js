import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

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
              ? process.env.VITE_API_URL // Use your deployed backend URL
              : 'http://localhost:5000', // Local backend
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist', // This is the folder you will publish on Render
    },
  };
});
