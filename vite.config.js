import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  devServer: { // 指定调试启动的网络端口
    host: '0.0.0.0', // 监听所有网络接口
    port: 1234,      // 指定端口号
  },
})
