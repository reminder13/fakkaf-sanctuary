import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    strictPort: true, // HA prensibi: Port çakışmasını engelle
    host: true       // Yerel ağdan erişime aç (Mobil testler için)
  }
})