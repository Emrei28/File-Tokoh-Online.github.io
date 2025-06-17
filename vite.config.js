import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/File-Tokoh-Online.github.io./',
  server: {
    port: 5173, // Pastikan port sesuai dengan yang Anda gunakan
    open: true, // Buka browser otomatis saat server berjalan
  },
})

