// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'https://fintrack-backend1.onrender.com',

=======
        target: process.env.VITE_API_URL, // backend URL in Render
>>>>>>> 47159cef38f15b3bf01cfd681e1a59dd0f7c833c
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

