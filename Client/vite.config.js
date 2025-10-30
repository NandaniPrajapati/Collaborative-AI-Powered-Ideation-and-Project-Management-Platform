import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({

  server: {
     
      '/api':
      {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true, //  This enables WebSocket proxying
        changeOrigin: true,
      } 
    
  },
  plugins: [
    tailwindcss(),
    react()
  ],
})
