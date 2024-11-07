import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: "http://nittvoice-backend.azurewebsites.net",
                changeOrigin: true,
                rewrite: (path) => path.replace("/api/", "/api/v1/")
            }
        }
    },
})
