import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
//import { fileURLToPath, URL } from 'url'; // Importa las utilidades necesarias

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Si tu carpeta de autenticación no está directamente en 'src', ajusta la ruta:
      // '@/auth': fileURLToPath(new URL('./src/auth', import.meta.url)),
    },
  },*/
})
