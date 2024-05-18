import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.VITE_ENV

const baseURL = env === 'development' ? process.env.VITE_DEV_BASE_URL : process.env.VITE_PROD_BASE_URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: baseURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

})
