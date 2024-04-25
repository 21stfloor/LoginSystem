import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const environment: string = (process.env.REACT_APP_SOME_CONFIGURATION as string);
const domain = 
  environment === 'production'
    ? process.env.REACT_APP_API_URL_PROD as string
    : process.env.REACT_APP_API_URL_LOCAL as string;
    
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
        target: domain,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

})
