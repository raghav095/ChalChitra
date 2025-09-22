import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import scrollbarHide from 'tailwind-scrollbar-hide' 

export default defineConfig({
  plugins: [
    tailwindcss({
      plugins: [
        scrollbarHide 
      ]
    }),
  ],

  // --- ADD THIS ENTIRE 'server' SECTION ---
  server: {
    proxy: {
      // Any request from your frontend that starts with '/api' 
      // will be forwarded to your backend.
      '/api': {
        target: 'https://moviesmania-1.onrender.com', // Your live backend URL
        changeOrigin: true,
      },
    }
  }
  // --- END OF NEW SECTION ---
})