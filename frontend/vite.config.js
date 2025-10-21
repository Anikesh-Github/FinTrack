// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL, // backend URL in Render
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

