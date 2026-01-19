import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // 👈 强制指定 IP 为 127.0.0.1
    port: 5173,        // 👈 强制固定端口，防止它乱跳
  }
})
