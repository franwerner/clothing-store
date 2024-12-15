import react from '@vitejs/plugin-react-swc'
import dotenv from "dotenv"
import path from "path"
import { defineConfig } from 'vite'

dotenv.config()

export default defineConfig(() => {

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./assets"),
      },
    },
    define : {
      'process.env': {}
    },
    server: {
      proxy: {
        '^/api': {
          target: process.env.BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, '/')
          },
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
      }
    },
  }

})

