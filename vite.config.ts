import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// const BASE_URL = 'https://manage.bjpass.com/'
//   const BASE_URL = 'http://47.106.205.246:92/'
const BASE_URL = 'http://192.168.10.11:7001/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
