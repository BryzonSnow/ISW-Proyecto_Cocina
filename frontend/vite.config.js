import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Para compatibilidad con ESM en Vite
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Vite
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces (asegura que se pueda acceder desde fuera)
    port: 443,       // Puerto en el que se servirá la aplicación
    strictPort: true, // Forzar a usar este puerto (evita que se cambie automáticamente)
  },
  preview: {
    host: '0.0.0.0', // Configurar la previsualización para que esté accesible externamente
    port: 443,       // Puerto para la previsualización
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
    },
  },
})
